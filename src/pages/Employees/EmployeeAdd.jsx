import React, { useRef } from 'react'

// Style
import "../../assets/style/EmployeesPage/addemployee.css"

// Images
import deffaultPFP from "../../assets/images/EmployeesPage/exampleEmployee.png"
import verifyIcon from "../../assets/images/EmployeesPage/verifyProcess.png"
import cancelIcon from "../../assets/images/EmployeesPage/cancelProcess.png"

function EmployeeAdd() {
  // Refs for Section First Left
  const usernameRef = useRef();
  const nameRef = useRef();
  const surnameRef = useRef();
  const fatherNameRef = useRef();
  const finRef = useRef();
  const passwordRef = useRef();
  const colorRef = useRef();
  const birthDateRef = useRef();
  const academicDegreeRef = useRef();

  // Refs for Section First Right
  const mobile1Ref = useRef();
  const mobile2Ref = useRef();
  const mobile3Ref = useRef();
  const homePhoneRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();

  // Refs for Discount Section
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

  // Permissions List (declare and map)
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

  return (
    <>
      <div className="addEmployeeContainer">
        <h1 className="addEmployeeTitle">Yeni işçi əlavə et</h1>
        <div className="addEmployeeTopPart">
          <img src={deffaultPFP} alt="Profil şəkli" />
          <div className="addEmployeeTopPartButtons">
            <button type='button' className='addEmployeePFP'>Şəkil əlavə et</button>
            <button type='button' className='deleteEmployeePFP'>Sil</button>
          </div>
        </div>
        <div className="addEmployeeFormPart">
          <form action="" className='addEmployeeForm'>
            <div className="addEmployeeFormSectionFirst">
              <div className="addEmployeeFormSectionFirstLeft">
                <div className="addEmployeeDataPart">
                  <p className='nameTagForInput'>İstifadəçi adı<span className='requiredStar'>*</span></p>
                  <input type="text" ref={usernameRef} />
                </div>
                <div className="addEmployeeDataPart">
                  <p className='nameTagForInput'>Adı<span className='requiredStar'>*</span></p>
                  <input type="text" ref={nameRef} />
                </div>
                <div className="addEmployeeDataPart">
                  <p className='nameTagForInput'>Soyadı<span className='requiredStar'>*</span></p>
                  <input type="text" ref={surnameRef} />
                </div>
                <div className="addEmployeeDataPart">
                  <p className='nameTagForInput'>Ata adı<span className='requiredStar'>*</span></p>
                  <input type="text" ref={fatherNameRef} />
                </div>
                <div className="addEmployeeCheckboxGender">
                  <label>Cinsiyyəti<span className='requiredStar'>*</span></label>
                  <div className="inputsForGenders">
                    <div className="malePartSelection">
                      <input type="radio" name="gender" value="male" /> <p className='genderTitleForAdd'>Kişi</p>
                    </div>
                    <div className="femalePartSelection">
                      <input type="radio" name="gender" value="female" /> <p className='genderTitleForAdd'>Qadın</p>
                    </div>
                  </div>
                </div>
                <div className="addEmployeeDataPart">
                  <p className='nameTagForInput'>Fin kodu<span className='requiredStar'>*</span></p>
                  <input type="text" ref={finRef} />
                </div>
                <div className="addEmployeeDataPart">
                  <p className='nameTagForInput'>Şifrə<span className='requiredStar'>*</span></p>
                  <input type="password" ref={passwordRef} />
                </div>
                <div className="addEmployeeDataPart">
                  <p className='nameTagForInput'>Rəng kodu<span className='requiredStar'>*</span></p>
                  <input type="color" ref={colorRef} />
                </div>
                <div className="addEmployeeDataPart">
                  <p className='nameTagForInput'>Doğum tarixi<span className='requiredStar'>*</span></p>
                  <input type="date" ref={birthDateRef} />
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
                </div>
                <div className="addEmployeeDataPart">
                  <p className='nameTagForInput'>E-poçt ünvanı<span className='requiredStar'>*</span></p>
                  <input type="email" ref={emailRef} />
                </div>
                <div className="addEmployeeDataPart">
                  <p className='nameTagForInput'>Ünvan<span className='requiredStar'>*</span></p>
                  <input type="text" ref={addressRef} />
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
                </div>
              </div>
            </div>

            <div className="addEmployeeDivider" />

            <div className="addEmployeeFormSectionSecond">
              <div className="maxDiscountDataPart">
                <label>Maksimum endirim (Cərrahiyə)</label>
                <input type="number" ref={surgeryRef} />
              </div>
              <div className="maxDiscountDataPart">
                <label>Maksimum endirim (Endodontiya)</label>
                <input type="number" ref={endodonticsRef} />
              </div>
              <div className="maxDiscountDataPart">
                <label>Maksimum endirim (İmplantalogiya)</label>
                <input type="number" ref={implantologyRef} />
              </div>
              <div className="maxDiscountDataPart">
                <label>Maksimum endirim (Ortopediya)</label>
                <input type="number" ref={orthopedicsRef} />
              </div>
              <div className="maxDiscountDataPart">
                <label>Maksimum endirim (Gigiyena)</label>
                <input type="number" ref={hygieneRef} />
              </div>
              <div className="maxDiscountDataPart">
                <label>Maksimum endirim (Terapiya)</label>
                <input type="number" ref={therapyRef} />
              </div>
              <div className="maxDiscountDataPart">
                <label>Maksimum endirim (Uşaq stamatologiyası)</label>
                <input type="number" ref={pediatricRef} />
              </div>
              <div className="maxDiscountDataPart">
                <label>Maksimum endirim (Paradontologiya)</label>
                <input type="number" ref={periodontologyRef} />
              </div>
              <div className="maxDiscountDataPart">
                <label>Maksimum endirim (Ortodontiya)</label>
                <input type="number" ref={orthodonticsRef} />
              </div>
              <div className="maxDiscountDataPart">
                <label>Maksimum endirim (Rentgen)</label>
                <input type="number" ref={xrayRef} />
              </div>
              <div className="maxDiscountDataPart">
                <label>Maksimum endirim (Lazer xidməti)</label>
                <input type="number" ref={laserRef} />
              </div>
              <div className="maxDiscountDataPart">
                <label>Maksimum endirim (Lazer xidməti)</label>
                <input type="number" ref={laserRef} />
              </div>
              <div className="maxDiscountDataPart">
                <label>Maksimum endirim (Anesteziya)</label>
                <input type="number" ref={anesthesiaRef} />
              </div>
              <div className="maxDiscountDataPart">
                <label>Maksimum endirim (Passiv xidmətlər)</label>
                <input type="number" ref={passiveRef} />
              </div>
              <div className="maxDiscountDataPart">
                <label>Maksimum endirim (Digər)</label>
                <input type="number" ref={otherRef} />
              </div>
            </div>

            <div className="adddEmployeeFormSubmitionButtons">
              <button type='button' className='cancelProcessButton'>
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
    </>
  )
}

export default EmployeeAdd;
