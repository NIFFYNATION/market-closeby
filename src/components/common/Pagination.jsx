import React from "react";

const Pagination = ({
  current = 1,
  total = 3,
  onPageChange = () => {},
  className = "",
}) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <nav className={`flex items-center justify-center gap-3 ${className}`}>
      {/* First */}
      <button
        className="w-10 h-10 md:w-16 md:h-11 rounded border border-[#E5E5E5] flex items-center justify-center bg-white disabled:opacity-50"
        onClick={() => onPageChange(1)}
        disabled={current === 1}
        aria-label="First page"
      >
        <img src="/icons/skip-backward.svg" alt="First page" className="w-6 h-6" />
      </button>
      {/* Prev */}
      <button
        className="w-10 h-10 md:w-16 md:h-11 rounded border border-[#E5E5E5] flex items-center justify-center bg-white disabled:opacity-50"
        onClick={() => onPageChange(current - 1)}
        disabled={current === 1}
        aria-label="Previous page"
      >
        <img src="/icons/arrow-left.svg" alt="Previous page" className="w-6 h-6" />
      </button>
      {/* Page numbers */}
      {pages.map((page) => (
        <button
          key={page}
          className={`w-10 h-10 md:w-18 md:h-11 rounded border flex items-center justify-center text-base font-semibold transition
            ${
              page === current
                ? "border-primary text-primary bg-background"
                : "border-[#E5E5E5] text-[#BDBDBD] bg-background"
            }
          `}
          onClick={() => onPageChange(page)}
          aria-current={page === current ? "page" : undefined}
        >
          {page}
        </button>
      ))}
      {/* Next */}
      <button
        className="w-10 h-10 md:w-16 md:h-11 rounded border border-[#E5E5E5] flex items-center justify-center bg-white disabled:opacity-50"
        onClick={() => onPageChange(current + 1)}
        disabled={current === total}
        aria-label="Next page"
      >
        <img src="/icons/arrow-right-bold.svg" alt="Next page" className="w-6 h-6" />
      </button>
      {/* Last */}
      <button
        className="w-10 h-10 md:w-16 md:h-11 rounded border border-[#E5E5E5] flex items-center justify-center bg-white disabled:opacity-50"
        onClick={() => onPageChange(total)}
        disabled={current === total}
        aria-label="Last page"
      >
        <img src="/icons/skip-forward.svg" alt="Last page" className="w-6 h-6" />
      </button>
    </nav>
  );
};

export default Pagination;