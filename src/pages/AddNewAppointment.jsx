import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../assets/style/add-new-appointment.css';
import '../assets/style/appointment-left-side.css';
import CustomSelect from "../components/CustomSelect.jsx";
import Modal from "../components/Modal.jsx";
import SidebarMenu from '../components/SidebarMenu.jsx';
import CustomDropdown from '../components/CustomDropdown.jsx';
import DropdownChecklist from '../components/DropdownChecklist.jsx';
import { usePatients } from '../hooks/usePatients.js';
import { useDoctors } from '../hooks/useDoctors.js';
import { useCreateAppointment } from '../hooks/useCalendar.js';// Müvəqqəti pasiyent məlumatları
import BlurLoader from '../components/layout/BlurLoader.jsx';
import { toast } from 'react-toastify';
import { useRooms } from '../hooks/useRooms.js';


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
  { value: 'MEETING', label: 'MEETING' }
];

// Props-ları əlavə edirik
const AddNewAppointment = ({ employees, WORK_HOURS, WEEKDAYS_SHORT }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [doctorSearchQuery, setDoctorSearchQuery] = useState("");
  const [patientSearchQuery, setPatientSearchQuery] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedOperations, setSelectedOperations] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    time: {
      hour: 0,
      minute: 0,
      second: 0,
      nano: 0
    },
    period: {
      hour: 0,
      minute: 0,
      second: 0,
      nano: 0
    }
  });
  const [showModal, setShowModal] = useState(false);

  const { data: patients, isLoading: patientsLoading } = usePatients(patientSearchQuery ? { fullName: patientSearchQuery } : null);
  const { data: doctors } = useDoctors();
  const { data: rooms } = useRooms();
  const { mutate: createAppointment, isPending } = useCreateAppointment();

  // Transform room data into select options format
  const roomOptions = useMemo(() => {
    if (!rooms) return [];
    return rooms.map(room => ({
      value: room.room,
      label: room.room
    }));
  }, [rooms]);

  // Transform patient data into select options format
  const patientOptions = useMemo(() => {
    if (!patients) return [];
    return patients.map(patient => ({
      value: patient.id.toString(),
      label: `${patient.name} ${patient.surname} - ${patient.phone}`,
      debt: 0 // You can add actual debt calculation here if needed
    }));
  }, [patients]);

  // Transform doctor data into select options format
  const doctorOptions = useMemo(() => {
    if (!doctors) return [];
    return doctors.map(doctor => ({
      value: doctor.doctorId,
      label: `${doctor.name} ${doctor.surname}`
    }));
  }, [doctors]);

  // Seçilmiş tarix və saatı göstərmək üçün useEffect
  useEffect(() => {
    if (location.state?.selectedDateTime) {
      const { date, time } = location.state.selectedDateTime;
      setFormData(prev => ({
        ...prev,
        date,
        time: {
          hour: time.hour,
          minute: time.minute,
          second: time.second,
          nano: time.nano
        }
      }));
    }
  }, [location.state]);

  // Otaq seçimi funksiyası - dəyişdirilmiş versiya
  const handleRoomChange = (selectedOption) => {
    setSelectedRoom(selectedOption);
    // setSelectedDoctorId(null);
    // setSelectedDoctor(null);
    setFormData(prev => ({
      ...prev,
      room: selectedOption ? selectedOption.label : ''
    }));
  };

  const handleDoctorSearchChange = (e) => {
    setDoctorSearchQuery(e.target.value);
  };

  const handlePatientSearchChange = (value) => {
    setPatientSearchQuery(value);
  
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
    doctor.name.toLowerCase().includes(doctorSearchQuery.toLowerCase())
  );

  // Form funksiyaları
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Pasiyent seçimi funksiyası - dəyişdirilmiş versiya
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

// Status seçimi funksiyası - dəyişdirilmiş versiya
const handleStatusChange = (selectedOption) => {
  setSelectedStatus(selectedOption);
  setFormData(prev => ({
    ...prev,
    appointment: selectedOption ? selectedOption.value : 'MEETING'
  }));
};

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleConfirmAppointment = () => {
    // Prepare the appointment data in the required format
    const newAppointment = {
      room: selectedRoom?.value || '',
      patientId: selectedPatient?.value ? parseInt(selectedPatient.value) : 0,
      appointment: selectedStatus?.value || 'MEETING',
      appointmentTypeRequestIds: selectedOperations.map(op => ({
        id: parseInt(op.value)
      })),
      date: formData.date,
      time: `${formData.time.hour.toString().padStart(2, '0')}:${formData.time.minute.toString().padStart(2, '0')}:${formData.time.second.toString().padStart(2, '0')}`,
      period: `${formData.period.hour.toString().padStart(2, '0')}:${formData.period.minute.toString().padStart(2, '0')}:${formData.period.second.toString().padStart(2, '0')}`
    };

    createAppointment(newAppointment, {
      onSuccess: () => {
        toast.success('Randevu uğurla yaradıldı');
        setShowModal(false);
        navigate('/appointments', { 
          state: { selectedDoctorId },
          replace: true
        });
      },
      onError: (error) => {
        toast.error('Randevu yaradılarkən xəta baş verdi');
        console.error('Error creating appointment:', error);
      }
    });
  };

  // Update the time input handling
  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    const [hours, minutes] = value.split(':');
    
    setFormData(prev => ({
      ...prev,
      [name]: {
        hour: parseInt(hours),
        minute: parseInt(minutes),
        second: 0,
        nano: 0
      }
    }));
  };

  // Update the period input handling
  const handlePeriodChange = (e) => {
    const { name, value } = e.target;
    const [hours, minutes] = value.split(':');
    
    setFormData(prev => ({
      ...prev,
      [name]: {
        hour: parseInt(hours),
        minute: parseInt(minutes),
        second: 0,
        nano: 0
      }
    }));
  };

  return (
    <div className="appointments-container">
      {/* <BlurLoader isLoading={isPending}> */}
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
            value={doctorSearchQuery}
            onChange={handleDoctorSearchChange}
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

              {/* <CustomDropdown /> */}

              {/* Həkim & Pasiyent */}
              <div className='first-row'>
                  <div className="form-group">
                    <label className="required-label">Pasiyent</label>
                    <CustomDropdown
                      options={patientOptions}
                      onChange={handlePatientChange}
                      onSearchChange={handlePatientSearchChange}
                      placeholder="Pasiyent seçin və ya axtarın" 
                      value={selectedPatient}
                      isClearable={true}
                      isSearchable={true}
                      className="patient-select"
                    />
                  </div>
                  <div className="form-group">
                    <label className="required-label">Həkim</label>
                    <CustomDropdown
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
                    <DropdownChecklist
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
                    <CustomDropdown
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
                    value={`${formData.time.hour.toString().padStart(2, '0')}:${formData.time.minute.toString().padStart(2, '0')}`}
                    onChange={handleTimeChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Müddət</label>
                  <input
                    type="time"
                    name="period"
                    value={`${formData.period.hour.toString().padStart(2, '0')}:${formData.period.minute.toString().padStart(2, '0')}`}
                    onChange={handlePeriodChange}
                    required
                  />
                </div>
              </div>

              {/* Status & Pasient borcu */}
              <div className='fourth-row'>
                <div className="form-group">
                  <label className="required-label">Status</label>
                  <CustomDropdown
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
                    value="NA"//{formData.patientDebt}
                   // onChange={handleInputChange}
                    readOnly
                    //className={formData.patientDebt === 'Borcu yoxdur' ? 'no-debt' : ''}
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
      {/* </BlurLoader> */}
    </div>
  );
};

export default AddNewAppointment; 