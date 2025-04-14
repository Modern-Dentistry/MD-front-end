import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SketchPicker } from 'react-color';
import { MdColorLens } from 'react-icons/md';
import '../assets/style/form.css';
import ProfileImage from './ProfileImage';
import CustomDropdown from './CustomDropdown';
import { LuPenLine } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { usePriceCategories } from '../hooks/usePriceCategories';

const schema = yup.object().shape({
  name: yup.string().required('Ad tələb olunur'),
  surname: yup.string().required('Soyad tələb olunur'),
  patronymic: yup.string().required('Ata adı tələb olunur'),
  finCode: yup.string()
    .nullable()
    .matches(/^[A-Z0-9]{7}$/, 'FIN kod 7 simvoldan ibarət olmalıdır')
    .transform((value) => (value === '' ? null : value)),
  genderStatus: yup.string().required('Cinsiyyət tələb olunur'),
  dateOfBirth: yup.date()
    .max(new Date(), 'Doğum tarixi gələcək tarix ola bilməz'),
  priceCategoryStatus: yup.string().required('Qiymət kateqoriyası tələb olunur'),
  specializationStatus: yup.string(),
  doctor_id: yup.string(),
  phone: yup.string()
    .required('Mobil nömrə tələb olunur')
    .matches(/^(\+994|0)?(50|51|55|70|77|99)\d{7}$/, 'Düzgün mobil nömrə daxil edin'),
  workPhone: yup.string()
    .nullable()
    .transform((value) => (value === '' ? null : value))
    .matches(/^(\+994|0)?(50|51|55|70|77|99)\d{7}$/, 'Düzgün mobil nömrə daxil edin'),
  homePhone: yup.string()
    .nullable()
    .transform((value) => (value === '' ? null : value))
    .matches(/^(\+994|0)?(50|51|55|70|77|99)\d{7}$/, 'Düzgün mobil nömrə daxil edin'),

  homeAddress: yup.string(),
  workAddress: yup.string(),
  email: yup.string()
    .email('Düzgün e-poçt ünvanı daxil edin'),
  // Preserving existing fields
  username: yup.string(),
  colorCode: yup.string(),
  academicDegree: yup.string(),
  permissions: yup.string(),
  isVip: yup.boolean(),
  isBlacklisted: yup.boolean(),
  referredBy: yup.string(),
  facebook: yup.string().url('Düzgün Facebook linki daxil edin').nullable(),
  instagram: yup.string().url('Düzgün Instagram linki daxil edin').nullable(),
  twitter: yup.string().url('Düzgün Twitter linki daxil edin').nullable()
});

export default function PatientForm({ initialData, onSubmit, onCancel, mode = "create" }) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef(null);
  const navigate = useNavigate();
  const { data: priceCategories } = usePriceCategories();
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      surname: '',
      patronymic: '',
      finCode: '',
      genderStatus: '',
      dateOfBirth: '',
      priceCategoryStatus: '',
      specializationStatus: '',
      doctor_id: '',
      phone: '',
      workPhone: '',
      homePhone: '',
      homeAddress: '',
      workAddress: '',
      email: '',
      // Preserving existing fields
      userId: '',
      userImage: '',
      username: '',
      colorCode: '',
      academicDegree: '',
      mobileNumber1: '',
      mobileNumber2: '',
      mobileNumber3: '',
      whatsappNumber: '',
      permissions: '',
      isVip: false,
      isBlacklisted: false,
      referredBy: '',
      facebook: '',
      instagram: '',
      twitter: ''
    }
  });

  // Initialize form data when initialData prop changes
  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [initialData, setValue]);

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

  const handleColorChange = (color) => {
    setValue('colorCode', color.hex);
  };

  const onSubmitForm = (data) => {
    if (onSubmit) {
      onSubmit(data);
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
      <form className="form" onSubmit={handleSubmit(onSubmitForm)}>
        <div className="input-container">
          <div className='left'>
            <div className="form-group">
              <label htmlFor="name">Ad <span className="text-red-500">*</span></label>
              <input
                id="name"
                type="text"
                {...register('name')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="surname">Soyad <span className="text-red-500">*</span></label>
              <input
                id="surname"
                type="text"
                {...register('surname')}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="patronymic">Ata adı <span className="text-red-500">*</span></label>
              <input
                id="patronymic"
                type="text"
                {...register('patronymic')}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="genderStatus">Cinsiyyət <span className="text-red-500">*</span></label>
              <select
                id="genderStatus"
                {...register('genderStatus')}
              >
                <option value="">Seçin</option>
                <option value="MAN">Kişi</option>
                <option value="WOMAN">Qadın</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="finCode">FIN kod</label>
              <input
                id="finCode"
                type="text"
                {...register('finCode')}
              />
            </div>

            <div className="form-group color-selector-group">
              <label htmlFor="colorCode">Rəng kodu</label>
              <input
                id="colorCode"
                type="text"
                {...register('colorCode')}
                readOnly
              />
              <span className="color-icon" onClick={() => setShowColorPicker(!showColorPicker)}>
                <MdColorLens />
              </span>
              <span
                className="color-swatch"
                style={{ backgroundColor: watch('colorCode') }}
              ></span>

              {showColorPicker && (
                <div ref={colorPickerRef} className="color-picker-dropdown">
                  <SketchPicker
                    disableAlpha={true}
                    color={watch('colorCode')}
                    onChangeComplete={handleColorChange}
                  />  
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="dateOfBirth">Doğum tarixi</label>
              <input
                id="dateOfBirth"
                type="date"
                {...register('dateOfBirth')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="priceCategoryStatus">Qiymət kateqoriyası <span className="text-red-500">*</span></label>
              <CustomDropdown
                name="priceCategoryStatus"
                value={watch('priceCategoryStatus')}
                onChange={(option) => setValue('priceCategoryStatus', option.value)}
                placeholder="Qiymet kategoriyasini seçin"
                options={priceCategories?.map(category => ({
                  value: category.name,
                  label: category.name
                }))}
              />   
            </div>
            
            <div className="form-group">
              <label htmlFor="specializationStatus">İxtisas</label>
              <input
                id="specializationStatus"
                type="text"
                {...register('specializationStatus')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="doctor_id">Həkim</label>
              <input
                id="doctor_id"
                type="text"
                {...register('doctor_id')}
              />
            </div>

            <div className="form-group permissions-checklist">
              <label>
                <input
                  type="checkbox"
                  {...register('isVip')}
                />
                VIP
              </label>
            </div>

            <div className="form-group permissions-checklist">
              <label>
                <input
                  type="checkbox"
                  {...register('isBlacklisted')}
                />
                Qara siyahı
              </label>
            </div>
          </div>     

          <div className='right'>
            <div className="form-group">
              <label htmlFor="phone">Mobil nömrə <span className="text-red-500">*</span></label>
              <input
                id="phone"
                type="tel"
                {...register('phone')}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="workPhone">İş telefonu</label>
              <input
                id="workPhone"
                type="tel"
                {...register('workPhone')}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="homePhone">Ev telefonu</label>
              <input
                id="homePhone"
                type="tel"
                {...register('homePhone')}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="whatsappNumber">WhatsApp nömrəsi</label>
              <input
                id="whatsappNumber"
                type="tel"
                {...register('whatsappNumber')}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">E-poçt ünvanı</label>
              <input
                id="email"
                type="email"
                  {...register('email')}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="homeAddress">Ev ünvanı</label>
              <input
                id="homeAddress"
                type="text"
                {...register('homeAddress')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="workAddress">İş ünvanı</label>
              <input
                id="workAddress"
                type="text"
                {...register('workAddress')}
              />
            </div>
          </div> 
        </div> 
        {Object.keys(errors).length > 0 && (
    <div className="error-summary">
      <ul>
        {Object.values(errors).map((error, index) => (
          <li key={index} className="text-red-500 text-xs error-message">{error.message}</li>
        ))}
      </ul>
    </div>
  )}
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