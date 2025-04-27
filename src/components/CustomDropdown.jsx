import React, { useState, useRef, useEffect } from "react";
import "../assets/style/custom_dropdown.css";

const CustomDropdown = ({ 
  options = [], 
  value, 
  onChange, 
  onSearchChange,
  placeholder = "Seçin",
  name,
  isMulti = false,
  className = "",
  disabled = false,
  isLoading = false // Add isLoading prop
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
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
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (option) => {
    if (disabled) return; // Prevent selection if disabled
    
    if (isMulti) {
      // Çoxlu seçim halında
      const currentValue = Array.isArray(value) ? value : [];
      const isSelected = currentValue.some(v => v === option.value);
      const newValue = isSelected
        ? currentValue.filter(v => v !== option.value)
        : [...currentValue, option.value];
      
      // Seçilmiş dəyərlər düzgün formatda qaytarılır
      onChange(newValue);
    } else {
      onChange(option);
      setIsOpen(false);
    }
  };

  const getDisplayValue = () => {
    if (!value) return placeholder;
    
    if (isMulti && Array.isArray(value)) {
      // Çoxlu seçim üçün bütün seçilmiş elementlərin adlarını göstəririk
      const selectedOptions = options.filter(opt => value.includes(opt.value));
      return selectedOptions.length > 0 
        ? selectedOptions.map(opt => opt.label).join(", ") 
        : placeholder;
    }
    
    // Tək seçim üçün
    if (typeof value === 'string') {
      const selectedOption = options.find(opt => opt.value === value);
      return selectedOption ? selectedOption.label : placeholder;
    }
    
    const selectedOption = options.find(opt => value === opt || (opt && value && opt.value === value.value));
    return selectedOption ? selectedOption.label : placeholder;
  };

  const isSelected = (option) => {
    if (isMulti) {
      // Çoxlu seçim halında yoxlanış
      return Array.isArray(value) && value.some(v => v === option.value);
    }
    // Tək seçim halında yoxlanış
    return value === option || (value && option && value.value === option.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearchChange(event.target.value);
  };

  const filteredOptions = options.filter(option =>
    option.label && option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`custom-dropdown ${className} ${disabled ? 'disabled' : ''}`} ref={dropdownRef}>
      <div 
        className={`dropdown-header ${isOpen ? 'open' : ''}`} 
        onClick={handleToggle}
      >
        <span className="dropdown-value">
          {isLoading ? 'Loading...' : getDisplayValue()}
        </span>
        {!disabled && (
          <span className="dropdown-arrow">▼</span>
        )}
      </div>
      
      {isOpen && !disabled && (
        <div className="dropdown-menu">
          <div className="dropdown-search">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Axtarış..."
              className="search-input"
              disabled={isLoading}
            />
          </div>
          {isLoading ? (
            <div className="dropdown-loading">Loading...</div>
          ) : (
            filteredOptions.map((option) => (
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
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;