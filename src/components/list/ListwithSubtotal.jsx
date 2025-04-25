import React from "react";
import SortIcon from "../../assets/icons/Sort";
import DeleteIcon from "../../assets/icons/Delete";
import EditIcon from "../../assets/icons/Edit";
import InfoIcon from "../../assets/icons/Info";

const ListWithSubtotal = ({ 
  columns, 
  data, 
  enableEdit = true, 
  enableView = false, 
  enableDelete = true,
  handleEdit,
  handleView,
  handleDelete,
  subtotalColumns = [] // Array of column keys to show subtotals for
}) => {
  // Calculate subtotals for specified columns
  const subtotals = subtotalColumns.reduce((acc, colKey) => {
    acc[colKey] = data.reduce((sum, item) => {
      const value = parseFloat(item[colKey]) || 0;
      return sum + value;
    }, 0);
    return acc;
  }, {});

  return (
    <div className="w-full rounded-lg shadow-md overflow-auto text-[14px]">
      {/* Header */}
      <div className="bg-[#EEF2F6] p-4 flex items-center">
        <div className="flex-1 flex items-center gap-4 font-semibold text-gray-700">
          <span>{`1-${data.length}`}</span>
        </div>
        {columns.map((col) => (
          <div
            key={col.key}
            className="flex-1 flex items-center gap-4 font-semibold text-gray-700"
          >
            <SortIcon />
            <span className="">{col.label}</span>
          </div>
        ))}
        {(enableEdit || enableView || enableDelete) && (
          <div className="flex-1 flex justify-end items-center gap-4 font-semibold text-gray-700">
            Düzəliş
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
              <div key={col.key} className="flex-1 px-2">
                {item[col.key]}
              </div>
            ))}
            {(enableEdit || enableView || enableDelete) && (
              <div className="flex flex-1 justify-end px-2 gap-2">
                {enableView && (
                  <button 
                    onClick={() => handleView?.(item.id)}
                    className="text-[#155EEF] hover:text-[#155EEF]"
                  >
                    <InfoIcon />
                  </button>
                )}
                {enableEdit && (
                  <button 
                    onClick={() => handleEdit(item)}
                    className="text-yellow-600 hover:text-yellow-800"
                  >
                    <EditIcon />
                  </button>
                )}
                {enableDelete && (
                  <button 
                    onClick={() => handleDelete?.(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <DeleteIcon />
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
        {/* Subtotal Row */}
        {subtotalColumns.length > 0 && (
          <div className="p-4 flex items-center hover:bg-gray-50">
            <div className="flex-1 px-2 font-semibold">Cəm:</div>
            {columns.map((col) => (
              <div key={col.key} className="flex-1 px-2 font-semibold">
                {subtotalColumns.includes(col.key) 
                  ? subtotals[col.key].toFixed(2)
                  : ""}
              </div>
            ))}
            {(enableEdit || enableView || enableDelete) && (
              <div className="flex-1" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListWithSubtotal;