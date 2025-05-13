import React, { useRef, useState } from "react";
import "../../assets/style/EmployeesPage/addemployee.css";
import deffaultPFP from "../../assets/images/EmployeesPage/exampleEmployee.png";
import verifyIcon from "../../assets/images/EmployeesPage/verifyProcess.png";
import cancelIcon from "../../assets/images/EmployeesPage/cancelProcess.png";
import useWorkerStore from "../../../stores/workerStore";

function EmployeeAddTest() {
  const { addWorker } = useWorkerStore();
  const [profileImage, setProfileImage] = useState(deffaultPFP);
  const [errors, setErrors] = useState({});

  // Refs for form inputs
  const usernameRef = useRef();
  const nameRef = useRef();
  const surnameRef = useRef();
  const patronymicRef = useRef();
  const finCodeRef = useRef();
  const passwordRef = useRef();
  const colorCodeRef = useRef();
  const dateOfBirthRef = useRef();
  const degreeRef = useRef();
  const phoneRef = useRef();
  const phone2Ref = useRef();
  const phone3Ref = useRef();
  const homePhoneRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const experienceRef = useRef();

  const authorities = [
    "ADMIN",
    "RECEPTIONIST",
    "NURSE",
    "DENTAL_TECHNICIAN",
    "FINANCE_REPORT",
    "WAREHOUSE",
    "DOCTOR_FULL",
    "DOCTOR_LIMITED",
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(deffaultPFP);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!usernameRef.current.value)
      newErrors.username = "İstifadəçi adı tələb olunur";
    if (!nameRef.current.value) newErrors.name = "Ad tələb olunur";
    if (!surnameRef.current.value) newErrors.surname = "Soyad tələb olunur";
    if (!patronymicRef.current.value)
      newErrors.patronymic = "Ata adı tələb olunur";
    if (!document.querySelector('input[name="genderStatus"]:checked'))
      newErrors.genderStatus = "Cinsiyyət tələb olunur";

    // FIN code validation - must be exactly 7 uppercase letters/numbers
    if (!finCodeRef.current.value) {
      newErrors.finCode = "Fin kodu tələb olunur";
    } else if (!/^[A-Z0-9]{7}$/.test(finCodeRef.current.value)) {
      newErrors.finCode =
        "FIN kod yalnız böyük hərflər və rəqəmlərdən ibarət 7 simvol olmalıdır";
    }

    if (!passwordRef.current.value) newErrors.password = "Şifrə tələb olunur";
    if (!dateOfBirthRef.current.value)
      newErrors.dateOfBirth = "Doğum tarixi tələb olunur";
    if (!phoneRef.current.value) newErrors.phone = "Mobil nömrə tələb olunur";
    if (!homePhoneRef.current.value)
      newErrors.homePhone = "Ev telefonu tələb olunur";
    if (!emailRef.current.value) {
      newErrors.email = "E-poçt tələb olunur";
    } else if (!/^\S+@\S+\.\S+$/.test(emailRef.current.value)) {
      newErrors.email = "Yanlış e-poçt formatı";
    }
    if (!addressRef.current.value) newErrors.address = "Ünvan tələb olunur";
    if (!document.querySelector('input[name="authority"]:checked'))
      newErrors.authority = "İcazə növü tələb olunur";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const genderStatus = document.querySelector(
      'input[name="genderStatus"]:checked'
    ).value;
    const authority = document.querySelector(
      'input[name="authority"]:checked'
    ).value;

    const newWorker = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      name: nameRef.current.value,
      surname: surnameRef.current.value,
      patronymic: patronymicRef.current.value,
      finCode: finCodeRef.current.value.toUpperCase(),
      colorCode: colorCodeRef.current.value || "#000000",
      genderStatus,
      dateOfBirth: dateOfBirthRef.current.value,
      degree: degreeRef.current.value || "",
      phone: phoneRef.current.value,
      phone2: phone2Ref.current?.value || "",
      phone3: phone3Ref.current?.value || "",
      homePhone: homePhoneRef.current.value,
      email: emailRef.current.value,
      address: addressRef.current.value,
      experience: experienceRef.current?.value
        ? parseInt(experienceRef.current.value)
        : 0,
      authorities: [authority],
      profileImage,
    };

    try {
      await addWorker(newWorker);
      alert("İşçi uğurla əlavə edildi!");
      // Reset form after successful submission
      // handleCancel();
    } catch (error) {
      alert(
        "Xəta baş verdi: " + (error.response?.data?.message || error.message)
      );
    }
  };

  const handleCancel = () => {
    if (window.confirm("Formu təmizləmək istədiyinizə əminsinizmi?")) {
      const refs = [
        usernameRef,
        nameRef,
        surnameRef,
        patronymicRef,
        finCodeRef,
        passwordRef,
        colorCodeRef,
        dateOfBirthRef,
        degreeRef,
        phoneRef,
        phone2Ref,
        phone3Ref,
        homePhoneRef,
        emailRef,
        addressRef,
        experienceRef,
      ];

      refs.forEach((ref) => {
        if (ref.current) ref.current.value = "";
      });

      const genderRadios = document.querySelectorAll(
        'input[name="genderStatus"]'
      );
      genderRadios.forEach((radio) => (radio.checked = false));

      const authorityRadios = document.querySelectorAll(
        'input[name="authority"]'
      );
      authorityRadios.forEach((radio) => (radio.checked = false));

      if (colorCodeRef.current) colorCodeRef.current.value = "#000000";
      setProfileImage(deffaultPFP);
      setErrors({});
    }
  };

  return (
    <div className="addEmployeeContainer">
      <h1 className="addEmployeeTitle">Yeni işçi əlavə et</h1>
      <div className="addEmployeeTopPart">
        <img src={profileImage} alt="Profil şəkli" />
        <div className="addEmployeeTopPartButtons">
          <input
            type="file"
            id="profileImageUpload"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          <label htmlFor="profileImageUpload" className="addEmployeePFP">
            Şəkil əlavə et
          </label>
          <button
            type="button"
            className="deleteEmployeePFP"
            onClick={handleRemoveImage}>
            Sil
          </button>
        </div>
      </div>
      <div className="addEmployeeFormPart">
        <form onSubmit={handleSubmit} className="addEmployeeForm">
          <div className="addEmployeeFormSectionFirst">
            <div className="addEmployeeFormSectionFirstLeft">
              <div className="addEmployeeDataPart">
                <p className="nameTagForInput">
                  İstifadəçi adı<span className="requiredStar">*</span>
                </p>
                <input type="text" ref={usernameRef} />
                {errors.username && (
                  <span className="error-message">{errors.username}</span>
                )}
              </div>
              <div className="addEmployeeDataPart">
                <p className="nameTagForInput">
                  Adı<span className="requiredStar">*</span>
                </p>
                <input type="text" ref={nameRef} />
                {errors.name && (
                  <span className="error-message">{errors.name}</span>
                )}
              </div>
              <div className="addEmployeeDataPart">
                <p className="nameTagForInput">
                  Soyadı<span className="requiredStar">*</span>
                </p>
                <input type="text" ref={surnameRef} />
                {errors.surname && (
                  <span className="error-message">{errors.surname}</span>
                )}
              </div>
              <div className="addEmployeeDataPart">
                <p className="nameTagForInput">
                  Ata adı<span className="requiredStar">*</span>
                </p>
                <input type="text" ref={patronymicRef} />
                {errors.patronymic && (
                  <span className="error-message">{errors.patronymic}</span>
                )}
              </div>
              <div className="addEmployeeCheckboxGender">
                <label>
                  Cinsiyyəti<span className="requiredStar">*</span>
                </label>
                <div className="inputsForGenders">
                  <div className="malePartSelection">
                    <input type="radio" name="genderStatus" value="MAN" />
                    <p className="genderTitleForAdd">Kişi</p>
                  </div>
                  <div className="femalePartSelection">
                    <input type="radio" name="genderStatus" value="WOMAN" />
                    <p className="genderTitleForAdd">Qadın</p>
                  </div>
                </div>
                {errors.genderStatus && (
                  <span className="error-message">{errors.genderStatus}</span>
                )}
              </div>
              <div className="addEmployeeDataPart">
                <p className="nameTagForInput">
                  Fin kodu<span className="requiredStar">*</span>
                </p>
                <input
                  type="text"
                  ref={finCodeRef}
                  maxLength={7}
                  onChange={(e) => {
                    // Automatically convert to uppercase and remove invalid characters
                    e.target.value = e.target.value
                      .toUpperCase()
                      .replace(/[^A-Z0-9]/g, "");
                  }}
                />
                {errors.finCode && (
                  <span className="error-message">{errors.finCode}</span>
                )}
              </div>
              <div className="addEmployeeDataPart">
                <p className="nameTagForInput">
                  Şifrə<span className="requiredStar">*</span>
                </p>
                <input type="password" ref={passwordRef} />
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </div>
              <div className="addEmployeeDataPart">
                <p className="nameTagForInput">
                  Rəng kodu<span className="requiredStar">*</span>
                </p>
                <input type="color" ref={colorCodeRef} defaultValue="#000000" />
              </div>
              <div className="addEmployeeDataPart">
                <p className="nameTagForInput">
                  Doğum tarixi<span className="requiredStar">*</span>
                </p>
                <input type="date" ref={dateOfBirthRef} />
                {errors.dateOfBirth && (
                  <span className="error-message">{errors.dateOfBirth}</span>
                )}
              </div>
              <div className="addEmployeeDataPart">
                <p className="nameTagForInput">Elmi dərəcəsi</p>
                <input type="text" ref={degreeRef} />
              </div>
              <div className="addEmployeeDataPart">
                <p className="nameTagForInput">Təcrübə (il)</p>
                <input type="number" ref={experienceRef} min="0" />
              </div>
            </div>

            <div className="addEmployeeFormSectionFirstRight">
              <div className="addEmployeeDataPart">
                <p className="nameTagForInput">
                  Mobil nömrə 1<span className="requiredStar">*</span>
                </p>
                <input
                  type="tel"
                  ref={phoneRef}
                  placeholder="(xxx)-xxx-xx-xx"
                />
                {errors.phone && (
                  <span className="error-message">{errors.phone}</span>
                )}
              </div>
              <div className="addEmployeeDataPart">
                <p className="nameTagForInput">Mobil nömrə 2</p>
                <input
                  type="tel"
                  ref={phone2Ref}
                  placeholder="(xxx)-xxx-xx-xx"
                />
              </div>
              <div className="addEmployeeDataPart">
                <p className="nameTagForInput">Mobil nömrə 3</p>
                <input
                  type="tel"
                  ref={phone3Ref}
                  placeholder="(xxx)-xxx-xx-xx"
                />
              </div>
              <div className="addEmployeeDataPart">
                <p className="nameTagForInput">
                  Ev telefonu<span className="requiredStar">*</span>
                </p>
                <input
                  type="tel"
                  ref={homePhoneRef}
                  placeholder="(xxx)-xxx-xx-xx"
                />
                {errors.homePhone && (
                  <span className="error-message">{errors.homePhone}</span>
                )}
              </div>
              <div className="addEmployeeDataPart">
                <p className="nameTagForInput">
                  E-poçt ünvanı<span className="requiredStar">*</span>
                </p>
                <input type="email" ref={emailRef} />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>
              <div className="addEmployeeDataPart">
                <p className="nameTagForInput">
                  Ünvan<span className="requiredStar">*</span>
                </p>
                <input type="text" ref={addressRef} />
                {errors.address && (
                  <span className="error-message">{errors.address}</span>
                )}
              </div>

              <div className="permisionsDataPart">
                <p className="nameTagForInput">
                  İcazələri<span className="requiredStar">*</span>
                </p>
                <div className="permisionsList">
                  {authorities.map((auth, idx) => (
                    <div className="permisionRow" key={idx}>
                      <input type="radio" name="authority" value={auth} />
                      <p className="permisionTitle">{auth}</p>
                    </div>
                  ))}
                </div>
                {errors.authority && (
                  <span className="error-message">{errors.authority}</span>
                )}
              </div>
            </div>
          </div>

          <div className="adddEmployeeFormSubmitionButtons">
            <button
              type="button"
              className="cancelProcessButton"
              onClick={handleCancel}>
              <img src={cancelIcon} alt="Ləğv et" />
              <p>İmtina et</p>
            </button>
            <button type="submit" className="acceptProcessButton">
              <img src={verifyIcon} alt="Təsdiqlə" />
              <p>Yadda saxla</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeAddTest;
