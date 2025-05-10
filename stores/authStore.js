import { create } from "zustand";
import { login as loginApi } from "../src/api/login";

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  // Login funksiyası
  login: async ({ username, password }) => {
    set({ loading: true, error: null });
    try {
      const response = await loginApi({ username, password });
      const token = response.tokenPair?.accessToken;
      const user = response.user || null;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", response.tokenPair.refreshToken);
        set({ user, token, loading: false });
        return true; // Success
      } else {
        throw new Error("No token received");
      }
    } catch (err) {
      set({
        error: err.response?.data?.message || "Login failed",
        loading: false,
      });
      return false; // Failure
    }
  },

  // Logout funksiyası
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },

  // Tokeni localStorage-dan yükləmək
  loadTokenFromStorage: () => {
    const token = localStorage.getItem("token");
    if (token) {
      set({ token });
    }
  },

  // Error-u yeniləmək üçün setError funksiyası əlavə et
  setError: (error) => set({ error }),
}));

export default useAuthStore;
