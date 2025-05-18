import React from 'react'
import { useNavigate } from 'react-router-dom'

// Style
import "../../assets/style/LaboratoryPage/sentorders.css";

// Icons
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import { CiCircleInfo } from "react-icons/ci";
import { HiArrowsUpDown } from "react-icons/hi2";

function SentOrders() {
  const navigate = useNavigate();

  const slugify = (text) =>
    text
      .toLowerCase()
      .normalize('NFD')                       // diakritik işarələri ayır
      .replace(/[\u0300-\u036f]/g, '')       // ayırılmış işarələri sil
      .replace(/[^a-z0-9\s-]/g, '')          // xüsusi simvolları sil
      .trim()
      .replace(/\s+/g, '-');                 // boşluqları tire ilə əvəzlə

  const tableHead = ["Pasiyent", "Sifariş sayı", "Status"];

  const tableData = [
    {
      name: "Rüstəm Məmmədov",
      count: 0,
      status: "Həkimə göndərilib",
      statusType: "hakim"
    },
    {
      name: "Leyla Qafarova",
      count: 2,
      status: "Texnika göndərilib",
      statusType: "texnika"
    },
    {
      name: "Elçin Əliyev",
      count: 1,
      status: "Texnik qəbul edib",
      statusType: "qebul"
    }
  ];

  const icons = [
    {
      icon: CiCircleInfo,
      action: (row) => console.log("Ətraflı məlumat:", row),
      className: "info-icon"
    }
  ];

  return (
    <div className="sentOrdersContainer">
      <div className="sentOrdersHeader">
        <div className="leftPartHeader">
          <select>
            <option value="">Option 1</option>
          </select>
          <div className="searchOrderNow">
            <input type="text" placeholder="Axtarış" />
            <CiSearch className="search-btn" />
          </div>
        </div>
        <div className="rightPartHeader">
          <p className="addNowOrder"  onClick={()=>navigate('/lab/order/add')}>
            <FaPlus className="plusBTN" /> Yenisini əlavə et
          </p>
          <FiDownload className="exportDataNow" onClick={()=>navigate('/data/export')} />
        </div>
      </div>

      <div className="tableWrapper">
        <table className="labTable">
          <thead>
            <tr>
              <th>
                <div className="th-content">
                  <HiArrowsUpDown className="arrowsIcon" />
                  <span>
                    {tableData.length === 0 ? "0" : `1-${tableData.length}`}
                  </span>
                </div>
              </th>
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
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>{rowIndex + 1}</td>

                {/* Pasiyent adı hüceyrəsi */}
                <td
                  // onClick={() => navigate(`/${slugify(row.name)}`)}
                  onClick={()=>navigate('order-details')}
                  className='patinetTD'
                  style={{ cursor: "pointer", color: "#155EEF" }}
                >
                  {row.name}
                </td>

                {/* Qalan sütunlar */}
                <td>{row.count}</td>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SentOrders;
