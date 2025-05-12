import React, { useState, useEffect, useRef } from "react";
import { SketchPicker } from "react-color";
import { MdColorLens } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import CustomDropdown from "../../components/CustomDropdown";
import "../../assets/style/PatientPage/patientedit.css"

const PatientForm = ({ initialData = {}, onSubmit, onCancel, mode = "create" }) => {
  const navigate = useNavigate();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef(null);

  const formRefs = {
    name: useRef(),
    surname: useRef(),
    patronymic: useRef(),
    finCode: useRef(),
    genderStatus: useRef(),
    dateOfBirth: useRef(),
    priceCategoryStatus: useRef(),
    specializationStatus: useRef(),
    doctor_id: useRef(),
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
    if (initialData) {
      Object.entries(formRefs).forEach(([key, ref]) => {
        if (ref.current !== undefined) {
          if (key === "isVip" || key === "isBlacklisted") {
            ref.current.checked = initialData[key] || false;
          } else {
            ref.current.value = initialData[key] || "";
          }
        }
      });
    }
  }, [initialData]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setShowColorPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleColorChange = (color) => {
    formRefs.colorCode.current.value = color.hex;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {};
    Object.entries(formRefs).forEach(([key, ref]) => {
      if (key === "isVip" || key === "isBlacklisted") {
        data[key] = ref.current.checked;
      } else {
        data[key] = ref.current.value === "" ? null : ref.current.value;
      }
    });

    if (onSubmit) onSubmit(data);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    else navigate(-1);
  };

  return (
    <form className="main-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <div className="left">
          <div className="main-form-group">
            <label>Ad</label>
            <input type="text" ref={formRefs.name} />
          </div>

          <div className="main-form-group">
            <label>Soyad</label>
            <input type="text" ref={formRefs.surname} />
          </div>

          <div className="main-form-group">
            <label>Ata adı</label>
            <input type="text" ref={formRefs.patronymic} />
          </div>

          <div className="main-form-group">
            <label>FIN kod</label>
            <input type="text" ref={formRefs.finCode} />
          </div>

          <div className="main-form-group">
            <label>Cinsiyyət</label>
            <CustomDropdown
              value={formRefs.genderStatus.current?.value}
              onChange={(option) => (formRefs.genderStatus.current.value = option.value)}
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
            <input type="date" ref={formRefs.dateOfBirth} />
          </div>

          <div className="main-form-group">
            <label>Qiymət kateqoriyası</label>
            <CustomDropdown
              value={formRefs.priceCategoryStatus.current?.value}
              onChange={(option) => (formRefs.priceCategoryStatus.current.value = option.value)}
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
            <input type="text" ref={formRefs.specializationStatus} />
          </div>

          <div className="main-form-group">
            <label>Həkim</label>
            <CustomDropdown
              value={formRefs.doctor_id.current?.value}
              onChange={(option) => (formRefs.doctor_id.current.value = option.value)}
              options={[]} // bura doctorlar propsla ötürülə bilər
              placeholder="Seçin"
            />
            <input type="hidden" ref={formRefs.doctor_id} />
          </div>

          <div className="main-form-group">
            <label>Rəng kodu</label>
            <input type="text" ref={formRefs.colorCode} readOnly />
            <span className="color-icon" onClick={() => setShowColorPicker(!showColorPicker)}>
              <MdColorLens />
            </span>
            {showColorPicker && (
              <div ref={colorPickerRef}>
                <SketchPicker color={formRefs.colorCode.current?.value} onChange={handleColorChange} />
              </div>
            )}
          </div>

          <div className="main-form-group">
            <label>
              <input type="checkbox" className="patientEditCheckbox" ref={formRefs.isVip} /> VIP
            </label>
          </div>

          <div className="main-form-group">
            <label>
              <input type="checkbox" className="patientEditCheckbox" ref={formRefs.isBlacklisted} /> Qara siyahı
            </label>
          </div>
        </div>

        <div className="right">
          <div className="main-form-group">
            <label>Mobil nömrə</label>
            <input type="tel" ref={formRefs.phone} />
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
        <button type="submit" className="patientEditCreateBTN" >{mode === "create" ? "Yarat" : "Yadda Saxla"}</button>
        <button type="button" className="patientEditCancelBTN" onClick={handleCancel}>Ləğv et</button>
      </div>
    </form>
  );
};

export default PatientForm;
