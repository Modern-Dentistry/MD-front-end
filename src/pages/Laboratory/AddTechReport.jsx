import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useLaboratoryPaymentStore } from "../../../stores/dentalOrderReportStore";
import useTechnicianStore from "../../../stores/technicianStore";

// Style
// import "../../assets/style/addsize.css";

// Images
import acceptButton from "../../assets/images/EmployeesPage/verifyProcess.png";
import cancelButton from "../../assets/images/EmployeesPage/cancelProcess.png";

function AddTechReport() {
  const [technicianId, setTechnicianId] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const { createPayment, isLoading } = useLaboratoryPaymentStore();
  const { technicians, fetchTechnicians } = useTechnicianStore();

  useEffect(() => {
    fetchTechnicians();
  }, [fetchTechnicians]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!technicianId.trim() || !amount.trim()) {
      toast.error("Bütün sahələr doldurulmalıdır!");
      return;
    }

    const amountNumber = parseFloat(amount.trim());
    if (isNaN(amountNumber)) {
      toast.error("Ödəniş miqdarı rəqəm olmalıdır!");
      return;
    }

    try {
      const newPayment = {
        technicianId: technicianId.trim(),
        amount: amountNumber,
      };

      await createPayment(newPayment);

      setTechnicianId("");
      setAmount("");
      toast.success("Ödəniş uğurla əlavə olundu!");
      
      navigate("/technicals-report");
    } catch (error) {
      console.error("Ödəniş əlavə edilərkən xəta:", error);
      toast.error("Ödəniş əlavə edilərkən xəta baş verdi!");
    }
  };

  const handleCancel = () => {
    setTechnicianId("");
    setAmount("");
  };

  return (
    <div className="addSizesWrapper">
      <form className="addSizesContainer" onSubmit={handleSubmit}>
        <div className="addSizesInput display flex flex-column justify-between w-vw align-items-start">
          <p>
            Texnik<span>*</span>
          </p>
          <select
            value={technicianId}
            onChange={(e) => setTechnicianId(e.target.value)}
            className="w-212 py-2 px-4 rounded-lg border border-gray-300 focus:outline-none placeholder:text-gray-400"
          >
            <option value="">Texnik seçin</option>
            {technicians.map((tech) => (
              <option key={tech.id} value={tech.id}>
                {tech.name} {tech.surname}
              </option>
            ))}
          </select>
        </div>

        <div className=" addSizesInput display flex flex-column justify-between  align-items-start">
          <p>
            Ödəniş miqdarı<span>*</span>
          </p>
          <input
            type="text"
            placeholder="Məbləğ"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="addSizesButtons">
          <button
            type="button"
            className="cancelFormCondition"
            onClick={handleCancel}
            disabled={isLoading}
          >
            <img src={cancelButton} alt="cancel" loading="lazy" />
            İmtina et
          </button>

          <button
            type="submit"
            className="acceptFormCondition"
            disabled={isLoading}
          >
            <img src={acceptButton} alt="accept" loading="lazy" />
            {isLoading ? "Yüklənir..." : "Yadda saxla"}
          </button>
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default AddTechReport;