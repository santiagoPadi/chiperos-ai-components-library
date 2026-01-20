import { useState, useCallback, useRef, DragEvent } from 'react';

/**
 * Return type for the useDragAndDrop hook
 */
export interface UseDragAndDropReturn {
    /** Index of the item currently being dragged */
    draggedIndex: number | null;
    
    /** Index of the item being hovered over during drag */
    dragOverIndex: number | null;
    
    /** Handler for drag start event */
    handleDragStart: (index: number) => (e: DragEvent<HTMLDivElement>) => void;
    
    /** Handler for drag over event */
    handleDragOver: (index: number) => (e: DragEvent<HTMLDivElement>) => void;
    
    /** Handler for drag end event */
    handleDragEnd: () => void;
    
    /** Handler for drop event */
    handleDrop: (index: number) => (e: DragEvent<HTMLDivElement>) => void;
    
    /** Handler for drag leave event */
    handleDragLeave: () => void;
    
    /** Check if a specific index is being dragged */
    isDragging: (index: number) => boolean;
    
    /** Check if a specific index is the drop target */
    isDropTarget: (index: number) => boolean;
    
    /** Get drag handle props for an item */
    getDragHandleProps: (index: number) => {
        draggable: boolean;
        onDragStart: (e: DragEvent<HTMLDivElement>) => void;
        onDragEnd: () => void;
        style: { cursor: string };
    };
    
    /** Get drop zone props for an item */
    getDropZoneProps: (index: number) => {
        onDragOver: (e: DragEvent<HTMLDivElement>) => void;
        onDragLeave: () => void;
        onDrop: (e: DragEvent<HTMLDivElement>) => void;
    };
}

/**
 * Hook for handling drag and drop functionality for reordering items
 * 
 * @param onReorder - Callback function called when items are reordered
 * @returns Object containing drag state and event handlers
 * 
 * @example
 * ```tsx
 * const { getDragHandleProps, getDropZoneProps, isDragging } = useDragAndDrop(reorderFilters);
 * 
 * return (
 *   <div {...getDropZoneProps(index)} className={isDragging(index) ? 'opacity-50' : ''}>
 *     <div {...getDragHandleProps(index)}>
 *       <GripVertical />
 *     </div>
 *     {children}
 *   </div>
 * );
 * ```
 */
export const useDragAndDrop = (
    onReorder: (fromIndex: number, toIndex: number) => void
): UseDragAndDropReturn => {
    /** Index of the currently dragged item */
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    
    /** Index of the current drop target */
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
    
    /** Ref to store the dragged index for use in event handlers */
    const draggedIndexRef = useRef<number | null>(null);

    /**
     * Handle the start of a drag operation
     */
    const handleDragStart = useCallback(
        (index: number) => (e: DragEvent<HTMLDivElement>) => {
            // Set the drag data
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', index.toString());
            
            // Update state
            setDraggedIndex(index);
            draggedIndexRef.current = index;
            
            // Add a slight delay to allow the drag image to be captured
            requestAnimationFrame(() => {
                // This ensures the dragged element opacity change is visible
            });
        },
        []
    );

    /**
     * Handle drag over event to determine drop target
     */
    const handleDragOver = useCallback(
        (index: number) => (e: DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            
            // Only update if different from current drag over index
            if (dragOverIndex !== index) {
                setDragOverIndex(index);
            }
        },
        [dragOverIndex]
    );

    /**
     * Handle drag leave event
     */
    const handleDragLeave = useCallback(() => {
        setDragOverIndex(null);
    }, []);

    /**
     * Handle drop event to reorder items
     */
    const handleDrop = useCallback(
        (toIndex: number) => (e: DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            
            const fromIndex = draggedIndexRef.current;
            
            // Only reorder if we have valid indices and they're different
            if (fromIndex !== null && fromIndex !== toIndex) {
                onReorder(fromIndex, toIndex);
            }
            
            // Reset state
            setDraggedIndex(null);
            setDragOverIndex(null);
            draggedIndexRef.current = null;
        },
        [onReorder]
    );

    /**
     * Handle drag end event (cleanup)
     */
    const handleDragEnd = useCallback(() => {
        setDraggedIndex(null);
        setDragOverIndex(null);
        draggedIndexRef.current = null;
    }, []);

    /**
     * Check if a specific index is being dragged
     */
    const isDragging = useCallback(
        (index: number) => draggedIndex === index,
        [draggedIndex]
    );

    /**
     * Check if a specific index is the drop target
     */
    const isDropTarget = useCallback(
        (index: number) => dragOverIndex === index && draggedIndex !== index,
        [dragOverIndex, draggedIndex]
    );

    /**
     * Get props for the drag handle element
     */
    const getDragHandleProps = useCallback(
        (index: number) => ({
            draggable: true,
            onDragStart: handleDragStart(index),
            onDragEnd: handleDragEnd,
            style: { cursor: 'grab' },
        }),
        [handleDragStart, handleDragEnd]
    );

    /**
     * Get props for the drop zone (the entire item container)
     */
    const getDropZoneProps = useCallback(
        (index: number) => ({
            onDragOver: handleDragOver(index),
            onDragLeave: handleDragLeave,
            onDrop: handleDrop(index),
        }),
        [handleDragOver, handleDragLeave, handleDrop]
    );

    return {
        draggedIndex,
        dragOverIndex,
        handleDragStart,
        handleDragOver,
        handleDragEnd,
        handleDrop,
        handleDragLeave,
        isDragging,
        isDropTarget,
        getDragHandleProps,
        getDropZoneProps,
    };
};

export default useDragAndDrop;
