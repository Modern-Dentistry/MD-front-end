import React, { useRef, useState } from 'react';
import "../../assets/style/EmployeesPage/addemployee.css";
import deffaultPFP from "../../assets/images/EmployeesPage/exampleEmployee.png";
import verifyIcon from "../../assets/images/EmployeesPage/verifyProcess.png";
import cancelIcon from "../../assets/images/EmployeesPage/cancelProcess.png";
import useWorkerStore from "../../../stores/ workerStore"; 

function EmployeeAdd() {
  const { addWorker } = useWorkerStore();
  const [profileImage, setProfileImage] = useState(deffaultPFP);
  const [errors, setErrors] = useState({});

  // Refs for form inputs
  const usernameRef = useRef();
  const nameRef = useRef();
  const surnameRef = useRef();
  const fatherNameRef = useRef();
  const finRef = useRef();
  const passwordRef = useRef();
  const colorRef = useRef();
  const birthDateRef = useRef();
  const academicDegreeRef = useRef();
  const mobile1Ref = useRef();
  const mobile2Ref = useRef();
  const mobile3Ref = useRef();
  const homePhoneRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const surgeryRef = useRef();
  const endodonticsRef = useRef();
  const implantologyRef = useRef();
  const orthopedicsRef = useRef();
  const hygieneRef = useRef();
  const therapyRef = useRef();
  const pediatricRef = useRef();
  const periodontologyRef = useRef();
  const orthodonticsRef = useRef();
  const xrayRef = useRef();
  const laserRef = useRef();
  const anesthesiaRef = useRef();
  const passiveRef = useRef();
  const otherRef = useRef();

  const permissions = [
    "TAM İCAZƏ",
    "RESEPSİONİST",
    "TİBB BACISI",
    "DİŞ TEXNİKLƏRİ",
    "MALİYYƏ HESABAT",
    "ANBAR",
    "Həkim tam icazə",
    "Həkim limitli"
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
    
    if (!usernameRef.current.value) newErrors.username = "İstifadəçi adı tələb olunur";
    if (!nameRef.current.value) newErrors.name = "Ad tələb olunur";
    if (!surnameRef.current.value) newErrors.surname = "Soyad tələb olunur";
    if (!fatherNameRef.current.value) newErrors.fatherName = "Ata adı tələb olunur";
    if (!document.querySelector('input[name="gender"]:checked')) newErrors.gender = "Cinsiyyət tələb olunur";
    if (!finRef.current.value) newErrors.fin = "Fin kodu tələb olunur";
    if (!passwordRef.current.value) newErrors.password = "Şifrə tələb olunur";
    if (!birthDateRef.current.value) newErrors.birthDate = "Doğum tarixi tələb olunur";
    if (!mobile1Ref.current.value) newErrors.mobile1 = "Mobil nömrə tələb olunur";
    if (!homePhoneRef.current.value) newErrors.homePhone = "Ev telefonu tələb olunur";
    if (!emailRef.current.value) {
      newErrors.email = "E-poçt tələb olunur";
    } else if (!/^\S+@\S+\.\S+$/.test(emailRef.current.value)) {
      newErrors.email = "Yanlış e-poçt formatı";
    }
    if (!addressRef.current.value) newErrors.address = "Ünvan tələb olunur";
    if (!document.querySelector('input[name="permission"]:checked')) newErrors.permission = "İcazə növü tələb olunur";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
  
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const permission = document.querySelector('input[name="permission"]:checked').value;
  
    // Ad və soyadla avatar linki qur
    const firstName = nameRef.current.value.trim();
    const lastName = surnameRef.current.value.trim();
  
    let finalProfileImage = profileImage;
    if (finalProfileImage === deffaultPFP && firstName && lastName) {
      const fullName = `${firstName}${lastName}`.replace(/\s/g, '');
      finalProfileImage = `https://avatar.iran.liara.run/username?username=${encodeURIComponent(fullName)}`;
    }
  
    const newWorker = {
      username: usernameRef.current.value,
      name: firstName,
      surname: lastName,
      fatherName: fatherNameRef.current.value,
      gender,
      fin: finRef.current.value,
      password: passwordRef.current.value,
      color: colorRef.current.value,
      birthDate: birthDateRef.current.value,
      academicDegree: academicDegreeRef.current.value,
      profileImage: finalProfileImage,
      contacts: {
        mobile1: mobile1Ref.current.value,
        mobile2: mobile2Ref.current?.value || '',
        mobile3: mobile3Ref.current?.value || '',
        homePhone: homePhoneRef.current.value,
        email: emailRef.current.value,
        address: addressRef.current.value
      },
      permissions: permission,
      maxDiscounts: {
        surgery: surgeryRef.current.value || 0,
        endodontics: endodonticsRef.current.value || 0,
        implantology: implantologyRef.current.value || 0,
        orthopedics: orthopedicsRef.current.value || 0,
        hygiene: hygieneRef.current.value || 0,
        therapy: therapyRef.current.value || 0,
        pediatric: pediatricRef.current.value || 0,
        periodontology: periodontologyRef.current.value || 0,
        orthodontics: orthodonticsRef.current.value || 0,
        xray: xrayRef.current.value || 0,
        laser: laserRef.current.value || 0,
        anesthesia: anesthesiaRef.current.value || 0,
        passive: passiveRef.current.value || 0,
        other: otherRef.current.value || 0
      }
    };
  
    try {
      await addWorker(newWorker);
      alert('İşçi uğurla əlavə edildi!');
      // Burada yönləndirmə və ya form sıfırlama ola bilər
    } catch (error) {
      alert('Xəta baş verdi: ' + error.message);
    }
  };
  

  const handleCancel = () => {
    // Reset form or navigate back
    if (window.confirm('Formu təmizləmək istədiyinizə əminsinizmi?')) {
      // Reset all refs
      const refs = [
        usernameRef, nameRef, surnameRef, fatherNameRef, finRef, passwordRef,
        birthDateRef, mobile1Ref, mobile2Ref, mobile3Ref, homePhoneRef,
        emailRef, addressRef, surgeryRef, endodonticsRef, implantologyRef,
        orthopedicsRef, hygieneRef, therapyRef, pediatricRef, periodontologyRef,
        orthodonticsRef, xrayRef, laserRef, anesthesiaRef, passiveRef, otherRef
      ];
      
      refs.forEach(ref => {
        if (ref.current) ref.current.value = '';
      });
      
      // Reset radio buttons
      const genderRadios = document.querySelectorAll('input[name="gender"]');
      genderRadios.forEach(radio => radio.checked = false);
      
      const permissionRadios = document.querySelectorAll('input[name="permission"]');
      permissionRadios.forEach(radio => radio.checked = false);
      
      // Reset color and image
      if (colorRef.current) colorRef.current.value = '#000000';
      setProfileImage(deffaultPFP);
      
      // Clear errors
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
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
          <label htmlFor="profileImageUpload" className='addEmployeePFP'>
            Şəkil əlavə et
          </label>
          <button type='button' className='deleteEmployeePFP' onClick={handleRemoveImage}>
            Sil
          </button>
        </div>
      </div>
      <div className="addEmployeeFormPart">
        <form onSubmit={handleSubmit} className='addEmployeeForm'>
          <div className="addEmployeeFormSectionFirst">
            <div className="addEmployeeFormSectionFirstLeft">
              <div className="addEmployeeDataPart">
                <p className='nameTagForInput'>İstifadəçi adı<span className='requiredStar'>*</span></p>
                <input type="text" ref={usernameRef} />
                {errors.username && <span className="error-message">{errors.username}</span>}
              </div>
              <div className="addEmployeeDataPart">
                <p className='nameTagForInput'>Adı<span className='requiredStar'>*</span></p>
                <input type="text" ref={nameRef} />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              <div className="addEmployeeDataPart">
                <p className='nameTagForInput'>Soyadı<span className='requiredStar'>*</span></p>
                <input type="text" ref={surnameRef} />
                {errors.surname && <span className="error-message">{errors.surname}</span>}
              </div>
              <div className="addEmployeeDataPart">
                <p className='nameTagForInput'>Ata adı<span className='requiredStar'>*</span></p>
                <input type="text" ref={fatherNameRef} />
                {errors.fatherName && <span className="error-message">{errors.fatherName}</span>}
              </div>
              <div className="addEmployeeCheckboxGender">
                <label>Cinsiyyəti<span className='requiredStar'>*</span></label>
                <div className="inputsForGenders">
                  <div className="malePartSelection">
                    <input type="radio" name="gender" value="male" /> 
                    <p className='genderTitleForAdd'>Kişi</p>
                  </div>
                  <div className="femalePartSelection">
                    <input type="radio" name="gender" value="female" /> 
                    <p className='genderTitleForAdd'>Qadın</p>
                  </div>
                </div>
                {errors.gender && <span className="error-message">{errors.gender}</span>}
              </div>
              <div className="addEmployeeDataPart ">
                <p className='nameTagForInput'>Fin kodu<span className='requiredStar'>*</span></p>
                <input className='uppercase' type="text" ref={finRef} />
                {errors.fin && <span className="error-message">{errors.fin}</span>}
              </div>
              <div className="addEmployeeDataPart">
                <p className='nameTagForInput'>Şifrə<span className='requiredStar'>*</span></p>
                <input type="password" ref={passwordRef} />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>
              <div className="addEmployeeDataPart">
                <p className='nameTagForInput'>Rəng kodu<span className='requiredStar'>*</span></p>
                <input type="color" ref={colorRef} defaultValue="#000000" />
              </div>
              <div className="addEmployeeDataPart">
                <p className='nameTagForInput'>Doğum tarixi<span className='requiredStar'>*</span></p>
                <input type="date" ref={birthDateRef} />
                {errors.birthDate && <span className="error-message">{errors.birthDate}</span>}
              </div>
              <div className="addEmployeeDataPart">
                <p className='nameTagForInput'>Elmi dərəcəsi<span className='requiredStar'>*</span></p>
                <select ref={academicDegreeRef}>
                  <option value="">Seçin</option>
                  <option value="Option 1">Option 1</option>
                  <option value="Option 2">Option 2</option>
                  <option value="Option 3">Option 3</option>
                </select>
              </div>
            </div>

            <div className="addEmployeeFormSectionFirstRight">
              <div className="addEmployeeDataPart">
                <p className='nameTagForInput'>Mobil nömrə 1<span className='requiredStar'>*</span></p>
                <input type="tel" ref={mobile1Ref} />
                {errors.mobile1 && <span className="error-message">{errors.mobile1}</span>}
              </div>
              <div className="addEmployeeDataPart">
                <p className='nameTagForInput'>Mobil nömrə 2</p>
                <input type="tel" ref={mobile2Ref} />
              </div>
              <div className="addEmployeeDataPart">
                <p className='nameTagForInput'>Mobil nömrə 3</p>
                <input type="tel" ref={mobile3Ref} />
              </div>
              <div className="addEmployeeDataPart">
                <p className='nameTagForInput'>Ev telefonu<span className='requiredStar'>*</span></p>
                <input type="tel" ref={homePhoneRef} />
                {errors.homePhone && <span className="error-message">{errors.homePhone}</span>}
              </div>
              <div className="addEmployeeDataPart">
                <p className='nameTagForInput'>E-poçt ünvanı<span className='requiredStar'>*</span></p>
                <input type="email" ref={emailRef} />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              <div className="addEmployeeDataPart">
                <p className='nameTagForInput'>Ünvan<span className='requiredStar'>*</span></p>
                <input type="text" ref={addressRef} />
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>

              <div className="permisionsDataPart">
                <p className='nameTagForInput'>İcazələri<span className='requiredStar'>*</span></p>
                <div className="permisionsList">
                  {permissions.map((perm, idx) => (
                    <div className="permisionRow" key={idx}>
                      <input type="radio" name="permission" value={perm} />
                      <p className='permisionTitle'>{perm}</p>
                    </div>
                  ))}
                </div>
                {errors.permission && <span className="error-message">{errors.permission}</span>}
              </div>
            </div>
          </div>

          <div className="addEmployeeDivider" />

          <div className="addEmployeeFormSectionSecond">
            <div className="maxDiscountDataPart">
              <label>Maksimum endirim (Cərrahiyə)</label>
              <input type="number" ref={surgeryRef} min="0" max="100000" />
            </div>
            <div className="maxDiscountDataPart">
              <label>Maksimum endirim (Endodontiya)</label>
              <input type="number" ref={endodonticsRef} min="0" max="100000" />
            </div>
            <div className="maxDiscountDataPart">
              <label>Maksimum endirim (İmplantalogiya)</label>
              <input type="number" ref={implantologyRef} min="0" max="100000" />
            </div>
            <div className="maxDiscountDataPart">
              <label>Maksimum endirim (Ortopediya)</label>
              <input type="number" ref={orthopedicsRef} min="0" max="100000" />
            </div>
            <div className="maxDiscountDataPart">
              <label>Maksimum endirim (Gigiyena)</label>
              <input type="number" ref={hygieneRef} min="0" max="100000" />
            </div>
            <div className="maxDiscountDataPart">
              <label>Maksimum endirim (Terapiya)</label>
              <input type="number" ref={therapyRef} min="0" max="100000" />
            </div>
            <div className="maxDiscountDataPart">
              <label>Maksimum endirim (Uşaq stamatologiyası)</label>
              <input type="number" ref={pediatricRef} min="0" max="100000" />
            </div>
            <div className="maxDiscountDataPart">
              <label>Maksimum endirim (Paradontologiya)</label>
              <input type="number" ref={periodontologyRef} min="0" max="100000" />
            </div>
            <div className="maxDiscountDataPart">
              <label>Maksimum endirim (Ortodontiya)</label>
              <input type="number" ref={orthodonticsRef} min="0" max="100000" />
            </div>
            <div className="maxDiscountDataPart">
              <label>Maksimum endirim (Rentgen)</label>
              <input type="number" ref={xrayRef} min="0" max="100000" />
            </div>
            <div className="maxDiscountDataPart">
              <label>Maksimum endirim (Lazer xidməti)</label>
              <input type="number" ref={laserRef} min="0" max="100000" />
            </div>
            <div className="maxDiscountDataPart">
              <label>Maksimum endirim (Anesteziya)</label>
              <input type="number" ref={anesthesiaRef} min="0" max="100000" />
            </div>
            <div className="maxDiscountDataPart">
              <label>Maksimum endirim (Passiv xidmətlər)</label>
              <input type="number" ref={passiveRef} min="0" max="100000" />
            </div>
            <div className="maxDiscountDataPart">
              <label>Maksimum endirim (Digər)</label>
              <input type="number" ref={otherRef} min="0" max="100000" />
            </div>
          </div>

          <div className="adddEmployeeFormSubmitionButtons">
            <button type='button' className='cancelProcessButton' onClick={handleCancel}>
              <img src={cancelIcon} alt="Ləğv et" />
              <p>İmtina et</p>
            </button>
            <button type='submit' className='acceptProcessButton'>
              <img src={verifyIcon} alt="Təsdiqlə" />
              <p>Yadda saxla</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeAdd;