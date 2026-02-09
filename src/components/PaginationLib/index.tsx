import React from 'react';
import { cn } from '../../lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PaginationLibProps {
  /**
   * Currently active page number
   */
  currentPage: number;

  /**
   * Total number of pages
   */
  totalPages: number;

  /**
   * Callback when the page changes
   */
  onPageChange: (page: number) => void;
}

export const PaginationLib: React.FC<PaginationLibProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 4;
    
    if (totalPages <= maxVisible + 2) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage <= 3) {
        // Show first few pages
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show last few pages
        pages.push('...');
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show pages around current
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex gap-1.5 items-center">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={cn(
          'border rounded bg-transparent p-1 flex items-center justify-center w-[28px] h-[28px]',
          currentPage === 1
            ? 'border-[#ecebf0] cursor-not-allowed'
            : 'border-[#ecebf0] cursor-pointer hover:bg-gray-50'
        )}
      >
        <ChevronLeft size={14} className="text-[#312e4d]" />
      </button>
      
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <div
              key={`ellipsis-${index}`}
              className="border border-[#ecebf0] rounded p-1 h-[28px] w-[28px] flex items-center justify-center"
            >
              <p className="text-xs text-[#575385] text-center">...</p>
            </div>
          );
        }
        
        const pageNum = page as number;
        const isActive = pageNum === currentPage;
        
        return (
          <button
            key={pageNum}
            onClick={() => handlePageClick(pageNum)}
            className={cn(
              'border rounded bg-transparent p-1 h-[28px] w-[28px] flex items-center justify-center px-1',
              isActive
                ? 'border-[#a29fba] bg-white'
                : 'border-[#ecebf0] hover:bg-gray-50'
            )}
          >
            <p
              className={cn(
                'text-xs text-center',
                isActive
                  ? 'text-[#312e4d]'
                  : 'text-[#a29fba]'
              )}
            >
              {pageNum}
            </p>
          </button>
        );
      })}
      
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={cn(
          'border rounded bg-transparent p-1 flex items-center justify-center h-[28px]',
          currentPage === totalPages
            ? 'border-[#ecebf0] cursor-not-allowed'
            : 'border-[#ecebf0] cursor-pointer hover:bg-gray-50'
        )}
      >
        <ChevronRight size={14} className="text-[#312e4d]" />
      </button>
    </div>
  );
};
