import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useWorkersScheduleStore from "../../../stores/workersScheduleStore";

import "../../assets/style/EmployeesPage/employeeworkscheduleadd.css";

import acceptProcess from "../../assets/images/EmployeesPage/verifyProcess.png";
import cancelProcess from "../../assets/images/EmployeesPage/cancelProcess.png";

function EmployeeWorkScheduleEdit() {
  const { id } = useParams(); // burada id schedule id-dir (məsələn 4)
  const navigate = useNavigate();

  const { schedules, updateSchedule, fetchSchedules, removeSchedule } =
    useWorkersScheduleStore();

  // Form üçün state-lər
  const [weekDay, setWeekDay] = useState("");
  const [room, setRoom] = useState("");
  const [startTime, setStartTime] = useState("");
  const [finishTime, setFinishTime] = useState("");

  const daysOfWeek = [
    { value: "MONDAY", label: "Bazar ertəsi" },
    { value: "TUESDAY", label: "Çərşənbə axşamı" },
    { value: "WEDNESDAY", label: "Çərşənbə" },
    { value: "THURSDAY", label: "Cümə axşamı" },
    { value: "FRIDAY", label: "Cümə" },
    { value: "SATURDAY", label: "Şənbə" },
    { value: "SUNDAY", label: "Bazar" },
  ];

  const rooms = [
    "STOM1",
    "STOM2",
    "STOM3",
    "STOM4",
    "STOM5",
    "STOM6",
    "STOM7",
    "STOM8",
  ];

  // Komponent mount olanda mövcud məlumatı yüklə
  useEffect(() => {
    // Əgər artıq bütün schedule-lər yüklənibsə, id-ə uyğun olanı tap
    if (schedules.length === 0) {
      fetchSchedules();
    } else {
      const sched = schedules.find((s) => s.id.toString() === id);
      if (sched) {
        setWeekDay(sched.weekDay);
        setRoom(sched.room);
        setStartTime(sched.startTime.slice(0, 5)); // 12:21:00 => 12:21
        setFinishTime(sched.finishTime.slice(0, 5));
      }
    }
  }, [id, schedules, fetchSchedules]);

  // Form göndərmə funksiyası
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!weekDay || !room) {
      alert("Zəhmət olmasa, bütün * işarəli xanaları doldurun.");
      return;
    }

    const updatedData = {
      id: Number(id),
      weekDay,
      room,
      startTime: startTime + ":00", // vaxtı backendə 12:21:00 formatında göndər
      finishTime: finishTime + ":00",
    };

    updateSchedule(updatedData);
    navigate(`/employees/work-schedule/${id}`);
  };

  // Silmə funksiyası
  const handleDelete = () => {
    if (window.confirm("Qrafiki silmək istədiyinizə əminsiniz?")) {
      removeSchedule(Number(id)); // store-da bu funksiya olmalıdır
      navigate(`/employees/work-schedule/${id}`);
    }
  };

  return (
    <div className="employeeWorkScheduleAddContainer">
      <form className="employeeWorkScheduleAdd" onSubmit={handleSubmit}>
        <div className="employeeWorkScheduleAddWrapper">
          <div className="employeeWorkScheduleAddRow">
            <p className="employeeWorkScheduleAddRowTitle">
              Həftənin günü{" "}
              <span className="requiredStarForEmployeeAdd">*</span>
            </p>
            <select
              value={weekDay}
              onChange={(e) => setWeekDay(e.target.value)}
              required>
              <option value="">Seçin</option>
              {daysOfWeek.map((day) => (
                <option key={day.value} value={day.value}>
                  {day.label}
                </option>
              ))}
            </select>
          </div>
          <div className="employeeWorkScheduleAddRow">
            <p className="employeeWorkScheduleAddRowTitle">
              Kabinet <span className="requiredStarForEmployeeAdd">*</span>
            </p>
            <select
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              required>
              <option value="">Seçin</option>
              {rooms.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <div className="employeeWorkScheduleAddRow">
            <p className="employeeWorkScheduleAddRowTitle">Başlama saatı</p>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className="employeeWorkScheduleAddRow">
            <p className="employeeWorkScheduleAddRowTitle">Bitiş saatı</p>
            <input
              type="time"
              value={finishTime}
              onChange={(e) => setFinishTime(e.target.value)}
            />
          </div>
        </div>

        <div
          className="employeeWorkScheduleAddActionsButtons"
          style={{ display: "flex", gap: "1rem" }}>
          <button
            type="button"
            className="employeeAddCancelProcess"
            onClick={() => navigate("/employees/work-schedule")}>
            <img src={cancelProcess} alt="İmtina et" />
            İmtina et
          </button>

          <button type="submit" className="employeeAddAcceptProcess">
            <img src={acceptProcess} alt="Yadda saxla" />
            Yadda saxla
          </button>

          {/* Yeni əlavə etdiyimiz silmək düyməsi */}
          <button
            type="button"
            onClick={handleDelete}
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}>
            Qrafiki Sil
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeWorkScheduleEdit;
