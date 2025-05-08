import React, { useRef, useState } from "react";
import "../../assets/style/PatientsPage/addpatient.css";

import cancelButton from  "../../assets/images/EmployeesPage/cancelProcess.png"
import verifyButton from  "../../assets/images/EmployeesPage/verifyProcess.png"

const doctorsList = [
  { id: 1, name: "Dr. Ali Məmmədov" },
  { id: 2, name: "Dr. Nigar Həsənova" },
  { id: 3, name: "Dr. Kamran İsmayılov" },
];

const priceCategories = [
  { id: 1, name: "A - Yüksək qiymət" },
  { id: 2, name: "B - Orta qiymət" },
  { id: 3, name: "C - Aşağı qiymət" },
];

const blacklistOptions = [
  { id: 1, name: "Problemli pasiyent" },
  { id: 2, name: "Normal pasiyent" },
];

const PatientAdd = () => {
  const nameRef = useRef();
  const surnameRef = useRef();
  const fatherNameRef = useRef();
  const finRef = useRef();
  const genderMaleRef = useRef();
  const genderFemaleRef = useRef();
  const birthDateRef = useRef();
  const priceCategoryRef = useRef();
  const specializationRef = useRef();
  const doctorRef = useRef();
  const vipRef = useRef();
  const blacklistCheckRef = useRef();
  const blacklistCategoryRef = useRef();
  const mobile1Ref = useRef();
  const whatsappRef = useRef();
  const workPhoneRef = useRef();
  const homePhoneRef = useRef();
  const emailRef = useRef();
  const homeAddressRef = useRef();
  const workAddressRef = useRef();
  const recommenderRef = useRef();
  const facebookRef = useRef();
  const instagramRef = useRef();
  const twitterRef = useRef();

  const [isBlacklisted, setIsBlacklisted] = useState(false);

  const handleSubmit = () => {
    if (isBlacklisted && !blacklistCategoryRef.current.value || !nameRef.current.value || !surnameRef.current.value || !fatherNameRef.current.value || !genderFemaleRef.current.value || !genderMaleRef.current.value || !priceCategoryRef.current.value || !mobile1Ref.current.value ) {
      return;
    }

    const data = {
      name: nameRef.current.value,
      surname: surnameRef.current.value,
      fatherName: fatherNameRef.current.value,
      fin: finRef.current.value,
      gender: genderMaleRef.current.checked ? "Kişi" : genderFemaleRef.current.checked ? "Qadın" : "",
      birthDate: birthDateRef.current.value,
      priceCategory: priceCategoryRef.current.value,
      specialization: specializationRef.current.value,
      doctor: doctorRef.current.value,
      vip: vipRef.current.checked,
      isBlacklisted: blacklistCheckRef.current.checked,
      blacklistCategory: blacklistCategoryRef.current.value,
      mobile1: mobile1Ref.current.value,
      whatsapp: whatsappRef.current.value,
      workPhone: workPhoneRef.current.value,
      homePhone: homePhoneRef.current.value,
      email: emailRef.current.value,
      homeAddress: homeAddressRef.current.value,
      workAddress: workAddressRef.current.value,
      recommender: recommenderRef.current.value,
      facebook: facebookRef.current.value,
      instagram: instagramRef.current.value,
      twitter: twitterRef.current.value,
    };

    console.log("Form Data:", data);
  };

  return (
    <>
      <div className="patientsGroupWrapper">
        <div className="patientsGroupContainer">

        <div className="patientsGroupLeft">
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Adı <span className="patientsGroupRequired">*</span></label>
            <input type="text" ref={nameRef} className="patientsGroupInputText" />
          </div>
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Soyadı <span className="patientsGroupRequired">*</span></label>
            <input type="text" ref={surnameRef} className="patientsGroupInputText" />
          </div>
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Ata adı <span className="patientsGroupRequired">*</span></label>
            <input type="text" ref={fatherNameRef} className="patientsGroupInputText" />
          </div>
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Fin kodu</label>
            <input type="text" ref={finRef} className="patientsGroupInputText" />
          </div>
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Cinsiyyət <span className="patientsGroupRequired">*</span></label>
            <div className="patientsGroupGender">
              <label><input type="radio" name="gender" ref={genderMaleRef} className="patientsGroupCheckbox" /> Kişi</label>
              <label><input type="radio" name="gender" ref={genderFemaleRef} className="patientsGroupCheckbox" /> Qadın</label>
            </div>
          </div>
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Doğum tarixi</label>
            <input type="date" ref={birthDateRef} className="patientsGroupInputDate" />
          </div>
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Qiymət kateqoriyası <span className="patientsGroupRequired">*</span></label>
            <select ref={priceCategoryRef} className="patientsGroupSelect">
              <option value="">seçin</option>
              {priceCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">İxtisası</label>
            <input type="text" ref={specializationRef} className="patientsGroupInputText" />
          </div>
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Həkimi</label>
            <select ref={doctorRef} className="patientsGroupSelect">
              <option value="">seçin</option>
              {doctorsList.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">VIP</label>
            <input type="checkbox" ref={vipRef} className="patientsGroupCheckbox" />
          </div>
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Qara siyahı</label>
            <div className="patientsGroupBlacklist">
              <input
                type="checkbox"
                ref={blacklistCheckRef}
                className="patientsGroupCheckbox"
                onChange={() => setIsBlacklisted(!isBlacklisted)}
              />
              <select
                ref={blacklistCategoryRef}
                className="patientsGroupBlacklistSelect"
                disabled={!isBlacklisted}
              >
                <option value="">seçin</option>
                {blacklistOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="patientsGroupRight">
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Mobil nömrə 1 <span className="patientsGroupRequired">*</span></label>
            <input type="number" ref={mobile1Ref} className="patientsGroupInputText" />
          </div>
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Whatsapp nömrəsi</label>
            <input type="number" ref={whatsappRef} className="patientsGroupInputText" />
          </div>
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">İş telefonu</label>
            <input type="number" ref={workPhoneRef} className="patientsGroupInputText" />
          </div>
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Ev telefonu</label>
            <input type="number" ref={homePhoneRef} className="patientsGroupInputText" />
          </div>
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">E-poçt ünvanı</label>
            <input type="email" ref={emailRef} className="patientsGroupInputText" />
          </div>
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Ev ünvanı</label>
            <input type="text" ref={homeAddressRef} className="patientsGroupInputText" />
          </div>
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">İş ünvanı</label>
            <input type="text" ref={workAddressRef} className="patientsGroupInputText" />
          </div>
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Tövsiyə edən <span className="patientsGroupRequired">*</span></label>
            <input type="text" ref={recommenderRef} className="patientsGroupInputText" />
          </div>
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Facebook</label>
            <input type="text" ref={facebookRef} className="patientsGroupInputText" />
          </div>
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Instagram</label>
            <input type="text" ref={instagramRef} className="patientsGroupInputText" />
          </div>
          <div className="patientsGroupField">
            <label className="patientsGroupLabel">Twitter</label>
            <input type="text" ref={twitterRef} className="patientsGroupInputText" />
          </div>
        </div>
      </div>
      <div className="submitAddPatientForm">
          <p className="addPatientCancelButton">
            <img src={cancelButton} className="addPatientCancelBTN"/>
            İmtina et
          </p>
          <p className="addPatientVerifyButton">
            <img src={verifyButton} onClick={handleSubmit} className="addPatientVerifyBTN"/>
            Yadda saxla
          </p>
      </div>
      </div>
    </>
  );
};

export default PatientAdd;
