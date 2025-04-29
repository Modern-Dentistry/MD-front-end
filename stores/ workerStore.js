import { create } from "zustand";
import {
  createWorker,
  readWorkers,
  getWorkerInfo,
  updateWorker,
  deleteWorker,
  readWorkerStatus,
  searchWorkers,
} from "../src/api/add-worker.js";

const useWorkerStore = create((set) => ({
  workers: [],
  selectedWorker: null,
  statusList: [],
  loading: false,
  error: null,

  fetchWorkers: async () => {
    set({ loading: true, error: null });
    try {
      const data = await readWorkers();
      set({ workers: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchWorkerStatus: async () => {
    try {
      const data = await readWorkerStatus();
      set({ statusList: data });
    } catch (err) {
      set({ error: err.message });
    }
  },

  fetchWorkerById: async (id) => {
    try {
      const data = await getWorkerInfo(id);
      set({ selectedWorker: data });
    } catch (err) {
      set({ error: err.message });
    }
  },

  addWorker: async (workerData) => {
    try {
      await createWorker(workerData);
      await useWorkerStore.getState().fetchWorkers(); 
    } catch (err) {
      set({ error: err.message });
    }
  },

  editWorker: async (workerData) => {
    try {
      await updateWorker(workerData);
      await useWorkerStore.getState().fetchWorkers();
    } catch (err) {
      set({ error: err.message });
    }
  },

  removeWorker: async (id) => {
    try {
      await deleteWorker(id);
      await useWorkerStore.getState().fetchWorkers();
    } catch (err) {
      set({ error: err.message });
    }
  },

  searchWorkers: async (params) => {
    try {
      const data = await searchWorkers(params);
      set({ workers: data });
    } catch (err) {
      set({ error: err.message });
    }
  },
}));

export default useWorkerStore;
