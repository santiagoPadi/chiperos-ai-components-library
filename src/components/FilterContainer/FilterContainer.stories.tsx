import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FilterContainer, FilterContainerFilter, DateRangeValue } from './index';

const meta: Meta<typeof FilterContainer> = {
    title: 'Components/FilterContainer',
    component: FilterContainer,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        onApply: { action: 'apply clicked' },
        onDownload: { action: 'download clicked' },
        onRestart: { action: 'restart clicked' },
    },
};

export default meta;
type Story = StoryObj<typeof FilterContainer>;

// Sample filter options
const countryOptions = [
    { id: 'all', text: 'All Countries' },
    { id: 'us', text: 'United States' },
    { id: 'co', text: 'Colombia' },
    { id: 'mx', text: 'Mexico' },
    { id: 'br', text: 'Brazil' },
];

const categoryOptions = [
    { id: 'all', text: 'All Categories' },
    { id: 'electronics', text: 'Electronics' },
    { id: 'clothing', text: 'Clothing' },
    { id: 'food', text: 'Food & Beverages' },
    { id: 'home', text: 'Home & Garden' },
];

const statusOptions = [
    { id: 'all', text: 'All Status' },
    { id: 'active', text: 'Active' },
    { id: 'inactive', text: 'Inactive' },
    { id: 'pending', text: 'Pending' },
];

const dateRangeOptions = [
    { id: 'all', text: 'All Time' },
    { id: 'today', text: 'Today' },
    { id: 'week', text: 'This Week' },
    { id: 'month', text: 'This Month' },
    { id: 'quarter', text: 'This Quarter' },
    { id: 'year', text: 'This Year' },
];

const supplierOptions = [
    { id: 'all', text: 'All Suppliers' },
    { id: 'supplier1', text: 'Supplier A' },
    { id: 'supplier2', text: 'Supplier B' },
    { id: 'supplier3', text: 'Supplier C' },
];

/**
 * Basic usage with a few filters
 */
export const Default: Story = {
    args: {
        filters: [
            {
                key: 'country',
                label: 'Country',
                placeholder: 'Select country',
                options: countryOptions,
            },
            {
                key: 'category',
                label: 'Category',
                placeholder: 'Select category',
                options: categoryOptions,
            },
            {
                key: 'status',
                label: 'Status',
                placeholder: 'Select status',
                options: statusOptions,
            },
        ],
        applyLabel: 'Apply',
    },
};

/**
 * Multiple filters demonstrating flex-wrap behavior
 */
export const ManyFilters: Story = {
    args: {
        filters: [
            {
                key: 'country',
                label: 'Country',
                placeholder: 'Select country',
                options: countryOptions,
            },
            {
                key: 'category',
                label: 'Category',
                placeholder: 'Select category',
                options: categoryOptions,
            },
            {
                key: 'status',
                label: 'Status',
                placeholder: 'Select status',
                options: statusOptions,
            },
            {
                key: 'dateRange',
                label: 'Date Range',
                placeholder: 'Select date range',
                options: dateRangeOptions,
            },
            {
                key: 'supplier',
                label: 'Supplier',
                placeholder: 'Select supplier',
                options: supplierOptions,
            },
        ],
        applyLabel: 'Apply Filters',
    },
};

/**
 * Single filter
 */
export const SingleFilter: Story = {
    args: {
        filters: [
            {
                key: 'status',
                label: 'Status',
                placeholder: 'Select status',
                options: statusOptions,
            },
        ],
        applyLabel: 'Apply',
    },
};

/**
 * With disabled buttons
 */
export const DisabledButtons: Story = {
    args: {
        filters: [
            {
                key: 'country',
                label: 'Country',
                placeholder: 'Select country',
                options: countryOptions,
            },
        ],
        applyLabel: 'Apply',
        applyDisabled: true,
        downloadDisabled: true,
        restartDisabled: true,
    },
};

/**
 * Controlled example with state management
 */
export const Controlled: Story = {
    render: function ControlledFilterContainer() {
        const [filterValues, setFilterValues] = useState<Record<string, string>>({
            country: '',
            category: '',
            status: '',
        });

        const handleFilterChange = (key: string) => (value: string) => {
            setFilterValues((prev) => ({
                ...prev,
                [key]: value,
            }));
        };

        const handleApply = () => {
            console.log('Applied filters:', filterValues);
            alert(`Applied filters:\n${JSON.stringify(filterValues, null, 2)}`);
        };

        const handleDownload = () => {
            console.log('Download clicked with filters:', filterValues);
            alert('Download triggered!');
        };

        const handleRestart = () => {
            setFilterValues({
                country: '',
                category: '',
                status: '',
            });
            alert('Filters reset!');
        };

        const filters: FilterContainerFilter[] = [
            {
                key: 'country',
                label: 'Country',
                placeholder: 'Select country',
                options: countryOptions,
                value: filterValues.country,
                onChange: handleFilterChange('country'),
            },
            {
                key: 'category',
                label: 'Category',
                placeholder: 'Select category',
                options: categoryOptions,
                value: filterValues.category,
                onChange: handleFilterChange('category'),
            },
            {
                key: 'status',
                label: 'Status',
                placeholder: 'Select status',
                options: statusOptions,
                value: filterValues.status,
                onChange: handleFilterChange('status'),
            },
        ];

        return (
            <div className="space-y-4">
                <FilterContainer
                    filters={filters}
                    onApply={handleApply}
                    onDownload={handleDownload}
                    onRestart={handleRestart}
                    applyLabel="Apply Filters"
                />
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Current Filter Values:</h4>
                    <pre className="text-sm">{JSON.stringify(filterValues, null, 2)}</pre>
                </div>
            </div>
        );
    },
};

/**
 * With Date Range Picker - demonstrates using a DateTimePicker as a filter
 */
export const WithDateRangePicker: Story = {
    render: function WithDateRangeFilterContainer() {
        const [filterValues, setFilterValues] = useState<Record<string, string>>({
            country: '',
            category: '',
            status: '',
        });
        const [dateRange, setDateRange] = useState<DateRangeValue | null>(null);

        const handleFilterChange = (key: string) => (value: string) => {
            setFilterValues((prev) => ({
                ...prev,
                [key]: value,
            }));
        };

        const handleApply = () => {
            const allFilters = {
                ...filterValues,
                dateRange: dateRange
                    ? {
                          start: dateRange.start.toISOString(),
                          end: dateRange.end.toISOString(),
                      }
                    : null,
            };
            console.log('Applied filters:', allFilters);
            alert(`Applied filters:\n${JSON.stringify(allFilters, null, 2)}`);
        };

        const handleRestart = () => {
            setFilterValues({
                country: '',
                category: '',
                status: '',
            });
            setDateRange(null);
            alert('Filters reset!');
        };

        const filters: FilterContainerFilter[] = [
            {
                key: 'country',
                label: 'Country',
                placeholder: 'Select country',
                options: countryOptions,
                value: filterValues.country,
                onChange: handleFilterChange('country'),
            },
            {
                key: 'category',
                label: 'Category',
                placeholder: 'Select category',
                options: categoryOptions,
                value: filterValues.category,
                onChange: handleFilterChange('category'),
            },
            {
                key: 'status',
                label: 'Status',
                placeholder: 'Select status',
                options: statusOptions,
                value: filterValues.status,
                onChange: handleFilterChange('status'),
            },
            {
                key: 'dateRange',
                type: 'dateRange',
                label: 'Date Range',
                placeholder: 'Select date range',
                value: dateRange,
                onChange: setDateRange,
                showTimePresets: true,
            },
        ];

        return (
            <div className="space-y-4">
                <FilterContainer
                    filters={filters}
                    onApply={handleApply}
                    onDownload={() => alert('Download clicked')}
                    onRestart={handleRestart}
                    applyLabel="Apply Filters"
                />
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Current Filter Values:</h4>
                    <pre className="text-sm">
                        {JSON.stringify(
                            {
                                ...filterValues,
                                dateRange: dateRange
                                    ? {
                                          start: dateRange.start.toLocaleDateString(),
                                          end: dateRange.end.toLocaleDateString(),
                                      }
                                    : null,
                            },
                            null,
                            2
                        )}
                    </pre>
                </div>
            </div>
        );
    },
};

/**
 * Multiple filters with Date Range - comprehensive example with many filter types
 */
export const ComprehensiveFilters: Story = {
    render: function ComprehensiveFiltersContainer() {
        const [filterValues, setFilterValues] = useState<Record<string, string>>({
            country: '',
            category: '',
            status: '',
            supplier: '',
        });
        const [dateRange, setDateRange] = useState<DateRangeValue | null>(null);

        const handleFilterChange = (key: string) => (value: string) => {
            setFilterValues((prev) => ({
                ...prev,
                [key]: value,
            }));
        };

        const handleApply = () => {
            const allFilters = {
                ...filterValues,
                dateRange: dateRange
                    ? {
                          start: dateRange.start.toISOString(),
                          end: dateRange.end.toISOString(),
                      }
                    : null,
            };
            console.log('Applied filters:', allFilters);
            alert(`Applied filters:\n${JSON.stringify(allFilters, null, 2)}`);
        };

        const handleRestart = () => {
            setFilterValues({
                country: '',
                category: '',
                status: '',
                supplier: '',
            });
            setDateRange(null);
        };

        const filters: FilterContainerFilter[] = [
            {
                key: 'country',
                label: 'Country',
                placeholder: 'Select country',
                options: countryOptions,
                value: filterValues.country,
                onChange: handleFilterChange('country'),
            },
            {
                key: 'category',
                label: 'Category',
                placeholder: 'Select category',
                options: categoryOptions,
                value: filterValues.category,
                onChange: handleFilterChange('category'),
            },
            {
                key: 'status',
                label: 'Status',
                placeholder: 'Select status',
                options: statusOptions,
                value: filterValues.status,
                onChange: handleFilterChange('status'),
            },
            {
                key: 'supplier',
                label: 'Supplier',
                placeholder: 'Select supplier',
                options: supplierOptions,
                value: filterValues.supplier,
                onChange: handleFilterChange('supplier'),
            },
            {
                key: 'dateRange',
                type: 'dateRange',
                label: 'Date Range',
                placeholder: 'Select dates',
                value: dateRange,
                onChange: setDateRange,
                showTimePresets: true,
            },
        ];

        return (
            <div className="space-y-4">
                <FilterContainer
                    filters={filters}
                    onApply={handleApply}
                    onDownload={() => alert('Download clicked')}
                    onRestart={handleRestart}
                    applyLabel="Apply Filters"
                />
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Current Filter Values:</h4>
                    <pre className="text-sm">
                        {JSON.stringify(
                            {
                                ...filterValues,
                                dateRange: dateRange
                                    ? {
                                          start: dateRange.start.toLocaleDateString(),
                                          end: dateRange.end.toLocaleDateString(),
                                      }
                                    : null,
                            },
                            null,
                            2
                        )}
                    </pre>
                </div>
            </div>
        );
    },
};
