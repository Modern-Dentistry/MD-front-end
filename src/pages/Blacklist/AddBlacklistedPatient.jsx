import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import "../../assets/style/BlacklistPage/addblacklistedpatient.css"

// Icons
import { FaCheck } from "react-icons/fa";


const AddBlacklistedPatient = ({
  isOpen,
  onClose,
  onSave,
  patients,
  reasons,
  selectedPatient,
  setSelectedPatient,
  selectedReason,
  setSelectedReason
}) => {
  if (!isOpen) return null;

  return (
    <div className="add-modal-overlay">
      <div className="add-modal-content">
        <div className="add-modal-header">
          <h3>Yenisini əlavə et</h3>
          <button className="add-close-btn" onClick={onClose}>
            <AiOutlineClose />
          </button>
        </div>

        <div className="add-modal-body">
          <label htmlFor="patient-select">Pasiyent</label>
          <select
            id="patient-select"
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
          >
            <option value="">Seçin</option>
            {patients.map((patient, index) => (
              <option key={index} value={patient.pin}>
                {patient.name} {patient.surname} - {patient.pin}
              </option>
            ))}
          </select>

          <label htmlFor="reason-select">Səbəb</label>
          <select
            id="reason-select"
            value={selectedReason}
            onChange={(e) => setSelectedReason(e.target.value)}
          >
            <option value="">Seçin</option>
            {reasons.map((reason, index) => (
              <option key={index} value={reason}>
                {reason}
              </option>
            ))}
          </select>
        </div>

        <div className="add-modal-footer">
          <button className="cancel-btn" onClick={onClose}>
             <span className='cancelIcon'>X</span>
            İmtina et
          </button>
          <button className="save-btn" onClick={onSave}>
          <FaCheck className='checkIcon'/> Yadda saxla
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBlacklistedPatient;
