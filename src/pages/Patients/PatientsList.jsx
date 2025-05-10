import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Icons
import { CiSearch, CiCircleInfo } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { FiEdit3 } from "react-icons/fi";

// Style
import "../../assets/style/PatientsPage/patientslist.css";

// Components
import OrdinaryListHeader from '../../components/OrdinaryList/OrdinaryListHeader';

const initialSearch = {
  name: "",
  surname: "",
  fin: "",
  phone: "",
  gender: "",
  status: ""
};

function PatientsList() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(initialSearch);
  const navigate = useNavigate();

  // Fetching data from the API
  useEffect(() => {
    axios.get('http://159.89.3.81:5555/api/v1/patient/read')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Filtering data based on search criteria
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.name.toLowerCase()) &&
    item.surname.toLowerCase().includes(search.surname.toLowerCase()) &&
    item.finCode.toLowerCase().includes(search.fin.toLowerCase()) &&
    item.phone.toLowerCase().includes(search.phone.toLowerCase()) &&
    (search.gender ? item.genderStatus === search.gender : true) &&
    (search.status ? item.priceCategoryStatus === search.status : true)
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
        addLink="/patients/add-patient"
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
            <option value="MAN">Kişi</option>
            <option value="WOMAN">Qadın</option>
          </select>
          <select
            value={search.status}
            onChange={(e) => setSearch({ ...search, status: e.target.value })}
            >
            <option value="">Status</option>
            <option value="Vip">Vip</option>
            <option value="Standard">Standard</option>
          </select>
        </div>
      </div>

      <div className="tableWrapper">
        <table className="employeeTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Pasiyent</th>
              <th>Fin kodu</th>
              <th>Cinsiyyət</th>
              <th>Mobil nömrə</th>
              <th>Doğum Tarixi</th>
              <th>Status</th>
              <th>Qara siyahı</th>
              <th>Aksiyalar</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name} {item.surname}</td>
                <td>{item.finCode}</td>
                <td>{item.genderStatus === "MAN" ? "Kişi" : "Qadın"}</td>
                <td>{item.phone}</td>
                <td>{item.dateOfBirth}</td>
                <td>{item.priceCategoryStatus}</td>
                <td>{item.isBlocked ? "Bəli" : "Xeyr"}</td>
                <td>
                  <div className="actionsWrapper">
                    {icons.map((iconObj, idx) => {
                      const IconComponent = iconObj.icon;
                      return (
                        <IconComponent
                        key={idx}
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