import { create } from "zustand";

interface UserState {
  user: {};
  setUser: (user: {}) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  user: {},
  setUser: (user) => set({ user }),
}));
