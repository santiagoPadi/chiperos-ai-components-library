import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { PaginationLib } from '../PaginationLib';

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
   * Number of rows per page
   */
  rowsPerPage?: number;
  
  /**
   * Show pagination (default: true)
   */
  showPagination?: boolean;
  
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
}

export function Table<T = any>({
  columns,
  data,
  rowsPerPage = 10,
  showPagination = true,
  className,
  rowClassName,
  onPageChange,
  currentPage: controlledPage,
  loading = false,
  emptyMessage = 'No data available',
}: TableProps<T>) {
  const [internalPage, setInternalPage] = useState(1);
  
  // Use controlled page if provided, otherwise use internal state
  const currentPage = controlledPage !== undefined ? controlledPage : internalPage;
  
  const handlePageChange = (page: number) => {
    if (controlledPage === undefined) {
      setInternalPage(page);
    }
    onPageChange?.(page);
  };
  
  // Calculate pagination
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);
  
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
      <div className="w-full" data-testid="table-body">
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
      
      {/* Pagination */}
      {showPagination && totalPages > 1 && !loading && (
        <div
          className="flex justify-end"
          data-testid="table-pagination"
        >
          <PaginationLib
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

export default Table;

