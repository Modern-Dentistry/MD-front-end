import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import OrdinaryListHeader from '../../components/OrdinaryList/OrdinaryListHeader';

// Icons
import { CiSearch, CiCircleInfo } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { FiEdit3 } from "react-icons/fi";
import { HiArrowsUpDown } from "react-icons/hi2";

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
    blocked:true,
    status: "Aktiv",
  },
  {
    id: "124",
    name: "Nicat Qasımov",
    fin: "14525F2",
    gender: "Kişi",
    phone: "(051) 234 56 78",
    registeration: "12.06.2023",
    blocked:false,
    status: "Passiv",
  },
  {
    id: "125",
    name: "Leyla İsmayılova",
    fin: "14525F3",
    gender: "Qadın",
    phone: "(050) 987 65 43",
    registeration: "08.07.2023",
    blocked:false,
    status: "Aktiv",
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
    <div className="patientsListWrapper">
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
            type="number"
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

      <div className="patientsTableWrapper">
        <table className="patientsTable">
          <thead>
            <tr>
              <th><div className="th-content"><span><HiArrowsUpDown className='tableArrowIcon'/> ID</span></div></th>
              <th><div className="th-content"><span><HiArrowsUpDown className='tableArrowIcon'/> Pasiyent</span></div></th>
              <th><div className="th-content"><span><HiArrowsUpDown className='tableArrowIcon'/> Fin kodu</span></div></th>
              <th><div className="th-content"><span><HiArrowsUpDown className='tableArrowIcon'/> Cinsiyyət</span></div></th>
              <th><div className="th-content"><span><HiArrowsUpDown className='tableArrowIcon'/> Mobil nömrə</span></div></th>
              <th><div className="th-content"><span><HiArrowsUpDown className='tableArrowIcon'/> Qeydiyyat</span></div></th>
              <th><div className="th-content"><span><HiArrowsUpDown className='tableArrowIcon'/> Qara siyahı</span></div></th>
              <th><div className="th-content"><span><HiArrowsUpDown className='tableArrowIcon'/> Status</span></div></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.fin}</td>
                <td>{item.gender}</td>
                <td>{item.phone}</td>
                <td>{item.registeration}</td>
                <td>{item.blocked ? "Bəli" : "Xeyr"}</td>
                <td>{item.status}</td>
                <td>
                  <div className="actionsWrapper">
                    {icons.map((iconObj, index) => {
                      const Icon = iconObj.icon;
                      return (
                        <Icon
                          key={index}
                          className={`icon ${iconObj.className}`}
                          onClick={() => iconObj.action(item)}
                        />
                      );
                    })}
                  </div>
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

export default PatientsList;
