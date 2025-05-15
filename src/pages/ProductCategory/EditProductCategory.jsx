import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Store
import { useProductCategoryStore } from "../../../stores/productCategories";

// Style
import "../../assets/style/ProductCategory/editproductcategory.css"

// Images
import acceptButton from "../../assets/images/EmployeesPage/verifyProcess.png"
import cancelButton from "../../assets/images/EmployeesPage/cancelProcess.png"

function EditProductCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { fetchCategoryById, selectedCategory, editCategory } = useProductCategoryStore();

  const [categoryName, setCategoryName] = useState("");

  // Məlumatı yüklə
  useEffect(() => {
    fetchCategoryById(id);
  }, [id, fetchCategoryById]);

  // selectedCategory dəyişəndə formu doldur
  useEffect(() => {
    if (selectedCategory) {
      setCategoryName(selectedCategory.categoryName || "");
    }
  }, [selectedCategory]);

  // Formu submit etmək funksiyası
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      alert("Kateqoriya adı boş ola bilməz");
      return;
    }

    try {
      await editCategory({ id, categoryName });
      alert("Kateqoriya uğurla redaktə olundu");
      navigate("/product-categories"); // Kateqoriya siyahısına qaytarır
    } catch (error) {
      alert("Redaktə zamanı xəta baş verdi: " + error.message);
    }
  };

  // İmtina düyməsi - əvvəlki səhifəyə qayıdır
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="editProductCategoryWrapper">
      <form className="editProductCategoryContainer" onSubmit={handleSubmit}>
        <div className="editProductCategoryInput">
          <p>Məhsul kateqoriyasının adı<span>*</span></p>
          <input
            type="text"
            placeholder="Məhsulun adı"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <div className="editProductCategoryButtons">
          <button type="button" className="cancelFormCondition" onClick={handleCancel}>
            <img src={cancelButton} alt="İmtina et" />
            İmtina et
          </button>
          <button type="submit" className="acceptFormCondition">
            <img src={acceptButton} alt="Yadda saxla" />
            Yadda saxla
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProductCategory;
