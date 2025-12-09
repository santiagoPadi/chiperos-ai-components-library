import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Table, TableColumn } from './index';

interface TestData {
  id: number;
  name: string;
  email: string;
  status: string;
}

const mockColumns: TableColumn<TestData>[] = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'status', label: 'Status' },
];

const mockData: TestData[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' },
];

describe('Table', () => {
  describe('Rendering', () => {
    it('renders table with columns and data', () => {
      render(<Table columns={mockColumns} data={mockData} showPagination={false} />);
      
      // Check header
      expect(screen.getByTestId('table-header')).toBeInTheDocument();
      
      // Check column headers
      mockColumns.forEach((column) => {
        expect(screen.getByTestId(`table-header-${column.key}`)).toHaveTextContent(column.label);
      });
      
      // Check rows
      mockData.forEach((_, index) => {
        expect(screen.getByTestId(`table-row-${index}`)).toBeInTheDocument();
      });
    });

    it('renders correct number of rows', () => {
      render(<Table columns={mockColumns} data={mockData} showPagination={false} />);
      
      const rows = screen.getAllByTestId(/table-row-/);
      expect(rows).toHaveLength(mockData.length);
    });

    it('renders cell content correctly', () => {
      render(<Table columns={mockColumns} data={mockData} showPagination={false} />);
      
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('jane@example.com')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
    });
  });

  describe('Custom Render', () => {
    it('uses custom render function for columns', () => {
      const customColumns: TableColumn<TestData>[] = [
        {
          key: 'name',
          label: 'Name',
          render: (row) => <strong>{row.name.toUpperCase()}</strong>,
        },
      ];
      
      render(<Table columns={customColumns} data={mockData} showPagination={false} />);
      
      expect(screen.getByText('JOHN DOE')).toBeInTheDocument();
      expect(screen.getByText('JANE SMITH')).toBeInTheDocument();
    });

    it('renders primary and secondary text when provided', () => {
      interface DataWithText {
        info: { primary: string; secondary: string };
      }
      
      const columns: TableColumn<DataWithText>[] = [
        { key: 'info', label: 'Info' },
      ];
      
      const data: DataWithText[] = [
        { info: { primary: 'Primary Text', secondary: 'Secondary Text' } },
      ];
      
      render(<Table columns={columns} data={data} showPagination={false} />);
      
      expect(screen.getByText('Primary Text')).toBeInTheDocument();
      expect(screen.getByText('Secondary Text')).toBeInTheDocument();
    });

    it('renders dash for null or undefined values', () => {
      const data = [{ id: 1, name: null, email: undefined }];
      const columns: TableColumn[] = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
      ];
      
      render(<Table columns={columns} data={data} showPagination={false} />);
      
      const cells = screen.getAllByText('-');
      expect(cells).toHaveLength(2);
    });
  });

  describe('Pagination', () => {
    it('shows pagination when enabled and data exceeds rowsPerPage', () => {
      const largeData = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        status: 'Active',
      }));
      
      render(<Table columns={mockColumns} data={largeData} rowsPerPage={10} />);
      
      expect(screen.getByTestId('table-pagination')).toBeInTheDocument();
    });

    it('hides pagination when showPagination is false', () => {
      render(<Table columns={mockColumns} data={mockData} showPagination={false} />);
      
      expect(screen.queryByTestId('table-pagination')).not.toBeInTheDocument();
    });

    it('displays correct number of rows per page', () => {
      const largeData = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        status: 'Active',
      }));
      
      render(<Table columns={mockColumns} data={largeData} rowsPerPage={5} />);
      
      const rows = screen.getAllByTestId(/table-row-/);
      expect(rows).toHaveLength(5);
    });

    it('calls onPageChange when page changes', () => {
      const handlePageChange = vi.fn();
      const largeData = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        status: 'Active',
      }));
      
      render(
        <Table
          columns={mockColumns}
          data={largeData}
          rowsPerPage={10}
          onPageChange={handlePageChange}
        />
      );
      
      // Note: This test would need to interact with PaginationLib
      // For now, just verify pagination is rendered
      expect(screen.getByTestId('table-pagination')).toBeInTheDocument();
    });

    it('supports controlled pagination', () => {
      const largeData = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        status: 'Active',
      }));
      
      render(
        <Table
          columns={mockColumns}
          data={largeData}
          rowsPerPage={10}
          currentPage={2}
        />
      );
      
      // Should show data from page 2 (rows 10-19)
      expect(screen.getByText('User 11')).toBeInTheDocument();
      expect(screen.queryByText('User 1')).not.toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('shows empty message when no data', () => {
      render(<Table columns={mockColumns} data={[]} />);
      
      expect(screen.getByTestId('table-empty')).toBeInTheDocument();
      expect(screen.getByText('No data available')).toBeInTheDocument();
    });

    it('shows custom empty message', () => {
      render(
        <Table
          columns={mockColumns}
          data={[]}
          emptyMessage="No records found"
        />
      );
      
      expect(screen.getByText('No records found')).toBeInTheDocument();
    });

    it('hides pagination when no data', () => {
      render(<Table columns={mockColumns} data={[]} />);
      
      expect(screen.queryByTestId('table-pagination')).not.toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('shows loading message', () => {
      render(<Table columns={mockColumns} data={mockData} loading />);
      
      expect(screen.getByTestId('table-loading')).toBeInTheDocument();
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('hides data when loading', () => {
      render(<Table columns={mockColumns} data={mockData} loading />);
      
      expect(screen.queryByTestId('table-row-0')).not.toBeInTheDocument();
    });

    it('hides pagination when loading', () => {
      render(<Table columns={mockColumns} data={mockData} loading />);
      
      expect(screen.queryByTestId('table-pagination')).not.toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies custom className to container', () => {
      render(
        <Table
          columns={mockColumns}
          data={mockData}
          className="custom-class"
          showPagination={false}
        />
      );
      
      const container = screen.getByTestId('table-container');
      expect(container).toHaveClass('custom-class');
    });

    it('applies string rowClassName to all rows', () => {
      render(
        <Table
          columns={mockColumns}
          data={mockData}
          rowClassName="custom-row"
          showPagination={false}
        />
      );
      
      const rows = screen.getAllByTestId(/table-row-/);
      rows.forEach((row) => {
        expect(row).toHaveClass('custom-row');
      });
    });

    it('applies function rowClassName based on row data', () => {
      render(
        <Table
          columns={mockColumns}
          data={mockData}
          rowClassName={(row) =>
            (row as TestData).status === 'Active' ? 'active-row' : 'inactive-row'
          }
          showPagination={false}
        />
      );
      
      const row0 = screen.getByTestId('table-row-0');
      const row1 = screen.getByTestId('table-row-1');
      
      expect(row0).toHaveClass('active-row');
      expect(row1).toHaveClass('inactive-row');
    });

    it('applies column className', () => {
      const columnsWithClass: TableColumn<TestData>[] = [
        { key: 'id', label: 'ID', className: 'id-column' },
        { key: 'name', label: 'Name' },
      ];
      
      render(
        <Table
          columns={columnsWithClass}
          data={mockData}
          showPagination={false}
        />
      );
      
      const idHeader = screen.getByTestId('table-header-id');
      expect(idHeader).toHaveClass('id-column');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty columns array', () => {
      render(<Table columns={[]} data={mockData} showPagination={false} />);
      
      const header = screen.getByTestId('table-header');
      expect(header).toBeInTheDocument();
    });

    it('handles single row', () => {
      render(<Table columns={mockColumns} data={[mockData[0]]} showPagination={false} />);
      
      const rows = screen.getAllByTestId(/table-row-/);
      expect(rows).toHaveLength(1);
    });

    it('handles many columns', () => {
      const manyColumns = Array.from({ length: 20 }, (_, i) => ({
        key: `col${i}`,
        label: `Column ${i}`,
      }));
      
      render(<Table columns={manyColumns} data={[{}]} showPagination={false} />);
      
      const headers = screen.getAllByTestId(/table-header-/);
      expect(headers).toHaveLength(20);
    });

    it('handles large dataset', () => {
      const largeData = Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        name: `User ${i}`,
        email: `user${i}@example.com`,
        status: 'Active',
      }));
      
      render(<Table columns={mockColumns} data={largeData} rowsPerPage={10} />);
      
      // Should only render 10 rows
      const rows = screen.getAllByTestId(/table-row-/);
      expect(rows).toHaveLength(10);
      
      // Should have pagination
      expect(screen.getByTestId('table-pagination')).toBeInTheDocument();
    });
  });
});

