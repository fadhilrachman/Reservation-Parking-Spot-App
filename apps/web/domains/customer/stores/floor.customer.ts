import { create } from "zustand";
import { FLoorCustomerType } from "../types";
import { fetcher } from "../../../lib/fetcher";
import { DateValue } from "@heroui/react";
import { parseDate } from "@internationalized/date";
import moment from "moment";

interface FloorCustomerStore {
  date: DateValue | any;
  start_time: string;
  end_time: string;
  setFilter: (payload: {
    date: DateValue | null;
    start_time: string;
    end_time: string;
  }) => void;
  data: FLoorCustomerType[];
  selectedData: {
    space_id: string;
    space_name: string;
    floor_name: string;
    is_reservation_done: boolean;
    is_reservation_unpaid: boolean;
    transaction_id?: string;
  } | null;
  loadingList: Boolean;
  getFloorCustomer: (params?: {
    start_time?: Date;
    end_time?: Date;
  }) => Promise<{ data: FLoorCustomerType[] }>;
  setSelectedData: (params: {
    space_id: string;
    space_name: string;
    floor_name: string;
    is_reservation_done: boolean;
    is_reservation_unpaid: boolean;
    transaction_id?: string;
  }) => void;
}
export const useFloorCustomerStores = create<FloorCustomerStore>((set) => ({
  date: parseDate(moment().format("YYYY-MM-DD")),
  start_time: "06:00",
  end_time: "12:00",
  setFilter: ({ date, start_time, end_time }) => {
    set({ date, start_time, end_time });
  },
  data: [],
  selectedData: null,
  loadingList: false,
  loadingWrite: false,
  setSelectedData: (params) => {
    set({ selectedData: params });
  },
  getFloorCustomer: async (params) => {
    set({ loadingList: true });
    try {
      const response = await fetcher.get("/customer/floor", {
        params,
      });
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
