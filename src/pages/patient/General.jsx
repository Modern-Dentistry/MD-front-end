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
import DeleteIcon from "../../assets/icons/Delete";
import InfoIcon from "../../assets/icons/Info";
import BlurLoader from "../../components/layout/BlurLoader";
import { toast } from "react-toastify";
import PatientForm from "./PatientEdit";
import axiosInstance from "../../api/temp-axios-auth";

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
        const res = await axiosInstance.get(
          "/general-calendar/read-doctors"
        );

        setDoctors(res.data);
      } catch (err) {
        console.error("Həkimləri gətirərkən xəta baş verdi:", err);
      } finally {
        setDoctorsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Həkimi tap
  const doctor = doctors.find(
    (d) =>
      d.doctorId?.toString().toLowerCase().trim() ===
      (patient?.doctorId || patient?.doctor_id || patient?.baseUser)?.toString().toLowerCase().trim()
  );

  useEffect(() => {
    if (patient && doctors.length > 0) {
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

  return (
    <BlurLoader isLoading={isLoading || deletingPatient || updatingPatient}>
      <div className="flex flex-col gap-2">
        <div className="flex self-end gap-4">
          <button onClick={handleInfo}>
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button onClick={handleDelete}>
            <DeleteIcon />
          </button>
        
        </div>

        <div className="input-container">
          <div className="left">
            <div className="flex flex-col gap-3 bg-[#D1E0FF] rounded-lg p-4">
              {/* <div className="main-form-group">
                <label htmlFor="status">Status</label>
                <input
                  id="status"
                  type="text"
                  value={patient?.permissions || ""}
                  readOnly
                  className="readonly"
                />
              </div> */}
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
              {/* <div className="main-form-group">
                <label htmlFor="registrationDate">Qeydiyyat Tarixi</label>
                <input
                  id="registrationDate"
                  type="date"
                  value={patient?.registrationDate || ""}
                  readOnly
                  className="readonly"
                />
              </div> */}
              {/* <div className="main-form-group">
                <label htmlFor="lastEdited">Son redakte</label>
                <input
                  id="lastEdited"
                  type="date"
                  value={patient?.lastEdited || ""}
                  readOnly
                  className="readonly"
                />
              </div> */}
            </div>

            {[
              { label: "Ad", name: "name" },
              { label: "Soyad", name: "surname" },
              { label: "Ata adı", name: "patronymic" },
              { label: "Cinsiyyət", name: "genderStatus" },
              { label: "FIN kod", name: "finCode" },
              { label: "Doğum tarixi", name: "dateOfBirth", type: "date" },
              // { label: "İxtisas", name: "specializationStatus" },
              {
                label: "Həkim",
                name: "doctorId",
                customRender: () => {
                  if (doctorsLoading) {
                    return "Yüklənir...";
                  }
                  const dId = patient?.doctorId || patient?.doctor_id || patient?.baseUser;
                  const foundDoctor = doctors.find(
                    (d) => d.doctorId?.toString() === dId?.toString()
                  );
                  if (!foundDoctor) {
                    return "Həkim tapılmadı";
                  }
                  return `${foundDoctor.name || ""} ${foundDoctor.surname || ""}`.trim();
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
              { label: "Qiymət kateqoriyası", name: "priceCategoryName", customRender: () => patient?.priceCategoryName || patient?.priceCategory || "" },
              { label: "Qara siyahı", name: "isBlocked", customRender: () => {
                  if (patient?.isBlocked === null || patient?.isBlocked === undefined) {
                    return "Xeyr";
                  }
                  return patient.isBlocked ? "Bəli" : "Xeyr";
                }
              },
              { label: "İş telefonu", name: "workPhone", type: "tel" },
              { label: "Ev telefonu", name: "homePhone", type: "tel" },
              { label: "E-poçt ünvanı", name: "email", type: "email" },
              { label: "Ev ünvanı", name: "homeAddress" },
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
        </div>
      </div>
    </BlurLoader>
  );
};

export default General;
