import { create } from 'zustand';
import {
    createReservation,
    updateReservation,
    deleteReservation,
    getAllReservations,
    getReservationById,
    searchReservations,
    updateReservationStatus,
    exportReservationsToExcel,
} from '../src/api/reservation';

const useReservationStore = create((set, get) => ({
    reservations: [],
    selectedReservation: null,
    loading: false,
    error: null,

    fetchReservations: async () => {
        set({ loading: true, error: null });
        try {
            const data = await getAllReservations();
            set({ reservations: data, loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    fetchReservationById: async (id) => {
        set({ loading: true });
        try {
            const data = await getReservationById(id);
            set({ selectedReservation: data, loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    addReservation: async (reservationData) => {
        try {
            await createReservation(reservationData);
            await get().fetchReservations();
        } catch (err) {
            set({ error: err.message });
        }
    },

    updateReservationById: async (id, updatedData) => {
        try {
            await updateReservation(id, updatedData);
            await get().fetchReservations();
        } catch (err) {
            set({ error: err.message });
        }
    },

    changeReservationStatus: async (id, statusData) => {
        try {
            await updateReservationStatus(id, statusData);
            await get().fetchReservations();
        } catch (err) {
            set({ error: err.message });
        }
    },

    removeReservation: async (id) => {
        try {
            await deleteReservation(id);
            await get().fetchReservations();
        } catch (err) {
            set({ error: err.message });
        }
    },

    searchReservation: async (filters) => {
        set({ loading: true });
        try {
            const data = await searchReservations(filters);
            set({ reservations: data, loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    exportExcel: async () => {
        try {
            const excelBlob = await exportReservationsToExcel();
            const url = window.URL.createObjectURL(new Blob([excelBlob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'reservations.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            set({ error: err.message });
        }
    },

    clearSelectedReservation: () => set({ selectedReservation: null }),
}));

export default useReservationStore;
