import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FilterContainer, FilterContainerFilter, DateRangeValue, MultiSelectFilter } from './index';
import { AdvancedFiltersResult } from './types';

const meta: Meta<typeof FilterContainer> = {
    title: 'Components/FilterContainer',
    component: FilterContainer,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        onApply: { action: 'apply clicked' },
        onSettingsOpen: { action: 'settings modal opened' },
        onSettingsClose: { action: 'settings modal closed' },
        onAdvancedFiltersApply: { action: 'advanced filters applied' },
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
        settingsDisabled: true,
        downloadDisabled: true,
        restartDisabled: true,
    },
};

/**
 * With Multi-Select filter - allows selecting multiple options
 */
export const WithMultiSelect: Story = {
    render: function WithMultiSelectFilterContainer() {
        const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
        const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
        const [singleStatus, setSingleStatus] = useState<string>('');

        const handleApply = () => {
            const allFilters = {
                countries: selectedCountries,
                categories: selectedCategories,
                status: singleStatus,
            };
            console.log('Applied filters:', allFilters);
            alert(`Applied filters:\n${JSON.stringify(allFilters, null, 2)}`);
        };

        const handleRestart = () => {
            setSelectedCountries([]);
            setSelectedCategories([]);
            setSingleStatus('');
            alert('Filters reset!');
        };

        const filters: FilterContainerFilter[] = [
            {
                key: 'countries',
                label: 'Countries',
                placeholder: 'Select countries',
                options: countryOptions.filter(o => o.id !== 'all'), // Remove "All" option for multiselect
                multiple: true,
                value: selectedCountries,
                onChange: setSelectedCountries,
            } as MultiSelectFilter,
            {
                key: 'categories',
                label: 'Categories',
                placeholder: 'Select categories',
                options: categoryOptions.filter(o => o.id !== 'all'),
                multiple: true,
                value: selectedCategories,
                onChange: setSelectedCategories,
            } as MultiSelectFilter,
            {
                key: 'status',
                label: 'Status',
                placeholder: 'Select status',
                options: statusOptions,
                value: singleStatus,
                onChange: setSingleStatus,
            },
        ];

        return (
            <div className="space-y-4">
                <FilterContainer
                    filters={filters}
                    onApply={handleApply}
                    settingsModalContent={
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Settings</h2>
                            <p className="text-gray-600">Configure your filter preferences here.</p>
                        </div>
                    }
                    onSettingsOpen={() => console.log('Settings modal opened')}
                    onSettingsClose={() => console.log('Settings modal closed')}
                    onDownload={() => alert('Download clicked')}
                    onRestart={handleRestart}
                    applyLabel="Apply Filters"
                />
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Current Filter Values:</h4>
                    <pre className="text-sm">
                        {JSON.stringify(
                            {
                                countries: selectedCountries,
                                categories: selectedCategories,
                                status: singleStatus,
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
                    settingsModalContent={
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Settings</h2>
                            <p className="text-gray-600">Configure your filter preferences here.</p>
                        </div>
                    }
                    onSettingsOpen={() => console.log('Settings modal opened')}
                    onSettingsClose={() => console.log('Settings modal closed')}
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
                    settingsModalContent={
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Settings</h2>
                            <p className="text-gray-600">Configure your filter preferences here.</p>
                        </div>
                    }
                    onSettingsOpen={() => console.log('Settings modal opened')}
                    onSettingsClose={() => console.log('Settings modal closed')}
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
                    settingsModalContent={
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Settings</h2>
                            <p className="text-gray-600">Configure your filter preferences here.</p>
                        </div>
                    }
                    onSettingsOpen={() => console.log('Settings modal opened')}
                    onSettingsClose={() => console.log('Settings modal closed')}
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
 * Advanced Filters - demonstrates the new Advanced Filters modal with custom filters
 * Click the Settings (gear) button to open the Advanced Filters modal
 */
export const AdvancedFilters: Story = {
    render: function AdvancedFiltersContainer() {
        const [filterValues, setFilterValues] = useState<Record<string, string>>({
            company: '',
            brand: '',
            sku: '',
            city: '',
            macrocategory: '',
            category: '',
            warehouse: '',
        });
        const [advancedFiltersResult, setAdvancedFiltersResult] = useState<AdvancedFiltersResult | null>(null);

        const handleFilterChange = (key: string) => (value: string) => {
            setFilterValues((prev) => ({
                ...prev,
                [key]: value,
            }));
        };

        const handleApply = () => {
            console.log('Applied standard filters:', filterValues);
            alert(`Applied standard filters:\n${JSON.stringify(filterValues, null, 2)}`);
        };

        const handleAdvancedFiltersApply = (result: AdvancedFiltersResult) => {
            console.log('Advanced filters applied:', result);
            setAdvancedFiltersResult(result);
        };

        const handleRestart = () => {
            setFilterValues({
                company: '',
                brand: '',
                sku: '',
                city: '',
                macrocategory: '',
                category: '',
                warehouse: '',
            });
            setAdvancedFiltersResult(null);
        };

        // Sample options for the filters
        const companyOptions = [
            { id: 'all', text: 'All Companies' },
            { id: 'coca', text: 'Coca-Cola' },
            { id: 'pepsi', text: 'PepsiCo' },
            { id: 'nestle', text: 'Nestlé' },
            { id: 'unilever', text: 'Unilever' },
        ];

        const brandOptions = [
            { id: 'all', text: 'All Brands' },
            { id: 'brand1', text: 'Brand A' },
            { id: 'brand2', text: 'Brand B' },
            { id: 'brand3', text: 'Brand C' },
        ];

        const skuOptions = [
            { id: 'all', text: 'All SKUs' },
            { id: 'sku1', text: 'SKU-001' },
            { id: 'sku2', text: 'SKU-002' },
            { id: 'sku3', text: 'SKU-003' },
        ];

        const cityOptions = [
            { id: 'all', text: 'All Cities' },
            { id: 'bogota', text: 'Bogotá' },
            { id: 'medellin', text: 'Medellín' },
            { id: 'cali', text: 'Cali' },
            { id: 'barranquilla', text: 'Barranquilla' },
        ];

        const macrocategoryOptions = [
            { id: 'all', text: 'All Macrocategories' },
            { id: 'beverages', text: 'Beverages' },
            { id: 'food', text: 'Food' },
            { id: 'personal_care', text: 'Personal Care' },
        ];

        const warehouseOptions = [
            { id: 'all', text: 'All Warehouses' },
            { id: 'wh1', text: 'Warehouse North' },
            { id: 'wh2', text: 'Warehouse South' },
            { id: 'wh3', text: 'Warehouse Central' },
        ];

        const filters: FilterContainerFilter[] = [
            {
                key: 'company',
                label: 'Company',
                placeholder: 'Select company',
                options: companyOptions,
                value: filterValues.company,
                onChange: handleFilterChange('company'),
            },
            {
                key: 'brand',
                label: 'Brand',
                placeholder: 'Select brand',
                options: brandOptions,
                value: filterValues.brand,
                onChange: handleFilterChange('brand'),
            },
            {
                key: 'sku',
                label: 'SKU',
                placeholder: 'Select SKU',
                options: skuOptions,
                value: filterValues.sku,
                onChange: handleFilterChange('sku'),
            },
            {
                key: 'city',
                label: 'City',
                placeholder: 'Select city',
                options: cityOptions,
                value: filterValues.city,
                onChange: handleFilterChange('city'),
            },
            {
                key: 'macrocategory',
                label: 'Macrocategory',
                placeholder: 'Select macrocategory',
                options: macrocategoryOptions,
                value: filterValues.macrocategory,
                onChange: handleFilterChange('macrocategory'),
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
                key: 'warehouse',
                label: 'Warehouse',
                placeholder: 'Select warehouse',
                options: warehouseOptions,
                value: filterValues.warehouse,
                onChange: handleFilterChange('warehouse'),
            },
        ];

        return (
            <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Advanced Filters Demo</h3>
                    <p className="text-blue-700 text-sm">
                        Click the <strong>Settings (gear) button</strong> to open the Advanced Filters modal.
                        You can add multiple filter conditions with AND/OR operators, drag to reorder,
                        and add tag-based values.
                    </p>
                </div>

                <FilterContainer
                    filters={filters}
                    onApply={handleApply}
                    onAdvancedFiltersApply={handleAdvancedFiltersApply}
                    onSettingsOpen={() => console.log('Advanced Filters modal opened')}
                    onSettingsClose={() => console.log('Advanced Filters modal closed')}
                    onDownload={() => alert('Download clicked')}
                    onRestart={handleRestart}
                    applyLabel="Apply"
                />

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Standard Filter Values:</h4>
                        <pre className="text-sm overflow-auto max-h-48">
                            {JSON.stringify(filterValues, null, 2)}
                        </pre>
                    </div>

                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-green-800">Advanced Filters Result:</h4>
                        {advancedFiltersResult ? (
                            <pre className="text-sm overflow-auto max-h-48 text-green-700">
                                {JSON.stringify(advancedFiltersResult, null, 2)}
                            </pre>
                        ) : (
                            <p className="text-sm text-green-600 italic">
                                No advanced filters applied yet. Click the gear icon to add some!
                            </p>
                        )}
                    </div>
                </div>
            </div>
        );
    },
};
