import React, { useEffect, useState, useMemo } from "react";
import SimpleList from "../../components/list/SimpleList";
import SearchIcon from "../../assets/icons/Search";
import CustomDropdown from "../../components/CustomDropdown";
import DownloadIcon from "../../assets/icons/Download";
import { useNavigate } from "react-router-dom";

import useWarehouseEntryStore from "../../../stores/warehouseEntryStore";
import { useProductCategoryStore } from "../../../stores/productCategories";
import { useProductStore } from "../../../stores/productStore";

const StockImport = () => {
  const {
    fetchWarehouseEntries,
    searchEntries,
    entries,
    searchedEntries,
    deleteEntry,
  } = useWarehouseEntryStore();

  const { fetchCategories, categories } = useProductCategoryStore();
  const { fetchProducts, products } = useProductStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEntryId, setSelectedEntryId] = useState(null);
  const [entryDetails, setEntryDetails] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    const loadInitialData = async () => {
      await fetchWarehouseEntries();
      await fetchCategories();
      await fetchProducts();
    };
    if (!ignore) loadInitialData();
    return () => {
      ignore = true;
    };
  }, []);

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      await searchEntries(searchTerm);
    } else {
      await fetchWarehouseEntries();
    }
    clearSelection();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSelection = () => {
    setSelectedEntryId(null);
    setEntryDetails(null);
  };

  const fetchEntryDetail = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/warehouse-entry/info/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      setEntryDetails(data);
    } catch (error) {
      console.error("Entry detalları alınmadı", error);
      setEntryDetails(null);
    }
  };

  const handleEntrySelect = (id) => {
    setSelectedEntryId(id);
    fetchEntryDetail(id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu anbar girişini silmək istədiyinizə əminsiniz?")) {
      try {
        await deleteEntry(id);
        await fetchWarehouseEntries();
        if (selectedEntryId === id) {
          clearSelection();
        }
      } catch (err) {
        alert("Silərkən xəta baş verdi!");
        console.error(err);
      }
    }
  };

  const handleEdit = (id) => navigate(`/stock/import/edit/${id}`);
  const handleView = (id) => handleEntrySelect(id);

  const getDateTime = (dateStr, timeStr) => {
    if (!dateStr || !timeStr) return null;
    return new Date(`${dateStr}T${timeStr}`);
  };

  const formatTime = (dt) => {
    if (!dt) return "-";
    return dt.toTimeString().slice(0, 5); 
  };

  const dataToShow = useMemo(
    () => (searchTerm.trim() ? searchedEntries : entries) || [],
    [searchTerm, searchedEntries, entries]
  );

  const getCategoryName = (categoryId) =>
    categories.find((c) => c.id === categoryId)?.categoryName || "-";

  const detailData = useMemo(() => {
    return (entryDetails?.warehouseEntryProducts || []).map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return {
        ...item,
        productName: product?.productName || "-",
        productTitle: product?.productCode || "-",
        categoryName: getCategoryName(product?.categoryId),
      };
    });
  }, [entryDetails, products, categories]);

  // Listdə tarix və saat sütunları
  const listColumns = [
    {
      key: "date",
      label: "Tarix",
      render: (row) => {
        const dt = getDateTime(row.date, row.time);
        return dt ? dt.toLocaleDateString("az-AZ") : "-";
      },
    },
    {
      key: "time",
      label: "Saat",
      render: (row) => {
        const dt = getDateTime(row.date, row.time);
        return formatTime(dt);
      },
    },
    { key: "number", label: "Çeşid sayı" },
    { key: "sumPrice", label: "Ümumi məbləğ" },
  ];

  const detailColumns = [
    { key: "categoryName", label: "Kategoriyası" },
    { key: "productName", label: "Məhsulun adı" },
    { key: "productTitle", label: "Məhsulun kodu" },
    { key: "quantity", label: "Məhsulun sayı" },
  ];

  return (
    <div className="flex flex-col border border-gray-200 rounded-lg bg-white p-4 gap-4">
      {/* Search and Controls */}
      <div className="flex justify-between items-center gap-2">
        <div className="flex items-center gap-2 flex-1">
          <CustomDropdown />
          <input
            type="text"
            placeholder="Axtarış..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full p-2 rounded-lg border border-gray-300"
          />
          <button onClick={handleSearch}>
            <SearchIcon />
          </button>
        </div>
        <div className="flex items-center gap-8">
          <button
            className="bg-[#155EEF] text-white px-4 py-2 rounded-lg"
            onClick={() => navigate("/stock/import/add")}
          >
            Yenisini əlavə et
          </button>
          <button
            onClick={() => {
              // Burada download funksionallığı əlavə edilə bilər
              console.log("Yükləmə funksiyası əlavə olunmalıdır");
            }}
          >
            <DownloadIcon />
          </button>
        </div>
      </div>

      {/* Entry List */}
      <div>
        <h2 className="font-semibold mb-2">Anbar Girişləri</h2>
        <SimpleList
          columns={listColumns}
          data={dataToShow}
          onRowClick={(row) => handleEntrySelect(row.id)}
          selectedRowId={selectedEntryId}
          enableDelete={true}
          enableEdit={true}
          enableView={true}
          handleView={handleView}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>

      {/* Entry Details */}
      {selectedEntryId && entryDetails && (
        <div className="pt-4">
          <h2 className="font-semibold mb-4">
            Seçilmiş Girişin Məlumatları (ID: {selectedEntryId})
          </h2>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div>
              <strong>Tarix:</strong>{" "}
              {entryDetails.date && entryDetails.time
                ? getDateTime(entryDetails.date, entryDetails.time).toLocaleDateString("az-AZ")
                : "-"}
            </div>
            <div>
              <strong>Saat:</strong>{" "}
              {entryDetails.date && entryDetails.time
                ? formatTime(getDateTime(entryDetails.date, entryDetails.time))
                : "-"}
            </div>
            <div>
              <strong>Cəmi məbləğ:</strong>{" "}
              {entryDetails.totalAmount || entryDetails.sumPrice || "0 ₼"}
            </div>
            <div>
              <strong>Çeşid sayı:</strong>{" "}
              {(entryDetails.warehouseEntryProducts || []).length}
            </div>
          </div>

          <SimpleList
            columns={detailColumns}
            data={detailData}
            enableDelete={false}
            enableEdit={false}
            enableView={false}
            className="mt-4"
          />
        </div>
      )}
    </div>
  );
};

export default StockImport;
