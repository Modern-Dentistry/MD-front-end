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

      // Appointments səhifəsinə qayıt və seçilmiş həkim 
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
    
        <div className="card-buttons">
          <button className="card-button edit-button">Düzəliş et</button>
          <button className="card-button delete-button">Sil</button>
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