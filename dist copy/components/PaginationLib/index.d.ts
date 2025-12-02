import { default as React } from 'react';

interface PaginationLibProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}
export declare const PaginationLib: React.FC<PaginationLibProps>;
export {};
