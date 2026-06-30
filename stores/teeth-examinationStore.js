import { create } from "zustand";
import {
  createTeethExamination,
  updateTeethExamination,
  searchTeethExaminations,
  getAllTeethExaminations,
  deleteTeethExaminationById,
} from "../src/api/teeth-examinaton";

const useTeethExaminationStore = create((set, get) => ({
  teethExaminations: [],
  examinationDetails: null,
  loading: false,
  error: null,

  // 🔵 Read all
  fetchAllTeethExaminations: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getAllTeethExaminations();
      set({ teethExaminations: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  // 📌 Read by ID
  fetchExaminationById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await getTeethExaminationById(id);
      set({ examinationDetails: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
      throw error;
    }
  },

  // 🟢 Create
  createTeethExamination: async (examinationData) => {
    set({ loading: true, error: null });
    try {
      const created = await createTeethExamination(examinationData);
      set((state) => ({
        teethExaminations: [...state.teethExaminations, created],
        loading: false,
      }));
    } catch (error) {
      set({ error, loading: false });
      throw error;
    }
  },

  // 🟡 Update
  updateTeethExamination: async (examinationData) => {
    set({ loading: true, error: null });
    try {
      const updated = await updateTeethExamination(examinationData);
      set((state) => ({
        teethExaminations: state.teethExaminations.map((exam) =>
          exam.id === updated.id ? updated : exam
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error, loading: false });
      throw error;
    }
  },

  // 🔍 Search
  searchTeethExaminations: async (searchParams) => {
    set({ loading: true, error: null });
    try {
      const results = await searchTeethExaminations(searchParams);
      set({ teethExaminations: results, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  // 🔴 Delete
  deleteTeethExamination: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteTeethExaminationById(id);
      set((state) => ({
        teethExaminations: state.teethExaminations.filter(
          (exam) => exam.id !== id
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error, loading: false });
      throw error;
    }
  },
}));

export default useTeethExaminationStore;
