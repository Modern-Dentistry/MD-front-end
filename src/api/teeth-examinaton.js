import axiosInstance from "./temp-axios-auth";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

// 🟢 Create
export const createTeethExamination = async (data) => {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/teeth-examination/create`,
    data
  );
  return response.data;
};

// 🟡 Update
export const updateTeethExamination = async (data) => {
  const response = await axiosInstance.put(
    `${API_BASE_URL}/teeth-examination/update`,
    data
  );
  return response.data;
};

// 🔍 Search
export const searchTeethExaminations = async (params) => {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/teeth-examination/search`,
    params
  );
  return response.data;
};

// 🔵 Read (bütününü gətirir)
export const getAllTeethExaminations = async () => {
  const response = await axiosInstance.get(
    `${API_BASE_URL}/teeth-examination/read`
  );
  return response.data;
};



// 🔴 Delete
export const deleteTeethExaminationById = async (id) => {
  const response = await axiosInstance.delete(
    `${API_BASE_URL}/teeth-examination/delete/${id}`
  );
  return response.data;
};
