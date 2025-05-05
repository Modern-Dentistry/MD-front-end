import React from "react";
import "../../assets/style/OrdinaryListStyle/ordinarylist.css";

// Icons
import { HiArrowsUpDown } from "react-icons/hi2";
import { TbUserCancel } from "react-icons/tb";

function OrdinaryList({ tableHead, tableData, icons = [] }) {
  return (
    <div className="tableWrapper">
      <table className="employeeTable">
        <thead>
          <tr>
            <th>
              <div className="th-content">
                <HiArrowsUpDown className="arrowsIcon" />
                <span>{tableData.length === 0 ? "0" : `1-${tableData.length}`}</span>
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
                  <span>Düzəliş</span>
                </div>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
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

                // Qara siyahı üçün xüsusi icon və rəng
                if (key === "blocked") {
                  return (
                    <td key={colIndex}>
                      <span
                        style={{
                          backgroundColor: value ? "#E74848" : "#A6A6A6",
                          color: "#fff",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px"
                        }}
                      >
                        <TbUserCancel />
                      </span>
                    </td>
                  );
                }

                return <td key={colIndex}>{value}</td>;
              })}
              {icons.length > 0 && (
                <td className="actionsCell">
                  {icons.map((iconItem, idx) => {
                    const IconComp = iconItem.icon;
                    return (
                      <button
                        key={idx}
                        className={`actionBtn ${iconItem.className}`}
                        onClick={() => iconItem.action(row)}
                      >
                        <IconComp />
                      </button>
                    );
                  })}
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
