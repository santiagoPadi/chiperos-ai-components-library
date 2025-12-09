import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableColumn } from './index';
import { useState } from 'react';

const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'object',
      description: 'Array of column definitions',
    },
    data: {
      control: 'object',
      description: 'Array of data rows',
    },
    rowsPerPage: {
      control: 'number',
      description: 'Number of rows per page',
    },
    showPagination: {
      control: 'boolean',
      description: 'Show pagination controls',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    emptyMessage: {
      control: 'text',
      description: 'Message shown when no data',
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

const sampleUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'Editor', status: 'Active' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'Active' },
];

const basicColumns: TableColumn<User>[] = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
];

export const Default: Story = {
  args: {
    columns: basicColumns,
    data: sampleUsers,
    showPagination: false,
  },
};

export const WithPagination: Story = {
  args: {
    columns: basicColumns,
    data: Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: i % 3 === 0 ? 'Admin' : i % 3 === 1 ? 'Editor' : 'User',
      status: i % 2 === 0 ? 'Active' : 'Inactive',
    })),
    rowsPerPage: 10,
    showPagination: true,
  },
};

export const CustomRowsPerPage: Story = {
  args: {
    columns: basicColumns,
    data: Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: 'User',
      status: 'Active',
    })),
    rowsPerPage: 5,
    showPagination: true,
  },
};

export const Loading: Story = {
  args: {
    columns: basicColumns,
    data: sampleUsers,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    columns: basicColumns,
    data: [],
  },
};

export const CustomEmptyMessage: Story = {
  args: {
    columns: basicColumns,
    data: [],
    emptyMessage: 'No users found. Try adding some!',
  },
};

export const WithCustomRender: Story = {
  args: {
    columns: [
      { key: 'id', label: 'ID' },
      {
        key: 'name',
        label: 'Name',
        render: (row: User) => <strong style={{ color: '#00995a' }}>{row.name}</strong>,
      },
      { key: 'email', label: 'Email' },
      {
        key: 'status',
        label: 'Status',
        render: (row: User) => (
          <span
            style={{
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              backgroundColor: row.status === 'Active' ? '#e6f4ed' : '#f4f4f4',
              color: row.status === 'Active' ? '#00995a' : '#a29fba',
            }}
          >
            {row.status}
          </span>
        ),
      },
    ],
    data: sampleUsers,
    showPagination: false,
  },
};

export const WithTwoLineCell: Story = {
  args: {
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'userInfo', label: 'User Info' },
      { key: 'role', label: 'Role' },
    ],
    data: sampleUsers.map((user) => ({
      ...user,
      userInfo: {
        primary: user.name,
        secondary: user.email,
      },
    })),
    showPagination: false,
  },
};

export const ManyColumns: Story = {
  args: {
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'firstName', label: 'First Name' },
      { key: 'lastName', label: 'Last Name' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'department', label: 'Department' },
      { key: 'role', label: 'Role' },
    ],
    data: [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+1 555-0123',
        department: 'Engineering',
        role: 'Senior Developer',
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        phone: '+1 555-0124',
        department: 'Marketing',
        role: 'Manager',
      },
    ],
    showPagination: false,
  },
};

export const RowHighlighting: Story = {
  args: {
    columns: basicColumns,
    data: sampleUsers,
    rowClassName: (row: User) =>
      row.status === 'Active' ? '' : 'opacity-50',
    showPagination: false,
  },
};

export const Interactive: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    
    const largeData = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: i % 3 === 0 ? 'Admin' : i % 3 === 1 ? 'Editor' : 'User',
      status: i % 2 === 0 ? 'Active' : 'Inactive',
    }));
    
    return (
      <div>
        <div style={{ marginBottom: '16px', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <label>
            Rows per page:
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setPage(1);
              }}
              style={{
                marginLeft: '8px',
                padding: '4px 8px',
                borderRadius: '4px',
                border: '1px solid #ecebf0',
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </label>
          
          <div style={{ fontSize: '14px', color: '#575385' }}>
            Current page: {page}
          </div>
        </div>
        
        <Table
          columns={basicColumns}
          data={largeData}
          rowsPerPage={rowsPerPage}
          currentPage={page}
          onPageChange={setPage}
          showPagination={true}
        />
      </div>
    );
  },
  args: { columns: [], data: [] },
};

export const ClickableRows: Story = {
  render: () => {
    const handleRowClick = (row: User) => {
      alert(`Clicked on ${row.name} (${row.email})`);
    };
    
    const columns: TableColumn<User>[] = [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' },
      {
        key: 'actions',
        label: 'Actions',
        render: (row: User) => (
          <button
            onClick={() => handleRowClick(row)}
            style={{
              padding: '4px 12px',
              borderRadius: '4px',
              border: '1px solid #00995a',
              background: 'white',
              color: '#00995a',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            View
          </button>
        ),
      },
    ];
    
    return (
      <Table
        columns={columns}
        data={sampleUsers}
        showPagination={false}
      />
    );
  },
  args: { columns: [], data: [] },
};

export const SortableExample: Story = {
  render: () => {
    const [data, setData] = useState<User[]>(sampleUsers);
    const [sortKey, setSortKey] = useState<keyof User | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    
    const handleSort = (key: keyof User) => {
      const newOrder = sortKey === key && sortOrder === 'asc' ? 'desc' : 'asc';
      setSortKey(key);
      setSortOrder(newOrder);
      
      const sorted = [...data].sort((a, b) => {
        const aVal = a[key];
        const bVal = b[key];
        
        if (aVal < bVal) return newOrder === 'asc' ? -1 : 1;
        if (aVal > bVal) return newOrder === 'asc' ? 1 : -1;
        return 0;
      });
      
      setData(sorted);
    };
    
    const sortableColumns: TableColumn<User>[] = [
      { key: 'id', label: 'ID' },
      {
        key: 'name',
        label: 'Name',
        render: (row: User) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>{row.name}</span>
            <button
              onClick={() => handleSort('name')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0',
                fontSize: '12px',
              }}
            >
              {sortKey === 'name' ? (sortOrder === 'asc' ? '▲' : '▼') : '↕'}
            </button>
          </div>
        ),
      },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' },
      { key: 'status', label: 'Status' },
    ];
    
    return (
      <Table
        columns={sortableColumns}
        data={data}
        showPagination={false}
      />
    );
  },
  args: { columns: [], data: [] },
};

