import axiosInstance from "./temp-axios-auth";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const createWorker = async (workerData) => {
  try {
    // Create a simple JSON object with all fields
    const payload = {
      username: workerData.username,
      password: workerData.password,
      name: workerData.name,
      surname: workerData.surname,
      patronymic: workerData.patronymic,
      finCode: workerData.finCode || "",
      colorCode: workerData.colorCode || "#ffffff",
      genderStatus: workerData.genderStatus,
      dateOfBirth: workerData.dateOfBirth,
      degree: workerData.degree || "",
      phone: workerData.phone,
      phone2: workerData.phone2 || "",
      phone3: workerData.phone3 || "",
      homePhone: workerData.homePhone || "",
      email: workerData.email || "",
      address: workerData.address || "",
      experience: workerData.experience || 0,
      permissions: workerData.permissions || [],
    };
    
    console.log("Creating worker with data:", JSON.stringify(payload, null, 2));
    const response = await axiosInstance.post(
      `${API_BASE_URL}/add-worker/create`,
      payload
    );
    console.log("Worker created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error creating worker:", error);
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
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

export const readWorkerRoles = async () => {
  try {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/add-worker/read-roles`
    );
    return response.data;
  } catch (error) {
    console.error("Error reading worker roles:", error);
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
  console.log("🔧 Göndərilən worker data:", workerData);
  try {
    const response = await axiosInstance.put(
      `${API_BASE_URL}/add-worker/update`,
      workerData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating worker:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const searchWorkers = async (searchParams) => {
  try {
    const transformedParams = {};
    for (const key in searchParams) {
      if (
        searchParams[key] !== undefined &&
        searchParams[key] !== null &&
        searchParams[key] !== ""
      ) {
        if (typeof searchParams[key] === "string") {
          transformedParams[key] = `%${searchParams[key]}%`;
        } else {
          transformedParams[key] = searchParams[key];
        }
      }
    }

    console.log("Sending search parameters:", transformedParams);
    const response = await axiosInstance.post(
      `${API_BASE_URL}/add-worker/search`,
      transformedParams
    );
    console.log("Search results received:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error searching workers:", error);
    if (error.response) {
      console.error("Search error response data:", error.response.data);
      console.error("Search error response status:", error.response.status);
    }
    throw error;
  }
};

export const deleteWorker = async (id) => {
  try {
    console.log("Attempting to delete worker with id:", id);
    const response = await axiosInstance.delete(
      `${API_BASE_URL}/add-worker/delete/${id}`
    );
    if (response.status === 200) {
      console.log("✅ Worker deleted successfully");
    } else {
      console.error("❌ Worker deletion failed:", response);
    }
    return response.data;
  } catch (error) {
    console.error(
      "❌ Error deleting worker:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchWorkersByPermission = async (permissionName) => {
  try {
    const response = await axiosInstance.post(
      `${API_BASE_URL}/add-worker/read-permission/${permissionName}`
    );
    return response.data;
  } catch (error) {
    console.error(`Rol ilə işçiləri gətirərkən xəta: ${permissionName}`, error);
    throw error;
  }
};

export const apiFetchPermissions = async () => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/permission/read`);
    return response.data;
  } catch (error) {
    console.error("Permissions gətirərkən xəta:", error);
    throw error;
  }
};