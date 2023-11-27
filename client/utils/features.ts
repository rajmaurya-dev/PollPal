import { create } from "zustand";
import { persist } from "zustand/middleware";
interface UserState {
  user: {
    id: string;
    message: string;
    token: string;
    username: string;
  };
  setUser: (user: {
    id: string;
    message: string;
    token: string;
    username: string;
  }) => void;
}
type User = {
  id: string;
  message: string;
  token: string;
  username: string;
};

export const useUserStore = create<UserState>(
  persist(
    (set) => ({
      user: {} as User,
      setUser: (newUser: User) => set({ user: newUser }),
    }),
    {
      name: "userStore",
      getStorage: () => localStorage,
    }
  ) as any
);

//playing with zustand
interface IBook {
  amount: number;
  updateAmount: (newAmount: number) => void;
}

export const useBookStore = create<IBook>((set, get) => ({
  amount: 40,
  updateAmount: (newAmount: number) => {
    const amountState = get().amount;
    set({ amount: newAmount });
  },
}));
