import React, { useState, useRef, useEffect } from "react";
import "../assets/style/custom_dropdown.css";

const CustomDropdown = ({ 
  options = [], 
  value, 
  onChange, 
  placeholder = "Seçin",
  name,
  isMulti = false,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    if (isMulti) {
      const currentValue = value || [];
      const isSelected = currentValue.includes(option.value);
      const newValue = isSelected
        ? currentValue.filter(v => v !== option.value)
        : [...currentValue, option.value];
      onChange({ target: { name, value: newValue } });
    } else {
      onChange({ target: { name, value: option.value } });
      setIsOpen(false);
    }
  };

  const getDisplayValue = () => {
    if (!value) return placeholder;
    if (isMulti) {
      const selectedOptions = options.filter(opt => value.includes(opt.value));
      return selectedOptions.map(opt => opt.label).join(", ");
    }
    const selectedOption = options.find(opt => opt.value === value);
    return selectedOption ? selectedOption.label : placeholder;
  };

  const isSelected = (option) => {
    if (isMulti) {
      return value && value.includes(option.value);
    }
    return value === option.value;
  };

  return (
    <div className={`custom-dropdown ${className}`} ref={dropdownRef}>
      <div 
        className={`dropdown-header ${isOpen ? 'open' : ''}`} 
        onClick={handleToggle}
      >
        <span className="dropdown-value">{getDisplayValue()}</span>
        <span className="dropdown-arrow">▼</span>
      </div>
      
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <div
              key={option.value}
              className={`dropdown-item ${isSelected(option) ? 'selected' : ''}`}
              onClick={() => handleSelect(option)}
            >
              {isMulti && (
                <input
                  type="checkbox"
                  checked={isSelected(option)}
                  onChange={() => {}}
                  className="checkbox-input"
                />
              )}
              <span className="item-label">{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown; 