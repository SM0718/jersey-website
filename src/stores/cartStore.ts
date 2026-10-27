import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Size } from '@/lib/constants'

export type Personalization = {
  name: string
  number: string
}

export type CartLine = {
  key: string
  productId: string
  size: Size
  quantity: number
  personalization?: Personalization
}

type CartState = {
  lines: CartLine[]
  lastAddedKey: string | null
  add: (line: Omit<CartLine, 'key'>) => string
  remove: (key: string) => void
  setQuantity: (key: string, quantity: number) => void
  clear: () => void
}

function lineKey(productId: string, size: Size, personalization?: Personalization) {
  return [productId, size, personalization?.name ?? '', personalization?.number ?? ''].join('|')
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      lastAddedKey: null,
      add: (line) => {
        const key = lineKey(line.productId, line.size, line.personalization)
        set((state) => {
          const existing = state.lines.find((l) => l.key === key)
          if (existing) {
            return {
              lastAddedKey: key,
              lines: state.lines.map((l) =>
                l.key === key ? { ...l, quantity: Math.min(10, l.quantity + line.quantity) } : l,
              ),
            }
          }
          return { lastAddedKey: key, lines: [...state.lines, { ...line, key }] }
        })
        return key
      },
      remove: (key) => set((state) => ({ lines: state.lines.filter((l) => l.key !== key) })),
      setQuantity: (key, quantity) =>
        set((state) => ({
          lines:
            quantity <= 0
              ? state.lines.filter((l) => l.key !== key)
              : state.lines.map((l) => (l.key === key ? { ...l, quantity: Math.min(10, quantity) } : l)),
        })),
      clear: () => set({ lines: [] }),
    }),
    { name: 'terrace-cart-v1' },
  ),
)

export const selectCount = (lines: CartLine[]) => lines.reduce((sum, l) => sum + l.quantity, 0)
