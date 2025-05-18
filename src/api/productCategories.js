import axiosInstance from "./temp-axios-auth";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAllCategories = async () => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/product-category/read`
  );
  return response.data;
};

export const getCategoryById = async (id) => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/product-category/read-by-id/${id}`
  );
  return response.data;
};

export const createCategory = async (data) => {
  console.log("Sending POST to:", `${API_BASE_URL}/product-category/create`);
  console.log("Payload:", data);

  const response = await axiosInstance.post(
    `${API_BASE_URL}/product-category/create`,
    data
  );

  console.log("Response:", response);
  return response.data;
};

export const updateCategory = async (data) => {
  const response = await axiosInstance.put(
    `${API_BASE_URL}/product-category/update`,
    data
  );
  return response.data;
};

export const updateCategoryStatus = async (data) => {
  const response = await axiosInstance.put(
    `${API_BASE_URL}/product-category/status-updated`,
    data
  );
  return response.data;
};

export const deleteCategory = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `${API_BASE_URL}/product-category/delete/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete category"
    );
  }
};
export const searchCategories = async (filters) => {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/product-category/search`,
    filters
  );
  return response.data;
};
