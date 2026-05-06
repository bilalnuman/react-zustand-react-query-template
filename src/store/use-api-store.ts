
import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';

interface ApiState {
  data: Record<string, unknown>;
  setData: (key: string, value: unknown) => void;
  clearData: (key: string) => void;
}

export const useApiStore = create<ApiState>()(
  devtools(
    persist(
      (set) => ({
        data: {},
        setData: (key, value) =>
          set((state) => ({
            data: { ...state.data, [key]: value },
          })),
        clearData: (key) =>
          set((state) => {
            const newData = { ...state.data };
            delete newData[key];
            return { data: newData };
          }),
      }),
      {
        name: 'api-persistence',
        storage: createJSONStorage(() => localStorage),
      }
    ),
    { name: 'ApiStore' }
  )
);
