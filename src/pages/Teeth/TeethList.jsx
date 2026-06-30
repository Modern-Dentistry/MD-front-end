import React, { useEffect } from "react";
import "../../assets/style/Teeth/teethlist.css";
import { CiSearch } from "react-icons/ci";
import { FiDownload, FiEdit3 } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import useTeethStore from "../../../stores/teethStore";

const TeethList = () => {
  const navigate = useNavigate();

  const {
    teeth,
    fetchTeeth,
    removeTooth,
    loading,
  } = useTeethStore();

  useEffect(() => {
    fetchTeeth();
  }, []);

  const handleEdit = (id) => () => {
    navigate(`edit/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bu dişi silmək istədiyinizə əminsiniz?");
    if (confirmDelete) {
      await removeTooth(id);
    }
  };

  const getToothTypeLabel = (type) => {
    if (type === "CHILD") return "Uşaq";
    if (type === "ADULT") return "Yetkin";
    return type;
  };

  const getLocationLabel = (loc) => {
    const map = {
      TOP_LEFT: "Üst sol",
      TOP_RIGHT: "Üst sağ",
      BOTTOM_LEFT: "Alt sol",
      BOTTOM_RIGHT: "Alt sağ",
      MIDDLE: "Orta",
    };
    return map[loc] || loc;
  };

  return (
    <div className="teethList-container">
      <div className="teethList-controls-section">
        <div className="teethList-filters">
          <select className="teethList-status-dropdown">
            <option value="">Əməliyyat</option>
          </select>
          <input type="date" className="teethList-date-input" placeholder="Başlama tarixi" />
          <input type="date" className="teethList-date-input" placeholder="Bitmə tarixi" />
          <select className="teethList-status-dropdown">
            <option value="">Diş No</option>
          </select>
          <div className="teethList-search-box">
            <input
              type="text"
              placeholder="Axtarış"
              className="teethList-search-input"
            />
            <button className="teethList-search-button">
              <CiSearch className="teethList-search-icon" />
            </button>
          </div>
        </div>
        <div className="teethList-actions">
          <Link to={"add"} className="teethList-add-new-button">+ Yenisini əlavə et</Link>
          <button className="teethList-download-button">
            <FiDownload className="teethList-download-icon" />
          </button>
        </div>
      </div>

      <div className="teethList-table-section">
        <table className="teethList-table">
          <thead>
            <tr>
              <th><span className="firstElementOfTHS !flex !justify-center gap-1"><HiOutlineArrowsUpDown className="mt-1"/> №</span></th>
              <th><span className="!flex !justify-center gap-1"><HiOutlineArrowsUpDown className="mt-1"/> Dişin nömrəsi</span></th>
              <th><span className="!flex !justify-center gap-1"><HiOutlineArrowsUpDown className="mt-1"/> Dişin növü</span></th>
              <th><span className="!flex !justify-center gap-1"><HiOutlineArrowsUpDown className="mt-1"/> Yeri</span></th>
              <th><span className="!flex !justify-center gap-1"><HiOutlineArrowsUpDown className="mt-1"/> Müayinə şəkilləri</span></th>
              <th><span className="!flex !justify-center gap-1"><HiOutlineArrowsUpDown className="mt-1"/> Əməliyyat şəkilləri</span></th>
              <th><span className="!flex !justify-center">Düzəliş</span></th>
            </tr>
          </thead>
          <tbody>
            {!loading && teeth.length > 0 ? (
              teeth.map((tooth, index) => (
                <tr key={tooth.id}>
                  <td className="!text-center">{index + 1}</td>
                  <td className="!text-center">{tooth.toothNo ? (Number(tooth.toothNo) % 10) : "—"}</td>
                  <td className="!text-center">{getToothTypeLabel(tooth.toothType)}</td>
                  <td className="!text-center">{getLocationLabel(tooth.toothLocation)}</td>
                  <td className="!text-center">
                    <Link to={`${tooth.id}/examination-pictures`} className="teethList-link">
                      Müayinə şəkilləri ({tooth.examinations?.length || 0})
                    </Link>
                  </td>
                  <td className="!text-center">
                    <Link to={`${tooth.id}/operation-pictures`} className="teethList-link">
                      Əməliyyat şəkilləri ({tooth.operations?.length || 0})
                    </Link>
                  </td>
                  <td className="!text-center">
                    <div className="teethList-action-icons !flex justify-center">
                      <FiEdit3 onClick={handleEdit(tooth.id)} className="teethList-edit-button" />
                      <GoTrash onClick={() => handleDelete(tooth.id)} className="teethList-delete-button" />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  {loading ? "Yüklənir..." : "Heç bir diş tapılmadı."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeethList;
