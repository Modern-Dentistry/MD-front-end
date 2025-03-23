import React, { useState, useEffect, useRef } from 'react';
import { SketchPicker } from 'react-color';
import { MdColorLens } from 'react-icons/md';
import '../assets/style/user_form.css';
import ProfileImage from './ProfileImage';
import DropdownMenuChecklist from './DropdownChecklist';
import { LuPenLine } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

export default function UserForm({ mode: initialMode, userData = null, onModeChange }) {

  const [mode, setMode] = useState(initialMode);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef(null);

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
        discountSurgery: '',
        discountEndodontics: '',
        discountImplantology: '',
        discountOrthopedics: '',
        discountHygiene: '',
        discountTherapy: '',
        discountPediatricDentistry: '',
        discountPeriodontology: '',
        discountOrthodontics: '',
        discountXray: '',
        discountLaserService: '',
        discountAnesthesiaPhysio: '',
        discountPassive: '',
        discountOther: ''
      });

      useEffect(() => {
        if (userData) {
          setFormData({
            ...formData,
            ...userData,
            ...userData.permissions, // Spread permissions into formData
          });
    }
  }, [userData]);

  const handleEditButton = () => {
    setMode('edit');
  };

  const handleCancelButton = () => {
    if (mode === 'edit') {
      setMode('view');
    } else if (mode === 'create') {
      navigate(-1);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleColorChange = (color) => {
    setFormData({ ...formData, colorCode: color.hex });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle form submission based on mode
    console.log('Form submitted:', formData);
    // Example: call an API function like createUser(formData) or updateUser(formData)
  };

  return (
    <div className="user-form-container">
        <h3 className="form-title">
        {mode === 'create' 
            ? 'İşçi əlavə et'
            : mode === 'edit'
            ? 'İşçi məlumatlarını yenilə'
            : 'İşçi məlumatları'}
        </h3>

      <form className="user-form" onSubmit={handleSubmit}>
         <div className={`${mode === 'view' ? 'profile-buttons' : ''}`}>
         <ProfileImage userId={formData.userId} mode={mode}/>
          {mode === 'view' && (
            <div className="profile-button-group">
              <button type="button" className="color-success" onClick={() => handleEditButton()}>
              <LuPenLine className='color-success' />
                            Redaktə et
              </button>
              
              <button type="button" className="color-danger">
              <FaRegTrashAlt className='color-danger'/>

                Sil
                </button>
              </div>
          )}
         </div>
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
            readOnly={mode === 'view'} 
            className={mode === 'view' ? 'readonly' : ''}
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
            readOnly={mode === 'view'} 
            className={mode === 'view' ? 'readonly' : ''}
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
            readOnly={mode === 'view'} 
            className={mode === 'view' ? 'readonly' : ''}
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
            readOnly={mode === 'view'} 
            className={mode === 'view' ? 'readonly' : ''}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="gender">Cinsiyyət</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            disabled={mode === 'view'}
            className={mode === 'view' ? 'readonly' : ''}
          >
            <option value="">Seçin</option>
            <option value="male">Kişi</option>
            <option value="female">Qadın</option>
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
            readOnly={mode === 'view'} 
            className={mode === 'view' ? 'readonly' : ''}
          />
        </div>

        
        
        <div className="form-group color-selector-group">
      <label htmlFor="colorCode">Rəng kodu</label>
      <input
        id="colorCode"
        type="text"
        name="colorCode"
        value={formData.colorCode}
        readOnly // Disables manual typing
        className={mode === 'view' ? 'readonly' : ''}
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
            readOnly={mode === 'view'} 
            className={mode === 'view' ? 'readonly' : ''}
          />
        </div>
        <div className="form-group">
          <label htmlFor="academicDegree">Elmi dərəcə</label>
          {/* <input
            id="academicDegree"
            type="text"
            name="academicDegree"
            value={formData.academicDegree}
            onChange={handleChange}
            readOnly={mode === 'view'} 
            className={mode === 'view' ? 'readonly' : ''}
          /> */}
                  <DropdownMenuChecklist onSelect={handleChange} />

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
            readOnly={mode === 'view'} 
            className={mode === 'view' ? 'readonly' : ''}
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
            readOnly={mode === 'view'} 
            className={mode === 'view' ? 'readonly' : ''}
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
            readOnly={mode === 'view'} 
            className={mode === 'view' ? 'readonly' : ''}
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
            readOnly={mode === 'view'} 
            className={mode === 'view' ? 'readonly' : ''}
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
            readOnly={mode === 'view'} 
            className={mode === 'view' ? 'readonly' : ''}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="address">Ünvan</label>
          <input
            id="address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            readOnly={mode === 'view'} 
            className={mode === 'view' ? 'readonly' : ''}
          />
        </div>
        <div className="form-group">
  <label>İcazələr</label>
  <div className="permissions-checklist">
    {[
      { label: "TAM İCAZƏ", slug: "permission1" },
      { label: "RESEPSİONİST", slug: "permission2" },
      { label: "TİBB BACISI", slug: "permission3" },
      { label: "DİŞ TEXNİKLƏRİ", slug: "permission4" },
      { label: "MALİYYƏ HESABAT", slug: "permission5" },
      { label: "ANBAR", slug: "permission6" },
      { label: "Həkim tam icazə", slug: "permission7" },
      { label: "Həkim limitli", slug: "permission8" },
    ]
      .filter((permission) => mode !== "view" || formData[permission.slug]) // Show only selected in view mode
      .map((permission) => {
        const isChecked = formData[permission.slug] || false;

        return (
          <label key={permission.slug}>
            <input
              type="checkbox"
              name={permission.slug}
              checked={isChecked}
              disabled={mode === "view"} // Disable input in view mode
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [permission.slug]: e.target.checked,
                })
              }
            />
            {permission.label}
          </label>
        );
      })}
  </div>
</div>
        </div> 
        </div> 

        <div className="single-column-section">
          <div className="discount-fields">
            <div className="form-group">
              <label htmlFor="discountSurgery">Maksimum endirim (Cərrahiyə)</label>
              <input
                id="discountSurgery"
                type="number"
                name="discountSurgery"
                value={formData.discountSurgery}
                onChange={handleChange}
                readOnly={mode === 'view'} 
                className={mode === 'view' ? 'readonly' : ''}
              />
                </div>

                <div className="form-group">
              <label htmlFor="discountImplantology">Maksimum endirim (İmplantalogiya)</label>
              <input
                id="discountImplantology"
                type="number"
                name="discountImplantology"
                value={formData.discountImplantology}
                onChange={handleChange}
                readOnly={mode === 'view'} 
                className={mode === 'view' ? 'readonly' : ''}
              />
            </div>

            <div className="form-group">
              <label htmlFor="discountOrthopedics">Maksimum endirim (Оrtopediya)</label>
              <input
                id="discountOrthopedics"
                type="number"
                name="discountOrthopedics"
                value={formData.discountOrthopedics}
                onChange={handleChange}
                readOnly={mode === 'view'} 
                className={mode === 'view' ? 'readonly' : ''}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="discountHygiene">Maksimum endirim (Gigiyena)</label>
              <input
                id="discountHygiene"
                type="number"
                name="discountHygiene"
                value={formData.discountHygiene}
                onChange={handleChange}
                readOnly={mode === 'view'} 
                className={mode === 'view' ? 'readonly' : ''}
              />
            </div>

            <div className="form-group">
              <label htmlFor="discountTherapy">Maksimum endirim (Terapiya)</label>
              <input
                id="discountTherapy"
                type="number"
                name="discountTherapy"
                value={formData.discountTherapy}
                onChange={handleChange}
                readOnly={mode === 'view'} 
                className={mode === 'view' ? 'readonly' : ''}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="discountPediatricDentistry">Maksimum endirim (Uşaq stamatologiyası)</label>
              <input
                id="discountPediatricDentistry"
                type="number"
                name="discountPediatricDentistry"
                value={formData.discountPediatricDentistry}
                onChange={handleChange}
                readOnly={mode === 'view'} 
                className={mode === 'view' ? 'readonly' : ''}
              />
            </div>

            <div className="form-group">
              <label htmlFor="discountPeriodontology">Maksimum endirim (Paradontologiya)</label>
              <input
                id="discountPeriodontology"
                type="number"
                name="discountPeriodontology"
                value={formData.discountPeriodontology}
                onChange={handleChange}
                readOnly={mode === 'view'} 
                className={mode === 'view' ? 'readonly' : ''}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="discountOrthodontics">Maksimum endirim (Ortodontiya)</label>
              <input
                id="discountOrthodontics"
                type="number"
                name="discountOrthodontics"
                value={formData.discountOrthodontics}
                onChange={handleChange}
                readOnly={mode === 'view'} 
                className={mode === 'view' ? 'readonly' : ''}
              />
            </div>

            <div className="form-group">
              <label htmlFor="discountXray">Maksimum endirim (Rentgen)</label>
              <input
                id="discountXray"
                type="number"
                name="discountXray"
                value={formData.discountXray}
                onChange={handleChange}
                readOnly={mode === 'view'} 
                className={mode === 'view' ? 'readonly' : ''}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="discountLaserService">Maksimum endirim (Lazer xidməti)</label>
              <input
                id="discountLaserService"
                type="number"
                name="discountLaserService"
                value={formData.discountLaserService}
                onChange={handleChange}
                readOnly={mode === 'view'} 
                className={mode === 'view' ? 'readonly' : ''}
              />
            </div>

            <div className="form-group">
              <label htmlFor="discountAnesthesiaPhysio">Maksimum endirim (Anesteziya və Fizioterapiya)</label>
              <input
                id="discountAnesthesiaPhysio"
                type="number"
                name="discountAnesthesiaPhysio"
                value={formData.discountAnesthesiaPhysio}
                onChange={handleChange}
                readOnly={mode === 'view'} 
                className={mode === 'view' ? 'readonly' : ''}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="discountPassive">Maksimum endirim (Passiv)</label>
              <input
                id="discountPassive"
                type="number"
                name="discountPassive"
                value={formData.discountPassive}
                onChange={handleChange}
                readOnly={mode === 'view'} 
                className={mode === 'view' ? 'readonly' : ''}
              />
            </div>

            <div className="form-group">
              <label htmlFor="discountOther">Maksimum endirim (Digər)</label>
              <input
                id="discountOther"
                type="number"
                name="discountOther"
                value={formData.discountOther}
                onChange={handleChange}
                readOnly={mode === 'view'} 
                className={mode === 'view' ? 'readonly' : ''}
              />
            </div>

             </div>
        </div>


        {mode !== 'view' && (
          <div className="form-actions">
            <button type="submit" className="btn-submit">
              {mode === 'create' ? 'Əlavə et' : 'Yenilə'}
            </button>
            <button type="button" className="btn-cancel" onClick={
              () => handleCancelButton()
              }>Ləğv et</button>
          </div>
        )}
      </form>
    </div>
  );
}