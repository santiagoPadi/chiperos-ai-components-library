import React, { useState, useMemo } from 'react';
import { cn } from '../../lib/utils';
import { Select, SelectOption } from '../Select';
import { Button } from '../ButtonRadix';
import { Download, ListRestart, Settings2 } from 'lucide-react';
import { DateTimePicker } from '../DateTimePicker';
import { AdvancedFiltersContent } from './AdvancedFiltersContent';
import { AdvancedFiltersResult, FilterFieldOption, CustomFilterData } from './types';

/**
 * Base filter properties shared by all filter types
 */
interface BaseFilter {
    /**
     * Unique key for the filter
     */
    key: string;

    /**
     * Label for the filter
     */
    label: string;

    /**
     * Placeholder text shown when no option is selected
     */
    placeholder?: string;
}

/**
 * Select filter type (single selection)
 */
export interface SelectFilter extends BaseFilter {
    /**
     * Filter type
     */
    type?: 'select';

    /**
     * Enable multiple selection
     */
    multiple?: false;

    /**
     * Options for dropdown filter
     */
    options: SelectOption[];

    /**
     * Selected value
     */
    value?: string;

    /**
     * Callback when filter changes
     */
    onChange?: (value: string) => void;
}

/**
 * Multi-select filter type (multiple selection)
 */
export interface MultiSelectFilter extends BaseFilter {
    /**
     * Filter type
     */
    type?: 'select';

    /**
     * Enable multiple selection
     */
    multiple: true;

    /**
     * Options for dropdown filter
     */
    options: SelectOption[];

    /**
     * Selected values (array of ids)
     */
    value?: string[];

    /**
     * Callback when filter changes
     */
    onChange?: (values: string[]) => void;
}

/**
 * Date range for dateRange filter
 */
export interface DateRangeValue {
    start: Date;
    end: Date;
}

/**
 * Date range filter type
 */
export interface DateRangeFilter extends BaseFilter {
    /**
     * Filter type
     */
    type: 'dateRange';

    /**
     * Selected date range value
     */
    value?: DateRangeValue | null;

    /**
     * Callback when date range changes
     */
    onChange?: (value: DateRangeValue | null) => void;

    /**
     * Whether to show time presets (Today, Tomorrow, etc.)
     * @default true
     */
    showTimePresets?: boolean;

    /**
     * Whether to show the label
     * @default true
     */
    showLabel?: boolean;

    /**
     * Minimum selectable date
     */
    minDate?: Date;

    /**
     * Maximum selectable date
     */
    maxDate?: Date;
}

/**
 * Union type for all filter types
 */
export type FilterContainerFilter = SelectFilter | MultiSelectFilter | DateRangeFilter;

export interface FilterContainerProps {
    /**
     * Array of filters to display
     */
    filters: FilterContainerFilter[];

    /**
     * Callback when Apply button is clicked
     */
    onApply?: () => void;

    /**
     * Content to render inside the settings modal
     * If not provided, AdvancedFiltersContent will be used
     */
    settingsModalContent?: React.ReactNode;

    /**
     * Callback when Settings modal opens
     */
    onSettingsOpen?: () => void;

    /**
     * Callback when Settings modal closes
     */
    onSettingsClose?: () => void;

    /**
     * Callback when Advanced Filters are applied
     * Receives the typed filters result
     */
    onAdvancedFiltersApply?: (result: AdvancedFiltersResult) => void;

    /**
     * Initial filters to load in the Advanced Filters modal
     */
    initialAdvancedFilters?: CustomFilterData[];

    /**
     * Callback when Download button is clicked
     */
    onDownload?: () => void;

    /**
     * Callback when Restart button is clicked
     */
    onRestart?: () => void;

    /**
     * Custom label for Apply button
     * @default "Apply"
     */
    applyLabel?: string;

    /**
     * Disable Apply button
     */
    applyDisabled?: boolean;

    /**
     * Disable Settings button
     */
    settingsDisabled?: boolean;

    /**
     * Disable Download button
     */
    downloadDisabled?: boolean;

    /**
     * Disable Restart button
     */
    restartDisabled?: boolean;

    /**
     * Additional CSS classes
     */
    className?: string;
}

export const FilterContainer: React.FC<FilterContainerProps> = ({
    filters = [],
    onApply,
    settingsModalContent,
    onSettingsOpen,
    onSettingsClose,
    onAdvancedFiltersApply,
    initialAdvancedFilters = [],
    onDownload,
    onRestart,
    applyLabel = 'Apply',
    applyDisabled = false,
    settingsDisabled = false,
    downloadDisabled = false,
    restartDisabled = false,
    className,
}) => {
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

    /**
     * Generate filter options for Advanced Filters from the existing filters
     * Extracts key and label from each filter to create selectable options
     */
    const advancedFilterOptions: FilterFieldOption[] = useMemo(() => {
        return filters.map((filter) => ({
            id: filter.key,
            text: filter.label,
        }));
    }, [filters]);

    const handleOpenSettingsModal = () => {
        setIsSettingsModalOpen(true);
        onSettingsOpen?.();
    };

    const handleCloseSettingsModal = () => {
        setIsSettingsModalOpen(false);
        onSettingsClose?.();
    };

    /**
     * Handle advanced filters apply
     * Passes the result to the callback if provided
     */
    const handleAdvancedFiltersApply = (result: AdvancedFiltersResult) => {
        onAdvancedFiltersApply?.(result);
    };

    /**
     * Determine the modal content to render
     * Uses custom content if provided, otherwise uses AdvancedFiltersContent
     */
    const modalContent = settingsModalContent ?? (
        <AdvancedFiltersContent
            filterOptions={advancedFilterOptions}
            onApply={handleAdvancedFiltersApply}
            onClose={handleCloseSettingsModal}
            initialFilters={initialAdvancedFilters}
        />
    );

    return (
        <>
        {/* Settings Modal */}
        {isSettingsModalOpen && (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center"
                data-testid="filter-container-settings-modal-overlay"
            >
                {/* Dark blur overlay - clickable to close */}
                <div 
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
                    onClick={handleCloseSettingsModal}
                />
                
                {/* Modal content container */}
                <div
                    className="relative bg-white rounded-[12px] p-8 w-[80vw] max-h-[90vh] overflow-auto shadow-xl"
                    data-testid="filter-container-settings-modal"
                >
                    {modalContent}
                </div>
            </div>
        )}
        <div
            className={cn(
                'bg-white rounded-xl p-6 px-14',
                'flex items-start gap-4',
                className
            )}
            data-testid="filter-container"
        >
            {/* Filter Dropdowns Container - 70% with flex-wrap */}
            <div
                className="flex flex-wrap items-center gap-4 w-[70%]"
                data-testid="filter-container-filters"
            >
                {filters.map((filter) => {
                    // DateRange filter
                    if (filter.type === 'dateRange') {
                        return (
                            <div
                                key={filter.key}
                                className="min-w-[200px] flex-shrink-0"
                                data-testid={`filter-container-filter-${filter.key}`}
                            >
                                <DateTimePicker
                                    mode="range"
                                    calendarView="multi"
                                    value={filter.value}
                                    onChange={(dates) => {
                                        if (dates && typeof dates === 'object' && 'start' in dates) {
                                            filter.onChange?.(dates as DateRangeValue);
                                        } else {
                                            filter.onChange?.(null);
                                        }
                                    }}
                                    showLabel={false}
                                    placeholder={filter.placeholder || filter.label}
                                    showTimePresets={filter.showTimePresets ?? true}
                                    minDate={filter.minDate}
                                    maxDate={filter.maxDate}
                                />
                            </div>
                        );
                    }

                    // Multi-select filter
                    if (filter.multiple) {
                        return (
                            <div
                                key={filter.key}
                                className="min-w-[160px] flex-shrink-0"
                                data-testid={`filter-container-filter-${filter.key}`}
                            >
                                <Select
                                    multiple
                                    options={filter.options}
                                    value={filter.value}
                                    onChange={(values) => filter.onChange?.(values)}
                                    placeholder={filter.placeholder || filter.label}
                                    label={filter.label}
                                    className="h-11"
                                />
                            </div>
                        );
                    }

                    // Default: Single select filter
                    return (
                        <div
                            key={filter.key}
                            className="min-w-[160px] flex-shrink-0"
                            data-testid={`filter-container-filter-${filter.key}`}
                        >
                            <Select
                                options={filter.options}
                                value={filter.value}
                                onChange={(value) => filter.onChange?.(value)}
                                placeholder={filter.placeholder || filter.label}
                                label={filter.label}
                                className="h-11"
                            />
                        </div>
                    );
                })}
            </div>

            {/* Action Buttons Container - 30% always on the right */}
            <div
                className="flex items-center justify-end gap-3 w-[30%] flex-shrink-0"
                data-testid="filter-container-actions"
            >
                {/* Settings Button */}
                <Button
                    variant="plain"
                    size="large"
                    iconOnly
                    leftIcon={<Settings2 size={20} className="cursor-pointer" />}
                    onClick={handleOpenSettingsModal}
                    disabled={settingsDisabled}
                    className="cursor-pointer"
                    data-testid="filter-container-settings-btn"
                    aria-label="Settings"
                />

                {/* Download Button */}
                <Button
                    variant="plain"
                    size="large"
                    iconOnly
                    leftIcon={<Download size={20} className="cursor-pointer" />}
                    onClick={onDownload}
                    disabled={downloadDisabled}
                    className="cursor-pointer"
                    data-testid="filter-container-download-btn"
                    aria-label="Download"
                />

                {/* Restart Button */}
                <Button
                    variant="plain"
                    size="large"
                    iconOnly
                    leftIcon={<ListRestart size={20} className="cursor-pointer" />}
                    onClick={onRestart}
                    disabled={restartDisabled}
                    className="cursor-pointer"
                    data-testid="filter-container-restart-btn"
                    aria-label="Restart"
                />
                {/* Apply Button */}
                <Button
                    variant="primary"
                    size="large"
                    onClick={onApply}
                    disabled={applyDisabled}
                    className="cursor-pointer"
                    data-testid="filter-container-apply-btn"
                >
                    {applyLabel}
                </Button>
            </div>
        </div>
        </>
    );
};

export default FilterContainer;

// Export types for consumers
export type {
    AdvancedFiltersResult,
    CustomFilterData,
    FilterFieldOption,
    ConditionType,
    FilterOperator,
} from './types';

// Export components
export { AdvancedFiltersContent } from './AdvancedFiltersContent';
export { CustomFilter } from './CustomFilter';

// Export hooks
export { useCustomFilters, useDragAndDrop, useTagInput } from './hooks';
