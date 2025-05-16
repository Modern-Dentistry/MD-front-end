import React, { useEffect, useState } from "react";
import SimpleList from "../../components/list/SimpleList";
import SearchIcon from "../../assets/icons/Search";
import CustomDropdown from "../../components/CustomDropdown";
import DownloadIcon from "../../assets/icons/Download";
import { useNavigate } from "react-router-dom";
import useWarehouseEntryStore from "../../../stores/warehouseEntryStore";
import { useProductCategoryStore } from "../../../stores/productCategories";
import { useProductStore } from "../../../stores/productStore";

const StockImport = () => {
  const { fetchWarehouseEntries, searchEntries, entries, searchedEntries } =
    useWarehouseEntryStore();

  const { fetchCategories, categories } = useProductCategoryStore();
  const { fetchProducts, products } = useProductStore();

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchWarehouseEntries();
    fetchCategories();
    fetchProducts();
  }, [fetchWarehouseEntries, fetchCategories, fetchProducts]);

  const getCategoryName = (categoryId) =>
    categories.find((cat) => cat._id === categoryId)?.name || "-";

  const getProductName = (productId) =>
    products.find((prod) => prod._id === productId)?.name || "-";

  const columns = [
    {
      key: "category",
      label: "Kategoriyası",
      render: (row) => getCategoryName(row?.category),
    },
    {
      key: "product",
      label: "Məhsulun adı",
      render: (row) => getProductName(row?.product),
    },
    {
      key: "code",
      label: "Məhsulun kodu",
    },
    {
      key: "quantity",
      label: "Məhsulun Sayı",
    },
  ];

  const handleSearch = async () => {
    if (searchTerm.trim() !== "") {
      await searchEntries(searchTerm);
    } else {
      fetchWarehouseEntries();
    }
  };

  const dataToShow = searchTerm.trim() !== "" ? searchedEntries : entries;

  return (
    <div className="flex flex-col border border-gray-200 rounded-lg bg-white p-1">
      <div className="flex justify-between items-center gap-2 p-2">
        <div className="flex items-center gap-2">
          <CustomDropdown />
          <input
            type="text"
            placeholder="Axtarış..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300"
          />
          <button onClick={handleSearch}>
            <SearchIcon />
          </button>
        </div>
        <div className="flex items-center gap-8">
          <button
            className="bg-[#000000] text-white px-4 py-2 rounded-lg"
            onClick={() => navigate("/stock/import/add")}
          >
            Yenisini əlavə et
          </button>
          <button>
            <DownloadIcon />
          </button>
        </div>
      </div>

      <SimpleList
        columns={columns}
        data={dataToShow}
        enableDelete={true}
        enableEdit={true}
        enableView={true}
        handleView={(id) => navigate(`/stock/import/${id}`)}
        handleEdit={(id) => navigate(`/stock/import/${id}/edit`)}
      />
    </div>
  );
};

export default StockImport;
