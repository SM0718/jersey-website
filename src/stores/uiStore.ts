import { create } from 'zustand'

type UiState = {
  cartOpen: boolean
  searchOpen: boolean
  menuOpen: boolean
  filtersOpen: boolean
  setCartOpen: (open: boolean) => void
  setSearchOpen: (open: boolean) => void
  setMenuOpen: (open: boolean) => void
  setFiltersOpen: (open: boolean) => void
}

export const useUiStore = create<UiState>((set) => ({
  cartOpen: false,
  searchOpen: false,
  menuOpen: false,
  filtersOpen: false,
  setCartOpen: (cartOpen) => set({ cartOpen, ...(cartOpen ? { searchOpen: false, menuOpen: false } : {}) }),
  setSearchOpen: (searchOpen) => set({ searchOpen, ...(searchOpen ? { cartOpen: false, menuOpen: false } : {}) }),
  setMenuOpen: (menuOpen) => set({ menuOpen, ...(menuOpen ? { cartOpen: false, searchOpen: false } : {}) }),
  setFiltersOpen: (filtersOpen) => set({ filtersOpen }),
}))
