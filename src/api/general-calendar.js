import axiosInstance from './temp-axios-auth';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const getDoctors = async () => {
    const response = await axiosInstance.get('/general-calendar/read-doctors')
    return response.data
}

export const getRooms = async () => {
    const response = await axiosInstance.get('/general-calendar/read-rooms')
    return response.data
}

export const updateAppointment = async (appointmentData) => {
    const response = await axiosInstance.put('/general-calendar/update-appointment', appointmentData)
    return response.data
}

export const createAppointment = async (appointmentData) => {
    const response = await axiosInstance.post('/general-calendar/new-appointment', appointmentData)
    return response.data
}

export const getRoomPatients = async (room) => {
    const response = await axiosInstance.get(`/general-calendar/selecting-room-viewing-patient/${room}`)
    return response.data
}

export const getPatientDetails = async (patientId) => {
    const response = await axiosInstance.get(`/general-calendar/selecting-patient-to-read/${patientId}`)
    return response.data
}

export const getDoctorPatients = async (doctorId) => {
    const response = await axiosInstance.get(`/general-calendar/selecting-doctor-viewing-patient/${doctorId}`)
    return response.data
}

export const deleteAppointment = async (id) => {
    const response = await axiosInstance.delete(`/general-calendar/delete-appointment/${id}`)
    return response.data
}