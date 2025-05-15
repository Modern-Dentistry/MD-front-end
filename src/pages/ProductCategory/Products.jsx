import "../../assets/style/ProductCategory/product.css";
import { CiSearch } from "react-icons/ci";
import { FiDownload, FiEdit3 } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { useProductStore } from "../../../stores/productStore";

function Products() {
  const navigate = useNavigate();
  const { name } = useParams(); // URL-dən kateqoriya adı
  const [searchTerm, setSearchTerm] = useState("");
  const { removeProduct } = useProductStore();
  const { products, fetchProducts, loading, error } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredByCategory = name
    ? products.filter(
        (item) =>
          item.categoryName &&
          item.categoryName.toLowerCase() === name.toLowerCase()
      )
    : products;

  const filteredData = filteredByCategory.filter((row) =>
    row.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (row) => {
    navigate(`/product-categories/${name}/edit-product/${row.id}`);
  };

  const handleDelete = (row) => {
    const confirmDelete = window.confirm(
      `${row.productName} məhsulunu silmək istədiyinizə əminsiniz?`
    );
    if (!confirmDelete) return;

    removeProduct(row.id)
      .then(() => {
        alert(`${row.productName} uğurla silindi.`);
      })
      .catch((error) => {
        alert("Silərkən xəta baş verdi: " + error.message);
      });
  };

  return (
    <div className="productPageWrapper">
      <div className="productCategoryQuickSearch">
        <div className="productCategoryLeftPart">
          <select>
            <option value="">Status</option>
            <option value="Aktiv">Aktiv</option>
            <option value="Passiv">Passiv</option>
          </select>
          <div className="searchForNameProduct">
            <input
              type="text"
              placeholder="Axtarış"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CiSearch className="searchForNameIcon" />
          </div>
        </div>
        <div className="productCategoryRightPart">
          <Link to={"./add-new"}>
            <p className="addNewProductCategory">
              <span>+</span> Yenisini əlavə et
            </p>
          </Link>
          <Link to={"/export"}>
            <FiDownload className="exportProductCategoriesData" />
          </Link>
        </div>
      </div>

      {loading ? (
        <p>Yüklənir...</p>
      ) : error ? (
        <p>Xəta baş verdi: {error}</p>
      ) : (
        <div className="productPageTableWrapper">
          <table className="productPageTable">
            <thead>
              <tr>
                <th>#</th>
                <th className="productNameCol">
                  <span>
                    <HiOutlineArrowsUpDown className="arrowIconsNow" /> Məhsulun
                    adı
                  </span>
                </th>
                <th>
                  <span>
                    <HiOutlineArrowsUpDown className="arrowIconsNow" /> Məhsulun
                    kodu
                  </span>
                </th>
                <th>
                  <span>
                    <HiOutlineArrowsUpDown className="arrowIconsNow" /> Özəllikləri
                  </span>
                </th>
                <th>
                  <span>
                    <HiOutlineArrowsUpDown className="arrowIconsNow" /> Status
                  </span>
                </th>
                <th>Düzəliş</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={row.id}>
                  <td>{index + 1}</td>
                  <td className="productNameCol">{row.productName}</td>
                  <td>{row.productNo}</td>
                  <td>{row.productTitle}</td>
                  <td>
                    <span
                      className={`statusBadge ${
                        row.status === "Aktiv" ? "active" : "passive"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td>
                    <div className="productActionIcons">
                      <FiEdit3
                        className="editBtn"
                        onClick={() => handleEdit(row)}
                      />
                      <GoTrash
                        className="deleteBtn"
                        onClick={() => handleDelete(row)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Products;
