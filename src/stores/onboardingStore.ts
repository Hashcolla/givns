import { create } from "zustand";

type OnboardingStore = {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
};

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
}));
