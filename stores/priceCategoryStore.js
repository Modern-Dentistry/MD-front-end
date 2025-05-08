import { create } from 'zustand';
import {
  createPriceCategory,
  readPriceCategories,
  readPriceCategoryById,
  updatePriceCategory,
  updatePriceCategoryStatus,
  deletePriceCategory,
  searchPriceCategories,
  exportPriceCategoriesToExcel,
} from '../src/api/price-categories';

const usePriceCategoryStore = create((set) => ({
  categories: [],
  selectedCategory: null,
  loading: false,
  error: null,

  // Get all
  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const data = await readPriceCategories();
      set({ categories: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  // Get by ID
  fetchCategoryById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await readPriceCategoryById(id);
      set({ selectedCategory: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  // Create
  addCategory: async (categoryData) => {
    set({ loading: true, error: null });
    try {
      await createPriceCategory(categoryData);
      await usePriceCategoryStore.getState().fetchCategories();
    } catch (error) {
      set({ error, loading: false });
    }
  },

  // Update
  updateCategory: async (id, categoryData) => {
    set({ loading: true, error: null });
    try {
      await updatePriceCategory(id, categoryData);
      await usePriceCategoryStore.getState().fetchCategories();
    } catch (error) {
      set({ error, loading: false });
    }
  },

  // Update status
  updateCategoryStatus: async (id, statusData) => {
    set({ loading: true, error: null });
    try {
      await updatePriceCategoryStatus(id, statusData);
      await usePriceCategoryStore.getState().fetchCategories();
    } catch (error) {
      set({ error, loading: false });
    }
  },

  // Delete
  removeCategory: async (id) => {
    set({ loading: true, error: null });
    try {
      await deletePriceCategory(id);
      await usePriceCategoryStore.getState().fetchCategories();
    } catch (error) {
      set({ error, loading: false });
    }
  },

  // Search
  searchCategories: async (searchParams) => {
    set({ loading: true, error: null });
    try {
      const data = await searchPriceCategories(searchParams);
      set({ categories: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  // Export
  exportToExcel: async () => {
    try {
      const data = await exportPriceCategoriesToExcel();
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'price-categories.xlsx');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      set({ error });
    }
  },
}));

export default usePriceCategoryStore;
