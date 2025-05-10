import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Icons
import { FiDownload, FiEdit3 } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";

// Style
import "../../assets/style/Specialities/specialities.css";

// Libraries
import { Link } from 'react-router-dom';

function BlacklistReasons() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const tableData = [
    { id: 1, name: "Problemli müştəri", status: "Aktiv" },
    { id: 1, name: "Problemli müştəri", status: "Aktiv" },
    { id: 1, name: "Problemli müştəri", status: "Aktiv" },
    { id: 1, name: "Problemli müştəri", status: "Aktiv" },
    { id: 1, name: "Problemli müştəri", status: "Aktiv" },
    { id: 1, name: "Problemli müştəri", status: "Aktiv" },
    { id: 1, name: "Problemli müştəri", status: "Aktiv" },
    { id: 1, name: "Problemli müştəri", status: "Aktiv" },
    
  ];

  const filteredData = tableData.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (row) => {
    navigate(`/edit-reason`);
  };

  const handleDelete = (row) => {
    alert(`Silindi: ${row.name}`);
  };

  return (
    <div className="specialitiesContainer">
      <div className="specialitiesContainerTopPart">
        <div className="leftPart">
          <select>
            <option value="">Status</option>
            <option value="Aktiv">Aktiv</option>
            <option value="Passiv">Passiv</option>
          </select>
          <div className="specialitiesQuickSearch">
            <input
              type="text"
              placeholder="Axtarış"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CiSearch className="searchSpecialityIcon" />
          </div>
        </div>
        <div className="rightPart">
          <Link className="addSpeciality" to={'/add-reason'}>
            <IoMdAdd className="addSpecialityIcon" /> Yenisini əlavə et
          </Link>
          <Link className="exportSpecialities">
            <FiDownload className="exportSpecialitiesIcon" />
          </Link>
        </div>
      </div>

      <div className="specialitiesTableWrapper">
        <table className="specialitiesTable">
          <thead>
            <tr>
              <th>{filteredData.length !== 0 ? `1-${filteredData.length}` : 0}</th>
              <th className='specialityName'>
                <span>
                  <HiOutlineArrowsUpDown className='arrowIconsNow' /> İxtisasın adı
                </span>
              </th>
              <th>
                <span>
                  <HiOutlineArrowsUpDown className='arrowIconsNow' /> Status
                </span>
              </th>
              <th>Düzəliş</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td className='specialityName'>{row.name}</td>
                <td>
                  <span className={`statusBadge ${row.status === "Aktiv" ? "active" : "passive"}`}>
                    {row.status}
                  </span>
                </td>
                <td>
                  <div className="actionIcons">
                    <FiEdit3 className="editBtn" onClick={() => handleEdit(row)} />
                    <GoTrash className="deleteBtn" onClick={() => handleDelete(row)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BlacklistReasons;
