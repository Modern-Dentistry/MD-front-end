import React, { useState, useEffect } from "react";
import CustomDropdown from "./CustomDropdown";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import ListWithSubtotal from "../components/list/ListwithSubtotal";
import EditIcon from "../assets/icons/Edit";
// import DeleteIcon from "../assets/icons/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StockImportForm = ({
  initialData,
  mode = "create",
  onSubmit,
  onCancel,
}) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {},
  });

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [productList, setProductList] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({
    category: "",
    name: "",
    quantity: "",
    price: "",
  });
  const [sumPrice, setSumPrice] = useState(0);

  // Table columns for product list
  const columns = [
    { key: "categoryName", label: "Kategoriya" },
    { key: "productName", label: "Məhsul" },
    { key: "quantity", label: "Miqdar" },
    { key: "price", label: "Qiymət" },
  ];

  // Calculate sumPrice whenever productList changes
  useEffect(() => {
    const total = productList.reduce((sum, product) => {
      return (
        sum +
        (parseFloat(product.price) || 0) * (parseInt(product.quantity) || 0)
      );
    }, 0);
    setSumPrice(total);
  }, [productList]);

  // Load categories on mount
  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await axios.get(
          "http://159.89.3.81:5555/api/v1/product-category/read"
        );
        const formattedCategories = response.data.map((category) => ({
          value: category.id,
          label: category.categoryName,
        }));
        setCategories(formattedCategories);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    }
    loadCategories();
  }, []);

  // Load products when category changes
  useEffect(() => {
    async function loadProducts() {
      if (currentProduct.category) {
        try {
          const response = await axios.get(
            "http://159.89.3.81:5555/api/v1/product/read"
          );
          const filteredProducts = response.data
            .filter((product) => product.categoryId === currentProduct.category)
            .map((product) => ({
              value: product.id,
              label: product.productName,
            }));
          setProducts(filteredProducts);
        } catch (error) {
          console.error("Error loading products:", error);
        }
      }
    }
    loadProducts();
  }, [currentProduct.category]);

  // Add product to the list
  const handleAddProduct = () => {
    const { category, name, quantity, price } = currentProduct;
    if (!category || !name || !quantity || !price) {
      alert("Zəhmət olmasa bütün məhsul məlumatlarını doldurun");
      return;
    }

    const categoryObj = categories.find((c) => c.value === category);
    const productObj = products.find((p) => p.value === name);

    const newProduct = {
      id: Date.now() + Math.random(), // unique ID
      category: category,
      name: name,
      quantity: quantity,
      price: price,
      categoryName: categoryObj?.label || "",
      productName: productObj?.label || "",
    };

    setProductList((prev) => [...prev, newProduct]);
    setCurrentProduct({
      category: "",
      name: "",
      quantity: "",
      price: "",
    });
  };

  // Edit a product
  const handleEditProduct = (product) => {
    setCurrentProduct({
      category: product.category,
      name: product.name,
      quantity: product.quantity,
      price: product.price,
    });
    setProductList((prev) => prev.filter((p) => p.id !== product.id));
  };

  // Delete a product
  const handleDeleteProduct = (id) => {
    setProductList((prev) => prev.filter((product) => product.id !== id));
  };

  // Handle form submission
  const handleFormSubmit = (data) => {
    if (productList.length === 0) {
      alert("Ən azı bir məhsul əlavə etməlisiniz");
      return;
    }

    // Format the data according to backend requirements
    const formattedData = {
      date: data.orderDate,
      time: data.orderTime,
      warehouseEntryProducts: productList.map((product) => ({
        categoryName: product.categoryName,
        productName: product.productName,
        quantity: parseInt(product.quantity),
        price: parseFloat(product.price),
      })),
      description: data.note,
      sumPrice: sumPrice,
      typeCount: parseInt(data.typeCount),
    };

    console.log("Form submitted:", formattedData);
    if (onSubmit) onSubmit(formattedData);
  };

  // Handle cancel
  const handleCancel = () => {
    if (onCancel) onCancel();
    else navigate(-1);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-4 p-4 max-w-[1000px] mx-auto">
      <div className="flex flex-col gap-2">
        <label htmlFor="orderDate" className="font-medium">
          Sifariş tarixi <span className="text-red-500">*</span>
        </label>
        <input
          id="orderDate"
          type="date"
          {...register("orderDate", { required: "Bu sahə tələb olunur" })}
          className={`w-full h-10 border rounded px-3 ${
            mode === "view" ? "bg-gray-200" : "bg-white"
          }`}
          disabled={mode === "view"}
        />
        {errors.orderDate && (
          <span className="text-red-500 text-sm">
            {errors.orderDate.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="orderTime" className="font-medium">
          Saat <span className="text-red-500">*</span>
        </label>
        <input
          id="orderTime"
          type="time"
          {...register("orderTime", { required: "Bu sahə tələb olunur" })}
          className={`w-full h-10 border rounded px-3 ${
            mode === "view" ? "bg-gray-200" : "bg-white"
          }`}
          disabled={mode === "view"}
        />
        {errors.orderTime && (
          <span className="text-red-500 text-sm">
            {errors.orderTime.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="typeCount" className="font-medium">
          Çeşid sayı <span className="text-red-500">*</span>
        </label>
        <input
          id="typeCount"
          type="number"
          {...register("typeCount", { required: "Bu sahə tələb olunur" })}
          className={`w-full h-10 border rounded px-3 ${
            mode === "view" ? "bg-gray-200" : "bg-white"
          }`}
          disabled={mode === "view"}
        />
        {errors.typeCount && (
          <span className="text-red-500 text-sm">
            {errors.typeCount.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="note" className="font-medium">
          Qeyd <span className="text-red-500">*</span>
        </label>
        <textarea
          id="note"
          {...register("note", { required: "Bu sahə tələb olunur" })}
          rows={4}
          className={`w-full border rounded px-3 py-2 resize-none ${
            mode === "view" ? "bg-gray-200" : "bg-white"
          }`}
          disabled={mode === "view"}
        />
        {errors.note && (
          <span className="text-red-500 text-sm">{errors.note.message}</span>
        )}
      </div>
      {mode !== "view" && (
        <div className="border p-4 rounded bg-gray-50">
          <h3 className="mb-4 font-semibold">Məhsul əlavə et</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            {/* Category dropdown */}
            <div className="flex flex-col">
              <label className="mb-1">Kategoriyası</label>
              <CustomDropdown
                options={categories}
                value={categories.find(
                  (c) => c.value === currentProduct.category
                )}
                onChange={(option) =>
                  setCurrentProduct((prev) => ({
                    ...prev,
                    category: option?.value || "",
                    name: "",
                  }))
                }
                placeholder="Kategoriya seçin"
              />
            </div>

            {/* Product dropdown */}
            <div className="flex flex-col">
              <label className="mb-1">Məhsulun adı</label>
              <CustomDropdown
                options={products}
                value={products.find((p) => p.value === currentProduct.name)}
                onChange={(option) =>
                  setCurrentProduct((prev) => ({
                    ...prev,
                    name: option?.value || "",
                  }))
                }
                placeholder="Məhsul seçin"
                isDisabled={!currentProduct.category}
              />
            </div>

            {/* Quantity input */}
            <div className="flex flex-col">
              <label className="mb-1">Miqdar</label>
              <input
                type="number"
                value={currentProduct.quantity}
                onChange={(e) =>
                  setCurrentProduct((prev) => ({
                    ...prev,
                    quantity: e.target.value,
                  }))
                }
                className="h-10 border rounded px-3"
                min={1}
              />
            </div>

            {/* Price input */}
            <div className="flex flex-col">
              <label className="mb-1">Qiymət</label>
              <input
                type="number"
                value={currentProduct.price}
                onChange={(e) =>
                  setCurrentProduct((prev) => ({
                    ...prev,
                    price: e.target.value,
                  }))
                }
                className="h-10 border rounded px-3"
                min={0}
                step="0.01"
              />
            </div>

            {/* Add button */}
            <div>
              <button
                type="button"
                onClick={handleAddProduct}
                className="w-full h-10 bg-blue-600 text-white rounded flex items-center justify-center gap-2 hover:bg-blue-700">
                <FontAwesomeIcon icon={faPlus} />
                Əlavə et
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Products List */}
      <div>
        <ListWithSubtotal
          data={productList}
          columns={columns}
          keyExtractor={(item) => item.id}
          mode={mode}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          subtotal={sumPrice} // Pass the sumPrice to the ListWithSubtotal component
          actions={(item) =>
            mode !== "view" && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleEditProduct(item)}
                  title="Redaktə et"
                  className="p-1 hover:bg-gray-100 rounded">
                  <EditIcon />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteProduct(item.id)}
                  title="Sil"
                  className="p-1 hover:bg-gray-100 rounded">
                  <DeleteIcon />
                </button>
              </div>
            )
          }
        />
      </div>
      {/* Form Actions */}
      {mode !== "view" && (
        <div className="flex justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 border rounded border-gray-400 hover:bg-gray-100">
            Ləğv et
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2">
            <FontAwesomeIcon icon={faCheck} />
            Yadda saxla
          </button>
        </div>
      )}
    </form>
  );
};

export default StockImportForm;
