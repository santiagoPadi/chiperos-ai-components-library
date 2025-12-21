import React from 'react';
import { cn } from '../../lib/utils';
import { Select, SelectOption } from '../Select';
import { Button } from '../ButtonRadix';
import { Download, ListRestart, RotateCcw } from 'lucide-react';

export interface FilterContainerFilter {
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
    onDownload,
    onRestart,
    applyLabel = 'Apply',
    applyDisabled = false,
    downloadDisabled = false,
    restartDisabled = false,
    className,
}) => {
    return (
        <div
            className={cn(
                'bg-white rounded-xl p-6',
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
                {filters.map((filter) => (
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
                ))}
            </div>

            {/* Action Buttons Container - 30% always on the right */}
            <div
                className="flex items-center justify-end gap-3 w-[30%] flex-shrink-0"
                data-testid="filter-container-actions"
            >
                {/* Download Button */}
                <Button
                    variant="plain"
                    size="large"
                    iconOnly
                    leftIcon={<Download size={20} />}
                    onClick={onDownload}
                    disabled={downloadDisabled}
                    data-testid="filter-container-download-btn"
                    aria-label="Download"
                />

                {/* Restart Button */}
                <Button
                    variant="plain"
                    size="large"
                    iconOnly
                    leftIcon={<ListRestart size={20} />}
                    onClick={onRestart}
                    disabled={restartDisabled}
                    data-testid="filter-container-restart-btn"
                    aria-label="Restart"
                />
                {/* Apply Button */}
                <Button
                    variant="primary"
                    size="large"
                    onClick={onApply}
                    disabled={applyDisabled}
                    data-testid="filter-container-apply-btn"
                >
                    {applyLabel}
                </Button>
            </div>
        </div>
    );
};

export default FilterContainer;

