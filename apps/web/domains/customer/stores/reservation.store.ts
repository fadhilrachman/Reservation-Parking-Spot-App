import { create } from "zustand";
import { fetcher } from "../../../lib/fetcher";
import { ReservationType } from "../types";

interface ReservationStore {
  loading: Boolean;
  postReservationCustomer: (body: ReservationType) => Promise<any>;
  putReservationCustomer: (id: string) => Promise<any>;
}
export const useReservationStore = create<ReservationStore>((set) => ({
  loading: false,
  postReservationCustomer: async (body) => {
    set({ loading: true });
    try {
      const response = await fetcher.post("/customer/reservation", body);
      set({
        loading: false,
      });
      return Promise.resolve(response);
    } catch (error) {
      set({ loading: false });
      return Promise.reject(error);
    }
  },
  putReservationCustomer: async (id) => {
    set({ loading: true });
    try {
      const response = await fetcher.put(
        `/customer/reservation/canceled/${id}`
      );
      set({
        loading: false,
      });
      return Promise.resolve(response);
    } catch (error) {
      set({ loading: false });
      return Promise.reject(error);
    }
  },
}));
