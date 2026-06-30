import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLaboratoryPaymentStore } from "../../../stores/dentalOrderReportStore";

// Images
import cancelButton from "../../assets/images/EmployeesPage/cancelProcess.png";

// Style
import "./techreportdetail.css";

function TechReportDetail() {
  const { techReportID } = useParams();
  const navigate = useNavigate();
  const { payments, isLoading, error, fetchPayments } = useLaboratoryPaymentStore();

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const paymentData = payments.find((p) => p.technicianId === techReportID);

  const handleCancel = () => {
    navigate("/technicals-report");
  };

  if (isLoading) {
    return (
      <div className="addSizesWrapper">
        <div className="loading">Yüklənir...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="addSizesWrapper">
        <div className="error">Xəta: {error}</div>
        <button type="button" className="cancelFormCondition" onClick={handleCancel}>
          Geri qayıt
        </button>
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="addSizesWrapper">
        <div className="error">Məlumat tapılmadı.</div>
        <button type="button" className="cancelFormCondition" onClick={handleCancel}>
          Geri qayıt
        </button>
      </div>
    );
  }

  return (
    <div className="addSizesWrapper">
      <form className="addSizesContainer" onSubmit={(e) => e.preventDefault()}>
        <div className="addSizesInput display flex flex-column justify-between w-vw align-items-start">
          <p>
            Texnik<span>*</span>
          </p>
          <input
            type="text"
            value={paymentData.fullName || ""}
            disabled={true}
          />
        </div>

        <div className=" addSizesInput display flex flex-column justify-between align-items-start">
          <p>
            Ümumi Borc<span>*</span>
          </p>
          <input
            type="text"
            value={paymentData.totalDebt !== undefined ? `${paymentData.totalDebt} AZN` : "-"}
            disabled={true}
          />
        </div>
        <div className=" addSizesInput display flex flex-column justify-between align-items-start">
          <p>
            Ödənilən Məbləğ<span>*</span>
          </p>
          <input
            type="text"
            value={paymentData.totalPaid !== undefined ? `${paymentData.totalPaid} AZN` : "-"}
            disabled={true}
          />
        </div>
        <div className=" addSizesInput display flex flex-column justify-between align-items-start">
          <p>
            Qalıq<span>*</span>
          </p>
          <input
            type="text"
            value={paymentData.totalRemaining !== undefined ? `${paymentData.totalRemaining} AZN` : "-"}
            disabled={true}
          />
        </div>

        <div className="addSizesButtons">
          <button
            type="button"
            className="cancelFormCondition"
            onClick={handleCancel}
          >
            <img src={cancelButton} alt="cancel" loading="lazy" />
            Geri qayıt
          </button>
        </div>
      </form>
    </div>
  );
}

export default TechReportDetail;