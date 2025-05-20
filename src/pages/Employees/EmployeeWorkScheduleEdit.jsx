// Style
import "../../assets/style/EmployeesPage/employeeworkscheduleadd.css"

// Images
import acceptProcess from "../../assets/images/EmployeesPage/verifyProcess.png"
import cancelProcess from "../../assets/images/EmployeesPage/cancelProcess.png"

function EmployeeWorkScheduleEdit() {
  const daysOfWeek = [
    { value: "MONDAY", label: "Bazar ertəsi" },
    { value: "TUESDAY", label: "Çərşənbə axşamı" },
    { value: "WEDNESDAY", label: "Çərşənbə" },
    { value: "THURSDAY", label: "Cümə axşamı" },
    { value: "FRIDAY", label: "Cümə" },
    { value: "SATURDAY", label: "Şənbə" },
    { value: "SUNDAY", label: "Bazar" }
  ];

  const rooms = [
    { room: "STOM1" },
    { room: "STOM2" },
    { room: "STOM3" },
    { room: "STOM4" },
    { room: "STOM5" },
    { room: "STOM6" },
    { room: "STOM7" },
    { room: "STOM8" }
  ];

  return (
    <>
      <div className="employeeWorkScheduleAddContainer">
        <div className="employeeWorkScheduleAdd">
          <div className="employeeWorkScheduleAddWrapper">
            <div className="employeeWorkScheduleAddRow">
              <p className="employeeWorkScheduleAddRowTitle">
                Həftənin günü <span className="requiredStarForEmployeeAdd">*</span>
              </p>
              <select>
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
              <select>
                <option value="">Seçin</option>
                {rooms.map((roomObj) => (
                  <option key={roomObj.room} value={roomObj.room}>
                    {roomObj.room}
                  </option>
                ))}
              </select>
            </div>
            <div className="employeeWorkScheduleAddRow">
              <p className="employeeWorkScheduleAddRowTitle">Başlama saatı</p>
              <input type="time" />
            </div>
            <div className="employeeWorkScheduleAddRow">
              <p className="employeeWorkScheduleAddRowTitle">Bitiş saatı</p>
              <input type="time" />
            </div>
          </div>

          <div className="employeeWorkScheduleAddActionsButtons">
            <button type="button" className="employeeAddCancelProcess">
              <img src={cancelProcess} alt="" />
              İmtina et
            </button>
            <button type="button" className="employeeAddAcceptProcess">
              <img src={acceptProcess} alt="" />
              Yadda saxla
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeeWorkScheduleEdit;
