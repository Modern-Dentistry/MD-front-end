import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  createWorker,
  readWorkers,
  getWorkerInfo,
  updateWorker,
  deleteWorker,
  readWorkerRoles,
  searchWorkers,
  fetchWorkersByPermission,
  apiFetchPermissions,
} from "../src/api/add-worker";

const useWorkerStore = create(
  persist(
    (set, get) => ({
  workers: [],
  searchResult: [],
  selectedWorker: null,
  rolesList: [],
  permissions: [],
  loading: false,
  error: null,

  // Yeni funksiya əlavə edildi
  clearSelectedWorker: () => set({ selectedWorker: null }),

  fetchWorkers: async () => {
    set({ loading: true, error: null });
    try {
      const data = await readWorkers();
      set({ workers: data, searchResult: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchWorkerRoles: async () => {
    try {
      const data = await readWorkerRoles();
      set({ rolesList: data });
    } catch (err) {
      set({ error: err.message });
    }
  },

  fetchWorkerById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await getWorkerInfo(id);
      set({ selectedWorker: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  addWorker: async (workerData) => {
    set({ loading: true, error: null });
    try {
      await createWorker(workerData);
      await get().fetchWorkers();
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  editWorker: async (workerData) => {
    set({ loading: true, error: null });
    try {
      await updateWorker(workerData);
      await get().fetchWorkers();
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  removeWorker: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteWorker(id);
      console.log(`İşçi (ID: ${id}) uğurla silindi.`);
      const { workers, searchResult } = get();
      const updatedWorkers = workers.filter((worker) => worker.id !== id);
      const updatedSearchResult = searchResult.filter(
        (worker) => worker.id !== id
      );
      set({
        workers: updatedWorkers,
        searchResult: updatedSearchResult,
        loading: false,
      });
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  setSearchResult: (data) => set({ searchResult: data }),

  searchWorkers: async (params) => {
    set({ loading: true, error: null });
    try {
      const data = await searchWorkers(params);
      set({ searchResult: data, loading: false, error: null });
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  fetchByPermission: async (permissionName) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchWorkersByPermission(permissionName);
      set({ searchResult: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error("Rol üzrə işçilər gətirilərkən xəta:", error);
    }
  },

  fetchPermissions: async () => {
    set({ loading: true, error: null });
    try {
      const data = await apiFetchPermissions();
      set({ permissions: data, loading: false });
    } catch (error) {
      set({
        error: error.message || "İcazələri gətirə bilmədik",
        loading: false,
      });
      console.error("Permissions gətirərkən xəta:", error);
    }
  },
    }),
    {
      name: 'worker-storage', // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Sadece belirli state'leri persist et (büyük array'leri persist etme)
        selectedWorker: state.selectedWorker,
        permissions: state.permissions,
        rolesList: state.rolesList,
        // workers ve searchResult persist edilmesin (her zaman fresh fetch edilsin)
      }),
    }
  )
);

export default useWorkerStore;