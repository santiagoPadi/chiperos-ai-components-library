import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../ButtonRadix';
import { CustomFilter } from './CustomFilter';
import { useCustomFilters, useDragAndDrop } from './hooks';
import {
    FilterFieldOption,
    AdvancedFiltersResult,
    CustomFilterData,
} from './types';

/**
 * Props for the AdvancedFiltersContent component
 */
export interface AdvancedFiltersContentProps {
    /** Available filter field options for the filter select */
    filterOptions: FilterFieldOption[];

    /** Callback when Apply filters button is clicked with valid filters */
    onApply: (result: AdvancedFiltersResult) => void;

    /** Callback when the modal should close */
    onClose: () => void;

    /** Optional initial filters to load */
    initialFilters?: CustomFilterData[];
}

/**
 * AdvancedFiltersContent component
 * 
 * Renders the content of the advanced filters modal including:
 * - Title and subtitle
 * - List of CustomFilter components with drag-and-drop reordering
 * - Add condition button
 * - Apply filters button
 * 
 * @example
 * ```tsx
 * <AdvancedFiltersContent
 *   filterOptions={[
 *     { id: 'company', text: 'Company' },
 *     { id: 'location', text: 'Location' },
 *   ]}
 *   onApply={(result) => console.log(result)}
 *   onClose={() => setModalOpen(false)}
 * />
 * ```
 */
export const AdvancedFiltersContent: React.FC<AdvancedFiltersContentProps> = ({
    filterOptions,
    onApply,
    onClose,
    initialFilters = [],
}) => {
    /** Hook for managing custom filters state */
    const {
        filters,
        addFilter,
        removeFilter,
        updateFilterField,
        updateFilterCondition,
        updateFilterOperator,
        addFilterValue,
        removeFilterValue,
        reorderFilters,
        isValid,
    } = useCustomFilters(initialFilters);

    /** Hook for drag and drop functionality */
    const {
        getDragHandleProps,
        getDropZoneProps,
        isDragging,
        isDropTarget,
    } = useDragAndDrop(reorderFilters);

    /**
     * Handle Apply filters button click
     * Closes the modal and returns the filter result
     */
    const handleApply = () => {
        if (isValid) {
            onApply({ filters });
            onClose();
        }
    };

    return (
        <div
            className="flex flex-col gap-4"
            data-testid="advanced-filters-content"
        >
            {/* Title Section */}
            <div className="flex flex-col gap-1">
                <h2
                    className="text-xl font-semibold text-[#312e4d] leading-normal"
                    data-testid="advanced-filters-title"
                >
                    Advanced Filters
                </h2>
                <p
                    className="text-base text-[#575385] leading-5"
                    data-testid="advanced-filters-subtitle"
                >
                    Choose and apply criteria for your filters.
                </p>
            </div>

            {/* Filters List */}
            <div
                className="flex flex-col gap-4"
                data-testid="advanced-filters-list"
            >
                {filters.map((filter, index) => (
                    <CustomFilter
                        key={filter.id}
                        filter={filter}
                        index={index}
                        filterOptions={filterOptions}
                        onFieldChange={(field) => updateFilterField(filter.id, field)}
                        onConditionChange={(condition) =>
                            updateFilterCondition(filter.id, condition)
                        }
                        onOperatorChange={(operator) =>
                            updateFilterOperator(filter.id, operator)
                        }
                        onAddValue={(value) => addFilterValue(filter.id, value)}
                        onRemoveValue={(value) => removeFilterValue(filter.id, value)}
                        onDelete={() => removeFilter(filter.id)}
                        dragHandleProps={getDragHandleProps(index)}
                        dropZoneProps={getDropZoneProps(index)}
                        isDragging={isDragging(index)}
                        isDropTarget={isDropTarget(index)}
                    />
                ))}

                {/* Empty state message */}
                {filters.length === 0 && (
                    <div
                        className="flex items-center justify-center py-8 text-[#a29fba] text-base"
                        data-testid="advanced-filters-empty"
                    >
                        No filters added. Click &quot;Add condition&quot; to start.
                    </div>
                )}
            </div>

            {/* CTA Buttons Row */}
            <div
                className="flex items-center justify-between pt-2"
                data-testid="advanced-filters-actions"
            >
                {/* Add Condition Button - Left */}
                <Button
                    variant="ghost"
                    size="large"
                    leftIcon={<Plus size={16} />}
                    onClick={addFilter}
                    className="cursor-pointer"
                    data-testid="advanced-filters-add-btn"
                >
                    Add condition
                </Button>

                {/* Apply Filters Button - Right */}
                <Button
                    variant="primary"
                    size="large"
                    onClick={handleApply}
                    disabled={!isValid}
                    className="cursor-pointer"
                    data-testid="advanced-filters-apply-btn"
                >
                    Apply filters
                </Button>
            </div>
        </div>
    );
};

export default AdvancedFiltersContent;
