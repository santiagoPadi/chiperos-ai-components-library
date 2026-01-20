import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { PaginationLib } from '../PaginationLib';
import { Select, SelectOption } from '../Select';

/**
 * Default page size options
 */
const DEFAULT_PAGE_SIZE_OPTIONS: SelectOption[] = [
  { id: '25', text: '25 results' },
  { id: '50', text: '50 results' },
  { id: '100', text: '100 results' },
  { id: '200', text: '200 results' },
];

export interface TableColumn<T = any> {
  /**
   * Unique key for the column
   */
  key: string;
  
  /**
   * Header label for the column
   */
  label: string;
  
  /**
   * Custom render function for cell content
   */
  render?: (row: T, rowIndex: number) => React.ReactNode;
  
  /**
   * Additional CSS classes for the column
   */
  className?: string;
}

export interface TableProps<T = any> {
  /**
   * Array of column definitions
   */
  columns: TableColumn<T>[];
  
  /**
   * Array of data rows
   */
  data: T[];
  
  /**
   * Number of rows per page (default: 10)
   * @deprecated Use pageSize instead
   */
  rowsPerPage?: number;
  
  /**
   * Number of rows per page (controlled)
   * Takes priority over rowsPerPage if both are provided
   */
  pageSize?: number;
  
  /**
   * Callback when page size changes
   */
  onPageSizeChange?: (pageSize: number) => void;
  
  /**
   * Page size options for the select dropdown
   * Default: [25, 50, 100, 200]
   */
  pageSizeOptions?: SelectOption[];
  
  /**
   * Show pagination (default: true)
   */
  showPagination?: boolean;
  
  /**
   * Show page size selector (default: true when showPagination is true)
   */
  showPageSizeSelector?: boolean;
  
  /**
   * Custom className for the table container
   */
  className?: string;
  
  /**
   * Custom className for table rows
   */
  rowClassName?: string | ((row: T, rowIndex: number) => string);
  
  /**
   * Callback when page changes
   */
  onPageChange?: (page: number) => void;
  
  /**
   * Current page (for controlled component)
   */
  currentPage?: number;
  
  /**
   * Loading state
   */
  loading?: boolean;
  
  /**
   * Empty state message
   */
  emptyMessage?: string;
  
  /**
   * Total number of items (for server-side pagination)
   * If provided, pagination will use this instead of data.length
   */
  totalItems?: number;
}

export function Table<T = any>({
  columns,
  data,
  rowsPerPage = 10,
  pageSize: controlledPageSize,
  onPageSizeChange,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  showPagination = true,
  showPageSizeSelector = true,
  className,
  rowClassName,
  onPageChange,
  currentPage: controlledPage,
  loading = false,
  emptyMessage = 'No data available',
  totalItems,
}: TableProps<T>) {
  const [internalPage, setInternalPage] = useState(1);
  const [internalPageSize, setInternalPageSize] = useState(rowsPerPage);
  
  // Use controlled values if provided, otherwise use internal state
  // pageSize takes priority over rowsPerPage
  const currentPage = controlledPage !== undefined ? controlledPage : internalPage;
  const currentPageSize = controlledPageSize !== undefined ? controlledPageSize : internalPageSize;
  
  const handlePageChange = (page: number) => {
    if (controlledPage === undefined) {
      setInternalPage(page);
    }
    onPageChange?.(page);
  };
  
  const handlePageSizeChange = (value: string) => {
    const newPageSize = parseInt(value, 10);
    if (controlledPageSize === undefined) {
      setInternalPageSize(newPageSize);
    }
    // Reset to first page when page size changes
    if (controlledPage === undefined) {
      setInternalPage(1);
    }
    onPageSizeChange?.(newPageSize);
    onPageChange?.(1);
  };
  
  // Calculate pagination
  const totalDataCount = totalItems !== undefined ? totalItems : data.length;
  const totalPages = Math.ceil(totalDataCount / currentPageSize);
  const startIndex = (currentPage - 1) * currentPageSize;
  const endIndex = startIndex + currentPageSize;
  const paginatedData = totalItems !== undefined ? data : data.slice(startIndex, endIndex);
  
  // Get display text for page size select
  const getPageSizeDisplayText = () => {
    const option = pageSizeOptions.find(opt => opt.id === String(currentPageSize));
    return option ? option.text : `${currentPageSize} results`;
  };
  
  // Render cell content
  const renderCell = (column: TableColumn<T>, row: T, rowIndex: number) => {
    if (column.render) {
      return column.render(row, rowIndex);
    }
    
    // Default: access property by key
    const value = (row as any)[column.key];
    
    if (value === null || value === undefined) {
      return '-';
    }
    
    // If value is an object with primary and secondary text
    if (typeof value === 'object' && 'primary' in value) {
      return (
        <div className="flex flex-col min-w-0">
          <span className="text-sm leading-[18px] text-[#312e4d] truncate">
            {value.primary}
          </span>
          {value.secondary && (
            <span className="text-xs leading-normal text-[#575385] truncate">
              {value.secondary}
            </span>
          )}
        </div>
      );
    }
    
    return (
      <span className="text-sm leading-[18px] text-[#312e4d] truncate block">
        {String(value)}
      </span>
    );
  };
  
  const getRowClassName = (row: T, rowIndex: number) => {
    if (typeof rowClassName === 'function') {
      return rowClassName(row, rowIndex);
    }
    return rowClassName;
  };
  
  return (
    <div
      className={cn(
        'bg-white rounded-xl p-8',
        'flex flex-col gap-4',
        className
      )}
      data-testid="table-container"
    >
      {/* Table Body */}
      <div className="w-full overflow-x-auto" data-testid="table-body">
        <div className="min-w-[800px]">
        {/* Header Row */}
        <div
          className={cn(
            'flex gap-3 items-center',
            'px-4 py-3',
            'border-b border-[#ecebf0]',
            'font-semibold text-sm leading-[18px] text-[#312e4d]'
          )}
          data-testid="table-header"
        >
          {columns.map((column) => (
            <div
              key={column.key}
              className={cn(
                'flex-1 min-w-0',
                column.className
              )}
              data-testid={`table-header-${column.key}`}
            >
              {column.label}
            </div>
          ))}
        </div>
        
        {/* Data Rows */}
        {loading ? (
          <div
            className="flex items-center justify-center py-12"
            data-testid="table-loading"
          >
            <span className="text-[#a29fba]">Loading...</span>
          </div>
        ) : paginatedData.length === 0 ? (
          <div
            className="flex items-center justify-center py-12"
            data-testid="table-empty"
          >
            <span className="text-[#a29fba]">{emptyMessage}</span>
          </div>
        ) : (
          paginatedData.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={cn(
                'flex gap-3 items-center',
                'px-4 py-3',
                'border-b border-[#ecebf0]',
                getRowClassName(row, rowIndex)
              )}
              data-testid={`table-row-${rowIndex}`}
            >
              {columns.map((column) => (
                <div
                  key={column.key}
                  className={cn(
                    'flex-1 min-w-0 overflow-hidden',
                    column.className
                  )}
                  data-testid={`table-cell-${rowIndex}-${column.key}`}
                >
                  {renderCell(column, row, rowIndex)}
                </div>
              ))}
            </div>
          ))
        )}
        </div>
      </div>
      
      {/* Pagination Footer */}
      {showPagination && !loading && (
        <div
          className={cn(
            'flex items-center',
            showPageSizeSelector ? 'justify-between' : 'justify-end'
          )}
          data-testid="table-pagination-footer"
        >
          {/* Page Size Select */}
          {showPageSizeSelector && (
            <div className="w-[140px]" data-testid="table-page-size-select">
              <Select
                options={pageSizeOptions}
                value={String(currentPageSize)}
                onChange={handlePageSizeChange}
                placeholder={getPageSizeDisplayText()}
                className="h-[46px]"
              />
            </div>
          )}
          
          {/* Pagination - Always show when showPagination is true */}
          <div data-testid="table-pagination">
            <PaginationLib
              currentPage={currentPage}
              totalPages={Math.max(totalPages, 1)}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;

