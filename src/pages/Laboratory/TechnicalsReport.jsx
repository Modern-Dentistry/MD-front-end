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

function TechnicalsReport() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');

  const tableHead = [ "İstifadəçi adı", "Ad", "Soyad", "Ata adı", "Cəmi borc", "Cəmi ödənən", "Cəmi qalıq"];

  const tableData = [
    {
      id: 1,
      username: "rustem.mamedov",
      firstName: "Rüstəm",
      lastName: "Məmmədov",
      fatherName: "Elçin",
      totalDebt: 1000,
      totalPaid: 200,
      remainingDebt: 800,
    },
    {
      id: 2,
      username: "leyla.qafarova",
      firstName: "Leyla",
      lastName: "Qafarova",
      fatherName: "Gülzar",
      totalDebt: 1500,
      totalPaid: 500,
      remainingDebt: 1000,
    },
    {
      id: 3,
      username: "elcin.aliyev",
      firstName: "Elçin",
      lastName: "Əliyev",
      fatherName: "Hikmət",
      totalDebt: 1200,
      totalPaid: 400,
      remainingDebt: 800,
    },
    {
      id: 4,
      username: "murtuz.esgerov",
      firstName: "Murtuz",
      lastName: "Əsgərov",
      fatherName: "Samir",
      totalDebt: 2500,
      totalPaid: 1000,
      remainingDebt: 1500,
    },
    {
      id: 5,
      username: "fidan.meherremova",
      firstName: "Fidan",
      lastName: "Məhərrəmova",
      fatherName: "Zakir",
      totalDebt: 800,
      totalPaid: 300,
      remainingDebt: 500,
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
    row.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="sentOrdersContainer">
      <div className="sentOrdersHeader">
        <div className="leftPartHeader">
          
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
                <td colSpan={tableHead.length + (icons.length > 0 ? 1 : 0)} style={{ textAlign: "center" }}>No users found.</td>
              </tr>
            ) : (
              filteredData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{rowIndex + 1}</td>

                  {/* İstifadəçi adı */}
                  <td>{row.username}</td>

                  {/* Ad */}
                  <td>{row.firstName}</td>

                  {/* Soyad */}
                  <td>{row.lastName}</td>

                  {/* Ata adı */}
                  <td>{row.fatherName}</td>

                  {/* Cəmi borc */}
                  <td>{row.totalDebt} AZN</td>

                  {/* Cəmi ödənən */}
                  <td>{row.totalPaid} AZN</td>

                  {/* Cəmi qalıq */}
                  <td>{row.remainingDebt} AZN</td>

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

export default TechnicalsReport;
