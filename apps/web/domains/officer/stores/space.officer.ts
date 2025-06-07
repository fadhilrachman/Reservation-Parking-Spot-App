import { create } from "zustand";
import { CreateSpaceOfficerType, SpaceOfficerType } from "../type";
import { fetcher } from "../../../lib/fetcher";

interface FloorOfficerStore {
  // data: FLoorOfficerType[];
  loadingList: Boolean;
  loadingWrite: Boolean;
  setSelectedData: (params: SpaceOfficerType) => void;
  selectedData: SpaceOfficerType | null;
  postSpaceOfficer: (
    body: CreateSpaceOfficerType
  ) => Promise<{ data: SpaceOfficerType }>;
  putSpaceOfficer: (
    body: CreateSpaceOfficerType,
    id: string
  ) => Promise<{ data: SpaceOfficerType }>;
  deleteSpaceOfficer: (id: string) => Promise<{ data: SpaceOfficerType }>;
}
export const useSpaceOfficerStores = create<FloorOfficerStore>((set) => ({
  // data: [],
  selectedData: null,
  loadingList: false,
  loadingWrite: false,
  setSelectedData: (params) => {
    set({ selectedData: params });
  },
  postSpaceOfficer: async (body) => {
    set({ loadingWrite: true });
    try {
      const response = await fetcher.post("/officer/space", body);
      set({
        loadingWrite: false,
      });
      return Promise.resolve(response);
    } catch (error) {
      set({ loadingWrite: false });
      return Promise.reject(error);
    }
  },
  putSpaceOfficer: async (body, id) => {
    set({ loadingWrite: true });
    try {
      const response = await fetcher.put(`/officer/space/${id}`, body);
      set({
        loadingWrite: false,
      });
      return Promise.resolve(response);
    } catch (error) {
      set({ loadingWrite: false });
      return Promise.reject(error);
    }
  },
  deleteSpaceOfficer: async (id) => {
    set({ loadingWrite: true });
    try {
      const response = await fetcher.delete(`/officer/space/${id}`);
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
