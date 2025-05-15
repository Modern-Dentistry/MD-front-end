import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/style/ProductCategory/addproduct.css";

import acceptButton from "../../assets/images/EmployeesPage/verifyProcess.png";
import cancelButton from "../../assets/images/EmployeesPage/cancelProcess.png";

import { createProduct } from "../../api/product-api";
import { getAllCategories } from "../../api/productCategories";

function AddProduct() {
  const [formData, setFormData] = useState({
    categoryId: "",
    productName: "",
    productNo: "",
    productTitle: "",
  });

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error("Kateqoriyalar alınarkən xəta:", err);
      }
    }
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.categoryId) {
      alert("Zəhmət olmasa kateqoriya seçin");
      return;
    }

    const dataToSend = {
      ...formData,
      categoryId: Number(formData.categoryId),
      productNo: Number(formData.productNo),
    };

    try {
      await createProduct(dataToSend);
      alert("Məhsul uğurla yaradıldı");

      const selectedCategory = categories.find(
        (cat) => cat.id === Number(formData.categoryId)
      );

      if (selectedCategory) {
        navigate(`/product-categories/${encodeURIComponent(selectedCategory.categoryName)}`);
      } else {
        navigate(`/product-categories`);
      }

      setFormData({
        categoryId: "",
        productName: "",
        productNo: "",
        productTitle: "",
      });
    } catch (error) {
      alert("Xəta baş verdi: " + error.message);
    }
  };

  return (
    <form className="addProductWrapper" onSubmit={handleSubmit}>
      <div className="addProductContainer">
        <div className="addProductInput">
          <p>Kateqoriya<span>*</span></p>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Kateqoriya seçin</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.categoryName}
              </option>
            ))}
          </select>
        </div>

        <div className="addProductInput">
          <p>Məhsulun adı<span>*</span></p>
          <input
            type="text"
            placeholder="Məhsulun adı"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="addProductInput">
          <p>Məhsulun kodu</p>
          <input
            type="number"
            placeholder="Məhsulun kodu"
            name="productNo"
            value={formData.productNo}
            onChange={handleChange}
          />
        </div>

        <div className="addProductInput">
          <p>Özəllikləri</p>
          <input
            type="text"
            placeholder="Məhsulun adı"
            name="productTitle"
            value={formData.productTitle}
            onChange={handleChange}
          />
        </div>

        <div className="addProductButtons">
          <button
            type="button"
            className="cancelFormCondition"
            onClick={() =>
              setFormData({
                categoryId: "",
                productName: "",
                productNo: "",
                productTitle: "",
              })
            }
          >
            <img src={cancelButton} alt="Cancel" />
            İmtina et
          </button>
          <button type="submit" className="acceptFormCondition">
            <img src={acceptButton} alt="Save" />
            Yadda saxla
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddProduct;
