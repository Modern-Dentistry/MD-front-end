import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Icons
import { FiDownload, FiEdit3 } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";

// Style
import "../../assets/style/Ceramics/ceramics.css";

// Libraries
import { Link } from 'react-router-dom';

function Ceramics() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const tableData = [
    { id: 1, name: "Deputat", status: "Aktiv" },
    { id: 2, name: "Fəhlə", status: "Passiv" },
    { id: 3, name: "Mühəndis", status: "Aktiv" },
    { id: 4, name: "Texnik", status: "Passiv" },
    { id: 5, name: "Operator", status: "Aktiv" },
    { id: 6, name: "Menecer", status: "Aktiv" },
    { id: 7, name: "Marketoloq", status: "Passiv" },
    { id: 8, name: "Sürücü", status: "Aktiv" },
  ];

  const filteredData = tableData.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (row) => {
    navigate(`/edit-ceramic/${row.id}`);
  };

  const handleDelete = (row) => {
    alert(`Silindi: ${row.name}`);
  };

  return (
    <div className="ceramicsContainer">
      <div className="ceramicsContainerTopPart">
        <div className="leftPart">
          <select>
            <option value="">Status</option>
            <option value="Aktiv">Aktiv</option>
            <option value="Passiv">Passiv</option>
          </select>
          <div className="ceramicsQuickSearch">
            <input
              type="text"
              placeholder="Axtarış"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CiSearch className="searchceramicsIcon" />
          </div>
        </div>
        <div className="rightPart">
          <Link className="addceramics" to={'/add-ceramic'}>
            <IoMdAdd className="addceramicsIcon" /> Yenisini əlavə et
          </Link>
          <Link className="exportceramics">
            <FiDownload className="exportceramicsIcon" />
          </Link>
        </div>
      </div>

      <div className="ceramicsTableWrapper">
        <table className="ceramicsTable">
          <thead>
            <tr>
              <th>{filteredData.length !== 0 ? `1-${filteredData.length}` : 0}</th>
              <th className='ceramicsName'>
                <span>
                  <HiOutlineArrowsUpDown className='arrowIconsNow' /> Keramikanın adı
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
                <td className='ceramicsName'>{row.name}</td>
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

export default Ceramics;
