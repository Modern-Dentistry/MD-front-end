import axiosInstance from "./temp-axios-auth";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const getWarehouseEntries = async () => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/warehouse-entry/read`
  );
  return response.data;
};

export const createWarehouseEntry = async (entryData) => {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/warehouse-entry/create`,
    entryData
  );
  return response.data;
};

export const updateWarehouseEntry = async (entryData) => {
  const response = await axiosInstance.put(
    `${API_BASE_URL}/warehouse-entry/update`,
    entryData
  );
  return response.data;
};

export const searchWarehouseEntry = async (searchData) => {
  const response = await axiosInstance.post(
    ` ${API_BASE_URL}/warehouse-entry/search`,
    searchData
  );
  return response.data;
};

export const getWarehouseEntryInfo = async (id) => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/warehouse-entry/info/${id}`
  );
  return response.data;
};

export const deleteWarehouseEntry = async (id) => {
  const response = await axiosInstance.delete(
    `${API_BASE_URL}/warehouse-entry/delete/${id}`
  );
  return response.data;
};

export const deleteEntryProduct = async (entryId, productId) => {
  const response = await axiosInstance.delete(
    `${API_BASE_URL}/warehouse-entry/delete-entry-product/warehouse-entry/${entryId}/warehouse-entry-product/${productId}`
  );
  return response.data;
};
