import axiosInstance from "./temp-axios-auth";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const createWorker = async (workerData) => {
  try {
    const response = await axiosInstance.post(
      `${API_BASE_URL}/add-worker/create`,
      workerData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating worker:", error);
    throw error;
  }
};

export const readWorkers = async () => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/add-worker/read`);
    return response.data;
  } catch (error) {
    console.error("Error reading workers:", error);
    throw error;
  }
};

export const readWorkerStatus = async () => {
  try {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/add-worker/read-status`
    );
    return response.data;
  } catch (error) {
    console.error("Error reading worker status:", error);
    throw error;
  }
};

export const getWorkerInfo = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/add-worker/info/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting worker info:", error);
    throw error;
  }
};

export const updateWorker = async (workerData) => {
  try {
    const response = await axiosInstance.put(
      `${API_BASE_URL}/add-worker/update`,
      workerData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating worker:", error);
    throw error;
  }
};

export const searchWorkers = async (searchParams) => {
  try {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/add-worker/search`,
      { params: searchParams }
    );
    return response.data;
  } catch (error) {
    console.error("Error searching workers:", error);
    throw error;
  }
};

export const deleteWorker = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `${API_BASE_URL}/add-worker/delete/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting worker:", error);
    throw error;
  }
};
