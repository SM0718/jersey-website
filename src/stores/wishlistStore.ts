import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type WishlistState = {
  ids: string[]
  toggle: (id: string) => void
  remove: (id: string) => void
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set) => ({
      ids: [],
      toggle: (id) =>
        set((state) => ({
          ids: state.ids.includes(id) ? state.ids.filter((x) => x !== id) : [id, ...state.ids],
        })),
      remove: (id) => set((state) => ({ ids: state.ids.filter((x) => x !== id) })),
    }),
    { name: 'terrace-wishlist-v1' },
  ),
)

export const selectIsSaved = (ids: string[], id: string) => ids.includes(id)
