import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UserStore {
  session: null;
}

export const userStore = create<UserStore>(
  devtools(
    persist(
      (set) => ({
        session: null,
        setSession: (session) => {
          set({ session: session });
        },
        logout: () => set({ session: null }),
      }),
      {
        name: `equal`,
      }
    )
  )
);

export const toastStore = create<any>((set) => ({
  data: null,
  setErrorToast: (message) => set({ data: message }),
  clear: () => set({ data: null }),
}));
