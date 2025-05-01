import React, { useState, useEffect, useRef } from "react";
import { SketchPicker } from "react-color";
import { MdColorLens } from "react-icons/md";
import "../assets/style/form.css";
import ProfileImage from "./ProfileImage";
import { LuPenLine } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "./Modal";
import { Controller } from "react-hook-form";
import CustomDropdown from "./CustomDropdown";

import useWorkerStore from "../../stores/ workerStore";

function UserForm({ mode: initialMode, userData = null, onSubmit, onDelete }) {
  const { addWorker } = useWorkerStore();
  const [mode, setMode] = useState(initialMode);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(3, "İstifadəçi Adı 3-20 simvol arasında olmalıdır")
      .max(20, "İstifadəçi Adı 3-20 simvol arasında olmalıdır")
      .required("İstifadəçi adı tələb olunur"),
    password:
      mode === "create"
        ? yup
            .string()
            .matches(
              /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!_]).{8,}$/,
              "Şifrə minimum 8 simvol olmalı, böyük/kiçik hərf, rəqəm və xüsusi simvol içerməlidir"
            )
            .required("Şifrə tələb olunur")
        : yup.string(),
    name: yup
      .string()
      .min(3, "Ad 3-20 simvol arasında olmalıdır")
      .max(20, "Ad 3-20 simvol arasında olmalıdır")
      .required("Ad tələb olunur"),
    surname: yup
      .string()
      .min(3, "Soyad 3-20 simvol arasında olmalıdır")
      .max(20, "Soyad 3-20 simvol arasında olmalıdır")
      .required("Soyad tələb olunur"),
    patronymic: yup
      .string()
      .min(3, "Ata Adı 3-20 simvol arasında olmalıdır")
      .max(20, "Ata Adı 3-20 simvol arasında olmalıdır")
      .required("Ata Adı tələb olunur"),
    finCode: yup
      .string()
      .matches(
        /^[A-Z0-9]{7}$/,
        "FIN kod yalnız böyük hərflər və rəqəmlərdən ibarət 7 simvol olmalıdır"
      )
      .required("FIN kod tələb olunur"),
    genderStatus: yup.string().required("Cinsiyyət seçilməlidir"),
    dateOfBirth: yup
      .date()
      .max(new Date(), "Doğum tarixi bu gündən sonra ola bilməz")
      .required("Doğum tarixi tələb olunur"),
    phone: yup
      .string()
      .matches(
        /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/,
        "Telefon nömrəsini (000)-000-00-00 formatında daxil edin"
      )
      .required("Telefon nömrəsi tələb olunur"),
    phone2: yup
      .string()
      .nullable()
      .test(
        "phone2-format",
        "Telefon nömrəsini (000)-000-00-00 formatında daxil edin",
        function (value) {
          if (!value) return true; // Allow empty/null values
          return /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/.test(value);
        }
      ),
    homePhone: yup
      .string()
      .nullable()
      .test(
        "homePhone-format",
        "Telefon nömrəsini (000)-000-00-00 formatında daxil edin",
        function (value) {
          if (!value) return true; // Allow empty/null values
          return /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/.test(value);
        }
      ),
    phone3: yup
      .string()
      .nullable()
      .test(
        "phone3-format",
        "Telefon nömrəsini (000)-000-00-00 formatında daxil edin",
        function (value) {
          if (!value) return true; // Allow empty/null values
          return /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/.test(value);
        }
      ),
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Düzgün e-poçt ünvanı daxil edin"
      ),
    experience: yup
      .number()
      .min(0, "Təcrübə mənfi ola bilməz")
      .typeError("Təcrübə rəqəm olmalıdır"),
    authorities:
      mode !== "view"
        ? yup.array().min(1, "Ən azı bir icazə seçilməlidir")
        : yup
            .array()
            .transform((value) =>
              Array.isArray(value) && value.length > 0 ? [value[0]] : []
            ),
  });

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
    defaultValues: userData || {
      username: "",
      password: "",
      name: "",
      surname: "",
      patronymic: "",
      finCode: "",
      colorCode: "#ffffff",
      genderStatus: "",
      dateOfBirth: "",
      degree: "",
      phone: "",
      phone2: "",
      homePhone: "",
      email: "",
      address: "",
      experience: 0,
      authorities: [],
    },
  });

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

  const handleEditButton = () => setMode("edit");
  const handleCancelButton = () =>
    mode === "edit" ? setMode("view") : navigate(-1);
  const handleColorChange = (color) => setValue("colorCode", color.hex);

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    if (phoneNumber.length < 4) return phoneNumber;
    if (phoneNumber.length < 7)
      return `(${phoneNumber.slice(0, 3)})-${phoneNumber.slice(3)}`;
    return `(${phoneNumber.slice(0, 3)})-${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 8)}-${phoneNumber.slice(8, 10)}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["phone", "phone2", "homePhone", "phone3"].includes(name)) {
      setValue(name, formatPhoneNumber(value));
    } else {
      setValue(name, value);
    }
  };

  const handleFormSubmit = (data) => {
    // Transform values here
    const transformedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        value === "" ? null : value,
      ])
    );

    if (mode === "edit") {
      const updateData = Object.keys(transformedData).reduce((acc, key) => {
        if (transformedData[key] !== userData[key])
          acc[key] = transformedData[key];
        return acc;
      }, {});
      onSubmit(updateData);
    } else {
      onSubmit(transformedData);
    }
  };

  const permissionList = [
    { label: "ADMIN", value: "ADMIN" },
    { label: "DOCTOR", value: "DOCTOR" },
    { label: "DOCTOR_FULL_PERMISSION", value: "DOCTOR_FULL_PERMISSION" },
    { label: "ACCOUNTANT", value: "ACCOUNTANT" },
    { label: "USER", value: "USER" },
    { label: "WAREHOUSE_MAN", value: "WAREHOUSE_MAN" },
    { label: "RECEPTION", value: "RECEPTION" },
  ];

  return (
    <div className="main-form-container">
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Əminsinizmi?"
        message="İşçi silinəcək!"
        onConfirm={onDelete}
      />
      <h3 className="main-form-title">
        {mode === "create"
          ? "İşçi əlavə et"
          : mode === "edit"
          ? "İşçi məlumatlarını yenilə"
          : "İşçi məlumatları"}
      </h3>

      <form className="main-form" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className={`${mode === "view" ? "profile-buttons" : ""}`}>
          <ProfileImage userId={watch("username")} mode={mode} />
          {mode === "view" && (
            <div className="profile-button-group">
              <button
                type="button"
                className="color-success"
                onClick={handleEditButton}>
                <LuPenLine className="color-success" />
                Redaktə et
              </button>
              <button
                type="button"
                className="color-danger"
                onClick={() => setShowModal(true)}>
                <FaRegTrashAlt className="color-danger" />
                Sil
              </button>
            </div>
          )}
        </div>
        <div className="input-container">
          <div className="left">
            <div className="main-form-group">
              <label htmlFor="username">
                İstifadəçi adı <span className="text-red-500">*</span>
              </label>
              <input
                id="username"
                type="text"
                {...register("username")}
                readOnly={mode === "view"}
                className={`${mode === "view" ? "readonly" : ""} ${
                  errors.username ? "error" : ""
                }`}
              />
            </div>

            {mode === "create" && (
              <div className="main-form-group">
                <label htmlFor="password">
                  Şifrə <span className="text-red-500">*</span>
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  readOnly={mode === "view"}
                  className={mode === "view" ? "readonly" : ""}
                />
              </div>
            )}

            <div className="main-form-group">
              <label htmlFor="name">
                Ad <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                readOnly={mode === "view"}
                className={mode === "view" ? "readonly" : ""}
              />
            </div>

            <div className="main-form-group">
              <label htmlFor="surname">
                Soyad <span className="text-red-500">*</span>
              </label>
              <input
                id="surname"
                type="text"
                {...register("surname")}
                readOnly={mode === "view"}
                className={mode === "view" ? "readonly" : ""}
              />
            </div>

            <div className="main-form-group">
              <label htmlFor="patronymic">
                Ata adı <span className="text-red-500">*</span>
              </label>
              <input
                id="patronymic"
                type="text"
                {...register("patronymic")}
                readOnly={mode === "view"}
                className={mode === "view" ? "readonly" : ""}
              />
            </div>

            <div className="main-form-group">
              <label htmlFor="genderStatus">
                Cinsiyyət <span className="text-red-500">*</span>
              </label>
              <CustomDropdown
                name="genderStatus"
                value={watch("genderStatus")}
                onChange={(option) => setValue("genderStatus", option.value)}
                placeholder="Cins seçin"
                options={[
                  {
                    value: "MAN",
                    label: "Kişi",
                  },
                  {
                    value: "WOMAN",
                    label: "Qadın",
                  },
                ]}
              />
            </div>

            <div className="main-form-group ">
              <label htmlFor="finCode">
                FIN kod <span className="text-red-500 ">*</span>
              </label>
              <input
                id="finCode"
                type="text"
                {...register("finCode")}
                readOnly={mode === "view"}
                className={mode === "view" ? "readonly" : ""}
              />
            </div>

            <div className="main-form-group color-selector-group">
              <label htmlFor="colorCode">Rəng kodu</label>
              <input
                id="colorCode"
                type="text"
                {...register("colorCode")}
                readOnly
                className={mode === "view" ? "readonly" : ""}
              />
              {mode !== "view" && (
                <span
                  className="color-icon"
                  onClick={() => setShowColorPicker(!showColorPicker)}>
                  <MdColorLens />
                </span>
              )}
              <span
                className="color-swatch"
                style={{ backgroundColor: watch("colorCode") }}></span>

              {showColorPicker && (
                <div ref={colorPickerRef} className="color-picker-dropdown">
                  <SketchPicker
                    disableAlpha={true}
                    color={watch("colorCode")}
                    onChangeComplete={handleColorChange}
                  />
                </div>
              )}
            </div>

            <div className="main-form-group">
              <label htmlFor="dateOfBirth">
                Doğum tarixi <span className="text-red-500">*</span>
              </label>
              <input
                id="dateOfBirth"
                type="date"
                {...register("dateOfBirth")}
                readOnly={mode === "view"}
                className={mode === "view" ? "readonly" : ""}
              />
            </div>

            <div className="main-form-group">
              <label htmlFor="degree">Elmi dərəcə</label>
              <input
                id="degree"
                type="text"
                {...register("degree")}
                readOnly={mode === "view"}
                className={mode === "view" ? "readonly" : ""}
              />
            </div>
          </div>

          <div className="right">
            <div className="main-form-group">
              <label htmlFor="phone">
                Mobil nömrə 1 <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                {...register("phone", {
                  onChange: (e) => {
                    const value = e.target.value;
                    const formattedValue = formatPhoneNumber(value);
                    setValue("phone", formattedValue);
                  },
                })}
                readOnly={mode === "view"}
                className={mode === "view" ? "readonly" : ""}
              />
            </div>

            <div className="main-form-group">
              <label htmlFor="phone2">Mobil nömrə 2</label>
              <input
                id="phone2"
                type="tel"
                {...register("phone2", {
                  onChange: (e) => {
                    const value = e.target.value;
                    const formattedValue = formatPhoneNumber(value);
                    setValue("phone2", formattedValue);
                  },
                })}
                readOnly={mode === "view"}
                className={mode === "view" ? "readonly" : ""}
              />
            </div>

            <div className="main-form-group">
              <label htmlFor="phone3">Mobil nömrə 3</label>
              <input
                id="phone3"
                type="tel"
                {...register("phone3", {
                  onChange: (e) => {
                    const value = e.target.value;
                    const formattedValue = formatPhoneNumber(value);
                    setValue("phone3", formattedValue);
                  },
                })}
                readOnly={mode === "view"}
                className={mode === "view" ? "readonly" : ""}
              />
            </div>
            <div className="main-form-group">
              <label htmlFor="homePhone">Ev telefonu</label>
              <input
                id="homePhone"
                type="tel"
                {...register("homePhone", {
                  onChange: (e) => {
                    const value = e.target.value;
                    const formattedValue = formatPhoneNumber(value);
                    setValue("homePhone", formattedValue);
                  },
                })}
                readOnly={mode === "view"}
                className={mode === "view" ? "readonly" : ""}
              />
            </div>

            <div className="main-form-group">
              <label htmlFor="email">E-poçt ünvanı</label>
              <input
                id="email"
                type="email"
                {...register("email")}
                readOnly={mode === "view"}
                className={mode === "view" ? "readonly" : ""}
              />
            </div>

            <div className="main-form-group">
              <label htmlFor="address">Ünvan</label>
              <input
                id="address"
                type="text"
                {...register("address")}
                readOnly={mode === "view"}
                className={mode === "view" ? "readonly" : ""}
              />
            </div>
            {/* 
            <div className="main-form-group">
              <label htmlFor="workAddress">İş ünvanı</label>
              <input
                id="workAddress"
                type="text"
                {...register('workAddress')}
                readOnly={mode === 'view'}
                className={mode === 'view' ? 'readonly' : ''}
              />
            </div> */}

            <div className="main-form-group">
              <label htmlFor="experience">Təcrübə (il)</label>
              <input
                id="experience"
                type="number"
                {...register("experience")}
                readOnly={mode === "view"}
                className={mode === "view" ? "readonly" : ""}
              />
            </div>

            <div className="main-form-group">
              <label htmlFor="authorities">
                İcazələr <span className="text-red-500">*</span>
              </label>
              <div className="permissions-checklist">
                <Controller
                  name="authorities"
                  control={control}
                  render={({ field }) => (
                    <>
                      {permissionList.map((permission) => (
                        <label key={permission.value}>
                          <input
                            type="checkbox"
                            value={permission.value}
                            checked={field.value.includes(permission.value)}
                            onChange={() => {
                              field.onChange([permission.value]); // replace with single value in array
                            }}
                            disabled={mode === "view"}
                          />
                          {permission.label}
                        </label>
                      ))}
                    </>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        {Object.keys(errors).length > 0 && (
          <div className="error-summary">
            <ul>
              {Object.values(errors).map((error, index) => (
                <li key={index} className="text-red-500 text-xs error-message">
                  {error.message}
                </li>
              ))}
            </ul>
          </div>
        )}
        {mode !== "view" && (
          <div className="main-form-actions">
            <button type="submit" className="btn-submit">
              {mode === "create" ? "Əlavə et" : "Yenilə"}
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={handleCancelButton}>
              Ləğv et
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
export default UserForm;
