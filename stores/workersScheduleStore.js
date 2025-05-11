import { create } from "zustand";
import {
  createWorkerSchedule,
  updateWorkerSchedule,
  getWorkerSchedules,
  searchWorkerSchedules,
  deleteWorkerSchedule,
} from "../src/api/worker-schedule"; 

const useWorkersScheduleStore = create((set, get) => ({
  schedules: [],
  loading: false,
  error: null,

  // 🔄 Bütün iş qrafiklərini yüklə
  fetchSchedules: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getWorkerSchedules();
      set({ schedules: data });
    } catch (error) {
      set({ error });
    } finally {
      set({ loading: false });
    }
  },

  // ➕ Yeni qrafik yarat
  addSchedule: async (scheduleData) => {
    set({ loading: true, error: null });
    try {
      await createWorkerSchedule(scheduleData);
      await get().fetchSchedules();
    } catch (error) {
      set({ error });
    } finally {
      set({ loading: false });
    }
  },

  // 📝 Qrafiki yenilə
  updateSchedule: async (scheduleData) => {
    set({ loading: true, error: null });
    try {
      await updateWorkerSchedule(scheduleData);
      await get().fetchSchedules();
    } catch (error) {
      set({ error });
    } finally {
      set({ loading: false });
    }
  },

  // 🔍 Qrafikləri axtar
  searchSchedules: async (searchData) => {
    set({ loading: true, error: null });
    try {
      const data = await searchWorkerSchedules(searchData);
      set({ schedules: data });
    } catch (error) {
      set({ error });
    } finally {
      set({ loading: false });
    }
  },

  // ❌ Qrafiki sil
  removeSchedule: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteWorkerSchedule(id);
      await get().fetchSchedules();
    } catch (error) {
      set({ error });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useWorkersScheduleStore;
