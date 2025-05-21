import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OrdinaryListHeader from "../../components/OrdinaryList/OrdinaryListHeader";
import { FiEdit3 } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import useWorkersScheduleStore from "../../../stores/workersScheduleStore";

import "../../assets/style/EmployeesPage/employeeworkschedulelist.css";

function LoadingSpinner() {
  return (
    <div className="flex-col gap-4 w-full flex items-center justify-center">
      <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
        <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
      </div>
    </div>
  );
}

function EmployeeWorkScheduleList() {
  const navigate = useNavigate();

  const { id } = useParams();

  const {
    schedules,
    loading,
    error,
    fetchSchedules,
    removeSchedule,
    searchSchedules,
  } = useWorkersScheduleStore();

  const [selectedDay, setSelectedDay] = useState("");

  const days = [
    { num: "1", backend: "MONDAY", label: "Bazar ertəsi" },
    { num: "2", backend: "TUESDAY", label: "Çərşənbə axşamı" },
    { num: "3", backend: "WEDNESDAY", label: "Çərşənbə" },
    { num: "4", backend: "THURSDAY", label: "Cümə axşamı" },
    { num: "5", backend: "FRIDAY", label: "Cümə" },
    { num: "6", backend: "SATURDAY", label: "Şənbə" },
    { num: "7", backend: "SUNDAY", label: "Bazar" },
  ];

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  // Filtrlənmiş massiv: userId = URL parametri id olanların siyahısı
  let filtered = schedules.filter(sched => String(sched.userId) === String(id));

  // Əgər selectedDay seçilibsə, ona görə də filtrlə
  if (selectedDay !== "") {
    const dayObj = days.find((d) => d.num === selectedDay);
    if (dayObj) {
      filtered = filtered.filter(sched => sched.weekDay === dayObj.backend);
    }
  }

  const editSchedule = (item) => {
    const scheduleId = typeof item === "object" ? item.id : item;
    navigate(`/employees/work-schedule/${scheduleId}/edit`);
  };

  const deleteSchedule = (schedule) => {
    if (window.confirm("Qrafiki silmək istədiyinizə əminsiniz?")) {
      removeSchedule(schedule.id);
    }
  };

  const icons = [
    {
      icon: FiEdit3,
      action: editSchedule,
      className: "edit",
    },
    {
      icon: GoTrash,
      action: deleteSchedule,
      className: "delete",
    },
  ];

  return (
    <div className="employeeWorkScheduleList">
      <OrdinaryListHeader
        title="İş qrafiki"
        addText="Yenisini əlavə et"
        addLink={`/employees/work-schedule/${id}/add`}
        exportLink="/employees/export"
      />

      <div className="employeeWorkScheduleListTopPart">
        <select
          className="daysOfWeekForList"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        >
          <option value="">Həftənin Günü</option>
          {days.map((d) => (
            <option key={d.num} value={d.num}>
              {d.label}
            </option>
          ))}
        </select>
      </div>

      {loading && <LoadingSpinner />}
      {error && <p className="errorText">Xəta baş verdi: {error.message}</p>}

      {!loading && filtered.length === 0 && <p>İş qrafiki tapılmadı.</p>}

      {!loading && filtered.length > 0 && (
        <div className="employeeWorkScheduleListTableWrapper">
          <table className="employeeWorkScheduleListTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Həftənin Günü</th>
                <th>Kabinet</th>
                <th>Başlama saatı</th>
                <th>Bitiş saatı</th>
                <th>Düzəliş</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((sched) => (
                <tr key={sched.id}>
                  <td>{sched.id}</td>
                  <td>{formatWeekDay(sched.weekDay)}</td>
                  <td>{sched.room}</td>
                  <td>{formatTime(sched.startTime)}</td>
                  <td>{formatTime(sched.finishTime)}</td>
                  <td className="employeeScheduleIcons">
                    {icons.map(({ icon: Icon, action, className }, idx) => (
                      <Icon
                        key={idx}
                        className={className}
                        onClick={() => action(sched)}
                      />
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function formatWeekDay(day) {
  const daysMap = {
    MONDAY: "Bazar ertəsi",
    TUESDAY: "Çərşənbə axşamı",
    WEDNESDAY: "Çərşənbə",
    THURSDAY: "Cümə axşamı",
    FRIDAY: "Cümə",
    SATURDAY: "Şənbə",
    SUNDAY: "Bazar",
  };
  return daysMap[day] || day;
}

function formatTime(timeStr) {
  return timeStr ? timeStr.slice(0, 5) : "";
}

export default EmployeeWorkScheduleList;
