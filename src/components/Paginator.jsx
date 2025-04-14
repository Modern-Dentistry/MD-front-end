import React from "react";
import PreviousIcon from "../assets/icons/Previous";
import NextIcon from "../assets/icons/Next";
import CustomDropdown from "./CustomDropdown";

const Paginator = ({
  startPage,
  endPage,
  currentPage,
  onPageChange,
}) => {
  return (
    <div className="pagination flex w-1/2 justify-end self-end items-center gap-2 m-2">
      <button
        className="flex w-[34px] h-[34px] items-center justify-center"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === startPage}
      >
        <PreviousIcon />
      </button>

      {/* Always show the first page */}
      <button
        className={`w-[34px] h-[34px] border border-[#CDD5DF] rounded-lg ${
          currentPage === startPage
            ? "bg-[#155EEF] text-white"
            : "bg-white text-gray-700"
        }`}
        onClick={() => onPageChange(startPage)}
      >
        {startPage}
      </button>

      {/* Add ellipsis if needed */}
      {currentPage > startPage + 2 && <span className="px-2">...</span>}

      {/* Dynamic range of pages */}
      {Array.from({ length: 5 }, (_, index) => {
        const pageNumber = currentPage - 2 + index;
        if (pageNumber > startPage && pageNumber < endPage) {
          return (
            <button
              key={pageNumber}
              className={`w-[34px] h-[34px] border border-[#CDD5DF] rounded-lg ${
                pageNumber === currentPage
                  ? "bg-[#155EEF] text-white"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        }
        return null;
      })}

      {/* Add ellipsis if needed */}
      {currentPage < endPage - 2 && <span className="px-2">...</span>}

      {/* Always show the last page */}
      <button
        className={`w-[34px] h-[34px] border border-[#CDD5DF] rounded-lg ${
          currentPage === endPage
            ? "bg-[#155EEF] text-white"
            : "bg-white  text-gray-700"
        }`}
        onClick={() => onPageChange(endPage)}
      >
        {endPage}
      </button>

      <button
        className="flex w-[34px] h-[34px] items-center justify-center"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === endPage}
      >
        <NextIcon />
      </button>

      <div className="w-1/5">
        <CustomDropdown enableSearch={false} />
      </div>
    </div>
  );
};

export default Paginator; 