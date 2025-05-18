import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductCategoryStore } from "../../../stores/productCategories";
import { useProductStore } from "../../../stores/productStore";

const StockImportEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchCategories, categories } = useProductCategoryStore();
  const { fetchProducts, products } = useProductStore();

  const [entryData, setEntryData] = useState(null);

  useEffect(() => {
    (async () => {
      await fetchCategories();
      await fetchProducts();
      await fetchEntryDetail();
    })();
  }, [id]);

  
  const fetchEntryDetail = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/warehouse-entry/info/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!res.ok) throw new Error("API-dən düzgün cavab gəlmədi");
      const data = await res.json();

      const transformedData = {
        id: data.id || null,
        date: data.date || "",
        time: data.time || "00:00:00",
        description: data.description || "",
        warehouseEntryProductUpdateRequests: data.warehouseEntryProducts.map((p) => ({
          warehouseEntryProductId: p.id, 
          categoryId: 0,
          productId: 0,
          quantity: p.quantity,
          price: p.price,
        })),
      };
      

      setEntryData(transformedData);
    } catch (err) {
      console.error("Məlumat yüklənmədi", err);
    }
  };

  const handleChange = (index, field, value) => {
    const newList = [...entryData.warehouseEntryProductUpdateRequests];
    newList[index][field] = value;
    setEntryData({
      ...entryData,
      warehouseEntryProductUpdateRequests: newList,
    });
  };

  const handleSubmit = async () => {
    try {
      // time: "HH:mm:ss" formatındadır, onu parçala
      const [hour, minute, second] = entryData.time
        ? entryData.time.split(":").map((v) => parseInt(v, 10))
        : [0, 0, 0];

      const dateTime = new Date(entryData.date);
      dateTime.setHours(hour);
      dateTime.setMinutes(minute);
      dateTime.setSeconds(second);

      const payload = {
        id: entryData.id,
        localDateTime: dateTime.toISOString(),
        description: entryData.description,
        warehouseEntryProductUpdateRequests:
          entryData.warehouseEntryProductUpdateRequests.map((item) => ({
            warehouseEntryProductId: item.warehouseEntryProductId,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
      };

      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/warehouse-entry/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        alert("Uğurla yeniləndi!");
        navigate("/stock/import");
      } else {
        const errorData = await res.json();
        console.error("Server xətası:", errorData);
        throw new Error(errorData.message || "Yenilənmə zamanı xəta baş verdi");
      }
    } catch (err) {
      alert("Xəta baş verdi: " + err.message);
      console.error(err);
    }
  };

  if (!entryData) return <div>Yüklənir...</div>;

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200">
      <h2 className="text-xl font-bold mb-4">
        Anbar Girişini Redaktə Et (ID: {id})
      </h2>

      <div className="mb-4">
        <label className="block mb-1">Tarix:</label>
        <input
          type="date"
          value={entryData.date}
          onChange={(e) => setEntryData({ ...entryData, date: e.target.value })}
          className="p-2 border rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Saat:</label>
        <input
          type="time"
          value={entryData.time}
          onChange={(e) => setEntryData({ ...entryData, time: e.target.value })}
          className="p-2 border rounded w-full"
        />
      </div>

      {entryData.warehouseEntryProductUpdateRequests.map((item, index) => (
        <div key={index} className="mb-4 p-4 border rounded">
          <div className="mb-2">
            <label className="block mb-1">Kategoriya:</label>
            <select
              value={item.categoryId}
              onChange={(e) =>
                handleChange(index, "categoryId", +e.target.value)
              }
              className="p-2 border rounded w-full">
              <option value="">Seçin</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-2">
            <label className="block mb-1">Məhsul:</label>
            <select
              value={item.productId}
              onChange={(e) =>
                handleChange(index, "productId", +e.target.value)
              }
              className="p-2 border rounded w-full">
              <option value="">Seçin</option>
              {products
                .filter((p) => p.categoryId === item.categoryId)
                .map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.productName}
                  </option>
                ))}
            </select>
          </div>

          <div className="mb-2">
            <label className="block mb-1">Say:</label>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleChange(index, "quantity", +e.target.value)}
              className="p-2 border rounded w-full"
            />
          </div>

          <div>
            <label className="block mb-1">Qiymət:</label>
            <input
              type="number"
              value={item.price}
              onChange={(e) => handleChange(index, "price", +e.target.value)}
              className="p-2 border rounded w-full"
            />
          </div>
        </div>
      ))}

      <div className="mb-4">
        <label className="block mb-1">Qeyd:</label>
        <textarea
          value={entryData.description}
          onChange={(e) =>
            setEntryData({ ...entryData, description: e.target.value })
          }
          className="p-2 border rounded w-full"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Yadda saxla
      </button>
    </div>
  );
};

export default StockImportEdit;
