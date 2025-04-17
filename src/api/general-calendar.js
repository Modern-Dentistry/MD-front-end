import axiosInstance from './temp-axios-auth';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const getDoctors = async () => {
    const response = await axiosInstance.get('/general-calendar/read-doctors')
    return response.data
}