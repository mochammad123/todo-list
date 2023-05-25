import { create } from "zustand";
import todoApi from "./todoApi";

const useProductApi = create((set) => ({
  items: [],
  isLoading: false,
  error: null,

  getItems: async () => {
    set({ isLoading: true });
    try {
      const response = await todoApi.get("items");
      set({ items: response.data, isLoading: false });
    } catch (error) {
      set({ error: error, isLoading: false });
    }
  },
  addItem: async (itemData) => {
    set({ isLoading: true });
    try {
      const response = await todoApi.post("item", itemData);
      set({ isLoading: false });
    } catch (error) {
      set({ error: error, isLoading: false });
    }
  },
  updateItem: async (itemId, itemData) => {
    set({ isLoading: true });
    try {
      for (let i = 0; i < itemData.length; i++) {
        console.log(itemData[i].item_id);
        const response = await todoApi.post(`item/${itemData[i].item_id}`, {
          stock: itemData[i].stock,
        });
      }
      set({ isLoading: false });
    } catch (error) {
      set({ error: error, isLoading: false });
    }
  },
  deleteItem: async (itemId) => {
    set({ isLoading: true });
    try {
      const response = await todoApi.delete(`item/${itemId}`);
      set({ isLoading: false });
    } catch (error) {
      set({ error: error, isLoading: false });
    }
  },
}));

export default useProductApi;
