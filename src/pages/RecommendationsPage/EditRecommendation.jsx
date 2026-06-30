import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "../../assets/style/RecommendationsPage/editrecommendation.css";
import { FaTimes, FaCheck } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

function EditRecommendation() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    recommendationName: "",
  });

  useEffect(() => {
    if (id) {
      const stored = localStorage.getItem("MD_RECOMMENDATIONS");
      const items = stored ? JSON.parse(stored) : [];
      const found = items.find(item => item.id.toString() === id);
      if (found) {
        setFormData({
          recommendationName: found.name || "",
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
      const stored = localStorage.getItem("MD_RECOMMENDATIONS");
      const items = stored ? JSON.parse(stored) : [];
      const updated = items.map(item => {
        if (item.id.toString() === id) {
          return {
            ...item,
            name: formData.recommendationName.trim()
          };
        }
        return item;
      });
      localStorage.setItem("MD_RECOMMENDATIONS", JSON.stringify(updated));
      toast.success("Tövsiyə uğurla yeniləndi");
      setTimeout(() => {
        navigate("/recommendations");
      }, 1000);
    } catch (error) {
      toast.error("Xəta baş verdi");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="editRecommendationFormWrapper">
      <ToastContainer />
      <div className="editRecommendationFormContainer">
        <form onSubmit={handleSubmit}>
          <div className="editRecommendationFormRow">
            <label className="editRecommendationLabel">
              Tövsiyənin adı <span className="required">*</span>
            </label>
            <input
              type="text"
              className="editRecommendationField"
              name="recommendationName"
              value={formData.recommendationName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="editRecommendationActions">
            <button
              type="button"
              className="editRecommendationCancelBtn"
              onClick={() => navigate("/recommendations")}
              disabled={isSubmitting}
            >
              <FaTimes /> İmtina et
            </button>
            <button
              type="submit"
              className="editRecommendationSaveBtn"
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

export default EditRecommendation;