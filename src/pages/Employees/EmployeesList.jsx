import React, { useState } from 'react'

// Components
import OrdinaryListHeader from '../../components/OrdinaryList/OrdinaryListHeader'
import OrdinaryList from '../../components/OrdinaryList/OrdinaryList';

// Icons
import { CiSearch } from "react-icons/ci";
import { CiCircleInfo } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { FiEdit3 } from "react-icons/fi";

// Style
import "../../assets/style/EmployeesPage/employeespage.css"

const employeesData = [
  {
    username: "Dr.elmira",
    name: "Elmira",
    surname: "Aliyeva",
    fatherName: "Rüstəm",
    phone: "(050) xxx xx xx",
    permission: "Tam icazə",
    schedule: "09:00-17:00",
    status: "Aktiv",
    img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  },
];

while (employeesData.length < 8) {
  employeesData.push({
    ...employeesData[0],
    status: employeesData.length < 4 ? "Aktiv" : "Passiv"
  });
}

const icons = [
  {
    icon: CiCircleInfo,
    action: (row) => alert(`Məlumat: ${row.username}`),
    className: "info"
  },
  {
    icon: FiEdit3,
    action: (row) => alert(`Redaktə: ${row.username}`),
    className: "edit"
  },
  {
    icon: GoTrash,
    action: (row) => alert(`Silindi: ${row.username}`),
    className: "delete"
  }
];

function EmployeesList() {
  const [searchUsername, setSearchUsername] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchSurname, setSearchSurname] = useState('');
  const [searchFatherName, setSearchFatherName] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [searchStatus, setSearchStatus] = useState('');

  // Filter employees based on search criteria
  const filteredEmployees = employeesData.filter((employee) => {
    return (
      (employee.username.toLowerCase().includes(searchUsername.toLowerCase()) || searchUsername === '') &&
      (employee.name.toLowerCase().includes(searchName.toLowerCase()) || searchName === '') &&
      (employee.surname.toLowerCase().includes(searchSurname.toLowerCase()) || searchSurname === '') &&
      (employee.fatherName.toLowerCase().includes(searchFatherName.toLowerCase()) || searchFatherName === '') &&
      (employee.phone.includes(searchPhone) || searchPhone === '') &&
      (employee.status.toLowerCase().includes(searchStatus.toLowerCase()) || searchStatus === '')
    );
  });

  return (
    <>
      <OrdinaryListHeader
        title="İşçilər siyahısı"
        addText="Yeni işçi əlavə et"
        addLink="/employees/add"
        exportLink="/employees/export"
      />
      <div className="workersSearchInputs">
        <div className="leftPart">
          <input 
            type="text" 
            placeholder='Istifadəçi adı' 
            value={searchUsername}
            onChange={(e) => setSearchUsername(e.target.value)} 
          />
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
            type="text" 
            placeholder='Ata adı' 
            value={searchFatherName}
            onChange={(e) => setSearchFatherName(e.target.value)} 
          />
          <input 
            type="number" 
            placeholder='Mobil nömrə'
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)} 
          />
          <CiSearch className='searchBTN'/>
        </div>
        <div className="rightPart">
          <select 
            value={searchStatus} 
            onChange={(e) => setSearchStatus(e.target.value)} 
            className='workersStatusChecker'
          >
            <option value="">Status</option>
            <option value="Aktiv">Aktiv</option>
            <option value="Passiv">Passiv</option>
          </select>
        </div>
      </div>
      <OrdinaryList
        tableHead={[
          "İstifadəçi adı",
          "Adı",
          "Soyadı",
          "Ata adı",
          "Mobil nömrə",
          "İcazələr",
          "İş qrafiki",
          "Status"
        ]}
        tableData={filteredEmployees}
        icons={icons}
      />
    </>
  );
}

export default EmployeesList;
