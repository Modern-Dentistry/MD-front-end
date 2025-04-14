import React from "react";
import SortIcon from "../../assets/icons/Sort";
import PreviousIcon from "../../assets/icons/Previous";
import NextIcon from "../../assets/icons/Next";
import CustomDropdown from "../CustomDropdown";

const List = ({ columns, data, checkboxDataKey, onCheckboxChange }) => {
  return (
    <div className="w-full rounded-lg shadow-md overflow-auto text-[14px]">
      {/* Header */}
      <div className="bg-[#EEF2F6] p-4 flex items-center">
        <div className="flex-1 flex items-center gap-4 font-semibold text-gray-700">
          <span>{`1-${data.length}`}</span>
        </div>
        {columns.map((col) => (
          col.key !== checkboxDataKey && (
            <div
              key={col.key}
              className="flex-1 flex items-center gap-4 font-semibold text-gray-700"
            >
              <SortIcon />
              <span className="">{col.label}</span>
            </div>
          )
        ))}
        {columns.find(col => col.key === checkboxDataKey) && (
          <div className="flex-1 flex justify-end items-center gap-4 font-semibold text-gray-700">
            <SortIcon />
            <span className="">{columns.find(col => col.key === checkboxDataKey).label}</span>
          </div>
        )}
      </div>
      {/* List */}
      <div className="divide-y divide-gray-200">
        {data.map((item, index) => (
          <div
            key={index}
            className="p-4 flex items-center hover:bg-gray-50"
          >
            <div className="flex-1 px-2">{index + 1}</div>
            {columns.map((col) => (
              col.key !== checkboxDataKey && (
                <div key={col.key} className="flex-1 px-2">
                  {item[col.key]}
                </div>
              )
            ))}
            {columns.find(col => col.key === checkboxDataKey) && (
              <div className="flex justify-end flex-1 px-2">
                <input
                  type="checkbox"
                  checked={item[checkboxDataKey] === "true"}
                  onChange={(e) => {
                    onCheckboxChange(index, checkboxDataKey, e.target.checked);
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

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

const ListWithCheckbox = ({
    columns,
    data,
    checkboxDataKey,
    startPage,
    endPage,
    currentPage,
    onPageChange,
    onCheckboxChange, // Ensure this prop is passed
  }) => {
    return (
      <div className="flex flex-col gap-3 w-full">
        <List
          columns={columns}
          data={data}
          checkboxDataKey={checkboxDataKey}
          onCheckboxChange={onCheckboxChange} // Pass it to the List component
        />
        <Paginator
          startPage={startPage}
          endPage={endPage}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    );
  };

export default ListWithCheckbox;