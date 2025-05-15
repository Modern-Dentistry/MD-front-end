import React, { useState, useRef } from 'react'

// Style
import "../../assets/style/QueuePage/editqueue.css"

// Components
import CustomDropdown from "../../components/CustomDropdown"
import DropdownMenuChecklist from '../../components/DropdownChecklist'

// Images
import acceptForm from "../../assets/images/EmployeesPage/verifyProcess.png"
import cancelForm from "../../assets/images/EmployeesPage/cancelProcess.png"
import { RiUserForbidLine } from "react-icons/ri";

function EditQueue() {
  const patientsList = [
    {
      id: 0,
      name: "Elvin",
      surname: "Hüseynov",
      patronymic: "Əli oğlu",
      finCode: "ABC1234",
      genderStatus: "MAN",
      dateOfBirth: "1995-01-01",
      priceCategoryStatus: "Standard",
      specializationStatus: "Deputy",
      doctorId: "DOC001",
      phone: "0501234567",
      workPhone: "0123456789",
      homePhone: "0127654321",
      homeAddress: "Bakı şəhəri",
      workAddress: "Klinika 1",
      email: "elvin@example.com",
      isBlocked: false
    },
    {
      id: 1,
      name: "Aysel",
      surname: "Quliyeva",
      patronymic: "Məmməd qızı",
      finCode: "XYZ7890",
      genderStatus: "WOMAN",
      dateOfBirth: "1990-06-15",
      priceCategoryStatus: "Premium",
      specializationStatus: "Nurse",
      doctorId: "DOC002",
      phone: "0519876543",
      workPhone: "0122345678",
      homePhone: "0128765432",
      homeAddress: "Sumqayıt",
      workAddress: "Klinika 2",
      email: "aysel@example.com",
      isBlocked: true
    }
  ];

  const doctorsList = [
    {
      doctorId: "DOC001",
      name: "Kamran",
      surname: "Məmmədov",
      username: "k.mammadov"
    },
    {
      doctorId: "DOC002",
      name: "Nigar",
      surname: "Əliyeva",
      username: "n.aliyeva"
    }
  ];

  const formattedPatients = patientsList.map(patient => ({
    value: patient.id,
    label: `${patient.name} ${patient.surname} (${patient.finCode})`,
    labelText: `${patient.name} ${patient.surname} (${patient.finCode})`, // string formatı
    icon: patient.isBlocked ? <RiUserForbidLine style={{ color: 'red', fontSize:'18px', marginLeft:'auto' }} /> : null
  }));

  const formattedDoctors = doctorsList.map(doctor => ({
    value: doctor.doctorId,
    label: `${doctor.name} ${doctor.surname} (${doctor.username})`,
    labelText: `${doctor.name} ${doctor.surname} (${doctor.username})`
  }));

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDays, setSelectedDays] = useState([]);

  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);

  const handlePatientChange = (option) => {
    setSelectedPatient(option);
    console.log("Selected patient:", option);
  };

  const handleDoctorChange = (option) => {
    setSelectedDoctor(option);
    console.log("Selected doctor:", option);
  };

  const handleDaysSelect = (days) => {
    setSelectedDays(days);
    console.log("Selected days:", days);
  };

  return (
    <div className="editQueuePageContainer">
      <div className="editQueuePageWrapper">
        <div className="queuePageWrapperInputRow">
          <div className="queuePageWrapperInput">
            <p>Pasiyent<span>*</span></p>
            <CustomDropdown
              options={formattedPatients}
              onChange={handlePatientChange}
              placeholder="Pasiyent seçin"
              name="patient"
              value={selectedPatient}
            />
          </div>

          <div className="queuePageWrapperInput">
            <p>Həkim<span>*</span></p>
            <CustomDropdown
              options={formattedDoctors}
              onChange={handleDoctorChange}
              placeholder="Həkim seçin"
              name="doctor"
              value={selectedDoctor}
            />
          </div>
        </div>

        <div className="queuePageWrapperInputRow">
          <div className="queuePageWrapperInput">
            <p>Başlama tarixi<span>*</span></p>
            <input className='editQueueBasicInput' type="date" ref={startDateRef} />
          </div>
          <div className="queuePageWrapperInput">
            <p>Bitmə tarixi<span>*</span></p>
            <input className='editQueueBasicInput' type="date" ref={endDateRef} />
          </div>
        </div>

        <div className="queuePageWrapperInputRow">
          <div className="queuePageWrapperInput">
            <p>Başlama saatı<span>*</span></p>
            <input className='editQueueBasicInput' type="time" ref={startTimeRef} />
          </div>
          <div className="queuePageWrapperInput">
            <p>Bitmə saatı<span>*</span></p>
            <input className='editQueueBasicInput' type="time" ref={endTimeRef} />
          </div>
        </div>

        <div className="queuePageWrapperInputWeek">
          <p>Həftənin günləri<span>*</span></p>
          <DropdownMenuChecklist
            onSelect={handleDaysSelect}
            placeholder="Gün seçin"
            options={[
              { value: "monday", label: "Bazar ertəsi" },
              { value: "tuesday", label: "Çərşənbə axşamı" },
              { value: "wednesday", label: "Çərşənbə" },
              { value: "thursday", label: "Cümə axşamı" },
              { value: "friday", label: "Cümə" },
              { value: "saturday", label: "Şənbə" },
              { value: "sunday", label: "Bazar" },
            ]}
            value={selectedDays}
          />
        </div>
      </div>

      <div className="editQueuePageAcceptOrDeny">
        <button className='canceleditQueue'>
          <img src={cancelForm} alt="cancel" />
          İmtina et
        </button>
         <button 
          className='accepteditQueue'
          onClick={() => {
            console.log("Form məlumatları:");
            console.log("Pasiyent:", selectedPatient);
            console.log("Həkim:", selectedDoctor);
            console.log("Başlama tarixi:", startDateRef.current?.value);
            console.log("Bitmə tarixi:", endDateRef.current?.value);
            console.log("Başlama saatı:", startTimeRef.current?.value);
            console.log("Bitmə saatı:", endTimeRef.current?.value);
            console.log("Seçilmiş günlər:", selectedDays);
          }}
        >
          <img src={acceptForm} alt="save" />
          Yadda saxla
        </button>
      </div>
    </div>
  )
}

export default EditQueue;
