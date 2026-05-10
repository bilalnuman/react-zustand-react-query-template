import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name:string;
  profile_url:string;
  role: 'manager' | 'sales_rep';
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        accessToken: null,
        userRole: null,

        setUser: (user) =>
          set({ user }),

        clearAuth: () =>
          set({ user: null }),
      }),
      {
        name: 'auth-persistence',
        storage: createJSONStorage(() => localStorage),
      }
    ),
    { name: 'AuthStore' }
  )
);