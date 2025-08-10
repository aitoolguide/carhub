import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@app/lib/utils';
import { Button } from './Button'; // Assuming Button component is available

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/**
 * A pagination component for navigating through pages.
 * @param {number} currentPage - The currently active page number.
 * @param {number} totalPages - The total number of pages.
 * @param {(page: number) => void} onPageChange - The function to call when the page changes.
 * @param {string} className - Additional CSS classes for styling.
 */
const Pagination = ({ currentPage, totalPages, onPageChange, className }: PaginationProps) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={cn("flex justify-center items-center space-x-2 mt-8", className)}>
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="outline"
        size="icon"
      >
        <ChevronLeft size={16} />
      </Button>
      {pageNumbers.map((number) => (
        <Button
          key={number}
          onClick={() => onPageChange(number)}
          variant={currentPage === number ? 'default' : 'outline'}
          size="sm"
        >
          {number}
        </Button>
      ))}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="outline"
        size="icon"
      >
        <ChevronRight size={16} />
      </Button>
    </div>
  );
};

export { Pagination };
