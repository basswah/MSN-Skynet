import { create } from 'zustand'

interface IUIState {
  isScrolled: boolean
  isMobileMenuOpen: boolean
  setScrolled: (value: boolean) => void
  setMobileMenuOpen: (value: boolean) => void
  toggleMobileMenu: () => void
}

export const useUIStore = create<IUIState>((set) => ({
  isScrolled: false,
  isMobileMenuOpen: false,
  setScrolled: (value: boolean) => set({ isScrolled: value }),
  setMobileMenuOpen: (value: boolean) => set({ isMobileMenuOpen: value }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
}))
