/**
 * Types for Advanced Filters functionality in FilterContainer
 */

/**
 * Condition types available for filtering
 * - is: exact match
 * - is_not: not equal
 * - contains: partial match
 * - starts_with: begins with
 * - is_blank: field is empty
 * - is_not_blank: field has a value
 */
export type ConditionType = 
    | 'is' 
    | 'is_not' 
    | 'contains' 
    | 'starts_with' 
    | 'is_blank' 
    | 'is_not_blank';

/**
 * Logical operator to combine filters
 * - null: used for the first filter (no preceding operator)
 * - and: both conditions must be true
 * - or: either condition can be true
 */
export type FilterOperator = 'and' | 'or' | null;

/**
 * Data structure for a single custom filter
 */
export interface CustomFilterData {
    /**
     * Unique identifier for the filter instance
     */
    id: string;

    /**
     * Logical operator connecting this filter to the previous one
     * First filter should have null
     */
    operator: FilterOperator;

    /**
     * The field/column being filtered (e.g., 'location', 'company')
     */
    field: string;

    /**
     * The condition type for the filter
     */
    condition: ConditionType | '';

    /**
     * Array of values/tags for the filter
     * Empty array for conditions like 'is_blank' that don't need values
     */
    values: string[];
}

/**
 * Result returned when applying advanced filters
 */
export interface AdvancedFiltersResult {
    /**
     * Array of filter configurations
     */
    filters: CustomFilterData[];
}

/**
 * Option for the filter field select dropdown
 */
export interface FilterFieldOption {
    /**
     * Unique identifier matching the filter key
     */
    id: string;

    /**
     * Display text for the option
     */
    text: string;
}

/**
 * Condition option for the condition select dropdown
 */
export interface ConditionOption {
    /**
     * Condition type value
     */
    id: ConditionType;

    /**
     * Display text for the condition
     */
    text: string;
}

/**
 * Default condition options available in CustomFilter
 */
export const CONDITION_OPTIONS: ConditionOption[] = [
    { id: 'is', text: 'is' },
    { id: 'is_not', text: 'is not' },
    { id: 'contains', text: 'contains' },
    { id: 'starts_with', text: 'starts with' },
    { id: 'is_blank', text: 'is blank' },
    { id: 'is_not_blank', text: 'is not blank' },
];

/**
 * Operator options for combining filters
 */
export const OPERATOR_OPTIONS = [
    { id: 'and', text: 'and' },
    { id: 'or', text: 'or' },
];

/**
 * Conditions that don't require values
 */
export const VALUE_LESS_CONDITIONS: ConditionType[] = ['is_blank', 'is_not_blank'];

/**
 * Check if a condition requires values
 * @param condition - The condition to check
 * @returns true if values are required, false otherwise
 */
export const conditionRequiresValues = (condition: ConditionType | ''): boolean => {
    if (!condition) return true;
    return !VALUE_LESS_CONDITIONS.includes(condition as ConditionType);
};

/**
 * Check if a single filter is complete/valid
 * @param filter - The filter to validate
 * @returns true if the filter is complete, false otherwise
 */
export const isFilterComplete = (filter: CustomFilterData): boolean => {
    // Must have a field selected
    if (!filter.field) return false;
    
    // Must have a condition selected
    if (!filter.condition) return false;
    
    // If condition requires values, must have at least one value
    if (conditionRequiresValues(filter.condition) && filter.values.length === 0) {
        return false;
    }
    
    return true;
};

/**
 * Check if all filters in the array are complete
 * @param filters - Array of filters to validate
 * @returns true if all filters are complete, false otherwise
 */
export const areAllFiltersComplete = (filters: CustomFilterData[]): boolean => {
    if (filters.length === 0) return false;
    return filters.every(isFilterComplete);
};

/**
 * Generate a unique ID for a new filter
 * @returns A unique string ID
 */
export const generateFilterId = (): string => {
    return `filter-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Create an empty filter with default values
 * @param isFirst - Whether this is the first filter (operator will be null)
 * @returns A new CustomFilterData object with default values
 */
export const createEmptyFilter = (isFirst: boolean = false): CustomFilterData => ({
    id: generateFilterId(),
    operator: isFirst ? null : 'and',
    field: '',
    condition: 'is', // Default condition to 'is'
    values: [],
});
