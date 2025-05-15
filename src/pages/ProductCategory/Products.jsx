// Style
import "../../assets/style/ProductCategory/product.css"


// Icons
import { CiSearch } from "react-icons/ci";
import { FiDownload, FiEdit3 } from "react-icons/fi";
import { GoTrash } from 'react-icons/go';
import { HiOutlineArrowsUpDown } from 'react-icons/hi2';

// Libraries
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Products() {
    const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

const tableData = [
  {
    id: 1,
    name: "İynələr və Şpirislər",
    productCount: 20,
    code: "ST-001",
    features: "İnsulin iynələri, birdəfəlik şpirislər",
    status: "Aktiv"
  },
  {
    id: 2,
    name: "Dolgular və Materiallar",
    productCount: 14,
    code: "ST-002",
    features: "Kompozit, amalgam, bondinq",
    status: "Aktiv"
  },
  {
    id: 3,
    name: "Sterilizasiya Vasitələri",
    productCount: 10,
    code: "ST-003",
    features: "Avtoklav kağızı, göstəricilər, paketlər",
    status: "Passiv"
  },
  {
    id: 4,
    name: "Turbin və Mikromotorlar",
    productCount: 6,
    code: "ST-004",
    features: "Hava turbinləri, mikromotor başlıqları",
    status: "Aktiv"
  },
  {
    id: 5,
    name: "Ortodontik Aksesuarlar",
    productCount: 9,
    code: "ST-005",
    features: "Breketlər, yaylar, ligaturalar",
    status: "Aktiv"
  },
  {
    id: 6,
    name: "Cərrahi Alətlər",
    productCount: 13,
    code: "ST-006",
    features: "Elevator, forseps, kuret",
    status: "Passiv"
  },
  {
    id: 7,
    name: "Rəng Ölçmə Sistemləri",
    productCount: 4,
    code: "ST-007",
    features: "Vita shade guide, rəng kartları",
    status: "Aktiv"
  },
  {
    id: 8,
    name: "İrrigasiya Məhsulları",
    productCount: 7,
    code: "ST-008",
    features: "NaCl, EDTA, şprislə iynələr",
    status: "Aktiv"
  }
];



  const filteredData = tableData.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (row) => {
    navigate(`./edit-product/${row.id}`); 
  };

  const handleDelete = (row) => {
    alert(`Silindi: ${row.name}`);
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
                // value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
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
        <div className="productPageTableWrapper">
        <table className="productPageTable">
          <thead>
            <tr>
              <th>#</th>
              <th className="productNameCol">
                <span>
                  <HiOutlineArrowsUpDown className="arrowIconsNow" /> Məhsulun adı
                </span>
              </th>
              <th>
                <span>
                  <HiOutlineArrowsUpDown className="arrowIconsNow" /> Məhsulun kodu
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
                <td className="productNameCol">{row.name}</td>
                <td>{row.code}</td>
                <td>{row.features}</td>
                <td>
                  <span className={`statusBadge ${row.status === "Aktiv" ? "active" : "passive"}`}>
                    {row.status}
                  </span>
                </td>
                <td>
                  <div className="productActionIcons">
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
  )
}

export default Products