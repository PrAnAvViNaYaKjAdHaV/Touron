import React from "react";

const ItenaryPagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded hover:bg-gray-200 disabled:opacity-50 text-stone-800"
      >
        Previous
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-1 rounded hover:bg-gray-200 ${
            currentPage === number ? "text-primary" : "text-gray-600"
          }`}
        >
          {number}
        </button>
      ))}

      <span>...</span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded hover:bg-gray-200 disabled:opacity-50 text-stone-800"
      >
        Next
      </button>
    </div>
  );
};

export default ItenaryPagination;
