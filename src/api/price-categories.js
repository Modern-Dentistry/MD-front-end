import axiosInstance from "./temp-axios-auth";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const createPriceCategory = async (categoryData) => {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/price-categories/create`,
    categoryData
  );
  return response.data;
};

// Read all price categories
export const readPriceCategories = async () => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/price-categories/read`
  );
  return response.data;
};

// Read price category by ID
export const readPriceCategoryById = async (id) => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/price-categories/read-by-id/${id}`
  );
  return response.data;
};

// Update price category
export const updatePriceCategory = async (id, categoryData) => {
  const response = await axiosInstance.put(
    `${API_BASE_URL}/price-categories/update/${id}`,
    categoryData
  );
  return response.data;
};

// Update price category status
export const updatePriceCategoryStatus = async (id, statusData) => {
  const response = await axiosInstance.patch(
    `${API_BASE_URL}/price-categories/update/status/${id}`,
    statusData
  );
  return response.data;
};

// Delete price category
export const deletePriceCategory = async (id) => {
  const response = await axiosInstance.put(
    `${API_BASE_URL}/price-categories/delete/${id}`
  );
  return response.data;
};

// Search price categories
export const searchPriceCategories = async (searchParams) => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/price-categories/search`,
    { params: searchParams }
  );
  return response.data;
};

// Export price categories to Excel
export const exportPriceCategoriesToExcel = async () => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/price-categories/export/excel`,
    {
      responseType: "blob",
    }
  );
  return response.data;
};
