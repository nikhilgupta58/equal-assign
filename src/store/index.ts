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
          set((oldState) => ({
            ...oldState,
            session,
          }));
        },
        logout: () => set({ session: null }),
      }),
      {
        name: `equal`,
      }
    )
  )
);
