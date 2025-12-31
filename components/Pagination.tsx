'use client';

import { KeyboardEvent, useCallback } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  hasNextPage,
  hasPrevPage,
}: PaginationProps) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, targetPage: number) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onPageChange(targetPage);
      }
    },
    [onPageChange]
  );

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          onKeyDown={(e) => handleKeyDown(e, 1)}
          className="px-3 py-1 rounded-md text-white hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
          aria-label="First page"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(
          <span key="ellipsis1" className="px-2 text-gray-500">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      const isCurrentPage = i === currentPage;
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className={`px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 ${
            isCurrentPage ? 'bg-violet-600 text-white' : 'text-white hover:bg-violet-600'
          }`}
          aria-label={`Page ${i}`}
          aria-current={isCurrentPage ? 'page' : undefined}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <span key="ellipsis2" className="px-2 text-gray-500">
            ...
          </span>
        );
      }
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          onKeyDown={(e) => handleKeyDown(e, totalPages)}
          className="px-3 py-1 rounded-md text-white hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
          aria-label="Last page"
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <nav
      className="flex justify-center items-center space-x-2 mt-8"
      aria-label="Pagination"
      role="navigation"
    >
      <button
        onClick={() => hasPrevPage && onPageChange(currentPage - 1)}
        onKeyDown={(e) => hasPrevPage && handleKeyDown(e, currentPage - 1)}
        disabled={!hasPrevPage}
        className={`px-3 py-1 rounded-md transition-colors duration-200 ${
          hasPrevPage
            ? 'text-white hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500'
            : 'text-gray-500 cursor-not-allowed'
        }`}
        aria-label="Previous page"
      >
        ←
      </button>

      <div className="flex items-center space-x-1" role="list">
        {renderPageNumbers()}
      </div>

      <button
        onClick={() => hasNextPage && onPageChange(currentPage + 1)}
        onKeyDown={(e) => hasNextPage && handleKeyDown(e, currentPage + 1)}
        disabled={!hasNextPage}
        className={`px-3 py-1 rounded-md transition-colors duration-200 ${
          hasNextPage
            ? 'text-white hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500'
            : 'text-gray-500 cursor-not-allowed'
        }`}
        aria-label="Next page"
      >
        →
      </button>
    </nav>
  );
}
