import { create } from "zustand";
import { CreateFLoorOfficerType, FLoorOfficerType } from "../type";
import { fetcher } from "../../../lib/fetcher";

interface FloorOfficerStore {
  data: FLoorOfficerType[];
  selectedData: FLoorOfficerType | null;
  loadingList: Boolean;
  loadingWrite: Boolean;
  getFloorOfficer: () => Promise<{ data: FLoorOfficerType[] }>;
  setSelectedData: (params: FLoorOfficerType) => void;
  postFloorOfficer: (
    body: CreateFLoorOfficerType
  ) => Promise<{ data: FLoorOfficerType }>;
  putFloorOfficer: (
    body: CreateFLoorOfficerType,
    id: string
  ) => Promise<{ data: FLoorOfficerType }>;
  deleteFloorOfficer: (id: string) => Promise<{ data: FLoorOfficerType }>;
}
export const useFloorOfficerStores = create<FloorOfficerStore>((set) => ({
  data: [],
  selectedData: null,
  loadingList: false,
  loadingWrite: false,
  setSelectedData: (params) => {
    set({ selectedData: params });
  },
  getFloorOfficer: async () => {
    set({ loadingList: true });
    try {
      const response = await fetcher.get("/officer/floor");
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
  postFloorOfficer: async (body) => {
    set({ loadingWrite: true });
    try {
      const response = await fetcher.post("/officer/floor", body);
      set({
        loadingWrite: false,
      });
      return Promise.resolve(response);
    } catch (error) {
      set({ loadingWrite: false });
      return Promise.reject(error);
    }
  },
  putFloorOfficer: async (body, id) => {
    set({ loadingWrite: true });
    try {
      const response = await fetcher.put(`/officer/floor/${id}`, body);
      set({
        loadingWrite: false,
      });
      return Promise.resolve(response);
    } catch (error) {
      set({ loadingWrite: false });
      return Promise.reject(error);
    }
  },
  deleteFloorOfficer: async (id) => {
    set({ loadingWrite: true });
    try {
      const response = await fetcher.delete(`/officer/floor/${id}`);
      set({
        loadingWrite: false,
      });
      return Promise.resolve(response);
    } catch (error) {
      set({ loadingWrite: false });
      return Promise.reject(error);
    }
  },
}));
