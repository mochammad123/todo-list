import { create } from "zustand";
import todoApi from "./todoApi";

const useTransactionDetailApi = create((set) => ({
  transactionDetails: [],
  isLoading: false,
  error: null,

  getTransactionDetails: async () => {
    set({ isLoading: true });
    try {
      const response = await todoApi.get("transaction_details");
      set({ transactionDetails: response.data, isLoading: false });
    } catch (error) {
      set({ error: error, isLoading: false });
    }
  },
  addTransactionDetail: async (transactionDetailsData) => {
    console.log(transactionDetailsData);
    set({ isLoading: true });
    try {
      const response = await todoApi.post(
        "transaction_detail",
        transactionDetailsData
      );
      set({ isLoading: false });
    } catch (error) {
      set({ error: error, isLoading: false });
    }
  },
}));

export default useTransactionDetailApi;
