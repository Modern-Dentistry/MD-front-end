import React, { useState } from 'react';
import '../assets/style/add-new-appointment.css';
import '../assets/style/appointment-left-side.css';
import CustomSelect from "../components/CustomSelect.jsx";

// Props-ları əlavə edirik
const AddNewAppointment = ({ roomOptions, employees, WORK_HOURS, WEEKDAYS_SHORT }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    operation: '',
    date: '',
    time: '',
  });

  // Sol panel üçün funksiyalar
  const handleRoomChange = (selectedOption) => {
    setSelectedRoom(selectedOption);
    setSelectedDoctorId(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDoctorCardClick = (doctorId) => {
    setSelectedDoctorId(selectedDoctorId === doctorId ? null : doctorId);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form məlumatlarını göndərmək
    console.log('Form data:', {
      ...formData,
      doctorId: selectedDoctorId,
      room: selectedRoom?.value
    });
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
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="required-label">Həkim</label>
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
            </div>

            {/* Əməliyyat & Otaq */}
            <div className='second-row'>
                <div className="form-group">
                  <label className="required-label">Əməliyyat</label>
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="required-label">Otaq</label>
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    required
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
                  type="number"
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
                <input
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Pasient borcu</label>
                <input
                  type="number"
                  name="patientDebt"
                  value={formData.patientDebt}
                  onChange={handleInputChange}
                  required
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
    </div>
  );
};

export default AddNewAppointment; 