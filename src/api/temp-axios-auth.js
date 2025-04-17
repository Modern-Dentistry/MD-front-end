import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;
console.log('API_BASE_URL:', API_BASE_URL);

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_AUTH;
  console.log('Token:', token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Authorization header:', config.headers.Authorization);
  }
  return config;
});

export default axiosInstance;