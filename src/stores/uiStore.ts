import { create } from "zustand";

type UiStore = {
  isMobileSidebarOpen: boolean;
  openMobileSidebar: () => void;
  closeMobileSidebar: () => void;
  toggleMobileSidebar: () => void;
};

export const useUiStore = create<UiStore>((set) => ({
  isMobileSidebarOpen: false,

  openMobileSidebar: () => set({ isMobileSidebarOpen: true }),

  closeMobileSidebar: () => set({ isMobileSidebarOpen: false }),

  toggleMobileSidebar: () =>
    set((state) => ({
      isMobileSidebarOpen: !state.isMobileSidebarOpen,
    })),
}));