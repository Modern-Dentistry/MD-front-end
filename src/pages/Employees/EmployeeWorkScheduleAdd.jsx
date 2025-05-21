import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../../assets/style/EmployeesPage/employeeworkscheduleadd.css";
import acceptProcess from "../../assets/images/EmployeesPage/verifyProcess.png";
import cancelProcess from "../../assets/images/EmployeesPage/cancelProcess.png";
import useWorkersScheduleStore from "../../../stores/workersScheduleStore";

function EmployeeWorkScheduleAdd() {
  const { id } = useParams(); // URL-dən işçi ID-ni alırıq
  const navigate = useNavigate();
  const { addSchedule } = useWorkersScheduleStore();

  const [formData, setFormData] = useState({
    weekDay: "",
    room: "",
    startTime: "",
    finishTime: ""
  });

  const [errors, setErrors] = useState({
    weekDay: false,
    room: false
  });

  const həftəninGünləri = [
    { value: "MONDAY", label: "Bazar ertəsi" },
    { value: "TUESDAY", label: "Çərşənbə axşamı" },
    { value: "WEDNESDAY", label: "Çərşənbə" },
    { value: "THURSDAY", label: "Cümə axşamı" },
    { value: "FRIDAY", label: "Cümə" },
    { value: "SATURDAY", label: "Şənbə" },
    { value: "SUNDAY", label: "Bazar" },
  ];

  const kabinetlər = [
    { value: "STOM1" },
    { value: "STOM2" },
    { value: "STOM3" },
    { value: "STOM4" },
    { value: "STOM5" },
    { value: "STOM6" },
    { value: "STOM7" },
    { value: "STOM8" },
  ];

  const dəyişiklikləriİdarəEt = (e) => {
    const { name, value } = e.target;
    setFormData(əvvəlki => ({
      ...əvvəlki,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(əvvəlki => ({
        ...əvvəlki,
        [name]: false
      }));
    }
  };

  const formuYoxla = () => {
    const yeniXətalar = {
      weekDay: !formData.weekDay,
      room: !formData.room
    };
    
    setErrors(yeniXətalar);
    return !Object.values(yeniXətalar).some(xəta => xəta);
  };

  const göndər = () => {
    if (!formuYoxla()) return;

    const işQrafikiMəlumatları = {
      weekDay: formData.weekDay,
      room: formData.room,
      userId: id,
      startTime: formData.startTime + ":00",
      finishTime: formData.finishTime + ":00"
    };

    addSchedule(işQrafikiMəlumatları)
      .then(() => {
        toast.success("İş qrafiki uğurla əlavə edildi!");
        navigate(`/employees/work-schedule/${id}`);
      })
      .catch(xəta => {
        console.error("İş qrafiki əlavə edilərkən xəta:", xəta);
        toast.error("İş qrafiki əlavə edilərkən xəta baş verdi!");
      });
  };

  const ləğvEt = () => {
    navigate(`/employees/work-schedule/${id}`);
  };

  return (
    <div className="employeeWorkScheduleAddContainer">
      <div className="employeeWorkScheduleAdd">
        <div className="employeeWorkScheduleAddWrapper">
          <div className="employeeWorkScheduleAddRow">
            <p className="employeeWorkScheduleAddRowTitle">
              Həftənin günü <span className="requiredStarForEmployeeAdd">*</span>
            </p>
            <select
              name="weekDay"
              value={formData.weekDay}
              onChange={dəyişiklikləriİdarəEt}
              className={errors.weekDay ? "error" : ""}
            >
              <option value="">Seçin</option>
              {həftəninGünləri.map((gün) => (
                <option key={gün.value} value={gün.value}>
                  {gün.label}
                </option>
              ))}
            </select>
            {errors.weekDay && <span className="error-message">Bu sahə mütləq doldurulmalıdır</span>}
          </div>
          
          <div className="employeeWorkScheduleAddRow">
            <p className="employeeWorkScheduleAddRowTitle">
              Kabinet <span className="requiredStarForEmployeeAdd">*</span>
            </p>
            <select
              name="room"
              value={formData.room}
              onChange={dəyişiklikləriİdarəEt}
              className={errors.room ? "error" : ""}
            >
              <option value="">Seçin</option>
              {kabinetlər.map((kabinet) => (
                <option key={kabinet.value} value={kabinet.value}>
                  {kabinet.value}
                </option>
              ))}
            </select>
            {errors.room && <span className="error-message">Bu sahə mütləq doldurulmalıdır</span>}
          </div>
          
          <div className="employeeWorkScheduleAddRow">
            <p className="employeeWorkScheduleAddRowTitle">Başlama saatı</p>
            <input 
              type="time" 
              name="startTime"
              value={formData.startTime}
              onChange={dəyişiklikləriİdarəEt}
            />
          </div>
          
          <div className="employeeWorkScheduleAddRow">
            <p className="employeeWorkScheduleAddRowTitle">Bitmə saatı</p>
            <input 
              type="time" 
              name="finishTime"
              value={formData.finishTime}
              onChange={dəyişiklikləriİdarəEt}
            />
          </div>
        </div>

        <div className="employeeWorkScheduleAddActionsButtons">
          <button 
            type="button" 
            className="employeeAddCancelProcess"
            onClick={ləğvEt}
          >
            <img src={cancelProcess} alt="Ləğv et" />
            İmtina et
          </button>
          <button 
            type="button" 
            className="employeeAddAcceptProcess"
            onClick={göndər}
          >
            <img src={acceptProcess} alt="Yadda saxla" />
            Yadda saxla
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeWorkScheduleAdd;
