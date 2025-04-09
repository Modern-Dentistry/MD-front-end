import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../assets/style/add-new-appointment.css';
import '../assets/style/appointment-left-side.css';
import CustomSelect from "../components/CustomSelect.jsx";
import Modal from "../components/Modal.jsx";

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
const AddNewAppointment = ({ roomOptions, employees, WORK_HOURS, WEEKDAYS_SHORT }) => {
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
      {/* LEFT SİDE  */}
      <div className="left-side">
        <div className="select-options-container">
          <CustomSelect
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
        <div className="form-container">
          <h2>Yeni Randevu</h2>
          <form onSubmit={handleSubmit}>

            {/* Həkim & Pasiyent */}
            <div className='first-row'>
                <div className="form-group">
                  <label className="required-label">Pasiyent</label>
                  <CustomSelect
                    options={TEMP_PATIENTS}
                    onChange={handlePatientChange}
                    placeholder="Pasiyent seçin və ya axtarın"
                    value={selectedPatient}
                    isClearable={true}
                    isSearchable={true}
                    className="patient-select"
                  />
                </div>
                <div className="form-group">
                  <label className="required-label">Həkim</label>
                  <CustomSelect
                    options={doctorOptions}
                    onChange={handleDoctorChange}
                    placeholder="Həkim seçin və ya axtarın"
                    value={selectedDoctor}
                    isClearable={true}
                    isSearchable={true}
                    className="doctor-select"
                  />
                </div>
            </div>

            {/* Əməliyyat & Otaq */}
            <div className='second-row'>
                <div className="form-group">
                  <label className="required-label">Əməliyyat</label>
                  <CustomSelect
                    options={OPERATIONS}
                    onChange={handleOperationsChange}
                    placeholder="Əməliyyat seçin"
                    value={selectedOperations}
                    isMulti={true}
                    isClearable={true}
                    isSearchable={true}
                    className="operation-select"
                  />
                </div>
                <div className="form-group">
                  <label className="required-label">Otaq</label>
                  <CustomSelect
                    options={roomOptions}
                    onChange={handleRoomChange}
                    placeholder="Otaq seçin"
                    value={selectedRoom}
                    isClearable={true}
                    isSearchable={true}
                    className="room-select"
                  />
                </div>
            </div>
            
            {/* Tarix & Saat & Müddət */}
            <div className='third-row'>
              <div className="form-group">
                <label className="required-label">Tarix</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Saat</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Müddət</label>
                <input
                  type="time"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Status & Pasient borcu */}
            <div className='fourth-row'>
              <div className="form-group">
                <label className="required-label">Status</label>
                <CustomSelect
                  options={STATUS_OPTIONS}
                  onChange={handleStatusChange}
                  placeholder="Status seçin"
                  value={selectedStatus}
                  isClearable={true}
                  isSearchable={true}
                  className="status-select"
                />
              </div>
              <div className="form-group">
                <label>Pasient borcu</label>
                <input
                  type="text"
                  name="patientDebt"
                  value={formData.patientDebt}
                  onChange={handleInputChange}
                  readOnly
                  className={formData.patientDebt === 'Borcu yoxdur' ? 'no-debt' : ''}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className='buttons-container'>
              <button type="button" className="cancel-button">
                İmtina et
              </button>
              <button type="submit" className="confirm-button">
                Randevu əlavə et
              </button>
            </div>
          </form>
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

export default AddNewAppointment; 