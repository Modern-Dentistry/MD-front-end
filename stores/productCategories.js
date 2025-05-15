import { create } from "zustand";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  updateCategoryStatus,
  deleteCategory,
  searchCategories,
} from "../src/api/productCategories";

export const useProductCategoryStore = create((set, get) => ({
  categories: [],
  selectedCategory: null,
  loading: false,
  error: null,

  fetchCategories: async () => {
    set({ loading: true });
    try {
      const data = await getAllCategories();
      set({ categories: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  fetchCategoryById: async (id) => {
    try {
      const data = await getCategoryById(id);
      set({ selectedCategory: data });
    } catch (error) {
      set({ error });
    }
  },

  addCategory: async (category) => {
    try {
      await createCategory(category);
      const updatedCategories = await getAllCategories();
      set({ categories: updatedCategories });
    } catch (error) {
      set({ error });
    }
  },

  editCategory: async (category) => {
    try {
      await updateCategory(category);
    } catch (error) {
      set({ error });
    }
  },

  changeCategoryStatus: async (statusPayload) => {
    try {
      await updateCategoryStatus(statusPayload);
    } catch (error) {
      set({ error });
    }
  },

  removeCategory: async (id) => {
    try {
      await deleteCategory(id);
      set({
        categories: get().categories.filter((cat) => cat.id !== id),
      });
    } catch (error) {
      throw error;
    }
  },

  searchCategory: async (filters) => {
    try {
      const data = await searchCategories(filters);
      set({ categories: data });
    } catch (error) {
      set({ error });
    }
  },
}));
