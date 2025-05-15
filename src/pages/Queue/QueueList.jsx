import React, { useState } from 'react'

// Components
import OrdinaryListHeader from '../../components/OrdinaryList/OrdinaryListHeader'

// Icons
import { CiSearch } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { FiEdit3 } from "react-icons/fi";

// Style
import "../../assets/style/QueuePage/queuelist.css"

// Libraries
import { Link, useNavigate } from 'react-router-dom';

const employeesData = [
  {
    id:1,
    patientName: "Leyla Qafarova",
    phone: "+994 50 123 45 67",
    doctor: "Dr. Elvin Məmmədov",
    startDate: "2025-05-15",
    endDate: "2025-05-15",
    startTime: "10:00",
    endTime: "10:30",
    status: "Aktiv"
  },
  {
    id:2,
    patientName: "Leyla Qafarova",
    phone: "+994 50 123 45 67",
    doctor: "Dr. Elvin Məmmədov",
    startDate: "2025-05-15",
    endDate: "2025-05-15",
    startTime: "10:00",
    endTime: "10:30",
    status: "Aktiv"
  },

];



function QueueList() {
  const [searchName, setSearchName] = useState('');
  const [searchSurname, setSearchSurname] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [searchDoctor, setSearchDoctor] = useState('');
  const [searchStatus, setSearchStatus] = useState('');

 const filteredEmployees = employeesData.filter((employee) => {
  const fullName = employee.patientName || "";
  const nameParts = fullName.toLowerCase().split(" ");
  const name = nameParts[0] || "";
  const surname = nameParts[1] || "";

  return (
    name.includes(searchName.toLowerCase()) &&
    surname.includes(searchSurname.toLowerCase()) &&
    (employee.phone || "").includes(searchPhone) &&
    (employee.doctor || "").toLowerCase().includes(searchDoctor.toLowerCase()) &&
    (employee.status || "").toLowerCase().includes(searchStatus.toLowerCase())
  );
});

const navigate = useNavigate()


  return (
    <div className="queuePageContainer">
      <OrdinaryListHeader
        title="Növbə gözləyənlər"
        addText="Yenisini əlavə et"
        addLink="/queue/add-new"
        exportLink="/queue/export"
      />

      <div className="queueSearchInputs">
        <div className="leftPart">
          <input 
            type="text" 
            placeholder='Ad' 
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <input 
            type="text" 
            placeholder='Soyad' 
            value={searchSurname}
            onChange={(e) => setSearchSurname(e.target.value)}
          />
          <input 
            type="number"  
            placeholder='Mobil nömrə'
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
          />
          <input 
            type="text" 
            placeholder='Həkim adı'
            value={searchDoctor}
            onChange={(e) => setSearchDoctor(e.target.value)}
          />
          <CiSearch className='searchBTN'/>
        </div>
        <div className="rightPart">
          <select 
            className='workersStatusChecker'
            value={searchStatus}
            onChange={(e) => setSearchStatus(e.target.value)}
          >
            <option value="">Status</option>
            <option value="Aktiv">Aktiv</option>
            <option value="Passiv">Passiv</option>
          </select>
        </div>
      </div>

     <div className="queueListWrapper">
  <div className="queueListTableWrapper">
    <table className="queueListTable">
      <thead>
        <tr>
          <th>Pasiyent</th>
          <th>Mobil nömrə</th>
          <th>Həkim</th>
          <th>Başlama tarixi</th>
          <th>Bitiş tarixi</th>
          <th>Başlama saatı</th>
          <th>Bitiş saatı</th>
          <th>Status</th>
          <th>Əməliyyatlar</th>
        </tr>
      </thead>
      <tbody>
        {filteredEmployees.map((row, index) => (
          <tr key={index}>
            <td>
              <div className="queueListAvatarNameWrapper">
                {row.patientName}
              </div>
            </td>
            <td>{row.phone}</td>
            <td>{row.doctor}</td>
            <td>{row.startDate}</td>
            <td>{row.endDate}</td>
            <td>{row.startTime}</td>
            <td>{row.endTime}</td>
            <td>
              <span className={`queueListStatus ${row.status === "Aktiv" ? "active" : "passive"}`}>
                {row.status}
              </span>
            </td>
            <td>
              <div className="queueListActionsWrapper">
              <FiEdit3 
                className="queueListIcon edit" 
                onClick={() => navigate(`./edit-queue/${row.id}`)} 
              />
              <GoTrash 
                className="queueListIcon delete" 
                onClick={() => alert(`Silindi: ${row.id}`)} 
              />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {filteredEmployees.length === 0 && (
      <div className="queueListNoResults">Nəticə tapılmadı.</div>
    )}
  </div>
     </div>

    </div>
  );
}

export default QueueList;
