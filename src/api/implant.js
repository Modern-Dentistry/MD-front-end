import axiosInstance from "./temp-axios-auth";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

// Implant yaratmaq
export const createImplant = async (data) => {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/implant/create`,
    data
  );
  return response.data;
};

// Implant yeniləmək (update)

export const updateImplant = async (id, data) => {
  const payload = {
    implantId: Number(id),
    implantBrandName: data.implantBrandName,
  };
  const response = await axiosInstance.put(
    `${API_BASE_URL}/implant/update`,
    payload
  );
  return response.data;
};
// Implant statusunu yeniləmək
export const updateImplantStatus = async (data) => {
  // data = { implantId: 0, status: "ACTIVE" }
  const response = await axiosInstance.put(
    `${API_BASE_URL}/implant/status-update`,
    data
  );
  return response.data;
};

// Implantları axtarmaq (search)
export const searchImplants = async (params) => {
  const response = await axiosInstance.post(`${API_BASE_URL}/implant/search`, params);
  return response.data;
};

// Implantların siyahısını oxumaq (read)
export const getAllImplants = async () => {
  const response = await axiosInstance.get(`${API_BASE_URL}/implant/read`);
  return response.data;
};

// Implant silmək (delete)
export const deleteImplantById = async (id) => {
  const response = await axiosInstance.delete(
    `${API_BASE_URL}/implant/delete/${id}`
  );
  return response.data;
};
