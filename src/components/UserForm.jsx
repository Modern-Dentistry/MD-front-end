import React, { useState, useEffect, useRef } from 'react';
import { SketchPicker } from 'react-color';
import { MdColorLens } from 'react-icons/md';
import '../assets/style/form.css';
import ProfileImage from './ProfileImage';
import DropdownMenuChecklist from './DropdownChecklist';
import { LuPenLine } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
export default function UserForm({ mode: initialMode, userData = null, onModeChange, onSubmit }) {
  const [mode, setMode] = useState(initialMode);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef(null);
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    username: yup.string().required('İstifadəçi adı tələb olunur'),
    password: mode === 'create' ? yup.string().min(6, 'Şifrə minimum 6 simvol olmalıdır').required('Şifrə tələb olunur') : yup.string(),
    name: yup.string().required('Ad tələb olunur'),
    surname: yup.string().required('Soyad tələb olunur'),
    patronymic: yup.string(),
    finCode: yup.string().length(7, 'FIN kod 7 simvol olmalıdır').required('FIN kod tələb olunur'),
    genderStatus: yup.string().required('Cinsiyyət seçilməlidir'),
    dateOfBirth: yup.date().max(new Date(), 'Doğum tarixi bu gündən sonra ola bilməz'),
    phone: yup.string().matches(/^[0-9+\s-()]+$/, 'Düzgün telefon nömrəsi daxil edin').required('Telefon nömrəsi tələb olunur'),
    email: yup.string().email('Düzgün e-poçt ünvanı daxil edin'),
    experience: yup.number().min(0, 'Təcrübə mənfi ola bilməz').typeError('Təcrübə rəqəm olmalıdır'),
    authorities: mode !== 'view' ? yup.array().min(1, 'Ən azı bir icazə seçilməlidir') : yup.array()
  });

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
    defaultValues: {
      username: '',
      password: '',
      name: '',
      surname: '',
      patronymic: '',
      finCode: '',
      colorCode: '#ffffff',
      genderStatus: '',
      dateOfBirth: '',
      degree: '',
      phone: '',
      phone2: '',
      homePhone: '',
      email: '',
      address: '',
      workAddress: '',
      experience: 0,
      authorities: []
    }
  });

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

  useEffect(() => {
    if (userData) {
      Object.entries(userData).forEach(([key, value]) => {
        setValue(key, value);
      });
      if (userData.authorities) {
        Object.entries(userData.authorities).forEach(([key, value]) => {
          setValue(key, value);
        });
      }
    }
  }, [userData, setValue]);

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

  const handleColorChange = (color) => {
    setValue('colorCode', color.hex);
  };


  return (
    <div className="form-container">
      <h3 className="form-title">
        {mode === 'create'
          ? 'İşçi əlavə et'
          : mode === 'edit'
            ? 'İşçi məlumatlarını yenilə'
            : 'İşçi məlumatları'}
      </h3>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className={`${mode === 'view' ? 'profile-buttons' : ''}`}>
          <ProfileImage userId={watch('username')} mode={mode} />
          {mode === 'view' && (
            <div className="profile-button-group">
              <button type="button" className="color-success" onClick={handleEditButton}>
                <LuPenLine className='color-success' />
                Redaktə et
              </button>
              <button type="button" className="color-danger">
                <FaRegTrashAlt className='color-danger' />
                Sil
              </button>
            </div>
          )}
        </div>
        <div className="input-container">
          <div className='left'>
            <div className="form-group">
              <label htmlFor="username">İstifadəçi adı <span className="text-red-500">*</span></label>
              <input
                id="username"
                type="text"
                {...register('username')}
                readOnly={mode === 'view'}
                className={`${mode === 'view' ? 'readonly' : ''} ${errors.username ? 'error' : ''}`}
              />
            </div>

            {mode === 'create' && (
              <div className="form-group">
                <label htmlFor="password">Şifrə <span className="text-red-500">*</span></label>
                <input
                  id="password"
                  type="password"
                  {...register('password')}
                  readOnly={mode === 'view'}
                  className={mode === 'view' ? 'readonly' : ''}
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name">Ad <span className="text-red-500">*</span></label>
              <input
                id="name"
                type="text"
                {...register('name')}
                readOnly={mode === 'view'}
                className={mode === 'view' ? 'readonly' : ''}
              />
            </div>

            <div className="form-group">
              <label htmlFor="surname">Soyad <span className="text-red-500">*</span></label>
              <input
                id="surname"
                type="text"
                {...register('surname')}
                readOnly={mode === 'view'}
                className={mode === 'view' ? 'readonly' : ''}
              />
            </div>

            <div className="form-group">
              <label htmlFor="patronymic">Ata adı</label>
              <input
                id="patronymic"
                type="text"
                {...register('patronymic')}
                readOnly={mode === 'view'}
                className={mode === 'view' ? 'readonly' : ''}
              />
            </div>

            <div className="form-group">
              <label htmlFor="genderStatus">Cinsiyyət <span className="text-red-500">*</span></label>
              <select
                id="genderStatus"
                {...register('genderStatus')}
                disabled={mode === 'view'}
                className={mode === 'view' ? 'readonly' : ''}
              >
                <option value="">Seçin</option>
                <option value="MAN">Kişi</option>
                <option value="WOMAN">Qadın</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="finCode">FIN kod <span className="text-red-500">*</span></label>
              <input
                id="finCode"
                type="text"
                {...register('finCode')}
                readOnly={mode === 'view'}
                className={mode === 'view' ? 'readonly' : ''}
              />
            </div>

            <div className="form-group color-selector-group">
              <label htmlFor="colorCode">Rəng kodu</label>
              <input
                id="colorCode"
                type="text"
                {...register('colorCode')}
                readOnly
                className={mode === 'view' ? 'readonly' : ''}
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
                readOnly={mode === 'view'}
                className={mode === 'view' ? 'readonly' : ''}
              />
            </div>

            <div className="form-group">
              <label htmlFor="degree">Elmi dərəcə</label>
              <input
                id="degree"
                type="text"
                {...register('degree')}
                readOnly={mode === 'view'}
                className={mode === 'view' ? 'readonly' : ''}
              />
            </div>
          </div>

          <div className='right'>
            <div className="form-group">
              <label htmlFor="phone">Mobil nömrə 1 <span className="text-red-500">*</span></label>
              <input
                id="phone"
                type="tel"
                {...register('phone')}
                readOnly={mode === 'view'}
                className={mode === 'view' ? 'readonly' : ''}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone2">Mobil nömrə 2</label>
              <input
                id="phone2"
                type="tel"
                {...register('phone2')}
                readOnly={mode === 'view'}
                className={mode === 'view' ? 'readonly' : ''}
              />
            </div>

            <div className="form-group">
              <label htmlFor="homePhone">Ev telefonu</label>
              <input
                id="homePhone"
                type="tel"
                {...register('homePhone')}
                readOnly={mode === 'view'}
                className={mode === 'view' ? 'readonly' : ''}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">E-poçt ünvanı</label>
              <input
                id="email"
                type="email"
                {...register('email')}
                readOnly={mode === 'view'}
                className={mode === 'view' ? 'readonly' : ''}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Ünvan</label>
              <input
                id="address"
                type="text"
                {...register('address')}
                readOnly={mode === 'view'}
                className={mode === 'view' ? 'readonly' : ''}
              />
            </div>

            <div className="form-group">
              <label htmlFor="workAddress">İş ünvanı</label>
              <input
                id="workAddress"
                type="text"
                {...register('workAddress')}
                readOnly={mode === 'view'}
                className={mode === 'view' ? 'readonly' : ''}
              />
            </div>

            <div className="form-group">
              <label htmlFor="experience">Təcrübə (il)</label>
              <input
                id="experience"
                type="number"
                {...register('experience')}
                readOnly={mode === 'view'}
                className={mode === 'view' ? 'readonly' : ''}
              />
            </div>

            <div className="form-group">
              <label>İcazələr <span className="text-red-500">*</span></label>
              <div className="permissions-checklist">
                {[
                  { label: "ADMIN", value: "ADMIN" },
                  { label: "USER", value: "USER" },
                  { label: "DOCTOR", value: "DOCTOR" },
                  { label: "NURSE", value: "NURSE" },
                  { label: "RECEPTIONIST", value: "RECEPTIONIST" }
                ].map((permission) => (
                  <label key={permission.value}>
                    <input
                      type="checkbox"
                      value={permission.value}
                      {...register('authorities')}
                      disabled={mode === "view"}
                    />
                    {permission.label}
                  </label>
                ))}
              </div>
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
        {mode !== 'view' && (
          <div className="form-actions">
            <button type="submit" className="btn-submit">
              {mode === 'create' ? 'Əlavə et' : 'Yenilə'}
            </button>
            <button type="button" className="btn-cancel" onClick={handleCancelButton}>
              Ləğv et
            </button>
          </div>
        )}
      </form>
    </div>
  );
}