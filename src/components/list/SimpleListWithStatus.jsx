import React, { useState } from "react";
import SortIcon from "../../assets/icons/Sort";
import CustomDropdown from "../CustomDropdown";
import DeleteIcon from "../../assets/icons/Delete";
import EditIcon from "../../assets/icons/Edit";
import InfoIcon from "../../assets/icons/Info";
import Paginator from "../Paginator";
import SimpleList from "./SimpleList";

const SimpleListWithStatus = ({ 
  columns, 
  data, 
  enableEdit = false, 
  enableView = false, 
  enableDelete = false,
  enableOrderInput = false,
  handleEdit,
  handleView,
  handleDelete,
  handleStatusClick,
  handleOrderInput
}) => {
  // Transform the data to include status buttons
  const transformedData = data.map(item => {
    const [orderValue, setOrderValue] = useState(item.order || '');
    
    return {
      ...item,
      status: (
        <button 
          onClick={() => handleStatusClick(item.id)}
          className={`px-3 py-1 rounded-lg text-sm ${
            item.status === 'active' 
              ? 'bg-green-100 text-green-800 border border-green-300' 
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}
        >
          {item.status === 'active' ? 'Aktiv' : 'Deaktiv'}
        </button>
      ),
      order: (
        <input 
          type="number" 
          min="0"
          value={orderValue} 
          className="w-16 h-8 border border-gray-300 rounded-lg p-2 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          onChange={(e) => {
            const value = e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value));
            setOrderValue(value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && handleOrderInput) {
              handleOrderInput(item.id, orderValue);
              e.target.blur();
            }
          }}
        />
      )
    };
  });

  return (
    <SimpleList 
      columns={columns}
      data={transformedData}
      enableEdit={enableEdit}
      enableView={enableView}
      enableDelete={enableDelete}
      handleEdit={handleEdit}
      handleView={handleView}
      handleDelete={handleDelete}
    />
  );
};

export default SimpleListWithStatus;