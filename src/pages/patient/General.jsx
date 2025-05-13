import React, { useState, useEffect } from "react";
import ProfileImage from "../../components/ProfileImage";
import "../../assets/style/form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import {
  usePatient,
  useeditPatient,
  useDeletePatient,
} from "../../hooks/usePatients";
import { useParams, useNavigate } from "react-router-dom";
import DeleteIcon from "../../assets/icons/delete";
import InfoIcon from "../../assets/icons/Info";
import BlurLoader from "../../components/layout/BlurLoader";
import { toast } from "react-toastify";
import PatientForm from "./PatientEdit";
import axios from "axios";

const General = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const { data: patient, isLoading, error } = usePatient(id);
  const { mutate: deletePatient, isPending: deletingPatient } =
    useDeletePatient();
  const { mutate: updatePatient, isPending: updatingPatient } =
    useeditPatient();
  const navigator = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [doctorsLoading, setDoctorsLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(
          "http://159.89.3.81:5555/api/v1/general-calendar/read-doctors"
        );
        setDoctors(res.data);
      } catch (err) {
      } finally {
        setDoctorsLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (patient && doctors.length > 0) {
      const selectedDoctor = doctors.find(
        (d) =>
          String(d.doctorId).toLowerCase().trim() ===
          String(patient?.doctorId).toLowerCase().trim()
      );
    }
  }, [patient, doctors]);

  const handleEdit = () => setIsEditing(true);

  const handleDelete = () => {
    deletePatient(id, {
      onSuccess: () => {
        toast.success("Patient deleted successfully");
        navigator("/patients");
      },
      onError: () => {
        toast.error("Error deleting patient");
      },
    });
  };

  const handleFormSubmit = (formData) => {
    formData.id = id;
    updatePatient(formData, {
      onSuccess: () => {
        toast.success("Patient updated successfully");
        setIsEditing(false);
      },
      onError: () => {
        toast.error("Error updating patient");
      },
    });
  };

  const handleInfo = () => navigator("../edit");
  const handleCancel = () => setIsEditing(false);

  if (isEditing) {
    return (
      <div className="flex flex-col gap-2">
        <PatientForm
          initialData={patient}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          mode="edit"
        />
      </div>
    );
  }

  const doctor = doctors.find(
    (d) => String(d.doctorId).trim() === String(patient?.doctorId).trim()
  );

  return (
    <BlurLoader isLoading={isLoading || deletingPatient || updatingPatient}>
      <div className="flex flex-col gap-2">
        <div className="flex self-end gap-4">
          <button onClick={handleEdit}>
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button onClick={handleDelete}>
            <DeleteIcon />
          </button>
          <button onClick={handleInfo}>
            <InfoIcon />
          </button>
        </div>

        <div className="input-container">
          <div className="left">
            <div className="flex flex-col gap-3 bg-[#D1E0FF] rounded-lg p-4">
              <div className="main-form-group">
                <label htmlFor="status">Status</label>
                <input
                  id="status"
                  type="text"
                  value={patient?.permissions || ""}
                  readOnly
                  className="readonly"
                />
              </div>
              <div className="main-form-group">
                <label htmlFor="id">ID</label>
                <input
                  id="id"
                  type="text"
                  value={patient?.id || ""}
                  readOnly
                  className="readonly"
                />
              </div>
              <div className="main-form-group">
                <label htmlFor="registrationDate">Qeydiyyat Tarixi</label>
                <input
                  id="registrationDate"
                  type="date"
                  value={patient?.registrationDate || ""}
                  readOnly
                  className="readonly"
                />
              </div>
              <div className="main-form-group">
                <label htmlFor="lastEdited">Son redakte</label>
                <input
                  id="lastEdited"
                  type="date"
                  value={patient?.lastEdited || ""}
                  readOnly
                  className="readonly"
                />
              </div>
            </div>

            {[
              { label: "Ad", name: "name" },
              { label: "Soyad", name: "surname" },
              { label: "Ata adı", name: "patronymic" },
              { label: "Cinsiyyət", name: "genderStatus" },
              { label: "FIN kod", name: "finCode" },
              { label: "Doğum tarixi", name: "dateOfBirth", type: "date" },
              { label: "Qiymət kateqoriyası", name: "priceCategoryStatus" },
              { label: "İxtisas", name: "specializationStatus" },
              {
                label: "Həkim",
                name: "doctorId",
                customRender: () => {
                  if (doctorsLoading) {
                    return "Yüklenir...";
                  }
                  if (!doctor) {
                    return "Həkim tapılmadı";
                  }
                  return `${doctor?.name || ""} ${
                    doctor?.surname || ""
                  }`.trim();
                },
              },
            ].map(({ label, name, type = "text", customRender }) => (
              <div className="main-form-group" key={name}>
                <label htmlFor={name}>{label}</label>
                <input
                  id={name}
                  type={type}
                  value={customRender ? customRender() : patient?.[name] || ""}
                  readOnly
                  className="readonly"
                />
              </div>
            ))}
          </div>

          <div className="right">
            {[
              { label: "VIP", name: "isVip" },
              { label: "Qara siyahı", name: "isBlacklisted" },
              { label: "Mobil nömrə 1", name: "mobileNumber1", type: "tel" },
              { label: "Mobil nömrə 2", name: "mobileNumber2", type: "tel" },
              { label: "Mobil nömrə 3", name: "mobileNumber3", type: "tel" },
              {
                label: "WhatsApp nömrəsi",
                name: "whatsappNumber",
                type: "tel",
              },
              { label: "İş telefonu", name: "workPhone", type: "tel" },
              { label: "Ev telefonu", name: "homePhone", type: "tel" },
              { label: "E-poçt ünvanı", name: "email", type: "email" },
              { label: "Ev ünvanı", name: "homeAddress" },
            ].map(({ label, name, type = "text" }) => (
              <div className="main-form-group" key={name}>
                <label htmlFor={name}>{label}</label>
                <input
                  id={name}
                  type={type}
                  value={patient?.[name] || ""}
                  readOnly
                  className="readonly"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </BlurLoader>
  );
};

export default General;











