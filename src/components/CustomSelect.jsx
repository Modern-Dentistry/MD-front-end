import React from 'react';
import Select from 'react-select';

/**
 * Tətbiqin bütün hissələrində istifadə ediləcək xüsusiləşdirilmiş Select komponenti
 * 
 * @param {Object} props - Komponent parametrləri
 * @param {Array} props.options - Select üçün seçim variantları [{value: string, label: string}]
 * @param {Function} props.onChange - Seçim dəyişdikdə çağırılacaq funksiya
 * @param {string} props.placeholder - Heç bir seçim edilmədikdə göstəriləcək mətn
 * @param {Object} props.value - Cari seçilmiş dəyər
 * @param {boolean} props.isMulti - Çoxlu seçimə icazə
 * @param {boolean} props.isClearable - Təmizləmə düyməsini göstərmək
 * @param {boolean} props.isSearchable - Axtarış funksionallığını aktivləşdirmək
 * @param {boolean} props.isDisabled - Komponentin deaktiv olma vəziyyəti
 * @param {boolean} props.isLoading - Yüklənmə vəziyyəti
 * @param {string} props.className - Əlavə CSS sinfi
 */
const CustomSelect = ({
  options,
  onChange,
  placeholder,
  value,
  isMulti = false,
  isClearable = true,
  isSearchable = true,
  isDisabled = false,
  isLoading = false,
  className = '',
  ...props
}) => {
  // Select komponenti üçün xüsusi stillər
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? '#1976d2' : '#e0e0e0',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(25, 118, 210, 0.2)' : null,
      '&:hover': {
        borderColor: '#1976d2',
      },
      borderRadius: '6px',
      padding: '2px',
      fontSize: '14px',
      minHeight: '40px',
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '6px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
      zIndex: 3,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? '#e3f2fd' 
        : state.isFocused 
          ? '#f0f7ff' 
          : null,
      color: state.isSelected ? '#1976d2' : '#333',
      fontWeight: state.isSelected ? 500 : 400,
      padding: '10px 12px',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: '#c8e1fb',
      }
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#6b7280',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#333',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#e3f2fd',
      borderRadius: '4px',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#1976d2',
      fontWeight: 500,
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#1976d2',
      '&:hover': {
        backgroundColor: '#c8e1fb',
        color: '#1976d2',
      },
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: '#e0e0e0',
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state.isFocused ? '#1976d2' : '#6b7280',
      '&:hover': {
        color: '#1976d2',
      },
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: '#6b7280',
      '&:hover': {
        color: '#1976d2',
      },
    }),
  };

  return (
    <Select
      options={options}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      isMulti={isMulti}
      isClearable={isClearable}
      isSearchable={isSearchable}
      isDisabled={isDisabled}
      isLoading={isLoading}
      className={`custom-select ${className}`}
      classNamePrefix="select"
      styles={customStyles}
      {...props}
    />
  );
};

export default CustomSelect;