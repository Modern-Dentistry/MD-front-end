import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "../../assets/style/OtherObjects/addobject.css";
import { FaTimes, FaCheck } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

function AddOtherObject() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    objectName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const stored = localStorage.getItem("MD_OTHER_OBJECTS");
      const items = stored ? JSON.parse(stored) : [];
      const newId = items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
      const newObject = {
        id: newId,
        name: formData.objectName.trim(),
        status: "Aktiv",
      };
      items.push(newObject);
      localStorage.setItem("MD_OTHER_OBJECTS", JSON.stringify(items));

      toast.success("Obyekt uğurla əlavə edildi");
      setTimeout(() => {
        navigate("/other-objects");
      }, 1000);
    } catch (error) {
      toast.error("Xəta baş verdi");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="addOtherObjectFormWrapper">
      <ToastContainer />
      <div className="addOtherObjectFormContainer">
        <form onSubmit={handleSubmit}>
          <div className="addOtherObjectFormRow">
            <label className="addOtherObjectLabel">
              Obyektin adı <span className="required">*</span>
            </label>
            <input
              type="text"
              className="addOtherObjectField"
              name="objectName"
              value={formData.objectName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="addOtherObjectActions">
            <button
              type="button"
              className="addOtherObjectCancelBtn"
              onClick={() => navigate("/other-objects")}
              disabled={isSubmitting}
            >
              <FaTimes /> İmtina et
            </button>
            <button
              type="submit"
              className="addOtherObjectSaveBtn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Yüklənir..." : <><FaCheck /> Yadda saxla</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddOtherObject;