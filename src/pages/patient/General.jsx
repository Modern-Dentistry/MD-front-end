import React from 'react';
import ProfileImage from '../../components/ProfileImage';
import '../../assets/style/form.css';

const General = () => {
  // Mock data - in a real app, this would come from your API/state management
  const patientData = {
    userId: '12345',
    userImage: '',
    username: 'john.doe',
    firstName: 'John',
    lastName: 'Doe',
    fatherName: 'James',
    gender: 'Kişi',
    finCode: '1234567890',
    colorCode: '#FF5733',
    birthDate: '1990-01-01',
    academicDegree: 'Bachelor',
    mobileNumber1: '+994501234567',
    mobileNumber2: '+994502345678',
    mobileNumber3: '+994503456789',
    homePhone: '+994124567890',
    email: 'john.doe@example.com',
    address: 'Baku, Azerbaijan',
    permissions: 'Standard',
    priceCategory: 'Regular',
    specialization: 'General Medicine',
    doctor: 'Dr. Smith',
    isVip: 'Xeyr',
    isBlacklisted: 'Xeyr',
    whatsappNumber: '+994501234567',
    workPhone: '+994124567890',
    homeAddress: '123 Main St, Baku',
    workAddress: '456 Business Ave, Baku',
    referredBy: 'Dr. Johnson',
    facebook: 'john.doe',
    instagram: 'john.doe',
    twitter: 'john.doe'
  };

  return (
    <>
        <div className="input-container">
          <div className='left'>
            <div className="form-group">
              <label htmlFor="username">İstifadəçi adı</label>
              <input
                id="username"
                type="text"
                name="username"
                value={patientData.username}
                readOnly
                className='readonly'
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="firstName">Ad</label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={patientData.firstName}
                readOnly
                className='readonly'
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">Soyad</label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={patientData.lastName}
                readOnly
                className='readonly'
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="fatherName">Ata adı</label>
              <input
                id="fatherName"
                type="text"
                name="fatherName"
                value={patientData.fatherName}
                readOnly
                className='readonly'
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="gender">Cinsiyyət</label>
              <input
                id="gender"
                type="text"
                name="gender"
                value={patientData.gender}
                readOnly
                className='readonly'
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="finCode">FIN kod</label>
              <input
                id="finCode"
                type="text"
                name="finCode"
                value={patientData.finCode}
                readOnly
                className='readonly'
              />
            </div>

            <div className="form-group">
              <label htmlFor="birthDate">Doğum tarixi</label>
              <input
                id="birthDate"
                type="date"
                name="birthDate"
                value={patientData.birthDate}
                readOnly
                className='readonly'
              />
            </div>

            <div className="form-group">
              <label htmlFor="priceCategory">Qiymət kateqoriyası</label>
              <input
                id="priceCategory"
                type="text"
                name="priceCategory"
                value={patientData.priceCategory}
                readOnly
                className='readonly'
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="specialization">İxtisas</label>
              <input
                id="specialization"
                type="text"
                name="specialization"
                value={patientData.specialization}
                readOnly
                className='readonly'
              />
            </div>

            <div className="form-group">
              <label htmlFor="doctor">Həkim</label>
              <input
                id="doctor"
                type="text"
                name="doctor"
                value={patientData.doctor}
                readOnly
                className='readonly'
              />
            </div>


          </div>

          <div className='right'>
          <div className="form-group">
              <label htmlFor="isVip">VIP</label>
              <input
                id="isVip"
                type="text"
                name="isVip"
                value={patientData.isVip}
                readOnly
                className='readonly'
              />
            </div>

            <div className="form-group">
              <label htmlFor="isBlacklisted">Qara siyahı</label>
              <input
                id="isBlacklisted"
                type="text"
                name="isBlacklisted"
                value={patientData.isBlacklisted}
                readOnly
                className='readonly'
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobileNumber1">Mobil nömrə 1</label>
              <input
                id="mobileNumber1"
                type="tel"
                name="mobileNumber1"
                value={patientData.mobileNumber1}
                readOnly
                className='readonly'
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="mobileNumber2">Mobil nömrə 2</label>
              <input
                id="mobileNumber2"
                type="tel"
                name="mobileNumber2"
                value={patientData.mobileNumber2}
                readOnly
                className='readonly'
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="mobileNumber3">Mobil nömrə 3</label>
              <input
                id="mobileNumber3"
                type="tel"
                name="mobileNumber3"
                value={patientData.mobileNumber3}
                readOnly
                className='readonly'
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="whatsappNumber">WhatsApp nömrəsi</label>
              <input
                id="whatsappNumber"
                type="tel"
                name="whatsappNumber"
                value={patientData.whatsappNumber}
                readOnly
                className='readonly'
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="workPhone">İş telefonu</label>
              <input
                id="workPhone"
                type="tel"
                name="workPhone"
                value={patientData.workPhone}
                readOnly
                className='readonly'
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="homePhone">Ev telefonu</label>
              <input
                id="homePhone"
                type="tel"
                name="homePhone"
                value={patientData.homePhone}
                readOnly
                className='readonly'
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">E-poçt ünvanı</label>
              <input
                id="email"
                type="email"
                name="email"
                value={patientData.email}
                readOnly
                className='readonly'
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="homeAddress">Ev ünvanı</label>
              <input
                id="homeAddress"
                type="text"
                name="homeAddress"
                value={patientData.homeAddress}
                readOnly
                className='readonly'
              />
            </div>
          </div>
        </div>
        </>
  );
};

export default General;