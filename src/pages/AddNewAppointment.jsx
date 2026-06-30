import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/style/add-new-appointment.css";
import "../assets/style/appointment-left-side.css";
import CustomSelect from "../components/CustomSelect.jsx";
import Modal from "../components/Modal.jsx";
import CustomDropdown from "../components/CustomDropdown.jsx";
import DropdownChecklist from "../components/DropdownChecklist.jsx";
import { useDoctors } from "../hooks/useDoctors.js";
import { useCreateAppointment } from "../hooks/useCalendar.js";
import BlurLoader from "../components/layout/BlurLoader.jsx";
import { toast } from "react-toastify";
import { useRooms } from "../hooks/useRooms.js";
import usePatientStore from "../../stores/patiendStore.js";
import useAppointmentTypeStore from "../../stores/appointment-type-store.js";

const STATUS_OPTIONS = [{ value: "MEETING", label: "MEETING" }];

const AddNewAppointment = ({ employees, WORK_HOURS, WEEKDAYS_SHORT }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [patientSearchQuery, setPatientSearchQuery] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedOperations, setSelectedOperations] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(STATUS_OPTIONS[0]);
  const [formData, setFormData] = useState({
    date: "",
    time: "09:00:00", // String format
    period: "01:00:00", // String format
  });
  const [showModal, setShowModal] = useState(false);

  // Zustand stores
  const { patients, fetchPatients, searchPatients } = usePatientStore();
  const { appointmentTypes, fetchAppointmentTypes } = useAppointmentTypeStore();
  const { data: doctors } = useDoctors();
  const { data: rooms } = useRooms();
  const { mutate: createAppointment, isPending } = useCreateAppointment();

  // Fetch initial data
  useEffect(() => {
    fetchPatients();
    fetchAppointmentTypes();
  }, [fetchPatients, fetchAppointmentTypes]);

  // Transform data for dropdowns
  const operationOptions = useMemo(() => {
    return (
      appointmentTypes?.map((type) => ({
        value: type.id.toString(),
        label: type.appointmentTypeName,
      })) || []
    );
  }, [appointmentTypes]);

  const roomOptions = useMemo(() => {
    return (
      rooms?.map((room) => ({
        value: room.cabinetName,
        label: room.cabinetName,
      })) || []
    );
  }, [rooms]);

  const patientOptions = useMemo(() => {
    return (
      patients?.map((patient) => ({
        value: patient.id.toString(),
        label: `${patient.name} ${patient.surname} - ${patient.phone}`,
        debt: patient.debt || 0,
        doctorId: patient.doctorId || patient.doctor_id || patient.baseUser,
        doctorName: patient.doctorName,
      })) || []
    );
  }, [patients]);

  const doctorOptions = useMemo(() => {
    return (
      doctors?.map((doctor) => ({
        value: doctor.doctorId,
        label: `${doctor.name} ${doctor.surname}`,
      })) || []
    );
  }, [doctors]);

  // Set initial date/time from navigation
  useEffect(() => {
    if (location.state?.selectedDateTime) {
      const { date, time } = location.state.selectedDateTime;

      // Convert time object to string format
      const timeString = `${String(time.hour || 9).padStart(2, "0")}:${String(
        time.minute || 0
      ).padStart(2, "0")}:00`;

      setFormData((prev) => ({
        ...prev,
        date,
        time: timeString,
      }));
    }
  }, [location.state]);

  // Room selection
  const handleRoomChange = (selectedOption) => {
    setSelectedRoom(selectedOption);
  };

  // Patient selection - Auto-select doctor
  const handlePatientChange = (selectedOption) => {
    setSelectedPatient(selectedOption);

    if (selectedOption && selectedOption.doctorId) {
      const patientDoctor = doctorOptions.find(
        (doctor) => doctor.value === selectedOption.doctorId
      );

      if (patientDoctor) {
        setSelectedDoctor(patientDoctor);
        setSelectedDoctorId(patientDoctor.value);
      } else {
        const employeeDoctor = employees?.find(
          (emp) => emp.id === selectedOption.doctorId
        );
        if (employeeDoctor) {
          const doctorOption = {
            value: employeeDoctor.id,
            label: `${employeeDoctor.name} ${employeeDoctor.surname}`,
          };
          setSelectedDoctor(doctorOption);
          setSelectedDoctorId(employeeDoctor.id);
        }
      }
    } else {
      setSelectedDoctor(null);
      setSelectedDoctorId(null);
    }
  };

  // Doctor selection
  const handleDoctorChange = (selectedOption) => {
    setSelectedDoctor(selectedOption);
    setSelectedDoctorId(selectedOption?.value || null);
  };

  // Operations selection
  const handleOperationsChange = (selectedOptions) => {
    setSelectedOperations(selectedOptions || []);
  };

  // Status selection
  const handleStatusChange = (selectedOption) => {
    setSelectedStatus(selectedOption);
  };

  // Form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Time input handling - Convert to "HH:mm:ss" format
  const handleTimeChange = (e) => {
    const { value } = e.target;
    const [hours, minutes] = value.split(":").map(Number);

    const timeString = `${String(hours || 0).padStart(2, "0")}:${String(
      minutes || 0
    ).padStart(2, "0")}:00`;

    setFormData((prev) => ({
      ...prev,
      time: timeString,
    }));
  };

  // Period input handling - Convert to "HH:mm:ss" format
  const handlePeriodChange = (e) => {
    const { value } = e.target;
    const [hours, minutes] = value.split(":").map(Number);

    // Default olaraq 1 saat təyin et
    const periodString = `${String(hours || 1).padStart(2, "0")}:${String(
      minutes || 0
    ).padStart(2, "0")}:00`;

    setFormData((prev) => ({
      ...prev,
      period: periodString,
    }));
  };

  // Format time for display (remove seconds for input)
  const formatTimeForInput = (timeString) => {
    if (!timeString) return "09:00";
    return timeString.substring(0, 5); // "HH:mm" qaytarır
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!selectedPatient) {
      toast.error("Pasiyent seçilməyib");
      return;
    }

    if (!selectedDoctorId) {
      toast.error("Həkim seçilməyib");
      return;
    }

    if (!selectedRoom) {
      toast.error("Otaq seçilməyib");
      return;
    }

    if (!formData.date) {
      toast.error("Tarix seçilməyib");
      return;
    }

    setShowModal(true);
  };

  // Confirm appointment creation
  const handleConfirmAppointment = () => {
    const appointmentData = {
      cabinetName: selectedRoom?.value || "",
      patientId: selectedPatient ? parseInt(selectedPatient.value) : 0,
      appointment: selectedStatus?.value || "MEETING",
      appointmentTypeRequestIds: selectedOperations.map((op) => ({
        id: parseInt(op.value),
      })),
      date: formData.date,
      // Send time as ISO string format (HH:mm:ss)
      time: formData.time, // "09:00:00"
      // Send period as ISO string format (HH:mm:ss)
      period: formData.period, // "01:00:00"
    };

    console.log("📤 Sending appointment data:", JSON.stringify(appointmentData, null, 2));
    console.log("📋 Time format:", typeof appointmentData.time, appointmentData.time);
    console.log("📋 Period format:", typeof appointmentData.period, appointmentData.period);

    createAppointment(appointmentData, {
      onSuccess: () => {
        toast.success("Randevu uğurla yaradıldı");
        setShowModal(false);
        navigate("/appointments", {
          state: { selectedDoctorId },
          replace: true,
        });
      },
      onError: (error) => {
        toast.error("Randevu yaradılarkən xəta baş verdi");
        console.error("Error creating appointment:", error);

        // Ətraflı error məlumatı
        if (error.response) {
          console.error("Error response:", error.response.data);
          console.error("Error status:", error.response.status);
        }

        setShowModal(false);
      },
    });
  };

  return (
    <div
      className="appointments-container"
      style={{ display: "flex", gap: "10px" }}>
      <BlurLoader isLoading={isPending}>
        {/* RIGHT SIDE */}
        <div className="right-side !w-290">
          <div className="form-container">
            <h2>Yeni Randevu</h2>
            <form onSubmit={handleSubmit}>
              {/* Patient & Doctor */}
              <div className="first-row">
                <div className="form-group border-0">
                  <label className="required-label">Pasiyent</label>
                  <CustomDropdown
                    options={patientOptions}
                    onChange={handlePatientChange}
                    onSearchChange={setPatientSearchQuery}
                    placeholder="Pasiyent seçin və ya axtarın"
                    value={selectedPatient}
                    isClearable={true}
                    isSearchable={true}
                    className="patient-select !p-0 -ml-1 !border-none"
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

              {/* Operation & Room */}
              <div className="second-row">
                <div className="form-group">
                  <label className="required-label">Randevu Tipi</label>
                  <DropdownChecklist
                    options={operationOptions}
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

              {/* Date & Time & Duration */}
              <div className="third-row">
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
                    value={formatTimeForInput(formData.time)}
                    onChange={handleTimeChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Müddət</label>
                  <input
                    type="time"
                    name="period"
                    value={formatTimeForInput(formData.period)}
                    onChange={handlePeriodChange}
                    required
                  />
                </div>
              </div>

              {/* Status & Patient debt */}
              <div className="fourth-row">
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
                    value={
                      selectedPatient?.debt > 0
                        ? `${selectedPatient.debt} AZN`
                        : "Borcu yoxdur"
                    }
                    readOnly
                    className={
                      selectedPatient?.debt > 0 ? "has-debt" : "no-debt"
                    }
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="buttons-container">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => navigate(-1)}>
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
      </BlurLoader>
    </div>
  );
};

export default AddNewAppointment;
