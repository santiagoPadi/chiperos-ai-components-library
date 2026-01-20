import { useState, useCallback } from 'react';
import {
    CustomFilterData,
    ConditionType,
    FilterOperator,
    createEmptyFilter,
    areAllFiltersComplete,
} from '../types';

/**
 * Return type for the useCustomFilters hook
 */
export interface UseCustomFiltersReturn {
    /** Current array of custom filters */
    filters: CustomFilterData[];
    
    /** Add a new empty filter to the array */
    addFilter: () => void;
    
    /** Remove a filter by its ID */
    removeFilter: (filterId: string) => void;
    
    /** Update a specific field in a filter */
    updateFilter: (filterId: string, updates: Partial<CustomFilterData>) => void;
    
    /** Update the field selection for a filter */
    updateFilterField: (filterId: string, field: string) => void;
    
    /** Update the condition selection for a filter */
    updateFilterCondition: (filterId: string, condition: ConditionType | '') => void;
    
    /** Update the operator for a filter */
    updateFilterOperator: (filterId: string, operator: FilterOperator) => void;
    
    /** Add a value/tag to a filter */
    addFilterValue: (filterId: string, value: string) => void;
    
    /** Remove a value/tag from a filter */
    removeFilterValue: (filterId: string, value: string) => void;
    
    /** Reorder filters based on drag and drop */
    reorderFilters: (fromIndex: number, toIndex: number) => void;
    
    /** Check if all filters are complete and valid */
    isValid: boolean;
    
    /** Reset all filters to empty state */
    resetFilters: () => void;
    
    /** Set filters from external source (e.g., loading saved filters) */
    setFilters: (filters: CustomFilterData[]) => void;
}

/**
 * Hook for managing the state of custom advanced filters
 * 
 * @param initialFilters - Optional initial filters to start with
 * @returns Object containing filters state and manipulation methods
 * 
 * @example
 * ```tsx
 * const { filters, addFilter, removeFilter, updateFilter, isValid } = useCustomFilters();
 * 
 * // Add a new filter
 * addFilter();
 * 
 * // Update filter field
 * updateFilterField(filters[0].id, 'location');
 * 
 * // Check if ready to apply
 * if (isValid) {
 *   onApply({ filters });
 * }
 * ```
 */
export const useCustomFilters = (
    initialFilters: CustomFilterData[] = []
): UseCustomFiltersReturn => {
    const [filters, setFilters] = useState<CustomFilterData[]>(initialFilters);

    /**
     * Add a new empty filter to the end of the array
     */
    const addFilter = useCallback(() => {
        setFilters((prev) => {
            const isFirst = prev.length === 0;
            return [...prev, createEmptyFilter(isFirst)];
        });
    }, []);

    /**
     * Remove a filter by its ID
     * Also updates operators if needed (first filter should have null operator)
     */
    const removeFilter = useCallback((filterId: string) => {
        setFilters((prev) => {
            const newFilters = prev.filter((f) => f.id !== filterId);
            
            // If we removed the first filter, update the new first filter's operator to null
            if (newFilters.length > 0 && prev[0]?.id === filterId) {
                newFilters[0] = { ...newFilters[0], operator: null };
            }
            
            return newFilters;
        });
    }, []);

    /**
     * Update a filter with partial data
     */
    const updateFilter = useCallback(
        (filterId: string, updates: Partial<CustomFilterData>) => {
            setFilters((prev) =>
                prev.map((f) => (f.id === filterId ? { ...f, ...updates } : f))
            );
        },
        []
    );

    /**
     * Update the field selection for a filter
     */
    const updateFilterField = useCallback(
        (filterId: string, field: string) => {
            updateFilter(filterId, { field });
        },
        [updateFilter]
    );

    /**
     * Update the condition selection for a filter
     * Clears values if switching to a valueless condition
     */
    const updateFilterCondition = useCallback(
        (filterId: string, condition: ConditionType | '') => {
            setFilters((prev) =>
                prev.map((f) => {
                    if (f.id !== filterId) return f;
                    
                    // Clear values if condition doesn't require them
                    const clearValues = 
                        condition === 'is_blank' || condition === 'is_not_blank';
                    
                    return {
                        ...f,
                        condition,
                        values: clearValues ? [] : f.values,
                    };
                })
            );
        },
        []
    );

    /**
     * Update the logical operator for a filter
     */
    const updateFilterOperator = useCallback(
        (filterId: string, operator: FilterOperator) => {
            updateFilter(filterId, { operator });
        },
        [updateFilter]
    );

    /**
     * Add a value/tag to a filter
     * Prevents duplicate values
     */
    const addFilterValue = useCallback((filterId: string, value: string) => {
        const trimmedValue = value.trim();
        if (!trimmedValue) return;

        setFilters((prev) =>
            prev.map((f) => {
                if (f.id !== filterId) return f;
                
                // Don't add duplicates
                if (f.values.includes(trimmedValue)) return f;
                
                return {
                    ...f,
                    values: [...f.values, trimmedValue],
                };
            })
        );
    }, []);

    /**
     * Remove a value/tag from a filter
     */
    const removeFilterValue = useCallback((filterId: string, value: string) => {
        setFilters((prev) =>
            prev.map((f) => {
                if (f.id !== filterId) return f;
                return {
                    ...f,
                    values: f.values.filter((v) => v !== value),
                };
            })
        );
    }, []);

    /**
     * Reorder filters when drag and drop occurs
     * Updates operators to maintain correct state (first filter has null operator)
     */
    const reorderFilters = useCallback((fromIndex: number, toIndex: number) => {
        setFilters((prev) => {
            const newFilters = [...prev];
            const [movedFilter] = newFilters.splice(fromIndex, 1);
            newFilters.splice(toIndex, 0, movedFilter);

            // Update operators: first filter should have null, others should have 'and' or 'or'
            return newFilters.map((filter, index) => ({
                ...filter,
                operator: index === 0 ? null : (filter.operator || 'and'),
            }));
        });
    }, []);

    /**
     * Reset all filters to empty state
     */
    const resetFilters = useCallback(() => {
        setFilters([]);
    }, []);

    /**
     * Check if all filters are complete and the form is valid
     */
    const isValid = areAllFiltersComplete(filters);

    return {
        filters,
        addFilter,
        removeFilter,
        updateFilter,
        updateFilterField,
        updateFilterCondition,
        updateFilterOperator,
        addFilterValue,
        removeFilterValue,
        reorderFilters,
        isValid,
        resetFilters,
        setFilters,
    };
};

export default useCustomFilters;
