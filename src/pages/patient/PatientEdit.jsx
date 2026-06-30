import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomDropdown from "../../components/CustomDropdown";
import "../../assets/style/PatientPage/patientedit.css";
import axios from "axios";
import { toast } from "react-toastify";
import usePriceCategoryStore from "../../../stores/priceCategoryStore";
import useSpecializationStore from "../../../stores/useSpecializationStore";
import usePatientStore from "../../../stores/patiendStore";

const PatientEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchPatientById, editPatient, loading, selectedPatient } =
    usePatientStore();
  const [doctors, setDoctors] = useState([]);
  const [formLoading, setFormLoading] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedPriceCategory, setSelectedPriceCategory] = useState(null);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Store-lardan məlumatları əldə et
  const { categories, fetchCategories } = usePriceCategoryStore();
  const { specializations, fetchSpecializations } = useSpecializationStore();

  useEffect(() => {
    fetchCategories();
    fetchSpecializations();

    if (id) {
      fetchPatientById(id);
    }
  }, [id, fetchPatientById, fetchCategories, fetchSpecializations]);

  const formRefs = {
    name: useRef(),
    surname: useRef(),
    patronymic: useRef(),
    finCode: useRef(),
    dateOfBirth: useRef(),
    phone: useRef(),
    workPhone: useRef(),
    homePhone: useRef(),
    homeAddress: useRef(),
    workAddress: useRef(),
    email: useRef(),
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("token");
        const API_BASE_URL = import.meta.env.VITE_BASE_URL || "/api/v1";
        const response = await axios.get(
          `${API_BASE_URL}/general-calendar/read-doctors`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDoctors(response.data);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
        toast.error("Həkimlər siyahısı yüklənə bilmədi");
      }
    };

    fetchDoctors();
  }, []);

  // Populate form with patient data when available
  useEffect(() => {
    if (selectedPatient) {
      // Set dropdown values
      if (selectedPatient.genderStatus) {
        const genderOption = [
          { value: "MAN", label: "Kişi" },
          { value: "WOMAN", label: "Qadın" },
        ].find((opt) => opt.value === selectedPatient.genderStatus);
        setSelectedGender(genderOption);
      }

      if (selectedPatient.priceCategoryName) {
        const categoryOption = categories.find(
          (cat) => cat.name === selectedPatient.priceCategoryName
        );
        setSelectedPriceCategory(
          categoryOption
            ? { value: categoryOption.name, label: categoryOption.name }
            : {
                value: selectedPatient.priceCategoryName,
                label: selectedPatient.priceCategoryName,
              }
        );
      }

      if (selectedPatient.specializationName) {
        const specOption = specializations.find(
          (spec) => spec.name === selectedPatient.specializationName
        );
        setSelectedSpecialization(
          specOption
            ? { value: specOption.name, label: specOption.name }
            : {
                value: selectedPatient.specializationName,
                label: selectedPatient.specializationName,
              }
        );
      }

      if (selectedPatient.doctorId || selectedPatient.doctor_id || selectedPatient.baseUser) {
        const doctorId = selectedPatient.doctorId || selectedPatient.doctor_id || selectedPatient.baseUser;
        const doctor = doctors.find((doc) => doc.doctorId === doctorId);
        if (doctor) {
          setSelectedDoctor({
            value: doctor.doctorId,
            label: `${doctor.name} ${doctor.surname}`,
          });
        }
      }

      // Set input values
      Object.entries(formRefs).forEach(([key, ref]) => {
        if (ref.current && selectedPatient[key] !== undefined) {
          ref.current.value = selectedPatient[key] || "";
        }
      });
    }
  }, [selectedPatient, categories, specializations, doctors]);

const handleSubmit = async (e) => {
  e.preventDefault();
  setFormLoading(true);

  // Use the selected values or fall back to the original patient values
  const priceCategoryName = selectedPriceCategory
    ? selectedPriceCategory.value
    : selectedPatient?.priceCategoryName || null;

  const specializationName = selectedSpecialization
    ? selectedSpecialization.value
    : selectedPatient?.specializationName || null;

  const doctor_id = selectedDoctor
    ? selectedDoctor.value
    : selectedPatient?.doctorId || selectedPatient?.doctor_id || selectedPatient?.baseUser || null;

  const requestData = {
    patientId: id,
    name: formRefs.name.current.value,
    surname: formRefs.surname.current.value,
    patronymic: formRefs.patronymic.current.value || null,
    // FIN kodunu boşsa null olaraq göndər
    finCode: formRefs.finCode.current.value || null,
    genderStatus: selectedGender
      ? selectedGender.value
      : selectedPatient?.genderStatus || null,
    dateOfBirth: formRefs.dateOfBirth.current.value,
    priceCategoryName: priceCategoryName,
    specializationName: specializationName,
    doctorId: doctor_id,
    phone: formRefs.phone.current.value,
    workPhone: formRefs.workPhone.current.value || null,
    homePhone: formRefs.homePhone.current.value || null,
    homeAddress: formRefs.homeAddress.current.value || null,
    workAddress: formRefs.workAddress.current.value || null,
    email: formRefs.email.current.value || null,
  };

  try {
    await editPatient(requestData);
    toast.success("Pasiyent məlumatları uğurla yeniləndi");
    navigate("/patients");
  } catch (error) {
    const errMsg =
      error?.response?.data?.message ||
      error?.message ||
      "Pasiyent məlumatları yenilənərkən xəta baş verdi";
    console.error("Update error:", errMsg);
    toast.error(errMsg);
  } finally {
    setFormLoading(false);
  }
};

  const handleCancel = () => {
    navigate(-1);
  };

  if (loading && !selectedPatient) {
    return <div className="loading">Yüklənir...</div>;
  }

  if (!selectedPatient && id) {
    return <div className="error">Pasiyent tapılmadı</div>;
  }

  return (
    <div className="patient-edit-container">
      <form className="main-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <div className="left">
            <div className="main-form-group">
              <label>Ad</label>
              <input
                type="text"
                ref={formRefs.name}
                required
                disabled={formLoading}
                defaultValue={selectedPatient?.name || ""}
              />
            </div>

            <div className="main-form-group">
              <label>Soyad</label>
              <input
                type="text"
                ref={formRefs.surname}
                required
                disabled={formLoading}
                defaultValue={selectedPatient?.surname || ""}
              />
            </div>

            <div className="main-form-group">
              <label>Ata adı</label>
              <input
                type="text"
                ref={formRefs.patronymic}
                disabled={formLoading}
                defaultValue={selectedPatient?.patronymic || ""}
              />
            </div>

            <div className="main-form-group">
              <label>FIN kod</label>
              <input
                type="text"
                ref={formRefs.finCode}
                disabled={formLoading}
                defaultValue={selectedPatient?.finCode || ""}
              />
            </div>
            <div className="main-form-group">
              <label>Cinsiyyət</label>
              <CustomDropdown
                value={selectedGender}
                onChange={(option) => setSelectedGender(option)}
                options={[
                  { value: "MAN", label: "Kişi" },
                  { value: "WOMAN", label: "Qadın" },
                ]}
                placeholder="Seçin"
                isDisabled={formLoading}
                isClearable={true}
              />
            </div>

            <div className="main-form-group">
              <label>Doğum tarixi</label>
              <input
                type="date"
                ref={formRefs.dateOfBirth}
                required
                disabled={formLoading}
                defaultValue={selectedPatient?.dateOfBirth || ""}
              />
            </div>
          </div>

          <div className="right">
            <div className="main-form-group">
              <label>Qiymət kateqoriyası</label>
              <CustomDropdown
                value={selectedPriceCategory}
                onChange={(option) => setSelectedPriceCategory(option)}
                options={categories.map((category) => ({
                  value: category.name,
                  label: category.name,
                }))}
                placeholder={selectedPatient?.priceCategoryName || "Seçin"}
                isDisabled={formLoading}
                isClearable={true}
              />
            </div>

            <div className="main-form-group">
              <label>İxtisas</label>
              <CustomDropdown
                value={selectedSpecialization}
                onChange={(option) => setSelectedSpecialization(option)}
                options={specializations.map((spec) => ({
                  value: spec.name,
                  label: spec.name,
                }))}
                placeholder={selectedPatient?.specializationName || "Seçin"}
                isDisabled={formLoading}
                isClearable={true}
              />
            </div>

            <div className="main-form-group">
              <label>Həkim</label>
              <CustomDropdown
                value={selectedDoctor}
                onChange={(option) => setSelectedDoctor(option)}
                options={doctors.map((doctor) => ({
                  value: doctor.doctorId,
                  label: `${doctor.name} ${doctor.surname}`,
                }))}
                placeholder="Seçin"
                isDisabled={formLoading}
                isClearable={true}
              />
            </div>

            <div className="main-form-group">
              <label>Mobil nömrə</label>
              <input
                type="tel"
                ref={formRefs.phone}
                required
                disabled={formLoading}
                defaultValue={selectedPatient?.phone || ""}
              />
            </div>

            <div className="main-form-group">
              <label>İş telefonu</label>
              <input
                type="tel"
                ref={formRefs.workPhone}
                disabled={formLoading}
                defaultValue={selectedPatient?.workPhone || ""}
              />
            </div>

            <div className="main-form-group">
              <label>Ev telefonu</label>
              <input
                type="tel"
                ref={formRefs.homePhone}
                disabled={formLoading}
                defaultValue={selectedPatient?.homePhone || ""}
              />
            </div>

            <div className="main-form-group">
              <label>Ev ünvanı</label>
              <input
                type="text"
                ref={formRefs.homeAddress}
                disabled={formLoading}
                defaultValue={selectedPatient?.homeAddress || ""}
              />
            </div>

            <div className="main-form-group">
              <label>İş ünvanı</label>
              <input
                type="text"
                ref={formRefs.workAddress}
                disabled={formLoading}
                defaultValue={selectedPatient?.workAddress || ""}
              />
            </div>

            <div className="main-form-group">
              <label>E-poçt</label>
              <input
                type="email"
                ref={formRefs.email}
                disabled={formLoading}
                defaultValue={selectedPatient?.email || ""}
              />
            </div>
          </div>
        </div>

        <div className="main-form-actions">
          <button
            type="submit"
            className="patientEditCreateBTN"
            disabled={formLoading}>
            {formLoading ? "Yüklənir..." : "Yadda Saxla"}
          </button>
          <button
            type="button"
            className="patientEditCancelBTN"
            onClick={handleCancel}
            disabled={formLoading}>
            Ləğv et
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientEdit;
