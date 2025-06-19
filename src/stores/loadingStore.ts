import { create } from "zustand";

type loadingStore = {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
};

export const useLoadingState = create<loadingStore>((set) => ({
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),
}));
