import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Icons
import { FiDownload, FiEdit3 } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";

// Style
import "../../assets/style/OrdersStatus/orderstatus.css"

// Libraries
import { Link } from 'react-router-dom';

function OrderStatus() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const tableData = [
    { id: 1, name: "Gözləyir", status: "Aktiv" },
    { id: 2, name: "Texnikə göndərilib", status: "Passiv" },
    { id: 3, name: "Texnik həkimə geri göndərib", status: "Aktiv" },
    { id: 4, name: "Texnik qəbul edib", status: "Passiv" },
    { id: 5, name: "Həkimə göndərilib", status: "Aktiv" },
    { id: 6, name: "Həkim texnikə geri göndərdi", status: "Aktiv" },
    { id: 7, name: "Texnikdən təhvil alınıb", status: "Passiv" },
    { id: 8, name: "Pasiyentə təhvil verilib", status: "Aktiv" },
  ];

  const filteredData = tableData.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (row) => {
    navigate(`/edit-orderStatus/${row.id}`);
  };

  const handleDelete = (row) => {
    alert(`Silindi: ${row.name}`);
  };

  return (
    <div className="orderStatusContainer">
      <div className="orderStatusContainerTopPart">
        <div className="leftPart">
          <select>
            <option value="">Status</option>
            <option value="Aktiv">Aktiv</option>
            <option value="Passiv">Passiv</option>
          </select>
          <div className="orderStatusQuickSearch">
            <input
              type="text"
              placeholder="Axtarış"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CiSearch className="searchOrderStatusIcon" />
          </div>
        </div>
        <div className="rightPart">
          <Link className="addOrderStatus" to={'/add-order-status'}>
            <IoMdAdd className="addOrderStatusIcon" /> Yenisini əlavə et
          </Link>
          <Link className="exportorderStatus">
            <FiDownload className="exportorderStatusIcon" />
          </Link>
        </div>
      </div>

      <div className="orderStatusTableWrapper">
        <table className="orderStatusTable">
          <thead>
            <tr>
              <th>{filteredData.length !== 0 ? `1-${filteredData.length}` : 0}</th>
              <th className='OrderStatusName'>
                <span>
                  <HiOutlineArrowsUpDown className='arrowIconsNow' /> Statusun adı
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
                <td className='OrderStatusName'>{row.name}</td>
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

export default OrderStatus;
