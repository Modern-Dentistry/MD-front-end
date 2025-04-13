import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../assets/style/randevu-card.css';
import '../assets/style/appointment-left-side.css';
import CustomSelect from "../components/CustomSelect.jsx";
import Modal from "../components/Modal.jsx";
import SidebarMenu from '../components/SidebarMenu.jsx';
import CustomDropdown from '../components/CustomDropdown.jsx';

// Müvəqqəti pasiyent məlumatları
const TEMP_PATIENTS = [
  { value: '1', label: 'Orxan Məmmədov - 502286063', debt: 150 },
  { value: '2', label: 'Əli Hüseynov - 502286064', debt: 0 },
  { value: '3', label: 'Ayşə Əliyeva - 502286065', debt: 75 },
  { value: '4', label: 'Mehriban Qasımova - 502286066', debt: 0 },
  { value: '5', label: 'Rəşad Əhmədov - 502286067', debt: 200 },
  { value: '6', label: 'Zəhra Məmmədova - 502286068', debt: 0 },
];

// Əməliyyatlar siyahısı
const OPERATIONS = [
  { value: '1', label: 'Dişin çəkilməsi' },
  { value: '2', label: 'İmplant əməliyyatı' },
  { value: '3', label: 'İşlərin təhvili' },
  { value: '4', label: 'Kanal müalicəsi' },
  { value: '5', label: 'Kanal yuma' },
  { value: '6', label: 'Korreksiya' },
  { value: '7', label: 'Körpü primerkası' },
  { value: '8', label: 'Müalicə' },
  { value: '9', label: 'Müayinə' },
  { value: '10', label: 'Müvəqqəti kanal doldurma' },
];

// Status seçimləri
const STATUS_OPTIONS = [
  { value: 'appointment', label: 'Randevu' },
  { value: 'arrived', label: 'Gəldi' },
  { value: 'cancelled', label: 'Ləğv edillib' },
];

// Props-ları əlavə edirik
const RandevuCard = ({ roomOptions, employees, WORK_HOURS, WEEKDAYS_SHORT }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedOperations, setSelectedOperations] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    operation: '',
    date: '',
    time: '',
  });
  const [showModal, setShowModal] = useState(false);

  // Seçilmiş tarix və saatı göstərmək üçün useEffect
  useEffect(() => {
    if (location.state?.selectedDateTime) {
      const { date, time } = location.state.selectedDateTime;
      setFormData(prev => ({
        ...prev,
        date,
        time
      }));
    }
  }, [location.state]);

  // Həkim seçimi üçün options yaradırıq
  const doctorOptions = employees.map(doctor => ({
    value: doctor.id,
    label: doctor.name
  }));

  // Sol panel üçün funksiyalar
  const handleRoomChange = (selectedOption) => {
    setSelectedRoom(selectedOption);
    setSelectedDoctorId(null);
    setSelectedDoctor(null);
    setFormData(prev => ({
      ...prev,
      room: selectedOption ? selectedOption.label : ''
    }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDoctorCardClick = (doctorId) => {
    const doctor = employees.find(d => d.id === doctorId);
    setSelectedDoctorId(doctorId);
    setSelectedDoctor({
      value: doctor.id,
      label: doctor.name
    });
    setFormData(prev => ({
      ...prev,
      doctorName: doctor.name
    }));
  };

  const handleDoctorChange = (selectedOption) => {
    setSelectedDoctor(selectedOption);
    setSelectedDoctorId(selectedOption ? selectedOption.value : null);
    setFormData(prev => ({
      ...prev,
      doctorName: selectedOption ? selectedOption.label : ''
    }));
  };

  const filteredDoctors = employees.filter(doctor =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Form funksiyaları
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePatientChange = (selectedOption) => {
    setSelectedPatient(selectedOption);
    setFormData(prev => ({
      ...prev,
      patientName: selectedOption ? selectedOption.label : '',
      patientDebt: selectedOption ? (selectedOption.debt > 0 ? selectedOption.debt : 'Borcu yoxdur') : ''
    }));
  };

  const handleOperationsChange = (selectedOptions) => {
    setSelectedOperations(selectedOptions || []);
    setFormData(prev => ({
      ...prev,
      operation: selectedOptions ? selectedOptions.map(option => option.label).join(', ') : ''
    }));
  };

  const handleStatusChange = (selectedOption) => {
    setSelectedStatus(selectedOption);
    setFormData(prev => ({
      ...prev,
      status: selectedOption ? selectedOption.label : ''
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleConfirmAppointment = () => {
    // Yeni randevu məlumatlarını hazırla
    const newAppointment = {
      id: Date.now(), // Unikal ID əlavə edirik
      doctorId: selectedDoctorId,
      date: formData.date,
      room: selectedRoom?.value,
      patient: {
        name: formData.patientName,
        code: formData.patientPhone
      },
      startTime: formData.time,
      endTime: formData.duration,
      operations: selectedOperations.map(op => op.label).join(', '),
      status: selectedStatus?.label || 'Randevu'
    };

    try {
      // Local storage-a yadda saxla
      const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      const updatedAppointments = [...existingAppointments, newAppointment];
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments));

      // Modal-ı bağla
      setShowModal(false);

      // Appointments səhifəsinə qayıt və seçilmiş həkim ID-sini state kimi göndər
      setTimeout(() => {
        navigate('/appointments', { 
          state: { selectedDoctorId },
          replace: true
        });
      }, 0);
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  };

  return (
    <div className="appointments-container">
      <SidebarMenu />
      {/* LEFT SİDE  */}
      <div className="left-side">
        <div className="select-options-container">
          <CustomDropdown
            options={roomOptions}
            onChange={handleRoomChange}
            placeholder="Otaq seç"
            value={selectedRoom}
            isClearable={true}
            isSearchable={true}
            className="room-select"
          />
        </div>

        {/* search input  */}
        <input
          type="text"
          className="search-input"
          placeholder="Həkim axtar..."
          value={searchQuery}
          onChange={handleSearchChange}
        />

        {/* Doctors Components (DrCard)  */}
        <div className="doctors-container">
          {filteredDoctors.map(doctor => (
            <div 
              key={doctor.id} 
              className={`doctor-card ${selectedDoctorId === doctor.id ? 'selected' : ''}`}
              onClick={() => handleDoctorCardClick(doctor.id)}
            >
              <div className="doctor-image-container">
                <img 
                  src="/images/doctor-placeholder.png" 
                  alt={doctor.name} 
                  className="doctor-image" 
                />
              </div>
              <div className="doctor-info">
                <h3 className="doctor-name">{doctor.name}</h3>
                <p className="doctor-position">{doctor.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

        {/* RIGHT SİDE  */}
    <div className="right-side">
      <div className="card-buttons">
          <button>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 18.3333H19.25" stroke="#155EEF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15.0104 3.32017C15.3753 2.95525 15.8703 2.75024 16.3863 2.75024C16.9024 2.75024 17.3973 2.95525 17.7623 3.32017C18.1272 3.68508 18.3322 4.18002 18.3322 4.69608C18.3322 5.21215 18.1272 5.70709 17.7623 6.072L6.75308 17.0821C6.53501 17.3002 6.26544 17.4597 5.96933 17.5459L3.33667 18.3141C3.25779 18.3371 3.17418 18.3385 3.09458 18.3181C3.01499 18.2977 2.94234 18.2563 2.88424 18.1982C2.82614 18.1401 2.78473 18.0674 2.76434 17.9878C2.74395 17.9082 2.74533 17.8246 2.76833 17.7458L3.5365 15.1131C3.62287 14.8173 3.78239 14.5481 4.00033 14.3303L15.0104 3.32017Z" stroke="#155EEF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6H21" stroke="#FD4A3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19 6V20C19 21 18 22 17 22H7C6 22 5 21 5 20V6" stroke="#FD4A3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 6V4C8 3 9 2 10 2H14C15 2 16 3 16 4V6" stroke="#FD4A3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 11V17" stroke="#FD4A3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 11V17" stroke="#FD4A3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 10H18" stroke="#155EEF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 14H18" stroke="#155EEF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5 15.9956C5.29136 15.1186 5.83265 14.3589 6.54914 13.8216C7.26563 13.2842 8.12199 12.9956 9 12.9956C9.87801 12.9956 10.7344 13.2842 11.4509 13.8216C12.1673 14.3589 12.7086 15.1186 13 15.9956" stroke="#155EEF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 12C10.1046 12 11 11.1046 11 10C11 8.89543 10.1046 8 9 8C7.89543 8 7 8.89543 7 10C7 11.1046 7.89543 12 9 12Z" stroke="#155EEF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20 3H4C2.89543 3 2 4.15127 2 5.57143V18.4286C2 19.8487 2.89543 21 4 21H20C21.1046 21 22 19.8487 22 18.4286V5.57143C22 4.15127 21.1046 3 20 3Z" stroke="#155EEF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
      </div>
      <div className="appointment-card">
        <h2>Randevu Məlumatları</h2>
        
        <div className="appointment-field">
          <label>Pasiyent:</label>
          <div className={`field-value ${!formData.patientName ? 'empty' : ''}`}>
            {formData.patientName || 'Seçilməyib'}
          </div>
        </div>
        
        <div className="appointment-field">
          <label>Həkim:</label>
          <div className={`field-value ${!formData.doctorName ? 'empty' : ''}`}>
            {formData.doctorName || 'Seçilməyib'}
          </div>
        </div>
        
        <div className="appointment-field">
          <label>Əməliyyat:</label>
          <div className={`field-value ${!formData.operation ? 'empty' : ''}`}>
            {formData.operation || 'Seçilməyib'}
          </div>
        </div>
        
        <div className="appointment-field">
          <label>Otaq:</label>
          <div className={`field-value ${!formData.room ? 'empty' : ''}`}>
            {formData.room || 'Seçilməyib'}
          </div>
        </div>
        
        <div className="appointment-field">
          <label>Tarix:</label>
          <div className={`field-value ${!formData.date ? 'empty' : ''}`}>
            {formData.date || 'Seçilməyib'}
          </div>
        </div>
        
        <div className="appointment-field">
          <label>Saat:</label>
          <div className={`field-value ${!formData.time ? 'empty' : ''}`}>
            {formData.time || 'Seçilməyib'}
          </div>
        </div>
        
        <div className="appointment-field">
          <label>Müddət:</label>
          <div className={`field-value ${!formData.duration ? 'empty' : ''}`}>
            {formData.duration || 'Seçilməyib'}
          </div>
        </div>
        
        <div className="appointment-field">
          <label>Status:</label>
          <div className={`field-value ${!formData.status ? 'empty' : ''}`}>
            {formData.status ? (
              <span className={`status-indicator ${
                formData.status === 'Randevu' ? 'status-appointment' : 
                formData.status === 'Gəldi' ? 'status-arrived' : 
                formData.status === 'Ləğv edillib' ? 'status-cancelled' : ''
              }`}>
                {formData.status}
              </span>
            ) : 'Seçilməyib'}
          </div>
        </div>
        
        <div className="appointment-field">
          <label>Borc:</label>
          <div className={`field-value ${formData.patientDebt === 'Borcu yoxdur' ? 'no-debt' : formData.patientDebt ? 'has-debt' : 'empty'}`}>
            {formData.patientDebt || 'Məlumat yoxdur'}
          </div>
        </div>
    
        
      </div>
    </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Əminsinizmi?"
        message="Randevu əlavə ediləcək!"
        onConfirm={handleConfirmAppointment}
      />
    </div>
  );
};

export default RandevuCard;