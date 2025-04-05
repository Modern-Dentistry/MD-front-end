import React, { useState, useEffect, useRef } from 'react';
import { SketchPicker } from 'react-color';
import { MdColorLens } from 'react-icons/md';
import '../assets/style/form.css';
import ProfileImage from './ProfileImage';
import CustomDropdown from './CustomDropdown';
import { LuPenLine } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function PatientForm({ initialData, onSubmit, onCancel, mode = "create" }) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: '',
    userImage: '',
    username: '',
    firstName: '',
    lastName: '',
    fatherName: '',
    gender: '',
    finCode: '',
    colorCode: '',
    birthDate: '',
    academicDegree: '',
    mobileNumber1: '',
    mobileNumber2: '',
    mobileNumber3: '',
    homePhone: '',
    email: '',
    address: '',
    permissions: '',
    priceCategory: '',
    specialization: '',
    doctor: '',
    isVip: false,
    isBlacklisted: false,
    whatsappNumber: '',
    workPhone: '',
    homeAddress: '',
    workAddress: '',
    referredBy: '',
    facebook: '',
    instagram: '',
    twitter: ''
  });

  // Initialize form data when initialData prop changes
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // Close picker on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setShowColorPicker(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleColorChange = (color) => {
    setFormData({ ...formData, colorCode: color.hex });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const handleCancelButton = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-container">
          <div className='left'>
            <div className="form-group">
              <label htmlFor="username">İstifadəçi adı</label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="firstName">Ad</label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">Soyad</label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="fatherName">Ata adı</label>
              <input
                id="fatherName"
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="gender">Cinsiyyət</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Seçin</option>
                <option value="Kişi">Kişi</option>
                <option value="Qadın">Qadın</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="finCode">FIN kod</label>
              <input
                id="finCode"
                type="text"
                name="finCode"
                value={formData.finCode}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group color-selector-group">
              <label htmlFor="colorCode">Rəng kodu</label>
              <input
                id="colorCode"
                type="text"
                name="colorCode"
                value={formData.colorCode}
                readOnly
              />
              <span className="color-icon" onClick={() => setShowColorPicker(!showColorPicker)}>
                <MdColorLens />
              </span>
              <span
                className="color-swatch"
                style={{ backgroundColor: formData.colorCode }}
              ></span>

              {showColorPicker && (
                <div ref={colorPickerRef} className="color-picker-dropdown">
                  <SketchPicker
                    disableAlpha={true}
                    color={formData.colorCode}
                    onChangeComplete={handleColorChange}
                  />  
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="birthDate">Doğum tarixi</label>
              <input
                id="birthDate"
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="priceCategory">Qiymət kateqoriyası</label>
              <CustomDropdown
                name="priceCategory"
                value={formData.priceCategory}
                onChange={handleChange}
                placeholder="Qiymet kategoriyasini seçin"
                options={[
                  { value: 'Regular', label: 'Regular' },
                  { value: 'Premium', label: 'Premium' },
                  { value: 'VIP', label: 'VIP' }  
                ]}
              />   
            </div>
            
            <div className="form-group">
              <label htmlFor="specialization">İxtisas</label>
              <CustomDropdown
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                placeholder="İxtisas seçin"
                options={[
                  { value: 'General Medicine', label: 'General Medicine' },
                  { value: 'Orthodontics', label: 'Orthodontics' },
                  { value: 'Periodontics', label: 'Periodontics' },
                  { value: 'Endodontics', label: 'Endodontics' },
                  { value: 'Surgery', label: 'Surgery' },
                  { value: 'Pediatric', label: 'Pediatric' }
                ]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="doctor">Həkim</label>
              <CustomDropdown
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                placeholder="Həkim seçin"
                options={[
                  { value: 'Dr. Smith', label: 'Dr. Smith' },
                  { value: 'Dr. Johnson', label: 'Dr. Johnson' },
                  { value: 'Dr. Williams', label: 'Dr. Williams' }
                ]}
              />
            </div>

            <div className="form-group permissions-checklist">
              <label>
                <input
                  type="checkbox"
                  name="isVip"
                  checked={formData.isVip}
                  onChange={handleChange}
                />
                VIP
              </label>
            </div>

            <div className="form-group permissions-checklist">
              <label>
                <input
                  type="checkbox"
                  name="isBlacklisted"
                  checked={formData.isBlacklisted}
                  onChange={handleChange}
                />
                Qara siyahı
              </label>
            </div>
          </div>     

          <div className='right'>
            <div className="form-group">
              <label htmlFor="mobileNumber1">Mobil nömrə 1</label>
              <input
                id="mobileNumber1"
                type="tel"
                name="mobileNumber1"
                value={formData.mobileNumber1}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="mobileNumber2">Mobil nömrə 2</label>
              <input
                id="mobileNumber2"
                type="tel"
                name="mobileNumber2"
                value={formData.mobileNumber2}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="mobileNumber3">Mobil nömrə 3</label>
              <input
                id="mobileNumber3"
                type="tel"
                name="mobileNumber3"
                value={formData.mobileNumber3}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="whatsappNumber">WhatsApp nömrəsi</label>
              <input
                id="whatsappNumber"
                type="tel"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="workPhone">İş telefonu</label>
              <input
                id="workPhone"
                type="tel"
                name="workPhone"
                value={formData.workPhone}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="homePhone">Ev telefonu</label>
              <input
                id="homePhone"
                type="tel"
                name="homePhone"
                value={formData.homePhone}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">E-poçt ünvanı</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="homeAddress">Ev ünvanı</label>
              <input
                id="homeAddress"
                type="text"
                name="homeAddress"
                value={formData.homeAddress}
                onChange={handleChange}
              />
            </div>
          </div> 
        </div> 

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            {mode === "create" ? "Yarat" : "Yadda Saxla"}
          </button>
          <button type="button" className="btn-cancel" onClick={handleCancelButton}>
            Ləğv et
          </button>
        </div>
      </form>
    </div>
  );
}