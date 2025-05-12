import React, { useState, useEffect, useRef } from "react";
import { SketchPicker } from "react-color";
import { MdColorLens } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import CustomDropdown from "../../components/CustomDropdown";
import "../../assets/style/PatientPage/patientedit.css";
import axios from "axios";
import { toast } from "react-toastify";

const PatientForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  mode = "create",
}) => {
  const navigate = useNavigate();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [patientData, setPatientData] = useState(null);
  const colorPickerRef = useRef(null);

  const specializationOptions = [
    { value: "Teacher", label: "Müəllim" },
    { value: "Deputy", label: "Müavin" },
    { value: "Worker", label: "İşçi" },
    { value: "Police", label: "Polis" },
  ];

  const formRefs = {
    name: useRef(),
    surname: useRef(),
    patronymic: useRef(),
    finCode: useRef(),
    genderStatus: useRef(),
    dateOfBirth: useRef(),
    priceCategoryStatus: useRef(),
    specializationStatus: useRef(),
    doctorId: useRef(),
    phone: useRef(),
    workPhone: useRef(),
    homePhone: useRef(),
    homeAddress: useRef(),
    workAddress: useRef(),
    email: useRef(),
    colorCode: useRef(),
    isVip: useRef(),
    isBlacklisted: useRef(),
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/general-calendar/read-doctors`
        );
        setDoctors(response.data);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
        toast.error("Həkimlər siyahısı yüklənə bilmədi");
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (initialData) {
      Object.entries(formRefs).forEach(([key, ref]) => {
        if (ref.current) {
          if (key === "isVip" || key === "isBlacklisted") {
            ref.current.checked = initialData[key] || false;
          } else {
            const fieldName =
              key === "doctorId" && initialData.doctor_id ? "doctor_id" : key;
            ref.current.value = initialData[fieldName] || "";
          }
        }
      });
    }
  }, [initialData]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target)
      ) {
        setShowColorPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleColorChange = (color) => {
    formRefs.colorCode.current.value = color.hex;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requestData = {
      patientId: initialData.id,
      name: formRefs.name.current.value,
      surname: formRefs.surname.current.value,
      patronymic: formRefs.patronymic.current.value || null,
      finCode: formRefs.finCode.current.value,
      genderStatus: formRefs.genderStatus.current.value,
      dateOfBirth: formRefs.dateOfBirth.current.value,
      priceCategoryStatus: formRefs.priceCategoryStatus.current.value,
      specializationStatus: formRefs.specializationStatus.current.value || null,
      doctorId: formRefs.doctorId.current.value || null,
      phone: formRefs.phone.current.value,
      workPhone: formRefs.workPhone.current.value || null,
      homePhone: formRefs.homePhone.current.value || null,
      homeAddress: formRefs.homeAddress.current.value || null,
      workAddress: formRefs.workAddress.current.value || null,
      email: formRefs.email.current.value || null,
      colorCode: formRefs.colorCode.current.value || null,
      isVip: formRefs.isVip.current.checked,
      isBlacklisted: formRefs.isBlacklisted.current.checked,
    };

    try {
      console.log("Sending request:", requestData);
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/patient/update`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setPatientData(response.data);
      }

      console.log("Received response:", response);

      toast.success("Pasiyent məlumatları uğurla yeniləndi");

      if (typeof onSubmit === "function") {
        setTimeout(() => {
          onSubmit(response.data);
        }, 100);
      }
    } catch (error) {
      // console.error("Update error:", error);
      // toast.error(error.response?.data?.message || "Error updating patient");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    else navigate(-1);
  };

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      if (formRefs.genderStatus.current) {
        formRefs.genderStatus.current.value = initialData.genderStatus || "";
      }
      if (formRefs.priceCategoryStatus.current) {
        formRefs.priceCategoryStatus.current.value =
          initialData.priceCategoryStatus || "";
      }
      if (formRefs.specializationStatus.current) {
        formRefs.specializationStatus.current.value =
          initialData.specializationStatus || "";
      }
      if (formRefs.doctorId.current) {
        formRefs.doctorId.current.value =
          initialData.doctorId || initialData.doctor_id || "";
      }
    }
  }, [initialData]);

  return (
    <form className="main-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <div className="left">
          <div className="main-form-group">
            <label>Ad</label>
            <input type="text" ref={formRefs.name} required />
          </div>

          <div className="main-form-group">
            <label>Soyad</label>
            <input type="text" ref={formRefs.surname} required />
          </div>

          <div className="main-form-group">
            <label>Ata adı</label>
            <input type="text" ref={formRefs.patronymic} />
          </div>

          <div className="main-form-group">
            <label>FIN kod</label>
            <input type="text" ref={formRefs.finCode} required />
          </div>

          <div className="main-form-group">
            <label>Cinsiyyət</label>
            <CustomDropdown
              value={initialData.genderStatus}
              onChange={(option) =>
                (formRefs.genderStatus.current.value = option.value)
              }
              options={[
                { value: "MAN", label: "Kişi" },
                { value: "WOMAN", label: "Qadın" },
              ]}
              placeholder="Seçin"
            />
            <input type="hidden" ref={formRefs.genderStatus} />
          </div>

          <div className="main-form-group">
            <label>Doğum tarixi</label>
            <input type="date" ref={formRefs.dateOfBirth} required />
          </div>

          <div className="main-form-group">
            <label>Qiymət kateqoriyası</label>
            <CustomDropdown
              value={initialData.priceCategoryStatus}
              onChange={(option) =>
                (formRefs.priceCategoryStatus.current.value = option.value)
              }
              options={[
                { value: "Standard", label: "Standart" },
                { value: "Vip", label: "VIP" },
              ]}
              placeholder="Seçin"
            />
            <input type="hidden" ref={formRefs.priceCategoryStatus} />
          </div>

          <div className="main-form-group">
            <label>İxtisas</label>
            <CustomDropdown
              value={initialData.specializationStatus}
              onChange={(option) =>
                (formRefs.specializationStatus.current.value = option.value)
              }
              options={specializationOptions}
              placeholder="Seçin"
            />
            <input type="hidden" ref={formRefs.specializationStatus} />
          </div>

          <div className="main-form-group">
            <label>Həkim</label>
            <CustomDropdown
              value={initialData.doctorId || initialData.doctor_id}
              onChange={(option) =>
                (formRefs.doctorId.current.value = option.value)
              }
              options={doctors.map((doctor) => ({
                value: doctor.doctorId,
                label: `${doctor.name} ${doctor.surname}`,
              }))}
              placeholder="Seçin"
            />
            <input type="hidden" ref={formRefs.doctorId} />
          </div>

          <div className="main-form-group">
            <label>Rəng kodu</label>
            <input type="text" ref={formRefs.colorCode} readOnly />
            <span
              className="color-icon"
              onClick={() => setShowColorPicker(!showColorPicker)}>
              <MdColorLens />
            </span>
            {showColorPicker && (
              <div ref={colorPickerRef}>
                <SketchPicker
                  color={formRefs.colorCode.current?.value || "#ffffff"}
                  onChange={handleColorChange}
                />
              </div>
            )}
          </div>

          <div className="main-form-group">
            <label>
              <input
                type="checkbox"
                className="patientEditCheckbox"
                ref={formRefs.isVip}
              />{" "}
              VIP
            </label>
          </div>

          <div className="main-form-group">
            <label>
              <input
                type="checkbox"
                className="patientEditCheckbox"
                ref={formRefs.isBlacklisted}
              />{" "}
              Qara siyahı
            </label>
          </div>
        </div>

        <div className="right">
          <div className="main-form-group">
            <label>Mobil nömrə</label>
            <input type="tel" ref={formRefs.phone} required />
          </div>

          <div className="main-form-group">
            <label>İş telefonu</label>
            <input type="tel" ref={formRefs.workPhone} />
          </div>

          <div className="main-form-group">
            <label>Ev telefonu</label>
            <input type="tel" ref={formRefs.homePhone} />
          </div>

          <div className="main-form-group">
            <label>Ev ünvanı</label>
            <input type="text" ref={formRefs.homeAddress} />
          </div>

          <div className="main-form-group">
            <label>İş ünvanı</label>
            <input type="text" ref={formRefs.workAddress} />
          </div>

          <div className="main-form-group">
            <label>E-poçt</label>
            <input type="email" ref={formRefs.email} />
          </div>
        </div>
      </div>

      <div className="main-form-actions">
        <button
          type="submit"
          className="patientEditCreateBTN"
          disabled={loading}>
          {loading
            ? "Yüklənir..."
            : mode === "create"
            ? "Yarat"
            : "Yadda Saxla"}
        </button>
        <button
          type="button"
          className="patientEditCancelBTN"
          onClick={handleCancel}
          disabled={loading}>
          Ləğv et
        </button>
      </div>
    </form>
  );
};

export default PatientForm;
