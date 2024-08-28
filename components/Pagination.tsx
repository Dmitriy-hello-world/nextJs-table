import React from 'react';

interface IPaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (num: number) => void;
}

const Pagination: React.FC<IPaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxPagesToShow = 5;
  const halfMaxPages = Math.floor(maxPagesToShow / 2);
  let startPage = Math.max(1, currentPage - halfMaxPages);
  let endPage = Math.min(totalPages, currentPage + halfMaxPages);

  if (currentPage - halfMaxPages < 1) {
    endPage = Math.min(totalPages, endPage + (halfMaxPages - (currentPage - 1)));
  }

  if (totalPages - currentPage < halfMaxPages) {
    startPage = Math.max(1, startPage - (halfMaxPages - (totalPages - currentPage)));
  }

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-between items-center mt-4 p-4 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
      <div className="flex flex-1 justify-center space-x-2">
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 border rounded bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100 disabled:opacity-50"
        >
          Previous
        </button>
        {startPage > 1 && (
          <>
            <button
              onClick={() => handlePageClick(1)}
              className="p-2 border rounded dark:bg-gray-800 dark:text-gray-100"
            >
              1
            </button>
            {startPage > 2 && (
              <span className="p-2 border rounded dark:bg-gray-800 dark:text-gray-100">...</span>
            )}
          </>
        )}
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
          <button
            key={startPage + i}
            onClick={() => handlePageClick(startPage + i)}
            className={`p-2 border rounded dark:bg-gray-800 dark:text-gray-100 ${currentPage === startPage + i ? 'bg-gray-300 dark:bg-gray-600' : 'bg-gray-100'}`}
          >
            {startPage + i}
          </button>
        ))}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="p-2 border rounded dark:bg-gray-800 dark:text-gray-100">...</span>
            )}
            <button
              onClick={() => handlePageClick(totalPages)}
              className="p-2 border rounded dark:bg-gray-800 dark:text-gray-100"
            >
              {totalPages}
            </button>
          </>
        )}
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 border rounded bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;