import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { FiEdit3 } from "react-icons/fi";
import { HiArrowsUpDown } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa";
import "../../assets/style/OtherObjects/otherobjects.css"
import { CiExport } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

const statusOptions = [
  { value: "", label: "Status" },
  { value: "Aktiv", label: "Aktiv" },
  { value: "Passiv", label: "Passiv" },
];

const OtherObjects = () => {
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("MD_OTHER_OBJECTS");
    if (!stored) {
      const initial = [
        { id: 1, name: "Resepşn", status: "Aktiv" },
        { id: 2, name: "WC 1", status: "Aktiv" },
        { id: 3, name: "Metbex", status: "Aktiv" },
        { id: 4, name: "Anbar", status: "Passiv" },
      ];
      localStorage.setItem("MD_OTHER_OBJECTS", JSON.stringify(initial));
      setItems(initial);
    } else {
      setItems(JSON.parse(stored));
    }
  }, []);

  const filteredOtherObjectItems = items.filter(
    (item) =>
      (status === "" || item.status === status) &&
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (id) => {
    navigate(`${id}/edit`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bu obyekti silmək istədiyinizə əminsinizmi?")) {
      const updated = items.filter((item) => item.id !== id);
      localStorage.setItem("MD_OTHER_OBJECTS", JSON.stringify(updated));
      setItems(updated);
    }
  };

  return (
    <div className="otherObjectsPageWrapper">
        <div className="otherObjectsPageContainer">
        <div className="otherObjectsPageTopPart">
            <div className="leftPartOfTop">
            <select
                className="otherObjectsStatusSelect"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
                ))}
            </select>
            <div className="searchBarContainer">
                <input
                type="text"
                placeholder="Axtarış"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
                <CiSearch className="searchIconBTN" />
            </div>
            </div>
            <div className="rightPartOfTop">
            <Link to={'add'} className="addNewOtherObjectItem">
                <FaPlus /> Yenisini əlavə et
            </Link>
            <Link className="exportDataOfOtherObjects" title="Export">
                <CiExport size={22} className="exportOtherObjectDataIcon" />
            </Link>
            </div>
        </div>

        <div className="otherObjectsTableWrapper">
            <table className="otherObjectsTable">
            <thead>
                <tr>
                <th><span>1-8</span></th>
                <th>
                    <span>
                    <HiArrowsUpDown className="tableArrowIcon" /> Obyektin adı
                    </span>
                </th>
                <th>
                    <span>
                    <HiArrowsUpDown className="tableArrowIcon" /> Status
                    </span>
                </th>
                <th>Düzəliş</th>
                </tr>
            </thead>
            <tbody>
                {filteredOtherObjectItems.map((item, idx) => (
                <tr key={item.id}>
                    <td>{idx + 1}</td>
                    <td>{item.name}</td>
                    <td>
                    <span
                        className={`status ${
                        item.status === "Aktiv" ? "active" : "passive"
                        }`}
                    >
                        {item.status}
                    </span>
                    </td>
                    <td>
                    <div className="icons flex gap-3 cursor-pointer">
                        <FiEdit3 className="edit" onClick={() => handleEdit(item.id)} />
                        <GoTrash className="delete" onClick={() => handleDelete(item.id)} />
                    </div>
                    </td>
                </tr>
                ))}
                {filteredOtherObjectItems.length === 0 && (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                      Obyekt tapılmadı.
                    </td>
                  </tr>
                )}
            </tbody>
            </table>
        </div>
        </div>
    </div>
  );
};

export default OtherObjects;