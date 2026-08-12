import { create } from "zustand";

interface AppState {
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
  reset: () => void;
}

const initialState = {
  selectedDate: null,
};

export const useAppStore = create<AppState>((set) => ({
  ...initialState,
  setSelectedDate: (selectedDate) => set({ selectedDate }),
  reset: () => set(initialState),
}));
