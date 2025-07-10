// import { create } from 'zustand';

// interface User {
//   userId: string;
//   role: string;
//   name?: string;
// }

// interface AuthStore {
//   user: User | null;
//   setUser: (user: User | null) => void;
// }

// export const useAuthStore = create<AuthStore>((set) => ({
//   user: null,
//   setUser: (user) => set({ user }),
// }));


// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// interface User {
//   userId: string;
//   role: string;
//   name?: string;
// }

// interface AuthStore {
//   user: User | null;
//   setUser: (user: User | null) => void;
// }

// export const useAuthStore = create<AuthStore>()(
//   persist(
//     (set) => ({
//       user: null,
//       setUser: (user) => set({ user }),
//     }),
//     {
//       name: 'auth-storage', // key for localStorage
//     }
//   )
// );

/// lib/store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  userId: string;
  role: string;
  name?: string;
}

interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
