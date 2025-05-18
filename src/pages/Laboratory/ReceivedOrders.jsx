import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Style
import "../../assets/style/LaboratoryPage/sentorders.css";

// Icons
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import { CiCircleInfo } from "react-icons/ci";
import { HiArrowsUpDown } from "react-icons/hi2";

function ReceivedOrders() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');

  const slugify = (text) =>
    text
      .toLowerCase()
      .normalize('NFD')                       // diakritik işarələri ayır
      .replace(/[\u0300-\u036f]/g, '')       // ayırılmış işarələri sil
      .replace(/[^a-z0-9\s-]/g, '')          // xüsusi simvolları sil
      .trim()
      .replace(/\s+/g, '-');                 // boşluqları tire ilə əvəzlə

  const tableHead = [ "Sifariş tarixi","Göndərən", "Pasiyent", "Yoxlanılma tarixi", "Təhvil tarixi", "Status"];

  const tableData = [
    {
      id: 1,
      checkDate: "2025-04-02",
      orderDate: "2025-04-01",
      count: 0,
      status: "Həkimə göndərilib",
      statusType: "hakim",
      sender: "Dr. Elşad Abbasov",
      name: "Rüstəm Məmmədov",
      deliveryDate: "2025-04-05"
    },
    {
      id: 2,
      name: "Leyla Qafarova",
      count: 2,
      status: "Texnika göndərilib",
      statusType: "texnika",
      orderDate: "2025-04-03",
      sender: "Dr. Zeynəb Quliyeva",
      checkDate: "2025-04-04",
      deliveryDate: "2025-04-07"
    },
    {
      id: 3,
      name: "Elçin Əliyev",
      count: 1,
      status: "Texnik qəbul edib",
      statusType: "qebul",
      orderDate: "2025-04-05",
      sender: "Dr. Kamran Hüseynov",
      checkDate: "2025-04-06",
      deliveryDate: "2025-04-08"
    },

    {
      id: 5,
      name: "Murtuz Əsgərov",
      count: 1,
      status: "Həkimə göndərilib",
      statusType: "hakim",
      orderDate: "2025-04-12",
      sender: "Dr. Xəyalə Muradova",
      checkDate: "2025-04-13",
      deliveryDate: "2025-04-15"
    },
    {
      id: 6,
      name: "Fidan Məhərrəmova",
      count: 0,
      sender: "Dr. Aysel Məmmədova",
      status: "Texnika göndərilib",
      statusType: "texnika",
      orderDate: "2025-04-14",
      checkDate: "2025-04-15",
      deliveryDate: "2025-04-17"
    }
  ];

  const icons = [
    {
      icon: CiCircleInfo,
      action: (row) => navigate(`/details/${row.id}`),
      className: "info-icon"
    }
  ];

  // Handle search filter
  const filteredData = tableData.filter(row =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log("Filtered Data: ", filteredData); // Debugging the filtered data

  return (
    <div className="sentOrdersContainer">
      <div className="sentOrdersHeader">
        <div className="leftPartHeader">
          <select>
            <option value="">Option 1</option>
          </select>
          <div className="searchOrderNow">
            <input
              type="text"
              placeholder="Axtarış"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query
            />
            <CiSearch className="search-btn" />
          </div>
        </div>
        <div className="rightPartHeader">
          <p className="addNowOrder" onClick={() => navigate('/lab/order/add')}>
            <FaPlus className="plusBTN" /> Yenisini əlavə et
          </p>
          <FiDownload className="exportDataNow" onClick={() => navigate('/data/export')} />
        </div>
      </div>

      <div className="tableWrapper">
        <table className="labTable">
          <thead>
            <tr>
              <th>#</th>
              {tableHead.map((title, idx) => (
                <th key={idx}>
                  <div className="th-content">
                    <HiArrowsUpDown className="arrowsIcon" />
                    <span>{title}</span>
                  </div>
                </th>
              ))}
              {icons.length > 0 && (
                <th>
                  <div className="th-content">
                    <HiArrowsUpDown className="arrowsIcon" />
                    <span>Ətraflı</span>
                  </div>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={tableHead.length + (icons.length > 0 ? 1 : 0)} style={{ textAlign: "center" }}>No orders found.</td>
              </tr>
            ) : (
              filteredData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{rowIndex + 1}</td>

                  {/* Pasiyent adı hüceyrəsi */}

                  {/* Qalan sütunlar */}
                  <td>{row.checkDate}</td>
                  <td>{row.sender}</td>
                  <td
                    onClick={() => navigate(`/details/${row.id}`)} // Navigate to details page on click
                    className='patinetTD'
                    style={{ cursor: "pointer", color: "#155EEF" }}
                  >
                    {row.name}
                  </td>
                  <td>{row.orderDate}</td>
                  <td>{row.deliveryDate}</td>
                  <td>
                    <span className={`status ${row.statusType}`}>
                      {row.status}
                    </span>
                  </td>

                  {icons.length > 0 && (
                    <td className="actions">
                      <div className="actionsWrapper">
                        {icons.map((iconObj, iconIdx) => (
                          <span
                            key={iconIdx}
                            onClick={() => iconObj.action(row)}
                            style={{ cursor: "pointer" }}
                          >
                            {React.createElement(iconObj.icon, {
                              className: `icon ${iconObj.className || ""}`,
                            })}
                          </span>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReceivedOrders;
