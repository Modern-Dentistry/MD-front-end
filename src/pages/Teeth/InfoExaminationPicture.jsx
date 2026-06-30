import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FiEdit3, FiCheck } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { GoTrash } from "react-icons/go";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/style/Teeth/infoexaminationpicture.css";
import useTeethExaminationStore from "../../../stores/teeth-examinationStore";

const InfoExaminationPicture = () => {
  const { id: teethId, examinationId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { deleteTeethExamination, loading } = useTeethExaminationStore();
  
  const [examinationDetails, setExaminationDetails] = useState(
    location.state?.examination || null
  );

  const handleEdit = () => {
    navigate(`/teeth/${teethId}/examination-pictures/edit/${examinationId}`, { state: { examination: examinationDetails } });
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `"${examinationDetails?.examination?.typeName}" müayinəsini silmək istədiyinizə əminsiniz?`
    );
    if (!confirmed) return;

    try {
      await deleteTeethExamination(examinationId);
      toast.success("Müayinə uğurla silindi!");
      setTimeout(() => {
        navigate(`/teeth/${teethId}/examination-pictures`);
      }, 1500);
    } catch (error) {
      toast.error("Silinmə zamanı xəta baş verdi!");
      console.error("Delete error:", error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (!examinationDetails) {
    return <div className="infoExaminationPictureContainer">Müayinə tapılmadı!</div>;
  }

  return (
    <div className="infoExaminationPictureContainer">
      <ToastContainer />
      <div className="infoExaminationPictureWrapper">
        <div className="infoExaminationPictureHeader">
          <h2>Müayinə Detalları</h2>
          <button className="infoExaminationPictureEditIconButton" onClick={handleEdit}>
            <FiEdit3 className="infoExaminationPictureEditIcon" />
          </button>
        </div>

        <div className="infoExaminationPictureContent">
          <div className="infoExaminationPictureRow">
            <label>Müayinə / Əməliyyat:</label>
            <span>{examinationDetails?.examination?.typeName || "—"}</span>
          </div>

          <div className="infoExaminationPictureRow">
            <label>Status:</label>
            <span
              className={`infoExaminationPictureStatusBadge ${
                examinationDetails?.examination?.status === "ACTIVE" ? "active" : "inactive"
              }`}
            >
              {examinationDetails?.examination?.status === "ACTIVE" ? "Aktiv" : "Passiv"}
            </span>
          </div>

          <div className="infoExaminationPictureRow">
            <label>Diş №:</label>
            <span>{examinationDetails?.teeth?.toothNo ? (Number(examinationDetails.teeth.toothNo) % 10) : "—"}</span>
          </div>

          <div className="infoExaminationPictureRow">
            <label>Diş Tipi:</label>
            <span>
              {examinationDetails?.teeth?.toothType === "CHILD"
                ? "Uşaq Diş"
                : "Böyük Diş"}
            </span>
          </div>

          <div className="infoExaminationPictureRow">
            <label>Yerləşmə:</label>
            <span>
              {examinationDetails?.teeth?.toothLocation === "TOP_LEFT"
                ? "Üst Sol"
                : examinationDetails?.teeth?.toothLocation === "TOP_RIGHT"
                ? "Üst Sağ"
                : examinationDetails?.teeth?.toothLocation === "BOTTOM_LEFT"
                ? "Alt Sol"
                : "Alt Sağ"}
            </span>
          </div>
        </div>

        <div className="infoExaminationPictureActions">
          <button
            className="infoExaminationPictureCancelButton"
            onClick={handleCancel}
            disabled={loading}
          >
            <RxCross2 style={{ marginRight: 8 }} />
            İmtina et
          </button>
          <button
            className="infoExaminationPictureDeleteButton"
            onClick={handleDelete}
            disabled={loading}
          >
            <GoTrash style={{ marginRight: 8 }} />
            Sil
          </button>
          <button
            className="infoExaminationPictureConfirmButton"
            onClick={handleEdit}
            disabled={loading}
          >
            <FiCheck style={{ marginRight: 8 }} />
            Düzəlt
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoExaminationPicture;
