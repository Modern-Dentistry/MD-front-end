import React, { useState } from 'react'

// Components
import OrdinaryListHeader from '../../components/OrdinaryList/OrdinaryListHeader'
import OrdinaryList from '../../components/OrdinaryList/OrdinaryList';

// Icons
import { CiSearch } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { FiEdit3 } from "react-icons/fi";

// Style
import "../../assets/style/QueuePage/queuelist.css"

const employeesData = [
    {
      patientName: "Rüstəm Məmmədov",
      phone: "(050) 123 45 67",
      doctor: "Dr. Elmira",
      startDate: "06.03.2025",
      endDate: "06.03.2025",
      startTime: "09:00",
      endTime: "17:00",
      status: "Aktiv",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    },
    {
      patientName: "Aysel Quliyeva",
      phone: "(055) 987 65 43",
      doctor: "Dr. Kamran",
      startDate: "07.03.2025",
      endDate: "07.03.2025",
      startTime: "10:00",
      endTime: "18:00",
      status: "Aktiv",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135823.png"
    },
    {
      patientName: "Elvin Əliyev",
      phone: "(070) 456 78 90",
      doctor: "Dr. Aytən",
      startDate: "08.03.2025",
      endDate: "08.03.2025",
      startTime: "08:30",
      endTime: "16:30",
      status: "Passiv",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    },
    {
      patientName: "Nigar Məmmədli",
      phone: "(077) 111 22 33",
      doctor: "Dr. Rauf",
      startDate: "09.03.2025",
      endDate: "09.03.2025",
      startTime: "11:00",
      endTime: "19:00",
      status: "Aktiv",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135823.png"
    },
    {
      patientName: "Orxan Hüseynov",
      phone: "(051) 333 44 55",
      doctor: "Dr. Elmira",
      startDate: "10.03.2025",
      endDate: "10.03.2025",
      startTime: "09:30",
      endTime: "17:30",
      status: "Passiv",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    },
    {
      patientName: "Ləman Vəliyeva",
      phone: "(050) 666 77 88",
      doctor: "Dr. Kamran",
      startDate: "11.03.2025",
      endDate: "11.03.2025",
      startTime: "10:00",
      endTime: "18:00",
      status: "Aktiv",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135823.png"
    },
    {
      patientName: "Kamran Rzayev",
      phone: "(070) 999 00 11",
      doctor: "Dr. Aytən",
      startDate: "12.03.2025",
      endDate: "12.03.2025",
      startTime: "08:00",
      endTime: "16:00",
      status: "Passiv",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    },
    {
      patientName: "Zəhra Səmədova",
      phone: "(055) 222 33 44",
      doctor: "Dr. Rauf",
      startDate: "13.03.2025",
      endDate: "13.03.2025",
      startTime: "11:30",
      endTime: "19:30",
      status: "Aktiv",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135823.png"
    },
    {
      patientName: "Emin Məlikov",
      phone: "(077) 444 55 66",
      doctor: "Dr. Elmira",
      startDate: "14.03.2025",
      endDate: "14.03.2025",
      startTime: "09:00",
      endTime: "17:00",
      status: "Aktiv",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    },
    {
      patientName: "Tunar Qasımov",
      phone: "(051) 777 88 99",
      doctor: "Dr. Kamran",
      startDate: "15.03.2025",
      endDate: "15.03.2025",
      startTime: "10:30",
      endTime: "18:30",
      status: "Passiv",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    }
  ];
  

// Sətirləri 8-ə tamamla
while (employeesData.length < 8) {
  employeesData.push({
    ...employeesData[0],
    status: employeesData.length < 4 ? "Aktiv" : "Passiv"
  });
}

const icons = [
  {
    icon: FiEdit3,
    action: (row) => alert(`Redaktə: ${row.patientName}`),
    className: "edit"
  },
  {
    icon: GoTrash,
    action: (row) => alert(`Silindi: ${row.patientName}`),
    className: "delete"
  }
];

function QueueList() {
    const [searchName, setSearchName] = useState('');
    const [searchSurname, setSearchSurname] = useState('');
    const [searchPhone, setSearchPhone] = useState('');
    const [searchDoctor, setSearchDoctor] = useState('');
    const [searchStatus, setSearchStatus] = useState('');
  
    const filteredEmployees = employeesData.filter((employee) => {
      const lowerPatientName = employee.patientName.toLowerCase();
      return (
        lowerPatientName.includes(searchName.toLowerCase()) &&
        lowerPatientName.includes(searchSurname.toLowerCase()) &&
        employee.phone.includes(searchPhone) &&
        employee.doctor.toLowerCase().includes(searchDoctor.toLowerCase()) &&
        employee.status.toLowerCase().includes(searchStatus.toLowerCase())
      );
    });
  
    return (
      <>
        <OrdinaryListHeader
          title="Növbə gözləyənlər"
          addText="Yenisini əlavə et"
          addLink="/queue/add"
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
        <OrdinaryList
          tableHead={[
            "Pasiyent",
            "Mobil nömrə",
            "Həkim",
            "Başlama tarixi",
            "Bitiş tarixi",
            "Başlama saatı",
            "Bitiş saatı",
            "Status"
          ]}
          tableData={filteredEmployees}
          icons={icons}
        />
      </>
    );
  }

export default QueueList
