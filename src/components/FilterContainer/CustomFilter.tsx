import React, { DragEvent } from 'react';
import { GripVertical, Trash2, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Select } from '../Select';
import {
    CustomFilterData,
    ConditionType,
    FilterFieldOption,
    FilterOperator,
    CONDITION_OPTIONS,
    OPERATOR_OPTIONS,
    conditionRequiresValues,
} from './types';
import { useTagInput } from './hooks';

/**
 * Props for the CustomFilter component
 */
export interface CustomFilterProps {
    /** The filter data for this instance */
    filter: CustomFilterData;

    /** Index of this filter in the array */
    index: number;

    /** Available filter field options */
    filterOptions: FilterFieldOption[];

    /** Callback when the filter field changes */
    onFieldChange: (field: string) => void;

    /** Callback when the condition changes */
    onConditionChange: (condition: ConditionType | '') => void;

    /** Callback when the operator changes */
    onOperatorChange: (operator: FilterOperator) => void;

    /** Callback when a value/tag is added */
    onAddValue: (value: string) => void;

    /** Callback when a value/tag is removed */
    onRemoveValue: (value: string) => void;

    /** Callback when the delete button is clicked */
    onDelete: () => void;

    /** Props for the drag handle */
    dragHandleProps: {
        draggable: boolean;
        onDragStart: (e: DragEvent<HTMLDivElement>) => void;
        onDragEnd: () => void;
        style: { cursor: string };
    };

    /** Props for the drop zone */
    dropZoneProps: {
        onDragOver: (e: DragEvent<HTMLDivElement>) => void;
        onDragLeave: () => void;
        onDrop: (e: DragEvent<HTMLDivElement>) => void;
    };

    /** Whether this filter is being dragged */
    isDragging: boolean;

    /** Whether this is the drop target */
    isDropTarget: boolean;
}

/**
 * Tag component for displaying a value with remove button
 */
const Tag: React.FC<{
    value: string;
    onRemove: () => void;
}> = ({ value, onRemove }) => (
    <div
        className="flex items-center gap-1 bg-[#ecebf0] px-2 py-1 rounded-lg shrink-0"
        data-testid="custom-filter-tag"
    >
        <span className="text-sm text-[#312e4d] leading-[18px]">{value}</span>
        <button
            type="button"
            onClick={onRemove}
            className="text-[#312e4d] hover:text-[#575385] cursor-pointer"
            aria-label={`Remove ${value}`}
            data-testid="custom-filter-tag-remove"
        >
            <X size={14} />
        </button>
    </div>
);

/**
 * CustomFilter component
 * 
 * Displays a single row in the advanced filters modal with:
 * - Drag handle for reordering
 * - Where text (first) or AND/OR operator select (subsequent)
 * - Filter field select with search
 * - Condition select
 * - Tag input for values
 * - Delete button
 * 
 * @example
 * ```tsx
 * <CustomFilter
 *   filter={filter}
 *   index={0}
 *   filterOptions={availableFilters}
 *   onFieldChange={(field) => updateFilterField(filter.id, field)}
 *   onConditionChange={(condition) => updateFilterCondition(filter.id, condition)}
 *   onOperatorChange={(operator) => updateFilterOperator(filter.id, operator)}
 *   onAddValue={(value) => addFilterValue(filter.id, value)}
 *   onRemoveValue={(value) => removeFilterValue(filter.id, value)}
 *   onDelete={() => removeFilter(filter.id)}
 *   dragHandleProps={getDragHandleProps(index)}
 *   dropZoneProps={getDropZoneProps(index)}
 *   isDragging={isDragging(index)}
 *   isDropTarget={isDropTarget(index)}
 * />
 * ```
 */
export const CustomFilter: React.FC<CustomFilterProps> = ({
    filter,
    index,
    filterOptions,
    onFieldChange,
    onConditionChange,
    onOperatorChange,
    onAddValue,
    onRemoveValue,
    onDelete,
    dragHandleProps,
    dropZoneProps,
    isDragging,
    isDropTarget,
}) => {
    /** Hook for managing the tag input */
    const { getInputProps } = useTagInput(onAddValue);

    /** Check if current condition requires values */
    const requiresValues = conditionRequiresValues(filter.condition);

    /** Find the selected filter option for display */
    const selectedFilterOption = filterOptions.find((opt) => opt.id === filter.field);

    return (
        <div
            {...dropZoneProps}
            className={cn(
                'flex items-center gap-2 p-3 rounded-lg bg-[#f4f4f4]',
                'transition-all duration-200',
                isDragging && 'opacity-50',
                isDropTarget && 'ring-2 ring-[#00995a] ring-offset-2'
            )}
            data-testid={`custom-filter-${filter.id}`}
        >
            {/* Drag Handle */}
            <div
                {...dragHandleProps}
                className="shrink-0 text-[#a29fba] hover:text-[#575385] cursor-grab active:cursor-grabbing"
                data-testid="custom-filter-drag-handle"
            >
                <GripVertical size={16} />
            </div>

            {/* Where text or AND/OR Select */}
            {index === 0 ? (
                <span
                    className="shrink-0 text-base text-[#575385] leading-5 w-[60px]"
                    data-testid="custom-filter-where"
                >
                    Where
                </span>
            ) : (
                <div className="shrink-0 w-[100px]" data-testid="custom-filter-operator">
                    <Select
                        options={OPERATOR_OPTIONS}
                        value={filter.operator || 'and'}
                        onChange={(value) => onOperatorChange(value as FilterOperator)}
                        placeholder="and"
                        className="h-[46px]"
                    />
                </div>
            )}

            {/* Filter Field Select */}
            <div className="shrink-0 w-[180px]" data-testid="custom-filter-field">
                <Select
                    search
                    options={filterOptions}
                    value={filter.field}
                    onChange={onFieldChange}
                    placeholder="Select filter"
                    label={selectedFilterOption?.text || 'Select filter'}
                    className="h-[46px]"
                />
            </div>

            {/* Condition Select */}
            <div className="shrink-0 w-[160px]" data-testid="custom-filter-condition">
                <Select
                    options={CONDITION_OPTIONS}
                    value={filter.condition}
                    onChange={(value) => onConditionChange(value as ConditionType | '')}
                    placeholder="is"
                    className="h-[46px]"
                />
            </div>

            {/* Tag Input - only shown if condition requires values */}
            {requiresValues ? (
                <div
                    className={cn(
                        'flex-1 flex items-center gap-2 flex-wrap',
                        'min-h-[46px] h-auto min-w-[100px]',
                        'bg-white border border-[#ecebf0] rounded px-4 py-2'
                    )}
                    data-testid="custom-filter-values"
                >
                    {/* Existing tags */}
                    {filter.values.map((value) => (
                        <Tag
                            key={value}
                            value={value}
                            onRemove={() => onRemoveValue(value)}
                        />
                    ))}

                    {/* Input for new tags */}
                    <input
                        {...getInputProps()}
                        type="text"
                        placeholder={filter.values.length === 0 ? 'Type and press Enter' : ''}
                        className={cn(
                            'flex-1 min-w-[80px] outline-none',
                            'text-base text-[#312e4d] placeholder:text-[#a29fba]',
                            'bg-transparent'
                        )}
                        data-testid="custom-filter-input"
                    />
                </div>
            ) : (
                /* Placeholder for valueless conditions */
                <div
                    className="flex-1 min-h-[46px] min-w-[100px] bg-[#f4f4f4] rounded"
                    data-testid="custom-filter-no-values"
                />
            )}

            {/* Delete Button */}
            <button
                type="button"
                onClick={onDelete}
                className="shrink-0 text-[#d4002c] hover:text-[#a80023] cursor-pointer transition-colors"
                aria-label="Delete filter"
                data-testid="custom-filter-delete"
            >
                <Trash2 size={16} />
            </button>
        </div>
    );
};

export default CustomFilter;
