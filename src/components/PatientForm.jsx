// import React, { useState, useEffect, useRef } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// // import * as yup from "yup";
// import { SketchPicker } from "react-color";
// import { MdColorLens } from "react-icons/md";
// import "../assets/style/form.css";
// import { useNavigate } from "react-router-dom";
// import { usePriceCategories } from "../hooks/usePriceCategories";
// import { useDoctors } from "../hooks/useDoctors.js";
// import usePatientStore from "../../stores/patiendStore.js";
// import CustomDropdown from "./CustomDropdown";


// // const schema = yup.object().shape({
// //   name: yup.string().required("Ad tələb olunur"),
// //   surname: yup.string().required("Soyad tələb olunur"),
// //   patronymic: yup.string().required("Ata adı tələb olunur"),
// //   finCode: yup
// //     .string()
// //     .nullable()
// //     .matches(/^[A-Z0-9]{7}$/, "FIN kod 7 simvoldan ibarət olmalıdır")
// //     .transform((value) => (value === "" ? null : value)),
// //   genderStatus: yup.string().required("Cinsiyyət tələb olunur"),
// //   dateOfBirth: yup
// //     .date()
// //     .max(new Date(), "Doğum tarixi gələcək tarix ola bilməz"),
// //   priceCategoryStatus: yup
// //     .string()
// //     .required("Qiymət kateqoriyası tələb olunur"),
// //   specializationStatus: yup.string().nullable(),
// //   doctor_id: yup.string(),
// //   phone: yup
// //     .string()
// //     .required("Mobil nömrə tələb olunur")
// //     .matches(
// //       /^\(\d{3}\)-\d{3}-\d{4}$/,
// //       "Düzgün mobil nömrə daxil edin (format: (XXX)-XXX-XXXX)"
// //     ),
// //   workPhone: yup
// //     .string()
// //     .nullable()
// //     .transform((value) => (value === "" ? null : value))
// //     .matches(
// //       /^\(\d{3}\)-\d{3}-\d{4}$/,
// //       "Düzgün iş nömrəsi daxil edin (format: (XXX)-XXX-XXXX)"
// //     ),
// //   homePhone: yup
// //     .string()
// //     .nullable()
// //     .transform((value) => (value === "" ? null : value))
// //     .matches(
// //       /^\(\d{3}\)-\d{3}-\d{4}$/,
// //       "Düzgün ev nömrəsi daxil edin (format: (XXX)-XXX-XXXX)"
// //     ),
// //   homeAddress: yup.string(),
// //   workAddress: yup.string(),
// //   email: yup.string().email("Düzgün e-poçt ünvanı daxil edin"),
// //   username: yup.string(),
// //   colorCode: yup.string(),
// //   academicDegree: yup.string(),
// //   permissions: yup.string(),
// //   isVip: yup.boolean(),
// //   isBlacklisted: yup.boolean(),
// //   referredBy: yup.string(),
// //   facebook: yup.string().url("Düzgün Facebook linki daxil edin").nullable(),
// //   instagram: yup.string().url("Düzgün Instagram linki daxil edin").nullable(),
// //   twitter: yup.string().url("Düzgün Twitter linki daxil edin").nullable(),
// // });
 


// const PatientForm = ({ initialData, onSubmit, onCancel, mode = "create" }) => {
//   const [showColorPicker, setShowColorPicker] = useState(false);
//   const colorPickerRef = useRef(null);
//   const navigate = useNavigate();
//   const { data: priceCategories } = usePriceCategories();
//   const { data: doctors } = useDoctors();
//   const { editPatient } = usePatientStore();
  
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//     reset
//   } = useForm({
//     // resolver: yupResolver(schema),
//     defaultValues: {
//       name: "",
//       surname: "",
//       patronymic: "",
//       finCode: "",
//       genderStatus: "",
//       dateOfBirth: "",
//       priceCategoryStatus: "",
//       specializationStatus: "",
//       doctor_id: "",
//       phone: "",
//       workPhone: "",
//       homePhone: "",
//       homeAddress: "",
//       workAddress: "",
//       email: "",
//       userId: "",
//       userImage: "",
//       username: "",
//       colorCode: "",
//       academicDegree: "",
//       mobileNumber1: "",
//       mobileNumber2: "",
//       mobileNumber3: "",
//       whatsappNumber: "",
//       permissions: "",
//       isVip: false,
//       isBlacklisted: false,
//       referredBy: "",
//     }
//   });

//   // Initialize form data when initialData prop changes
//   useEffect(() => {
//     if (initialData) {
//       reset(initialData);
//     }
//   }, [initialData, reset]);

//   // Close picker on outside click
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (
//         colorPickerRef.current &&
//         !colorPickerRef.current.contains(event.target)
//       ) {
//         setShowColorPicker(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleColorChange = (color) => {
//     setValue("colorCode", color.hex);
//   };

//   const onSubmitForm = (data) => {
//     const transformedData = Object.fromEntries(
//       Object.entries(data).map(([key, value]) => [
//         key,
//         value === "" ? null : value,
//       ])
//     );

//     if (onSubmit) {
//       onSubmit(transformedData);
//     }
//   };

//   const handleCancelButton = () => {
//     if (onCancel) {
//       onCancel();
//     } else {
//       navigate(-1);
//     }
//   };

//   return (
//     <div className="main-form-container">
//       <form className="main-form" onSubmit={handleSubmit(onSubmitForm)}>
//         <div className="input-container">
//           <div className="left">
//             <div className="main-form-group">
//               <label htmlFor="name">
//                 Ad <span className="text-red-500">*</span>
//               </label>
//               <input 
//                 id="name" 
//                 type="text" 
//                 {...register("name")} 
//                 className={errors.name ? "error" : ""}
//               />
//               {errors.name && (
//                 <span className="error-message">{errors.name.message}</span>
//               )}
//             </div>
            
//             <div className="main-form-group">
//               <label htmlFor="surname">
//                 Soyad <span className="text-red-500">*</span>
//               </label>
//               <input 
//                 id="surname" 
//                 type="text" 
//                 {...register("surname")} 
//                 className={errors.surname ? "error" : ""}
//               />
//               {errors.surname && (
//                 <span className="error-message">{errors.surname.message}</span>
//               )}
//             </div>

//             <div className="main-form-group">
//               <label htmlFor="patronymic">
//                 Ata adı <span className="text-red-500">*</span>
//               </label>
//               <input 
//                 id="patronymic" 
//                 type="text" 
//                 {...register("patronymic")} 
//                 className={errors.patronymic ? "error" : ""}
//               />
//               {errors.patronymic && (
//                 <span className="error-message">{errors.patronymic.message}</span>
//               )}
//             </div>

//             <div className="main-form-group">
//               <label htmlFor="genderStatus">
//                 Cinsiyyət <span className="text-red-500">*</span>
//               </label>
//               <CustomDropdown
//                 name="genderStatus"
//                 value={watch("genderStatus")}
//                 onChange={(option) => setValue("genderStatus", option.value)}
//                 placeholder="Cins seçin"
//                 options={[
//                   { value: "MAN", label: "Kişi" },
//                   { value: "WOMAN", label: "Qadın" },
//                 ]}
//               />
//               {errors.genderStatus && (
//                 <span className="error-message">{errors.genderStatus.message}</span>
//               )}
//             </div>

//             <div className="main-form-group">
//               <label htmlFor="finCode">FIN kod</label>
//               <input 
//                 id="finCode" 
//                 type="text" 
//                 {...register("finCode")} 
//                 className={errors.finCode ? "error" : ""}
//               />
//               {errors.finCode && (
//                 <span className="error-message">{errors.finCode.message}</span>
//               )}
//             </div>

//             <div className="main-form-group color-selector-group">
//               <label htmlFor="colorCode">Rəng kodu</label>
//               <input
//                 id="colorCode"
//                 type="text"
//                 {...register("colorCode")}
//                 readOnly
//               />
//               {mode !== "view" && (
//                 <span
//                   className="color-icon"
//                   onClick={() => setShowColorPicker(!showColorPicker)}>
//                   <MdColorLens />
//                 </span>
//               )}
//               <span
//                 className="color-swatch"
//                 style={{ backgroundColor: watch("colorCode") }}>
//               </span>

//               {showColorPicker && (
//                 <div ref={colorPickerRef} className="color-picker-dropdown">
//                   <SketchPicker
//                     disableAlpha={true}
//                     color={watch("colorCode")}
//                     onChangeComplete={handleColorChange}
//                   />
//                 </div>
//               )}
//             </div>

//             <div className="main-form-group">
//               <label htmlFor="dateOfBirth">Doğum tarixi</label>
//               <input
//                 id="dateOfBirth"
//                 type="date"
//                 {...register("dateOfBirth")}
//                 className={errors.dateOfBirth ? "error" : ""}
//               />
//               {errors.dateOfBirth && (
//                 <span className="error-message">{errors.dateOfBirth.message}</span>
//               )}
//             </div>

//             <div className="main-form-group">
//               <label htmlFor="priceCategoryStatus">
//                 Qiymət kateqoriyası <span className="text-red-500">*</span>
//               </label>
//               <CustomDropdown
//                 name="priceCategoryStatus"
//                 value={watch("priceCategoryStatus")}
//                 onChange={(option) =>
//                   setValue("priceCategoryStatus", option.value)
//                 }
//                 placeholder="Qiymet kategoriyasini seçin"
//                 options={[
//                   { value: "Standard", label: "Standart" },
//                   { value: "Vip", label: "VIP" },
//                 ]}
//               />
//               {errors.priceCategoryStatus && (
//                 <span className="error-message">{errors.priceCategoryStatus.message}</span>
//               )}
//             </div>

//             <div className="main-form-group">
//               <label htmlFor="specializationStatus">İxtisas</label>
//               <input
//                 id="specializationStatus"
//                 type="text"
//                 {...register("specializationStatus")}
//               />
//             </div>

//             <div className="main-form-group">
//               <label htmlFor="doctor_id">Həkim</label>
//               <CustomDropdown
//                 name="doctor_id"
//                 value={watch("doctor_id")}
//                 onChange={(option) => {
//                   setValue("doctor_id", option.value);
//                 }}
//                 placeholder="Həkim seçin"
//                 options={doctors?.map((doctor) => ({
//                   value: doctor.doctorId,
//                   label: `${doctor.name} ${doctor.surname}`,
//                 }))}
//               />
//             </div>

//             <div className="main-form-group permissions-checklist">
//               <label>
//                 <input type="checkbox" {...register("isVip")} />
//                 VIP
//               </label>
//             </div>

//             <div className="main-form-group permissions-checklist">
//               <label>
//                 <input type="checkbox" {...register("isBlacklisted")} />
//                 Qara siyahı
//               </label>
//             </div>
//           </div>

//           <div className="right">
//             <div className="main-form-group">
//               <label htmlFor="phone">
//                 Mobil nömrə <span className="text-red-500">*</span>
//               </label>
//               <input 
//                 id="phone" 
//                 type="tel" 
//                 {...register("phone")} 
//                 className={errors.phone ? "error" : ""}
//               />
//               {errors.phone && (
//                 <span className="error-message">{errors.phone.message}</span>
//               )}
//             </div>

//             <div className="main-form-group">
//               <label htmlFor="workPhone">İş telefonu</label>
//               <input 
//                 id="workPhone" 
//                 type="tel" 
//                 {...register("workPhone")} 
//                 className={errors.workPhone ? "error" : ""}
//               />
//               {errors.workPhone && (
//                 <span className="error-message">{errors.workPhone.message}</span>
//               )}
//             </div>

//             <div className="main-form-group">
//               <label htmlFor="homePhone">Ev telefonu</label>
//               <input 
//                 id="homePhone" 
//                 type="tel" 
//                 {...register("homePhone")} 
//                 className={errors.homePhone ? "error" : ""}
//               />
//               {errors.homePhone && (
//                 <span className="error-message">{errors.homePhone.message}</span>
//               )}
//             </div>

//             <div className="main-form-group">
//               <label htmlFor="whatsappNumber">WhatsApp nömrəsi</label>
//               <input
//                 id="whatsappNumber"
//                 type="tel"
//                 {...register("whatsappNumber")}
//               />
//             </div>

//             <div className="main-form-group">
//               <label htmlFor="email">E-poçt ünvanı</label>
//               <input 
//                 id="email" 
//                 type="email" 
//                 {...register("email")} 
//                 className={errors.email ? "error" : ""}
//               />
//               {errors.email && (
//                 <span className="error-message">{errors.email.message}</span>
//               )}
//             </div>

//             <div className="main-form-group">
//               <label htmlFor="homeAddress">Ev ünvanı</label>
//               <input
//                 id="homeAddress"
//                 type="text"
//                 {...register("homeAddress")}
//               />
//             </div>

//             <div className="main-form-group">
//               <label htmlFor="workAddress">İş ünvanı</label>
//               <input
//                 id="workAddress"
//                 type="text"
//                 {...register("workAddress")}
//               />
//             </div>
//           </div>
//         </div>
        
//         <div className="main-form-actions">
//           <button type="submit" className="btn-submit">
//             {mode === "create" ? "Yarat" : "Yadda Saxla"}
//           </button>
//           <button
//             type="button"
//             className="btn-cancel"
//             onClick={handleCancelButton}>
//             Ləğv et
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PatientForm;