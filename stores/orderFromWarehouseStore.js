import {create} from "zustand";

import {
  getAllOrdersFromWarehouse,
  getOrderFromWarehouseById,
  createOrderFromWarehouse,
  updateOrderFromWarehouse,
  deleteOrderFromWarehouse,
  deleteProductFromOrderFromWarehouse,
  searchOrdersFromWarehouse,
} from "../src/api/orderFromWarehouseApi"

const useOrdersFromWarehouseStore = create((set, get) => ({
  orders: [],
  selectedOrder: null,
  loading: false,
  error: null,

  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getAllOrdersFromWarehouse(); 
      set({ orders: data, loading: false });
    } catch (error) {
      set({ error: error.message || "Failed to fetch orders", loading: false });
    }
  },

  fetchOrderById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await getOrderFromWarehouseById(id);
      set({ selectedOrder: data, loading: false });
    } catch (error) {
      set({
        error: error.message || "Failed to fetch order details",
        loading: false,
      });
    }
  },

  createOrder: async (orderData) => {
    set({ loading: true, error: null });
    try {
      const newOrder = await createOrderFromWarehouse(orderData);
      set((state) => ({ orders: [newOrder, ...state.orders], loading: false }));
    } catch (error) {
      set({ error: error.message || "Failed to create order", loading: false });
    }
  },

  updateOrder: async (orderData) => {
    set({ loading: true, error: null });
    try {
      const updatedOrder = await updateOrderFromWarehouse(orderData);
      set((state) => ({
        orders: state.orders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message || "Failed to update order", loading: false });
    }
  },

  deleteOrder: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteOrderFromWarehouse(id);
      set((state) => ({
        orders: state.orders.filter((order) => order.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message || "Failed to delete order", loading: false });
    }
  },

  deleteProductFromOrder: async (orderId, productId) => {
    set({ loading: true, error: null });
    try {
      await deleteProductFromOrderFromWarehouse(orderId, productId);
      set((state) => {
        const orders = state.orders.map((order) => {
          if (order.id === orderId) {
            return {
              ...order,
              products: order.products.filter((p) => p.id !== productId),
            };
          }
          return order;
        });
        return { orders, loading: false };
      });
    } catch (error) {
      set({
        error: error.message || "Failed to delete product from order",
        loading: false,
      });
    }
  },

  searchOrders: async (filters) => {
    set({ loading: true, error: null });
    try {
      const data = await searchOrdersFromWarehouse(filters);
      set({ orders: data, loading: false });
    } catch (error) {
      set({
        error: error.message || "Failed to search orders",
        loading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
}));

export default useOrdersFromWarehouseStore;
