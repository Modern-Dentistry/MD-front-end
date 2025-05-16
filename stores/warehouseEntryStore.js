import { create } from "zustand";
import {
  getWarehouseEntries,
  createWarehouseEntry,
  updateWarehouseEntry,
  searchWarehouseEntry,
  getWarehouseEntryInfo,
  deleteWarehouseEntry,
  deleteEntryProduct,
} from "../src/api/warehouse-entry"; 

const useWarehouseEntryStore = create((set, get) => ({
  entries: [],
  selectedEntry: null,
  searchedEntries: [],

  fetchWarehouseEntries: async () => {
    try {
      const data = await getWarehouseEntries();
      set({ entries: data });
    } catch (error) {
      console.error("Anbar girişləri alınarkən xəta:", error);
    }
  },

  fetchWarehouseEntryInfo: async (id) => {
    try {
      const data = await getWarehouseEntryInfo(id);
      set({ selectedEntry: data });
    } catch (error) {
      console.error("Anbar girişi məlumatı alınarkən xəta:", error);
    }
  },

  createEntry: async (entryData) => {
    try {
      const response = await createWarehouseEntry(entryData);
      await get().fetchWarehouseEntries(); 
      return response;
    } catch (error) {
      console.error("Anbar girişi yaradılarkən xəta:", error);
    }
  },

  updateEntry: async (entryData) => {
    try {
      const response = await updateWarehouseEntry(entryData);
      await get().fetchWarehouseEntries();
      return response;
    } catch (error) {
      console.error("Anbar girişi yenilənərkən xəta:", error);
    }
  },

  deleteEntry: async (id) => {
    try {
      const response = await deleteWarehouseEntry(id);
      await get().fetchWarehouseEntries();
      return response;
    } catch (error) {
      console.error("Anbar girişi silinərkən xəta:", error);
    }
  },

  searchEntries: async (searchData) => {
    try {
      const data = await searchWarehouseEntry(searchData);
      set({ searchedEntries: data });
    } catch (error) {
      console.error("Axtarış zamanı xəta:", error);
    }
  },

  deleteProductFromEntry: async (entryId, productId) => {
    try {
      const response = await deleteEntryProduct(entryId, productId);
      await get().fetchWarehouseEntryInfo(entryId); // Məhsul silindikdən sonra məlumatı yenilə
      return response;
    } catch (error) {
      console.error(
        "Girişə aid məhsul silinərkən və məlumat yenilənərkən xəta:",
        error
      );
    }
  },
}));

export default useWarehouseEntryStore;
