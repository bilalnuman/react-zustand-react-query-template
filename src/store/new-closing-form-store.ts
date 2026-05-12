import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';

export interface ClsingFormStoreState {
  draftData:any;
  setDraftFormData: (user:any) => void;
  clearData: () => void;
}

export const useNewClosingFormStore = create<ClsingFormStoreState>()(
  devtools(
    persist(
      (set) => ({
        draftData:null,
        setDraftFormData: (draftData:any) =>
          set({ draftData }),

        clearData: () =>
          set({ draftData: null }),
      }),
      {
        name: 'new-closing-form',
        storage: createJSONStorage(() => localStorage),
      }
    ),
    { name: 'AuthStore' }
  )
);