import React from 'react';

const PaginationDashboard = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
  onPreviousPage = () => {},
  onNextPage = () => {},
  className = ""
}) => {
  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);
      
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push('...');
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center justify-between gap-2 ${className}`}>
      {/* Previous Button */}
      <button 
        onClick={onPreviousPage}
        disabled={currentPage === 1}
        className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
          currentPage === 1 
            ? 'text-gray-300 border-gray-200 cursor-not-allowed bg-background' 
            : 'text-gray-600 border-gray-300 hover:bg-gray-50 bg-background'
        }`}
      >
        <img src="/icons/arrow-left.svg" alt="Previous" className="w-4 h-4 mr-2" />
        <span className="text-sm font-medium">Previous</span>
      </button>
      
      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="px-3 py-2 text-sm text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                currentPage === page
                  ? 'ring ring-secondary text-text-grey shadow-sm'

                  : 'text-gray-300 hover:bg-gray-100 bg-background border border-gray-200'
              }`}
            >
              {page}
            </button>
          )
        ))}
      </div>
      
      {/* Next Button */}
      <button 
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
          currentPage === totalPages 
            ? 'text-gray-300 border-gray-200 cursor-not-allowed bg-background' 
            : 'text-gray-600 border-gray-300 hover:bg-gray-50 bg-background'
        }`}
      >
        <span className="text-sm font-medium mr-2">Next</span>
        <img src="/icons/arrow-right-bold.svg" alt="Next" className="w-4 h-4" />
      </button>
    </div>
  );
};

export default PaginationDashboard;