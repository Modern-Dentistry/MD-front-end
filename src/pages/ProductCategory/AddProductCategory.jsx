// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Style
import "../../assets/style/ProductCategory/addproductcategory.css";

// Images
import acceptButton from "../../assets/images/EmployeesPage/verifyProcess.png";
import cancelButton from "../../assets/images/EmployeesPage/cancelProcess.png";

// Store
import { useProductCategoryStore } from "../../../stores/productCategories";

// Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddProductCategory() {
  const [categoryName, setCategoryName] = useState("");
  const navigate = useNavigate();

  const { addCategory, fetchCategories } = useProductCategoryStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) return;

    const newCategory = {
      categoryName: categoryName.trim(),
    };

    try {
      await addCategory(newCategory);
      await fetchCategories();
      setCategoryName("");
      toast.success("Kateqoriya uğurla əlavə olundu!");
      navigate("/product-categories");  // Burada yönləndiririk
    } catch (error) {
      console.error("Kateqoriya əlavə edilərkən xəta:", error);
      toast.error("Kateqoriya əlavə edilərkən xəta baş verdi!");
    }
  };

  return (
    <div className="addProductCategoryWrapper">
      <form className="addProductCategoryContainer" onSubmit={handleSubmit}>
        <div className="addProductCategoryInput">
          <p>
            Məhsul kateqoriyasının adı<span>*</span>
          </p>
          <input
            type="text"
            placeholder="Məhsulun adı"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>

        <div className="addProductCategoryButtons">
          <button
            type="button"
            className="cancelFormCondition"
            onClick={() => setCategoryName("")}>
            <img src={cancelButton} alt="cancel" />
            İmtina et
          </button>

          <button type="submit" className="acceptFormCondition">
            <img src={acceptButton} alt="accept" />
            Yadda saxla
          </button>
        </div>
      </form>

   
    </div>
  );
}

export default AddProductCategory;
