import axiosInstance from "./temp-axios-auth";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const createPatient = async (patientData) => {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/patient/create`,
    patientData
  );
  return response.data;
};

// Update patient
export const updatePatient = async (patientData) => {
  const response = await axiosInstance.put(
    ` ${API_BASE_URL}/patient/update`,
    patientData
  );
  return response.data;
};
// Search patients
export const searchPatients = async (searchParams) => {
  const response = await fetch(`${API_BASE_URL}/patient/search`, {
    method: "GET",
    body: JSON.stringify(searchParams),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

// Read all patients
export const readPatients = async () => {
  const response = await axiosInstance.get(`${API_BASE_URL}/patient/read`);
  return response.data;
};

// Read patient by ID
export const readPatientById = async (id) => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/patient/read-by-id/${id}`
  );
  return response.data;
};

// Export patients to Excel
export const exportPatientsToExcel = async () => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/patient/export/excel`,
    {
      responseType: "blob",
    }
  );
  return response.data;
};

// Delete patient by ID
export const deletePatient = async (id) => {
  const response = await axiosInstance.delete(
    `${API_BASE_URL}/patient/delete/${id}`
  );
  return response.data;
};
