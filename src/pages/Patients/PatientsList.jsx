import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import OrdinaryListHeader from '../../components/OrdinaryList/OrdinaryListHeader';
import OrdinaryList from '../../components/OrdinaryList/OrdinaryList';

// Icons
import { CiSearch, CiCircleInfo } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { FiEdit3 } from "react-icons/fi";

// Style
import "../../assets/style/PatientsPage/patientslist.css";

const initialData = [
  {
    id: "123",
    name: "Elmira Aliyeva",
    fin: "14525F1",
    gender: "Qadın",
    phone: "(050) 123 45 67",
    registeration: "06.05.2023",
    status: "Aktiv",
  },
  {
    id: "124",
    name: "Nicat Qasımov",
    fin: "14525F2",
    gender: "Kişi",
    phone: "(051) 234 56 78",
    registeration: "12.06.2023",
    status: "Passiv",
  },
  {
    id: "125",
    name: "Aynur Məmmədova",
    fin: "14525F3",
    gender: "Qadın",
    phone: "(055) 345 67 89",
    registeration: "18.07.2023",
    status: "Aktiv",
  },
  {
    id: "126",
    name: "Kamran Əliyev",
    fin: "14525F4",
    gender: "Kişi",
    phone: "(070) 456 78 90",
    registeration: "24.08.2023",
    status: "Passiv",
  },
  {
    id: "127",
    name: "Leyla Hüseynova",
    fin: "14525F5",
    gender: "Qadın",
    phone: "(077) 567 89 01",
    registeration: "30.09.2023",
    status: "Aktiv",
  },
  {
    id: "128",
    name: "Tural Rəhimov",
    fin: "14525F6",
    gender: "Kişi",
    phone: "(050) 678 90 12",
    registeration: "05.10.2023",
    status: "Aktiv",
  },
  {
    id: "129",
    name: "Günel Abbasova",
    fin: "14525F7",
    gender: "Qadın",
    phone: "(051) 789 01 23",
    registeration: "11.11.2023",
    status: "Passiv",
  },
  {
    id: "130",
    name: "Elvin Məmmədov",
    fin: "14525F8",
    gender: "Kişi",
    phone: "(055) 890 12 34",
    registeration: "17.12.2023",
    status: "Aktiv",
  },
  {
    id: "131",
    name: "Zəhra İsmayılova",
    fin: "14525F9",
    gender: "Qadın",
    phone: "(070) 901 23 45",
    registeration: "23.01.2024",
    status: "Aktiv",
  },
  {
    id: "132",
    name: "Orxan Vəliyev",
    fin: "14525F10",
    gender: "Kişi",
    phone: "(077) 012 34 56",
    registeration: "29.02.2024",
    status: "Passiv",
  },
];

function PatientsList() {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState({
    name: "",
    surname: "",
    fin: "",
    phone: "",
    gender: "",
    status: ""
  });

  const navigate = useNavigate();

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.name.toLowerCase()) &&
    item.name.toLowerCase().includes(search.surname.toLowerCase()) &&
    item.fin.toLowerCase().includes(search.fin.toLowerCase()) &&
    item.phone.toLowerCase().includes(search.phone.toLowerCase()) &&
    (search.gender ? item.gender === search.gender : true) &&
    (search.status ? item.status === search.status : true)
  );

  const icons = [
    {
      icon: CiCircleInfo,
      action: (row) => navigate(`/details/id=${row.id}`),
      className: "info"
    },
    {
      icon: FiEdit3,
      action: (row) => navigate(`/edit/id=${row.id}`),
      className: "edit"
    },
    {
      icon: GoTrash,
      action: (row) => {
        const confirmed = window.confirm(`Silmək istədiyinizə əminsiniz? (${row.name})`);
        if (confirmed) {
          setData(data.filter((item) => item.id !== row.id));
        }
      },
      className: "delete"
    }
  ];

  return (
    <>
      <OrdinaryListHeader
        title="Pasiyentlər"
        addText="Yenisini əlavə et"
        addLink="/patients/add"
        exportLink="/patients/export"
      />

      <div className="patientsListSearch">
        <div className="leftPart">
          <input
            type="text"
            placeholder='Ad'
            value={search.name}
            onChange={(e) => setSearch({ ...search, name: e.target.value })}
          />
          <input
            type="text"
            placeholder='Soyad'
            value={search.surname}
            onChange={(e) => setSearch({ ...search, surname: e.target.value })}
          />
          <input
            type="text"
            placeholder='Fin kodu'
            value={search.fin}
            onChange={(e) => setSearch({ ...search, fin: e.target.value })}
          />
          <input
            type="text"
            placeholder='Mobil nömrə'
            value={search.phone}
            onChange={(e) => setSearch({ ...search, phone: e.target.value })}
          />
          <CiSearch className='searchIconBTN' />
        </div>
        <div className="rightPart">
          <select
            value={search.gender}
            onChange={(e) => setSearch({ ...search, gender: e.target.value })}
          >
            <option value="">Cinsiyyət</option>
            <option value="Kişi">Kişi</option>
            <option value="Qadın">Qadın</option>
          </select>
          <select
            value={search.status}
            onChange={(e) => setSearch({ ...search, status: e.target.value })}
          >
            <option value="">Status</option>
            <option value="Aktiv">Aktiv</option>
            <option value="Passiv">Passiv</option>
          </select>
        </div>
      </div>

      <OrdinaryList
        tableHead={[
          "ID",
          "Pasiyent",
          "Fin kodu",
          "Cinsiyyət",
          "Mobil nömrə",
          "Qeydiyyat",
          "Status"
        ]}
        tableData={filteredData}
        icons={icons}
      />
    </>
  );
}

export default PatientsList;
