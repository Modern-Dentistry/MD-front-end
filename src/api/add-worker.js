import axiosInstance from './temp-axios-auth';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

// Create a new worker
export const createWorker = async (workerData) => {
  const response = await axiosInstance.post(`${API_BASE_URL}/add-worker/create`, workerData);
  return response.data;
};


export const readWorkers = async () => {
  const response = await axiosInstance.get(`${API_BASE_URL}/add-worker/read`);
  return response.data;
};

// Read worker status
export const readWorkerStatus = async () => {
  const response = await axiosInstance.get(`${API_BASE_URL}/add-worker/read-status`);
  return response.data;
};

// Get worker info by ID
export const getWorkerInfo = async (id) => {
  const response = await axiosInstance.get(`${API_BASE_URL}/add-worker/info/${id}`);
  return response.data;
};

// Update worker
export const updateWorker = async (workerData) => {
  const response = await axiosInstance.put(`${API_BASE_URL}/add-worker/update`, workerData);
  return response.data;
};

// Search workers
export const searchWorkers = async (searchParams) => {
  const response = await axiosInstance.get(`${API_BASE_URL}/add-worker/search`, { params: searchParams });
  return response.data;
};

// Delete worker by ID
export const deleteWorker = async (id) => {
  const response = await axiosInstance.delete(`${API_BASE_URL}/add-worker/delete/${id}`);
  return response.data;
};
