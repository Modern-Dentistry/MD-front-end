import "../assets/style/user-list.css";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { AiOutlineUserAdd } from "react-icons/ai";

function 

UserList() {
  const employees = [
    {
      id: 1,
      name: "Elmira Aliyeva",
      phone: "(050) xxx xx xx",
      permission: "Tam icazə",
      schedule: "09:00-17:00",
      status: "Aktiv",
      image: "https://via.placeholder.com/40",
    },
    {
      id: 2,
      name: "Elmira Aliyeva",
      phone: "(050) xxx xx xx",
      permission: "Tam icazə",
      schedule: "09:00-17:00",
      status: "Aktiv",
      image: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      name: "Elmira Aliyeva",
      phone: "(050) xxx xx xx",
      permission: "Tam icazə",
      schedule: "09:00-17:00",
      status: "Passiv",
      image: "https://via.placeholder.com/40",
    },
  ];

  return (
    <>
      <div className="userList_container">
        <div className="topPart">
          <div className="leftPart">
            <div className="searchPart">
              <HiMiniMagnifyingGlass className="search-icon" />
              <input type="text" placeholder="Axtarış" />
            </div>
            <div className="quickSearch">
              <p>Həkim</p>
              <p>Resepsionist</p>
              <p>Tibb bacısı</p>
              <p>Tibb bacısı</p>
              <p>Tibb bacısı</p>
            </div>
          </div>
          <div className="rightPart">
            <div className="addWorker">
              <AiOutlineUserAdd className="addUserIcon" />
              <p>Yeni işçi əlavə et</p>
              <p></p>
            </div>
          </div>
        </div>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Ad, Soyad</th>
              <th>Mobil nömrə</th>
              <th>İcazələr</th>
              <th>İş qrafiki</th>
              <th>Status</th>
              <th>Düzəliş</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>
                  <div className="user-info">
                    <img src={employee.image} alt={employee.name} />
                    {employee.name}
                  </div>
                </td>
                <td>{employee.phone}</td>
                <td>{employee.permission}</td>
                <td>{employee.schedule}</td>
                <td>
                  <span className={`status ${employee.status.toLowerCase()}`}>
                    {employee.status}
                  </span>
                </td>
                <td>
                  <button className="edit-btn">✏️</button>
                  <button className="delete-btn">🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserList;
