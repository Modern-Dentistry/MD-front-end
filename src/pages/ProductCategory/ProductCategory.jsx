// Icons
import { CiSearch } from "react-icons/ci";
import { FiDownload, FiEdit3 } from "react-icons/fi";
import { GoTrash } from 'react-icons/go';
import { HiOutlineArrowsUpDown } from 'react-icons/hi2';

// Libraries
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";

// Style
import "../../assets/style/ProductCategory/productcategory.css";

function ProductCategory() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const tableData = [
    { id: 1, name: "Sərf malları", productCount: 2, status: "Aktiv" },
    { id: 2, name: "Sementlər", productCount: 2, status: "Aktiv" },
    { id: 3, name: "Digər kateqoriya", productCount: 0, status: "Aktiv" },
    { id: 4, name: "Misal üçün", productCount: 3, status: "Aktiv" },
  ];

  const filteredData = tableData.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (row) => {
    navigate(`./edit-category/${row.id}`); // istəyə uyğun dəyiş
  };

  const handleDelete = (row) => {
    alert(`Silindi: ${row.name}`);
  };

  return (
    <>
      <div className="productCategoryContainer">
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
            <Link to={'./add-new'}>
              <p className="addNewProductCategory">
                <span>+</span>Yenisini əlavə et
              </p>
            </Link>
            <Link to={'/export'}>
              <FiDownload className="exportProductCategoriesData" />
            </Link>
          </div>
        </div>

        <div className="productCategoryTableWrapper">
          <table className="productCategoryTable">
            <thead>
              <tr>
                <th>#</th>
                <th className="productCategoryName">
                  <span>
                    <HiOutlineArrowsUpDown className="arrowIconsNow" /> Məhsul kateqoriyasının adı
                  </span>
                </th>
                <th>
                  <span>
                    <HiOutlineArrowsUpDown className="arrowIconsNow" /> Məhsulları
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
                  <td className="productCategoryName">{row.name}</td>
                  <td>
                    <Link to={`./${row.name}`}>
                      Məhsulları ({row.productCount})
                    </Link>
                  </td>
                  <td>
                    <span className={`statusBadge ${row.status === "Aktiv" ? "active" : "passive"}`}>
                      {row.status}
                    </span>
                  </td>
                  <td>
                    <div className="productCategoryActionIcons">
                      <FiEdit3 className="editBtn" onClick={() => handleEdit(row)} />
                      <GoTrash className="deleteBtn" onClick={() => handleDelete(row)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
}

export default ProductCategory;
