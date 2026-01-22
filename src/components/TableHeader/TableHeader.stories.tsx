import type { Meta, StoryObj } from '@storybook/react';
import { TableHeader, TableHeaderFilter, TableHeaderButton, TableHeaderCard } from './index';
import { useState } from 'react';
import { UserRoundCheck, UserRoundX, UsersRound } from 'lucide-react';
import { SelectedDates } from '../DateTimePicker';

const meta = {
  title: 'Components/TableHeader',
  component: TableHeader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title shown at the top',
    },
    showTitle: {
      control: 'boolean',
      description: 'Show title',
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Search field placeholder',
    },
    showFilters: {
      control: 'boolean',
      description: 'Show filters row',
    },
    showButtons: {
      control: 'boolean',
      description: 'Show buttons',
    },
    showCards: {
      control: 'boolean',
      description: 'Show KPI cards',
    },
  },
} satisfies Meta<typeof TableHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    searchPlaceholder: 'Search by...',
    showFilters: false,
    showButtons: false,
    showCards: false,
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Users Table',
    showTitle: true,
    searchPlaceholder: 'Search users...',
  },
};

export const WithFilters: Story = {
  render: () => {
    const [filters, setFilters] = useState({
      status: '',
      role: '',
      department: '',
    });

    const filterConfigs: TableHeaderFilter[] = [
      {
        key: 'status',
        label: 'Status Filter',
        placeholder: 'Status',
        options: [
          { id: 'active', text: 'Active' },
          { id: 'inactive', text: 'Inactive' },
        ],
        value: filters.status,
        onChange: (value) => setFilters({ ...filters, status: value }),
      },
      {
        key: 'role',
        label: 'Role Filter',
        placeholder: 'Role',
        options: [
          { id: 'admin', text: 'Admin' },
          { id: 'user', text: 'User' },
          { id: 'editor', text: 'Editor' },
        ],
        value: filters.role,
        onChange: (value) => setFilters({ ...filters, role: value }),
      },
      {
        key: 'department',
        label: 'Department Filter',
        placeholder: 'Department',
        options: [
          { id: 'engineering', text: 'Engineering' },
          { id: 'marketing', text: 'Marketing' },
          { id: 'sales', text: 'Sales' },
        ],
        value: filters.department,
        onChange: (value) => setFilters({ ...filters, department: value }),
      },
    ];

    return (
      <div>
        <TableHeader
          searchPlaceholder="Search users..."
          filters={filterConfigs}
          showFilters
        />
        
        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f4f4f4', borderRadius: '4px' }}>
          <strong>Active Filters:</strong>
          <pre style={{ marginTop: '8px' }}>{JSON.stringify(filters, null, 2)}</pre>
        </div>
      </div>
    );
  },
  args: {},
};

export const WithButtons: Story = {
  render: () => {
    const buttons: TableHeaderButton[] = [
      {
        label: 'Bulk',
        variant: 'outline',
        isDropdown: true,
        dropdownOptions: [
          { id: 'delete', text: 'Delete Selected' },
          { id: 'export', text: 'Export Selected' },
          { id: 'archive', text: 'Archive Selected' },
        ],
        onDropdownChange: (value) => alert(`Bulk action: ${value}`),
      },
      {
        label: 'New SKU',
        variant: 'primary',
        onClick: () => alert('Create new SKU'),
      },
    ];

    return (
      <TableHeader
        searchPlaceholder="Search SKUs..."
        buttons={buttons}
        showButtons
      />
    );
  },
  args: {},
};

export const WithCards: Story = {
  args: {
    searchPlaceholder: 'Search users...',
    cards: [
      {
        label: 'Active',
        value: 45,
        icon: <UserRoundCheck size={24} color="#00995a" />,
      },
      {
        label: 'Inactive',
        value: 12,
        icon: <UserRoundX size={24} color="#00995a" />,
      },
      {
        label: 'Total',
        value: 57,
        icon: <UsersRound size={24} color="#00995a" />,
      },
    ],
    showCards: true,
  },
};

export const Complete: Story = {
  render: () => {
    const [searchValue, setSearchValue] = useState('');
    const [filters, setFilters] = useState({
      status: '',
      role: '',
      department: '',
    });
    const [bulkAction, setBulkAction] = useState('');

    const filterConfigs: TableHeaderFilter[] = [
      {
        key: 'status',
        label: 'Status',
        placeholder: 'Status',
        options: [
          { id: 'active', text: 'Active' },
          { id: 'inactive', text: 'Inactive' },
        ],
        value: filters.status,
        onChange: (value) => setFilters({ ...filters, status: value }),
      },
      {
        key: 'role',
        label: 'Role',
        placeholder: 'Role',
        options: [
          { id: 'admin', text: 'Admin' },
          { id: 'user', text: 'User' },
          { id: 'editor', text: 'Editor' },
        ],
        value: filters.role,
        onChange: (value) => setFilters({ ...filters, role: value }),
      },
      {
        key: 'department',
        label: 'Department',
        placeholder: 'Department',
        options: [
          { id: 'engineering', text: 'Engineering' },
          { id: 'marketing', text: 'Marketing' },
        ],
        value: filters.department,
        onChange: (value) => setFilters({ ...filters, department: value }),
      },
    ];

    const buttons: TableHeaderButton[] = [
      {
        label: 'Bulk',
        variant: 'outline',
        isDropdown: true,
        dropdownOptions: [
          { id: 'delete', text: 'Delete Selected' },
          { id: 'export', text: 'Export Selected' },
        ],
        dropdownValue: bulkAction,
        onDropdownChange: (value) => {
          setBulkAction(value);
          alert(`Bulk action: ${value}`);
        },
      },
      {
        label: 'Upload Clients',
        variant: 'primary',
        onClick: () => alert('Upload clients clicked'),
      },
    ];

    const cards: TableHeaderCard[] = [
      {
        label: 'Active',
        value: 45,
        icon: <UserRoundCheck size={24} color="#00995a" />,
      },
      {
        label: 'Inactive',
        value: 12,
        icon: <UserRoundX size={24} color="#00995a" />,
      },
      {
        label: 'Total',
        value: 57,
        icon: <UsersRound size={24} color="#00995a" />,
      },
    ];

    return (
      <div>
        <TableHeader
          title="Users Management"
          showTitle
          searchPlaceholder="Search users..."
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          filters={filterConfigs}
          showFilters
          buttons={buttons}
          showButtons
          cards={cards}
          showCards
        />
        
        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f4f4f4', borderRadius: '4px' }}>
          <strong>Current State:</strong>
          <pre style={{ marginTop: '8px', fontSize: '12px' }}>
            {JSON.stringify({ searchValue, filters, bulkAction }, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
  args: {},
};

export const OnlySearch: Story = {
  args: {
    searchPlaceholder: 'Search products...',
    showFilters: false,
    showButtons: false,
    showCards: false,
  },
};

export const SearchAndButtons: Story = {
  render: () => {
    const buttons: TableHeaderButton[] = [
      {
        label: 'Export',
        variant: 'outline',
        onClick: () => alert('Export'),
      },
      {
        label: 'Add Product',
        variant: 'primary',
        onClick: () => alert('Add product'),
      },
    ];

    return (
      <TableHeader
        searchPlaceholder="Search products..."
        buttons={buttons}
        showButtons
        showFilters={false}
      />
    );
  },
  args: {},
};

export const ManyFilters: Story = {
  render: () => {
    const [filters, setFilters] = useState({
      status: '',
      role: '',
      department: '',
      location: '',
      team: '',
    });

    const filterConfigs: TableHeaderFilter[] = [
      {
        key: 'status',
        label: 'Status',
        placeholder: 'Status',
        options: [
          { id: 'active', text: 'Active' },
          { id: 'inactive', text: 'Inactive' },
        ],
        value: filters.status,
        onChange: (value) => setFilters({ ...filters, status: value }),
      },
      {
        key: 'role',
        label: 'Role',
        placeholder: 'Role',
        options: [
          { id: 'admin', text: 'Admin' },
          { id: 'user', text: 'User' },
        ],
        value: filters.role,
        onChange: (value) => setFilters({ ...filters, role: value }),
      },
      {
        key: 'department',
        label: 'Department',
        placeholder: 'Department',
        options: [
          { id: 'eng', text: 'Engineering' },
          { id: 'sales', text: 'Sales' },
        ],
        value: filters.department,
        onChange: (value) => setFilters({ ...filters, department: value }),
      },
      {
        key: 'location',
        label: 'Location',
        placeholder: 'Location',
        options: [
          { id: 'us', text: 'United States' },
          { id: 'co', text: 'Colombia' },
        ],
        value: filters.location,
        onChange: (value) => setFilters({ ...filters, location: value }),
      },
      {
        key: 'team',
        label: 'Team',
        placeholder: 'Team',
        options: [
          { id: 'frontend', text: 'Frontend' },
          { id: 'backend', text: 'Backend' },
        ],
        value: filters.team,
        onChange: (value) => setFilters({ ...filters, team: value }),
      },
    ];

    return (
      <TableHeader
        searchPlaceholder="Search..."
        filters={filterConfigs}
        showFilters
      />
    );
  },
  args: {},
};

export const CustomCards: Story = {
  args: {
    searchPlaceholder: 'Search orders...',
    cards: [
      { label: 'Received', value: 120 },
      { label: 'Picking', value: 45 },
      { label: 'Dispatched', value: 78 },
      { label: 'Delivered', value: 234 },
      { label: 'Total', value: 477 },
    ],
    showCards: true,
  },
};

export const WithPrimaryDropdown: Story = {
  render: () => {
    const [bulkAction, setBulkAction] = useState('');

    const buttons: TableHeaderButton[] = [
      {
        label: 'Actions',
        variant: 'primary',
        isDropdown: true,
        dropdownLabel: 'Bulk',
        dropdownOptions: [
          { id: 'approve', text: 'Approve Selected' },
          { id: 'reject', text: 'Reject Selected' },
          { id: 'archive', text: 'Archive Selected' },
          { id: 'delete', text: 'Delete Selected' },
        ],
        dropdownValue: bulkAction,
        onDropdownChange: (value) => {
          setBulkAction(value);
          alert(`Bulk action: ${value}`);
        },
      },
      {
        label: 'Export',
        variant: 'primary',
        isDropdown: true,
        dropdownLabel: 'Format',
        dropdownOptions: [
          { id: 'csv', text: 'Export as CSV' },
          { id: 'excel', text: 'Export as Excel' },
          { id: 'pdf', text: 'Export as PDF' },
        ],
        onDropdownChange: (value) => alert(`Export as: ${value}`),
      },
    ];

    return (
      <div>
        <TableHeader
          searchPlaceholder="Search users..."
          buttons={buttons}
          showButtons
          showFilters={false}
        />
        
        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f4f4f4', borderRadius: '4px' }}>
          <strong>Selected Bulk Action:</strong> {bulkAction || 'None'}
        </div>
      </div>
    );
  },
  args: {},
};

/**
 * TableHeader with DateTimePicker Filter
 * 
 * Demonstrates how to use the DateTimePicker as a filter in TableHeader.
 * The date filter supports:
 * - Single date selection
 * - Date range selection
 * - Time presets (Today, Tomorrow, This Week, This Month)
 */
export const WithDateFilter: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<SelectedDates>(null);
    const [statusFilter, setStatusFilter] = useState('');
    const [searchValue, setSearchValue] = useState('');

    const filterConfigs: TableHeaderFilter[] = [
      {
        key: 'status',
        label: 'Status',
        type: 'select',
        placeholder: 'Status',
        options: [
          { id: 'active', text: 'Active' },
          { id: 'inactive', text: 'Inactive' },
          { id: 'pending', text: 'Pending' },
        ],
        value: statusFilter,
        onChange: setStatusFilter,
      },
      {
        key: 'createdAt',
        label: 'Created Date',
        type: 'date',
        placeholder: 'Select date',
        dateMode: 'single',
        dateValue: selectedDate,
        onDateChange: setSelectedDate,
      },
    ];

    // Format date for display
    const formatDateDisplay = (date: SelectedDates): string => {
      if (!date) return 'None';
      if (date instanceof Date) {
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      }
      if ('start' in date && 'end' in date) {
        const start = date.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const end = date.end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        return `${start} - ${end}`;
      }
      return 'None';
    };

    return (
      <div>
        <TableHeader
          searchPlaceholder="Search orders..."
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          filters={filterConfigs}
          showFilters
        />
        
        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f4f4f4', borderRadius: '4px' }}>
          <strong>Current Filters:</strong>
          <pre style={{ marginTop: '8px', fontSize: '12px' }}>
            {JSON.stringify({
              search: searchValue,
              status: statusFilter || 'All',
              date: formatDateDisplay(selectedDate),
            }, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
  args: {},
};

/**
 * TableHeader with Date Range Filter
 * 
 * Shows how to use the DateTimePicker in range mode for filtering by date ranges.
 * Includes time presets for quick selection.
 */
export const WithDateRangeFilter: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<SelectedDates>(null);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [searchValue, setSearchValue] = useState('');

    const filterConfigs: TableHeaderFilter[] = [
      {
        key: 'category',
        label: 'Category',
        type: 'select',
        placeholder: 'Category',
        options: [
          { id: 'orders', text: 'Orders' },
          { id: 'shipments', text: 'Shipments' },
          { id: 'returns', text: 'Returns' },
        ],
        value: categoryFilter,
        onChange: setCategoryFilter,
      },
      {
        key: 'dateRange',
        label: 'Date Range',
        type: 'date',
        placeholder: 'Select range',
        dateMode: 'range',
        dateValue: dateRange,
        onDateChange: setDateRange,
        showTimePresets: true,
      },
    ];

    const buttons: TableHeaderButton[] = [
      {
        label: 'Export Report',
        variant: 'primary',
        onClick: () => alert('Exporting report...'),
      },
    ];

    // Format date range for display
    const formatDateRange = (dates: SelectedDates): string => {
      if (!dates) return 'All time';
      if (dates instanceof Date) {
        return dates.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      }
      if ('start' in dates && 'end' in dates) {
        const start = dates.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const end = dates.end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        return `${start} - ${end}`;
      }
      return 'All time';
    };

    return (
      <div>
        <TableHeader
          title="Orders Report"
          showTitle
          searchPlaceholder="Search orders by ID..."
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          filters={filterConfigs}
          showFilters
          buttons={buttons}
          showButtons
        />
        
        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f4f4f4', borderRadius: '4px' }}>
          <strong>Applied Filters:</strong>
          <pre style={{ marginTop: '8px', fontSize: '12px' }}>
            {JSON.stringify({
              search: searchValue || '(empty)',
              category: categoryFilter || 'All',
              dateRange: formatDateRange(dateRange),
            }, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
  args: {},
};

/**
 * Complete TableHeader with Multiple Date Filters
 * 
 * A comprehensive example showing multiple date filters along with
 * select filters, cards, and action buttons.
 */
export const CompleteWithDateFilters: Story = {
  render: () => {
    const [searchValue, setSearchValue] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [createdDate, setCreatedDate] = useState<SelectedDates>(null);
    const [deliveryDateRange, setDeliveryDateRange] = useState<SelectedDates>(null);

    const filterConfigs: TableHeaderFilter[] = [
      {
        key: 'status',
        label: 'Status',
        type: 'select',
        placeholder: 'Status',
        options: [
          { id: 'received', text: 'Received' },
          { id: 'processing', text: 'Processing' },
          { id: 'shipped', text: 'Shipped' },
          { id: 'delivered', text: 'Delivered' },
        ],
        value: statusFilter,
        onChange: setStatusFilter,
      },
      {
        key: 'createdAt',
        label: 'Order Date',
        type: 'date',
        placeholder: 'Order date',
        dateMode: 'single',
        dateValue: createdDate,
        onDateChange: setCreatedDate,
      },
      {
        key: 'deliveryDate',
        label: 'Delivery Window',
        type: 'date',
        placeholder: 'Delivery window',
        dateMode: 'range',
        dateValue: deliveryDateRange,
        onDateChange: setDeliveryDateRange,
        showTimePresets: true,
      },
    ];

    const buttons: TableHeaderButton[] = [
      {
        label: 'Bulk Actions',
        variant: 'outline',
        isDropdown: true,
        dropdownOptions: [
          { id: 'mark-shipped', text: 'Mark as Shipped' },
          { id: 'mark-delivered', text: 'Mark as Delivered' },
          { id: 'cancel', text: 'Cancel Orders' },
        ],
        onDropdownChange: (value) => alert(`Action: ${value}`),
      },
      {
        label: 'New Order',
        variant: 'primary',
        onClick: () => alert('Creating new order...'),
      },
    ];

    const cards = [
      {
        label: 'Processing',
        value: 24,
        icon: <UserRoundCheck size={24} color="#00995a" />,
      },
      {
        label: 'Shipped',
        value: 156,
        icon: <UsersRound size={24} color="#00995a" />,
      },
      {
        label: 'Delivered',
        value: 1203,
        icon: <UserRoundX size={24} color="#00995a" />,
      },
    ];

    return (
      <div>
        <TableHeader
          title="Orders Management"
          showTitle
          searchPlaceholder="Search by order ID, customer..."
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          filters={filterConfigs}
          showFilters
          buttons={buttons}
          showButtons
          cards={cards}
          showCards
        />
        
        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f4f4f4', borderRadius: '4px' }}>
          <strong>Current State:</strong>
          <pre style={{ marginTop: '8px', fontSize: '12px' }}>
            {JSON.stringify({
              search: searchValue,
              status: statusFilter || 'All',
              orderDate: createdDate instanceof Date 
                ? createdDate.toLocaleDateString() 
                : 'Not selected',
              deliveryWindow: deliveryDateRange && 'start' in deliveryDateRange
                ? `${deliveryDateRange.start.toLocaleDateString()} - ${deliveryDateRange.end.toLocaleDateString()}`
                : 'Not selected',
            }, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
  args: {},
};
