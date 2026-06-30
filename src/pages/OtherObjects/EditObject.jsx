import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "../../assets/style/OtherObjects/editobject.css";
import { FaTimes, FaCheck } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

function EditOtherObject() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    objectName: "",
  });

  useEffect(() => {
    if (id) {
      const stored = localStorage.getItem("MD_OTHER_OBJECTS");
      const items = stored ? JSON.parse(stored) : [];
      const found = items.find(item => item.id.toString() === id);
      if (found) {
        setFormData({
          objectName: found.name || "",
        });
      }
    }
  }, [id]);

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
      const updated = items.map(item => {
        if (item.id.toString() === id) {
          return {
            ...item,
            name: formData.objectName.trim()
          };
        }
        return item;
      });
      localStorage.setItem("MD_OTHER_OBJECTS", JSON.stringify(updated));
      toast.success("Obyekt uğurla yeniləndi");
      setTimeout(() => {
        navigate("/other-objects");
      }, 1000);
    } catch (error) {
      toast.error("Xəta baş verdi");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="editOtherObjectFormWrapper">
      <ToastContainer />
      <div className="editOtherObjectFormContainer">
        <form onSubmit={handleSubmit}>
          <div className="editOtherObjectFormRow">
            <label className="editOtherObjectLabel">
              Obyektin adı <span className="required">*</span>
            </label>
            <input
              type="text"
              className="editOtherObjectField"
              name="objectName"
              value={formData.objectName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="editOtherObjectActions">
            <button
              type="button"
              className="editOtherObjectCancelBtn"
              onClick={() => navigate("/other-objects")}
              disabled={isSubmitting}
            >
              <FaTimes /> İmtina et
            </button>
            <button
              type="submit"
              className="editOtherObjectSaveBtn"
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

export default EditOtherObject;