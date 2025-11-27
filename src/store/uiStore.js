import { create } from 'zustand';

// Global UI store to manage app-wide UI toggles
export const useUIStore = create((set, get) => ({
  // Mobile sidebar menu state
  isMobileMenuOpen: false,
  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleMobileMenu: () => set({ isMobileMenuOpen: !get().isMobileMenuOpen }),
}));

