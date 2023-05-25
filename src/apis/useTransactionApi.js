import { create } from "zustand";
import todoApi from "./todoApi";

const useTransactionApi = create((set) => ({
  transactions: [],
  isLoading: false,
  error: null,

  getTransactions: async () => {
    set({ isLoading: true });
    try {
      const response = await todoApi.get("transactions");
      set({ transactions: response.data, isLoading: false });
    } catch (error) {
      set({ error: error, isLoading: false });
    }
  },
  addTransaction: async () => {
    set({ isLoading: true });
    try {
      const response = await todoApi.post("transaction");
      set({ isLoading: false });
    } catch (error) {
      set({ error: error, isLoading: false });
    }
  },
  updateTransaction: async (transactionId, transactionData) => {
    set({ isLoading: true });
    try {
      const response = await todoApi.post(
        `transaction/${transactionId}`,
        transactionData
      );
      set({ isLoading: false });
    } catch (error) {
      set({ error: error, isLoading: false });
    }
  },
  deleteTransaction: async (transactionId) => {
    set({ isLoading: true });
    try {
      const response = await todoApi.delete(`transaction/${transactionId}`);
      set({ isLoading: false });
    } catch (error) {
      set({ error: error, isLoading: false });
    }
  },
}));

export default useTransactionApi;
