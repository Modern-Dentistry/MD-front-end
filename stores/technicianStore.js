import { create } from 'zustand';
import {
    createTechnician,
    searchTechnicians,
    updateTechnician,
    updateTechnicianStatus,
    getAllTechnicians,
    getTechnicianById,
    exportTechniciansToExcel,
    deleteTechnician
} from '../src/api/technician'; 

const useTechnicianStore = create((set, get) => ({
    technicians: [],
    selectedTechnician: null,
    loading: false,
    error: null,

    fetchTechnicians: async () => {
        set({ loading: true, error: null });
        try {
            const data = await getAllTechnicians();
            set({ technicians: data, loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    fetchTechnicianById: async (id) => {
        set({ loading: true, error: null });
        try {
            const data = await getTechnicianById(id);
            set({ selectedTechnician: data, loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    addTechnician: async (newTech) => {
        try {
            await createTechnician(newTech);
            await get().fetchTechnicians();
        } catch (err) {
            set({ error: err.message });
        }
    },

    searchTechs: async (filters) => {
        set({ loading: true });
        try {
            const data = await searchTechnicians(filters);
            set({ technicians: data, loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    updateTech: async (id, updatedData) => {
        try {
            await updateTechnician(id, updatedData);
            await get().fetchTechnicians();
        } catch (err) {
            set({ error: err.message });
        }
    },

    updateTechStatus: async (id, status) => {
        try {
            await updateTechnicianStatus(id, status);
            await get().fetchTechnicians();
        } catch (err) {
            set({ error: err.message });
        }
    },

    removeTechnician: async (id) => {
        try {
            await deleteTechnician(id);
            await get().fetchTechnicians();
        } catch (err) {
            set({ error: err.message });
        }
    },

    exportToExcel: async () => {
        try {
            const blob = await exportTechniciansToExcel();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'technicians.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            set({ error: err.message });
        }
    },

    clearSelected: () => set({ selectedTechnician: null }),
}));

export default useTechnicianStore;
