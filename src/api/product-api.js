import axiosInstance from "./temp-axios-auth";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(
      "http://159.89.3.81:5555/api/v1/product/create",
      productData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Xəta:", error.response?.data || error.message);
    throw error;
  }
};

// Mövcud məhsulu yeniləmək
export const updateProduct = async (productData) => {
    const response = await axiosInstance.put(
      `${API_BASE_URL}/product/update`,
      productData
    );
    console.log("Update API response:", response.data);
    return response.data;
  };
// Məhsul statusunu dəyişmək
export const updateProductStatus = async (statusPayload) => {
  const response = await axiosInstance.patch(
    `${API_BASE_URL}/product/status-update`,
    statusPayload
  );
  return response.data;
};

// Məhsulları axtarmaq (filtrlərlə)
export const searchProducts = async (filters) => {
  // filters - obyekt, məsələn { name: 'abc', status: 'ACTIVE' }
  const response = await axiosInstance.post(
    `${API_BASE_URL}/product/search`,
    filters
  );
  return response.data;
};

// Bütün məhsulları oxumaq
export const getAllProducts = async () => {
  const response = await axiosInstance.get(`${API_BASE_URL}/product/read`);
  return response.data;
};

// ID üzrə məhsulu oxumaq
export const getProductById = async (id) => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/product/read-by-id/${id}`
  );
  return response.data;
};

// Məhsulu silmək
export const deleteProduct = async (id) => {
  const response = await axiosInstance.delete(
    `${API_BASE_URL}/product/delete/${id}`
  );
  return response.data;
};
