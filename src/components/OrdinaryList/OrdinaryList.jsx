import React from "react";
import "../../assets/style/OrdinaryListStyle/ordinarylist.css";

// Icons
import { HiArrowsUpDown } from "react-icons/hi2";

function OrdinaryList({ tableHead, tableData, icons = [] }) {
  return (
    <div className="tableWrapper">
      <table className="employeeTable">
        <thead>
          <tr>
            {/* Yeni column üçün başlıq əlavə edirik */}
            <th>
              <div className="th-content">
                <HiArrowsUpDown className="arrowsIcon" />
                <span>{tableData.length===0?"0":`1-${tableData.length}`}</span>
              </div>
            </th>
            {tableHead.map((title, idx) => (
              <th key={idx}>
                <div className="th-content">
                  <HiArrowsUpDown className="arrowsIcon"/>
                  <span>{title}</span>
                </div>
              </th>
            ))}
            {icons.length > 0 && (
              <th>
                <div className="th-content">
                  <HiArrowsUpDown className="arrowsIcon" />
                  <span>Düzəliş</span>
                </div>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {/* Sıra nömrəsi */}
              <td>{rowIndex + 1}</td>
              {tableHead.map((headKey, colIndex) => {
                const key = Object.keys(row)[colIndex];
                const value = row[key];

                // Şəkil və ad üçün xüsusi görünüş
                if (key === "username" && row.img) {
                  return (
                    <td key={colIndex}>
                      <div className="avatarNameWrapper">
                        <img className="avatar" src={row.img} alt="avatar" />
                        {value}
                      </div>
                    </td>
                  );
                }

                // Status üçün rəngli görünüş
                if (key === "status") {
                  return (
                    <td key={colIndex}>
                      <span className={value === "Aktiv" ? "status active" : "status passive"}>
                        {value}
                      </span>
                    </td>
                  );
                }

                return <td key={colIndex}>{value}</td>;
              })}
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
  );
}

export default OrdinaryList;
