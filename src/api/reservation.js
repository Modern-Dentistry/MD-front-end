import axiosInstance from "./temp-axios-auth";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAllReservations = async () => {
  const response = await axiosInstance.get(`${API_BASE_URL}/read`);
  return response.data;
};

export const getReservationById = async (id) => {
  const response = await axiosInstance.get(`${API_BASE_URL}/read-by-id/${id}`);
  return response.data;
};

export const createReservation = async (data) => {
  const response = await axiosInstance.post(`${API_BASE_URL}/create`, data);
  return response.data;
};

export const updateReservation = async (id, data) => {
  const response = await axiosInstance.put(
    `${API_BASE_URL}/update/${id}`,
    data
  );
  return response.data;
};

export const updateReservationStatus = async (id, statusData) => {
  const response = await axiosInstance.patch(
    `${API_BASE_URL}/update/status/${id}`,
    statusData
  );
  return response.data;
};

export const deleteReservation = async (id) => {
  const response = await axiosInstance.delete(`${API_BASE_URL}/delete/${id}`);
  return response.data;
};

export const searchReservations = async (filters) => {
  const response = await axiosInstance.post(`${API_BASE_URL}/search`, filters);
  return response.data;
};

export const exportReservationsToExcel = async () => {
  const response = await axiosInstance.get(`${API_BASE_URL}/export/excel`, {
    responseType: "blob", // Excel file
  });
  return response.data;
};
