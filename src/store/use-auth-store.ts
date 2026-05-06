import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  userRole: string | null;
  setToken: (token: string | null) => void;
  setRole: (role: string | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      accessToken: null,
      userRole: null,
      setToken: (token) => set({ accessToken: token }),
      setRole: (role) => set({ userRole: role }),
      clearAuth: () => set({ accessToken: null, userRole: null }),
    }),
    { name: 'AuthStore' }
  )
);
