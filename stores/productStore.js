import { create } from "zustand";
import {
  createProduct,
  updateProduct,
  updateProductStatus,
  searchProducts,
  getAllProducts,
  getProductById,
  deleteProduct,
} from "../src/api/product-api";

export const useProductStore = create((set, get) => ({
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getAllProducts();
      set({ products: data, loading: false });
    } catch (err) {
      set({ error: err.message || "Xəta baş verdi", loading: false });
    }
  },

  fetchProductById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await getProductById(id);
      set({ selectedProduct: data, loading: false });
    } catch (err) {
      set({ error: err.message || "Xəta baş verdi", loading: false });
    }
  },

  addProduct: async (productData) => {
    set({ loading: true });
    try {
      await createProduct(productData);
      const updatedProducts = await getAllProducts();
      set({ products: updatedProducts, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  editProduct: async (productData) => {
    set({ loading: true, error: null });
    try {
      await updateProduct(productData); // məhsulu serverdə yenilə
      const updatedProducts = await getAllProducts(); // bütün məhsulları yenidən yüklə
      set({ products: updatedProducts, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },



  
  changeProductStatus: async (statusPayload) => {
    set({ loading: true });
    try {
      await updateProductStatus(statusPayload);
      const updatedProducts = await getAllProducts();
      set({ products: updatedProducts, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  searchProduct: async (filters) => {
    set({ loading: true });
    try {
      const data = await searchProducts(filters);
      set({ products: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  removeProduct: async (id) => {
    set({ loading: true });
    try {
      await deleteProduct(id);
      set({
        products: get().products.filter((prod) => prod.id !== id),
        loading: false,
      });
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));
