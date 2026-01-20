import { useState, useCallback, KeyboardEvent, ChangeEvent } from 'react';

/**
 * Return type for the useTagInput hook
 */
export interface UseTagInputReturn {
    /** Current input value */
    inputValue: string;
    
    /** Handler for input change events */
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    
    /** Handler for keyboard events (Enter to add tag) */
    handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
    
    /** Set the input value directly */
    setInputValue: (value: string) => void;
    
    /** Clear the input value */
    clearInput: () => void;
    
    /** Get input element props */
    getInputProps: () => {
        value: string;
        onChange: (e: ChangeEvent<HTMLInputElement>) => void;
        onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
    };
}

/**
 * Hook for managing tag input functionality
 * 
 * Handles text input that converts to tags when Enter is pressed.
 * 
 * @param onAddTag - Callback function called when a tag should be added
 * @returns Object containing input state and event handlers
 * 
 * @example
 * ```tsx
 * const { getInputProps } = useTagInput((value) => addFilterValue(filterId, value));
 * 
 * return (
 *   <div className="flex items-center gap-2">
 *     {tags.map(tag => <Tag key={tag} value={tag} onRemove={handleRemove} />)}
 *     <input {...getInputProps()} placeholder="Type and press Enter" />
 *   </div>
 * );
 * ```
 */
export const useTagInput = (
    onAddTag: (value: string) => void
): UseTagInputReturn => {
    /** Current text input value */
    const [inputValue, setInputValue] = useState('');

    /**
     * Handle input change events
     */
    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }, []);

    /**
     * Handle keyboard events
     * - Enter: Add current input as tag (if not empty)
     * - Backspace on empty: Could optionally remove last tag (not implemented)
     */
    const handleKeyDown = useCallback(
        (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                
                const trimmedValue = inputValue.trim();
                
                if (trimmedValue) {
                    onAddTag(trimmedValue);
                    setInputValue('');
                }
            }
        },
        [inputValue, onAddTag]
    );

    /**
     * Clear the input value
     */
    const clearInput = useCallback(() => {
        setInputValue('');
    }, []);

    /**
     * Get props to spread on the input element
     */
    const getInputProps = useCallback(
        () => ({
            value: inputValue,
            onChange: handleInputChange,
            onKeyDown: handleKeyDown,
        }),
        [inputValue, handleInputChange, handleKeyDown]
    );

    return {
        inputValue,
        handleInputChange,
        handleKeyDown,
        setInputValue,
        clearInput,
        getInputProps,
    };
};

export default useTagInput;
