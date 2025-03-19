import React, { useState } from "react";
import "../assets/style/dropdown_checklist.css"; // Add styles for the dropdown menu

const DropdownMenuChecklist = ({ onSelect, placeholder = "Elmi dərəcə seçin", options = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    const isSelected = selectedOptions.some((o) => o.value === option.value);
    let updatedOptions;

    if (isSelected) {
      // Remove the option if it's already selected
      updatedOptions = selectedOptions.filter((o) => o.value !== option.value);
    } else {
      // Add the option if it's not selected
      updatedOptions = [...selectedOptions, option];
    }

    setSelectedOptions(updatedOptions);

    if (onSelect) {
      onSelect(updatedOptions);
    }
  };

  const isSelected = (option) =>
    selectedOptions.some((o) => o.value === option.value);

  return (
    <div className="dropdown-checklist">
      <div className="dropdown-header" onClick={handleToggle}>
        {selectedOptions.length > 0
          ? selectedOptions.map((o) => o.label).join(", ")
          : placeholder}
        <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>▼</span>
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option) => (
            <li key={option.value} className="dropdown-item">
              <label>
                <input
                  type="checkbox"
                  checked={isSelected(option)}
                  onChange={() => handleSelect(option)}
                />
                {option.label}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenuChecklist;