// api/patientXrayApi.js
import axiosInstance from "./temp-axios-auth";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const createPatientXray = async (data, file) => {
  const formData = new FormData();
  
  // API dokümantasyonuna göre data bir obje olarak gönderilmeli
  // Blob kullanarak Content-Type'ı application/json olarak ayarlıyoruz
  const jsonData = JSON.stringify({
    date: data.date,
    description: data.description,
    patientId: data.patientId,
  });
  
  formData.append(
    "data",
    new Blob([jsonData], { type: "application/json" })
  );
  
  // File binary olarak gönderilmeli
  formData.append("file", file);

  // Content-Type header'ını manuel eklemeye gerek yok
  // Interceptor FormData'yı algılayıp otomatik olarak doğru header'ı ayarlayacak
  const response = await axiosInstance.post(
    `${API_BASE_URL}/patient-xray/create`,
    formData
  );
  return response.data;
};

export const updatePatientXray = async (id, data, file) => {
  const formData = new FormData();
  
  const jsonData = JSON.stringify({
    date: data.date,
    description: data.description,
  });
  
  formData.append(
    "data",
    new Blob([jsonData], { type: "application/json" })
  );
  
  if (file) {
    formData.append("file", file);
  }

  const response = await axiosInstance.put(
    `${API_BASE_URL}/patient-xray/update/${id}`,
    formData
  );
  return response.data;
};

export const getAllPatientXrays = async (patientId) => {
  const response = await axiosInstance.get(`${API_BASE_URL}/patient-xray/read`, {
    params: { patientId }
  });
  return response.data;
};

export const getPatientXrayById = async (id) => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/patient-xray/read-by-id/${id}`
  );
  return response.data;
};

export const deletePatientXray = async (id) => {
  const response = await axiosInstance.delete(
    `${API_BASE_URL}/patient-xray/delete/${id}`
  );
  return response.data;
};
