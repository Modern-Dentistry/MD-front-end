import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;
// Create a new worker
export const createWorker = async (workerData) => {
  const response = await axios.post(`${API_BASE_URL}/add-worker/creaaate`, workerData);
  return response.data;
};

// Read all workers
export const readWorkers = async () => {
  const response = await axios.get(`${API_BASE_URL}/add-worker/read`);
  return response.data;
};

// Read worker status
export const readWorkerStatus = async () => {
  const response = await axios.get(`${API_BASE_URL}/add-worker/read-status`);
  return response.data;
};

// Get worker info by ID
export const getWorkerInfo = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/add-worker/info/${id}`);
  return response.data;
};

// Update worker
export const updateWorker = async (workerData) => {
  const response = await axios.put(`${API_BASE_URL}/add-worker/update`, workerData);
  return response.data;
};

// Search workers
export const searchWorkers = async (searchParams) => {
  const response = await axios.get(`${API_BASE_URL}/add-worker/search`, { params: searchParams });
  return response.data;
};

// Delete worker by ID
export const deleteWorker = async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/add-worker/delete/${id}`);
  return response.data;
};
