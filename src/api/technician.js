import axiosInstance from "./temp-axios-auth";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const createTechnician = async (data) => {
  const response = await axiosInstance.post(`${API_BASE_URL}/create`, data);
  return response.data;
};

export const searchTechnicians = async (searchParams) => {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/search`,
    searchParams
  );
  return response.data;
};

export const updateTechnician = async (id, data) => {
  const response = await axiosInstance.put(
    `${API_BASE_URL}/update/${id}`,
    data
  );
  return response.data;
};

export const updateTechnicianStatus = async (id, status) => {
  const response = await axiosInstance.patch(
    `${API_BASE_URL}/update/status/${id}`,
    { status }
  );
  return response.data;
};

export const getAllTechnicians = async () => {
  const response = await axiosInstance.get(`${API_BASE_URL}/read`);
  return response.data;
};

export const getTechnicianById = async (id) => {
  const response = await axiosInstance.get(`${API_BASE_URL}/read-by-id/${id}`);
  return response.data;
};

export const exportTechniciansToExcel = async () => {
  const response = await axiosInstance.get(`${API_BASE_URL}/export/excel`, {
    responseType: "blob", // Excel faylı üçün vacibdir
  });
  return response.data;
};

export const deleteTechnician = async (id) => {
  const response = await axiosInstance.delete(`${API_BASE_URL}/delete/${id}`);
  return response.data;
};
