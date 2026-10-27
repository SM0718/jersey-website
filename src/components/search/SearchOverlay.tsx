import { useEffect, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { ProductMedia } from '@/components/product/ProductMedia'
import { CloseIcon, SearchIcon } from '@/components/ui/icons'
import { useSearchStore } from '@/stores/searchStore'
import { useUiStore } from '@/stores/uiStore'
import { products } from '@/data/products'
import { formatPrice } from '@/lib/utils'

const QUICK = ['Football', 'Cricket', 'Basketball', 'Badminton', 'Retro']

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useUiStore()
  const { query, setQuery } = useSearchStore()
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (searchOpen) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 60)
      return () => window.clearTimeout(id)
    }
    setQuery('')
  }, [searchOpen, setQuery])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return products
      .filter((p) =>
        [p.club, p.name, p.category, p.type, ...p.collections]
          .join(' ')
          .toLowerCase()
          .includes(q),
      )
      .slice(0, 4)
  }, [query])

  const go = (to: string) => {
    setSearchOpen(false)
    navigate(to)
  }

  return (
    <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
      <DialogContent
        showClose={false}
        className="top-[12vh] w-[min(46rem,calc(100vw-2rem))] -translate-y-0 p-0"
      >
        <DialogTitle className="sr-only">Search the store</DialogTitle>
        <div className="flex items-center gap-4 border-b border-hairline px-6 py-5">
          <SearchIcon size={22} className="shrink-0 text-clay" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search clubs, kits, collections…"
            className="w-full bg-transparent font-display text-2xl outline-none placeholder:text-fog"
          />
          <button
            onClick={() => setSearchOpen(false)}
            aria-label="Close search"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-hairline text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            <CloseIcon size={16} />
          </button>
        </div>

        <div className="max-h-[52vh] overflow-y-auto px-6 py-5" data-lenis-prevent>
          {!query && (
            <>
              <p className="meta-sm mb-3 text-smoke">Popular searches</p>
              <div className="flex flex-wrap gap-2">
                {QUICK.map((term) => (
                  <button key={term} className="chip" onClick={() => setQuery(term)}>
                    {term}
                  </button>
                ))}
              </div>
            </>
          )}

          {query && results.length === 0 && (
            <p className="py-8 text-center text-sm text-smoke">
              No results for “{query}”. Try a club or a season.
            </p>
          )}

          {results.length > 0 && (
            <ul className="divide-y divide-hairline">
              {results.map((product) => (
                <li key={product.id}>
                  <button
                    onClick={() => go(`/product/${product.id}`)}
                    className="flex w-full items-center gap-4 py-3 text-left"
                  >
                    <span className="media-frame h-16 w-14 shrink-0">
                      <ProductMedia
                        colorway={product.colorway}
                        pattern={product.pattern}
                        club={product.club}
                        sport={product.sport}
                        mediaKind={product.mediaKind}
                      />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-medium">{product.club}</span>
                      <span className="block text-sm text-smoke">{product.name}</span>
                    </span>
                    <span className="num text-sm">{formatPrice(product.price)}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
