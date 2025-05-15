import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductStore } from "../../../stores/productStore";
import "../../assets/style/ProductCategory/editproduct.css";
import acceptButton from "../../assets/images/EmployeesPage/verifyProcess.png";
import cancelButton from "../../assets/images/EmployeesPage/cancelProcess.png";

function EditProduct() {
  const { name, id } = useParams();
  const navigate = useNavigate();

  const { products, editProduct, loading, error } = useProductStore();
  const [formData, setFormData] = useState({
    productName: "",
    productNo: "",
    productTitle: "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const productToEdit = products.find((p) => p.id.toString() === id);
    if (productToEdit) {
      setFormData({
        productName: productToEdit.productName || "",
        productNo: productToEdit.productNo?.toString() || "",
        productTitle: productToEdit.productTitle || "",
      });
    }
  }, [id, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.productName.trim())
      errors.productName = "Məhsul adı tələb olunur";
    if (!formData.productNo.trim())
      errors.productNo = "Məhsul kodu tələb olunur";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }
  
    const payload = {
      id: Number(id),
      productName: formData.productName,
      productNo: Number(formData.productNo),
      productTitle: formData.productTitle,
      categoryName: name,
    };
  
    console.log("EditProduct payload:", payload);  
  
    try {
      await editProduct(payload);
      alert("Məhsul uğurla yeniləndi!");
      navigate(`/product-categories/${name}`);
    } catch (err) {
      alert(`Xəta baş verdi: ${err.response?.data?.message || err.message}`);
    }
  };
  

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="editProductWrapper">
      <form className="editProductContainer" onSubmit={handleSubmit}>
        <div className="editProductInput">
          <label>
            Məhsulun adı<span>*</span>
          </label>
          <input
            type="text"
            name="productName"
            placeholder="Məhsulun adı"
            value={formData.productName}
            onChange={handleChange}
            required
          />
          {formErrors.productName && (
            <span className="error">{formErrors.productName}</span>
          )}
        </div>

        <div className="editProductInput">
          <label>
            Məhsulun kodu<span>*</span>
          </label>
          <input
            type="text"
            name="productNo"
            placeholder="Məhsulun kodu"
            value={formData.productNo}
            onChange={handleChange}
            required
          />
          {formErrors.productNo && (
            <span className="error">{formErrors.productNo}</span>
          )}
        </div>

        <div className="editProductInput">
          <label>Özəllikləri</label>
          <input
            type="text"
            name="productTitle"
            placeholder="Məhsulun özəllikləri"
            value={formData.productTitle}
            onChange={handleChange}
          />
        </div>

        <div className="editProductButtons">
          <button
            type="button"
            className="cancelFormCondition"
            onClick={handleCancel}
            disabled={loading}>
            <img src={cancelButton} alt="İmtina et" />
            İmtina et
          </button>
          <button
            type="submit"
            className="acceptFormCondition"
            disabled={loading}>
            <img src={acceptButton} alt="Yadda saxla" />
            {loading ? "Yüklənir..." : "Yadda saxla"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
