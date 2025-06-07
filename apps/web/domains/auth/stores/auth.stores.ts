import { create } from "zustand";
import { LoginType, RegisterType } from "../type";
import { fetcher } from "../../../lib/fetcher";

interface AuthStore {
  loading: Boolean;
  postLogin: (body: LoginType) => Promise<any>;
  postRegister: (body: RegisterType) => Promise<any>;
}
export const useAuthStore = create<AuthStore>((set) => ({
  loading: false,
  postLogin: async (body) => {
    set({ loading: true });
    try {
      const response = await fetcher.post("/login", body);
      set({
        loading: false,
      });
      return Promise.resolve(response);
    } catch (error) {
      set({ loading: false });
      return Promise.reject(error);
    }
  },
  postRegister: async (body) => {
    set({ loading: true });
    try {
      const response = await fetcher.post("/register", body);
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
