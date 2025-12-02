import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PaginationLib } from './';

describe('PaginationLib', () => {
  it('renders the correct page numbers and buttons', () => {
    render(<PaginationLib currentPage={1} totalPages={10} onPageChange={() => {}} />);
    
    // Check for previous/next buttons
    expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();

    // Check for page numbers
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('disables the previous button on the first page', () => {
    render(<PaginationLib currentPage={1} totalPages={10} onPageChange={() => {}} />);
    const prevButton = screen.getByRole('button', { name: /previous/i });
    expect(prevButton).toBeDisabled();
  });

  it('disables the next button on the last page', () => {
    render(<PaginationLib currentPage={10} totalPages={10} onPageChange={() => {}} />);
    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeDisabled();
  });

  it('calls onPageChange with the correct page number when a page is clicked', () => {
    const onPageChange = vi.fn();
    render(<PaginationLib currentPage={1} totalPages={10} onPageChange={onPageChange} />);
    
    const page2Button = screen.getByText('2');
    fireEvent.click(page2Button);
    
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with the correct page number when next is clicked', () => {
    const onPageChange = vi.fn();
    render(<PaginationLib currentPage={5} totalPages={10} onPageChange={onPageChange} />);
    
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);
    
    expect(onPageChange).toHaveBeenCalledWith(6);
  });

  it('calls onPageChange with the correct page number when previous is clicked', () => {
    const onPageChange = vi.fn();
    render(<PaginationLib currentPage={5} totalPages={10} onPageChange={onPageChange} />);
    
    const prevButton = screen.getByRole('button', { name: /previous/i });
    fireEvent.click(prevButton);
    
    expect(onPageChange).toHaveBeenCalledWith(4);
  });
});
