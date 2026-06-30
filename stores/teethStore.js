import { create } from "zustand";
import {
  createTooth,
  searchTeeth,
  updateTooth,
  readAllTeeth,
  readByToothNo,
  deleteTooth,
} from "../src/api/teeth";

const useTeethStore = create((set) => ({
  teeth: [],
  selectedTooth: null,
  loading: false,
  error: null,

  fetchTeeth: async () => {
    set({ loading: true });
    try {
      const data = await readAllTeeth();
      set({ teeth: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  fetchByToothNo: async (id) => {
    set({ loading: true });
    try {
      const allTeeth = await readAllTeeth();
      const tooth = allTeeth.find((t) => t.id === Number(id));
      if (tooth) {
        set({ selectedTooth: tooth, teeth: allTeeth, loading: false });
      } else {
        set({ error: new Error("Tooth not found"), loading: false });
      }
    } catch (error) {
      set({ error, loading: false });
    }
  },
  fetchToothById: async (id) => {
    set({ loading: true });
    try {
      const data = await readToothById(id); // <-- API-dən fetch
      set({ selectedTooth: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  addTooth: async (toothData) => {
    set({ loading: true });
    try {
      const newTooth = await createTooth(toothData);
      set((state) => ({
        teeth: [...state.teeth, newTooth],
        loading: false,
      }));
    } catch (error) {
      set({ error, loading: false });
    }
  },

  updateTooth: async (toothData) => {
    set({ loading: true });
    try {
      const updated = await updateTooth(toothData);
      set((state) => ({
        teeth: state.teeth.map((item) =>
          item.id === updated.id ? updated : item
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error, loading: false });
    }
  },

  removeTooth: async (id) => {
    set({ loading: true });
    try {
      await deleteTooth(id);
      set((state) => ({
        teeth: state.teeth.filter((item) => item.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error, loading: false });
    }
  },

  searchTeeth: async (criteria) => {
    set({ loading: true });
    try {
      const results = await searchTeeth(criteria);
      set({ teeth: results, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));

export default useTeethStore;
