import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name:string;
  profile_url:string;
  role: 'manager' | 'sales_rep';
}

export interface AuthStoreState {
  user: User | null;
  accessToken: string | null;
  userRole: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setRole: (role: string | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStoreState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        accessToken: null,
        userRole: null,

        setUser: (user) =>
          set({ user }),

        setToken: (token) =>
          set({ accessToken: token }),

        setRole: (role) =>
          set({ userRole: role }),

        clearAuth: () =>
          set({ user: null, accessToken: null, userRole: null }),
      }),
      {
        name: 'auth-persistence',
        storage: createJSONStorage(() => localStorage),
      }
    ),
    { name: 'AuthStore' }
  )
);