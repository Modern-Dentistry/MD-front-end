import axiosInstance from "./temp-axios-auth";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

// ✔ Create
export const createPatientInsuranceBalance = async (data) => {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/patient-insurance-balance/create`,
    data
  );
  return response.data;
};

// ✔ Update
export const updatePatientInsuranceBalance = async (id, data) => {
  const response = await axiosInstance.put(
    `${API_BASE_URL}/patient-insurance-balance/update/${id}`,
    data
  );
  return response.data;
};

// ✔ Update status
export const updatePatientInsuranceBalanceStatus = async (id, statusData) => {
  const response = await axiosInstance.patch(
    `${API_BASE_URL}/patient-insurance-balance/update-status/${id}`,
    statusData
  );
  return response.data;
};

// ✔ Read all
export const readPatientInsuranceBalance = async () => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/patient-insurance-balance/read`
  );
  return response.data;
};

// ✔ Read by ID
export const readPatientInsuranceBalanceById = async (id) => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/patient-insurance-balance/read-by-id/${id}`
  );
  return response.data;
};

// ✔ Delete
export const deletePatientInsuranceBalance = async (id) => {
  const response = await axiosInstance.delete(
    `${API_BASE_URL}/patient-insurance-balance/delete/${id}`
  );
  return response.data;
};
