import { create } from 'zustand';
import {
  getDoctors,
  getRooms,
  getDoctorPatients,
  getRoomPatients,
  getPatientDetails,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from '../src/api/general-calendar'; 

const useCalendarStore = create((set) => ({
  doctors: [],
  rooms: [],
  patients: [],
  selectedPatient: null,
  loading: false,
  error: null,

  // 🧑‍⚕️ Get all doctors
  fetchDoctors: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getDoctors();
      set({ doctors: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  // 🏥 Get all rooms
  fetchRooms: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getRooms();
      set({ rooms: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  // 📋 Create appointment
  addAppointment: async (appointmentData) => {
    set({ loading: true, error: null });
    try {
      await createAppointment(appointmentData);
    } catch (error) {
      set({ error, loading: false });
    } finally {
      set({ loading: false });
    }
  },

  // ✏️ Update appointment
  modifyAppointment: async (appointmentData) => {
    set({ loading: true, error: null });
    try {
      await updateAppointment(appointmentData);
    } catch (error) {
      set({ error, loading: false });
    } finally {
      set({ loading: false });
    }
  },

  // ❌ Delete appointment
  removeAppointment: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteAppointment(id);
    } catch (error) {
      set({ error, loading: false });
    } finally {
      set({ loading: false });
    }
  },

  // 👨‍⚕️ Get patients by doctor
  fetchDoctorPatients: async (doctorId) => {
    set({ loading: true, error: null });
    try {
      const data = await getDoctorPatients(doctorId);
      set({ patients: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  // 🏠 Get patients by room
  fetchRoomPatients: async (roomId) => {
    set({ loading: true, error: null });
    try {
      const data = await getRoomPatients(roomId);
      set({ patients: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  // 🔍 Get patient details
  fetchPatientDetails: async (patientId) => {
    set({ loading: true, error: null });
    try {
      const data = await getPatientDetails(patientId);
      set({ selectedPatient: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  // 💧 Clear selected patient
  clearSelectedPatient: () => set({ selectedPatient: null }),
}));

export default useCalendarStore;
