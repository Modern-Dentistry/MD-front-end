// stores/usePatientXrayStore.js
import { create } from "zustand";
import {
  createPatientXray,
  updatePatientXray,
  getAllPatientXrays,
  getPatientXrayById,
  deletePatientXray,
} from "../src/api/patient-xray";

const usePatientXrayStore = create((set, get) => ({
  xrays: [],
  selectedXray: null,
  loading: false,
  error: null,

  fetchXrays: async (patientId) => {
    set({ loading: true, error: null });
    try {
      const data = await getAllPatientXrays(patientId);
      set({ xrays: data, loading: false });
    } catch (err) {
      set({
        error:
          err.response?.data?.message ||
          err.message ||
          "Xəta baş verdi",
        loading: false,
      });
    }
  },

  fetchXrayById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await getPatientXrayById(id);
      set({ selectedXray: data, loading: false });
    } catch (err) {
      set({
        error:
          err.response?.data?.message ||
          err.message ||
          "Xəta baş verdi",
        loading: false,
      });
    }
  },

  // Tek dosya için createXray
  createXray: async (xrayData, file) => {
    set({ loading: true, error: null });
    try {
      const newXray = await createPatientXray(xrayData, file);
      set((state) => ({
        xrays: [...state.xrays, newXray],
        loading: false,
      }));
      return newXray;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Xəta baş verdi";
      set({ error: errorMessage, loading: false });
      throw err;
    }
  },

  // Birden fazla dosya için createMultipleXrays
  createMultipleXrays: async (xrayData, files) => {
    set({ loading: true, error: null });
    try {
      // Tüm dosyaları paralel olarak gönder
      const promises = files.map((file) =>
        createPatientXray(xrayData, file)
      );
      const newXrays = await Promise.all(promises);
      
      set((state) => ({
        xrays: [...state.xrays, ...newXrays],
        loading: false,
      }));
      return newXrays;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Xəta baş verdi";
      set({ error: errorMessage, loading: false });
      throw err;
    }
  },

  updateXray: async (id, xrayData, file) => {
    set({ loading: true, error: null });
    try {
      const updatedXray = await updatePatientXray(id, xrayData, file);
      set((state) => ({
        xrays: state.xrays.map((x) => (x.id === id ? updatedXray : x)),
        loading: false,
      }));
      return updatedXray;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Xəta baş verdi";
      set({ error: errorMessage, loading: false });
      throw err;
    }
  },

  deleteXray: async (id) => {
    set({ loading: true, error: null });
    try {
      await deletePatientXray(id);
      set((state) => ({
        xrays: state.xrays.filter((x) => x.id !== id),
        loading: false,
      }));
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Xəta baş verdi";
      set({ error: errorMessage, loading: false });
      throw err;
    }
  },

  clearSelectedXray: () => set({ selectedXray: null }),
  
  clearError: () => set({ error: null }),
}));

export default usePatientXrayStore;
