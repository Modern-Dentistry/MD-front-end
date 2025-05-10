import { create } from 'zustand';
import {
  createPatient,
  updatePatient,
  readPatients,
  readPatientById,
  deletePatient,
  searchPatients,
  exportPatientsToExcel,
} from "../src/api/patient"

const usePatientStore = create((set) => ({
  patients: [],
  selectedPatient: null,
  loading: false,
  error: null,

  // Read all patients
  fetchPatients: async () => {
    set({ loading: true, error: null });
    try {
      const data = await readPatients();
      set({ patients: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Read single patient by ID
  fetchPatientById: async (id) => {
    try {
      const data = await readPatientById(id);
      set({ selectedPatient: data });
    } catch (err) {
      set({ error: err.message });
    }
  },

  // Add new patient
  addPatient: async (patientData) => {
    try {
      await createPatient(patientData);
      await usePatientStore.getState().fetchPatients();
    } catch (err) {
      set({ error: err.message });
    }
  },

  // Update patient
  editPatient: async (patientData) => {
    try {
      await updatePatient(patientData);
      await usePatientStore.getState().fetchPatients();
    } catch (err) {
      set({ error: err.message });
    }
  },

  // Delete patient
  removePatient: async (id) => {
    try {
      await deletePatient(id);
      await usePatientStore.getState().fetchPatients();
    } catch (err) {
      set({ error: err.message });
    }
  },

  // Search patients
  searchPatients: async (params) => {
    try {
      const data = await searchPatients(params);
      set({ patients: data });
    } catch (err) {
      set({ error: err.message });
    }
  },

  // Export to Excel
  exportPatients: async () => {
    try {
      await exportPatientsToExcel();
    } catch (err) {
      set({ error: err.message });
    }
  },
}));

export default usePatientStore;
