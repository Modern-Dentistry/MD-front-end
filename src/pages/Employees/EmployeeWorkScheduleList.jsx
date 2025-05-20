// Components
import { useState } from "react";
import { Link } from "react-router-dom";
import OrdinaryListHeader from "../../components/OrdinaryList/OrdinaryListHeader";
import { FiEdit3 } from "react-icons/fi";
import { GoTrash } from "react-icons/go";

// Style
import "../../assets/style/EmployeesPage/employeeworkschedulelist.css";

function EmployeeWorkScheduleList() {
  // sample state; replace with your real data / fetch logic
  const [workSchedules, setWorkSchedules] = useState([
    { id: 1,day: "Bazar ertəsi", room: "101", start: "09:00", end: "10:30" },
    { id: 2,day: "Bazar ertəsi", room: "101", start: "09:00", end: "10:30" },
    { id: 3,day: "Bazar ertəsi", room: "101", start: "09:00", end: "10:30" },
    // …etc
  ]);

   const icons = [

     {
       icon: FiEdit3,
       action: ()=> alert('Salam'),
       className: "edit",
     },
     {
       icon: GoTrash,
       action: ()=> alert('Salam'),
       className: "delete",
     },
   ];


  const editSchedule = (sched) => {
    // your edit logic here
    console.log("Edit", sched);
  };

  const deleteSchedule = (id) => {
    // your delete logic here
    console.log("Delete", id);
  };

  

  return (
    <>
      <div className="employeeWorkScheduleList">
        <OrdinaryListHeader
          title="İş qrafiki"
          addText="Yenisini əlavə et"
          addLink="/employees/work-schedule/:name/add"
          exportLink="/employees/export"
        />

        <div className="employeeWorkScheduleListTopPart">
          <select className="daysOfWeekForList">
            <option value="">Həftənin Günü</option>
            {[1,2,3,4,5,6,7].map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="employeeWorkScheduleListTableWrapper">
          <table className="employeeWorkScheduleListTable">
            <thead>
              <tr>
                <th>{workSchedules.length===0?'0':`1-${workSchedules.length}`}</th>
                <th>Həftənin Günü</th>
                <th>Kabinet</th>
                <th>Başlama saatı</th>
                <th>Bitiş saatı</th>
                <th>Düzəliş</th>
              </tr>
            </thead>
            <tbody>
              {workSchedules.map((sched) => (
                <tr key={sched.id}>
                  <td>{sched.id}</td>
                  <td>{sched.day}</td>
                  <td>{sched.room}</td>
                  <td>{sched.start}</td>
                  <td>{sched.end}</td>
                  <td className="employeeScheduleIcons">
                    <span>
                      {icons.map((iconObj, idx) => (
                        <iconObj.icon
                          key={idx}
                          className={iconObj.className}
                          onClick={() => iconObj.action(sched)}
                        />
                      ))}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default EmployeeWorkScheduleList;
