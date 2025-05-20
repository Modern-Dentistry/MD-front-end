import axiosInstance from "./temp-axios-auth";

const API_BASE_URL = `${import.meta.env.VITE_BASE_URL}/order-from-warehouse`;

export const getAllOrdersFromWarehouse = async () => {
  const response = await axiosInstance.get(`${API_BASE_URL}/read`);
  return response.data;
};

export const getOrderFromWarehouseById = async (id) => {
  const response = await axiosInstance.get(`${API_BASE_URL}/info/${id}`);
  return response.data;
};

export const createOrderFromWarehouse = async (data) => {
  const response = await axiosInstance.post(`${API_BASE_URL}/create`, data);
  return response.data;
};

export const updateOrderFromWarehouse = async (data) => {
  const response = await axiosInstance.put(`${API_BASE_URL}/update`, data);
  return response.data;
};

export const deleteOrderFromWarehouse = async (id) => {
  const response = await axiosInstance.delete(`${API_BASE_URL}/delete/${id}`);
  return response.data;
};

export const deleteProductFromOrderFromWarehouse = async (orderId, productId) => {
  const response = await axiosInstance.delete(
    `${API_BASE_URL}/delete-order-from-warehouse-product/order-from-warehouse/${orderId}/order-from-warehouse-product/${productId}`
  );
  return response.data;
};

export const searchOrdersFromWarehouse = async (filters) => {
  const response = await axiosInstance.post(`${API_BASE_URL}/search`, filters);
  return response.data;
};
