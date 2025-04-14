import React from "react";
import SortIcon from "../../assets/icons/Sort";
import FolderIcon from "../../assets/icons/Folder";
const List = ({ 
  className,
  columns, 
  data, 
  selectableItem,
    handleSelect,
}) => {
  return (
        <div className={`w-full rounded-lg shadow-md overflow-auto text-[14px] ${className}`}>
      {/* Header */}
      <div className="bg-[#EEF2F6] p-4 flex items-center">
        <div className="flex-1 flex items-center gap-4 font-semibold text-gray-700">
          <span>{`1-${data.length}`}</span>
        </div>
        {columns.map((col) => (
          <div
            key={col.key}
            className="flex-2 flex items-center gap-4 font-semibold text-gray-700"
          >
            <SortIcon />
            <span className="">{col.label}</span>
          </div>
        ))}
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
              <div key={col.key} className="flex-2 px-2">
                {col.key === selectableItem ? (
                  <button 
                    onClick={() => handleSelect(item[col.key])}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {item[col.key]}
                  </button>
                ) : (
                  item[col.key]
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const CategoryList = ({
  categories,
  selectedCategory,
  handleCategory,
}) => {
  return (
    <div className="flex flex-col flex-1 gap-3 w-full border border-gray-300 rounded-lg">
        <div className="flex flex-1 gap-3 w-full border-b border-gray-300 items-center">
          Kateqoriyalar
        </div>

        <div className="flex flex-5 flex-col gap-3 w-full">
          {categories.map((category) => (
            <button 
              onClick={() => handleCategory(category)}
              className="w-full"
            >
              <div 
                key={category.id} 
                className={`flex justify-between items-center w-full hover:bg-gray-100 mx-4 ${
                  selectedCategory?.id === category.id ? 'bg-gray-200' : ''
                }`}
              >
                <div className="flex  gap-3">
                  <FolderIcon />
                  <span>{category.name}</span>
                  <span className="text-gray-500">({category.count})</span>
                </div>
                
              </div>
            </button>
          ))}
        </div>
    </div>
  );
};

const DualList = ({
  categories,
  columns,
  subCategories,
  selectableItem,
  handleCategory,
  selectedCategory,
  handleSelect,
}) => {
  return (
    <div className="flex gap-3 w-full">
      <CategoryList 
        categories={categories} 
        selectedCategory={selectedCategory}
        handleCategory={handleCategory}
      />
      <List 
        className="flex-3"
        columns={columns} 
        data={subCategories} 
        selectableItem={selectableItem}
        handleSelect={handleSelect}
        />
    </div>
  );
};

export default DualList;