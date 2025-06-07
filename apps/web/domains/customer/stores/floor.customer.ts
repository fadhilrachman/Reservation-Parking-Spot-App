import { create } from "zustand";
import { FLoorCustomerType } from "../types";
import { fetcher } from "../../../lib/fetcher";

interface FloorCustomerStore {
  data: FLoorCustomerType[];
  selectedData: FLoorCustomerType | null;
  loadingList: Boolean;
  getFloorCustomer: () => Promise<{ data: FLoorCustomerType[] }>;
  setSelectedData: (params: FLoorCustomerType) => void;
}
export const useFloorCustomerStores = create<FloorCustomerStore>((set) => ({
  data: [],
  selectedData: null,
  loadingList: false,
  loadingWrite: false,
  setSelectedData: (params) => {
    set({ selectedData: params });
  },
  getFloorCustomer: async () => {
    set({ loadingList: true });
    try {
      const response = await fetcher.get("/customer/floor");
      set({
        loadingList: false,
        data: response?.data?.data,
      });
      return Promise.resolve(response);
    } catch (error) {
      set({ loadingList: false });
      return Promise.reject(error);
    }
  },
}));
