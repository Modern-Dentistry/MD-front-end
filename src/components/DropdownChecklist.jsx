import React, { useState, useRef, useEffect } from "react";
import "../assets/style/dropdown_checklist.css"; // Add styles for the dropdown menu

const DropdownMenuChecklist = ({ onSelect, placeholder, options = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const dropdownRef = useRef(null);

  // Add useEffect to handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Add event listener when dropdown is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

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
    <div className="dropdown-checklist" ref={dropdownRef}>
      <div className="checklist-header" onClick={handleToggle}>
        {selectedOptions.length > 0
          ? selectedOptions.map((o) => (
              <span key={o.value} className="selected-item">
                {o.label}
                <span 
                  className="remove-item" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(o);
                  }}
                >
                  <span>X</span>
                </span>
              </span>
            ))
          : placeholder}
        <span className={`checklist-arrow ${isOpen ? "open" : ""}`}>▼</span>
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option) => (
            <li key={option.value} className="dropdown-item-multi">
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