import type { Meta, StoryObj } from '@storybook/react';
import { TableHeader, TableHeaderFilter, TableHeaderButton, TableHeaderCard } from './index';
import { useState } from 'react';
import { UserRoundCheck, UserRoundX, UsersRound } from 'lucide-react';

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

