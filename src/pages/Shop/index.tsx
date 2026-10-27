import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { products } from '@/data/products'
import { ProductCard } from '@/components/product/ProductCard'
import { Reveal } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import { CloseIcon, FilterIcon, SortIcon } from '@/components/ui/icons'
import {
  CLUBS,
  PRODUCT_TYPES,
  SORT_OPTIONS,
  SPORTS,
  sportLabel,
  type ProductType,
} from '@/lib/constants'
import { cn } from '@/lib/utils'

type SortId = (typeof SORT_OPTIONS)[number]['id']

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category')
  const sport = searchParams.get('sport')
  const audience = searchParams.get('audience')
  const saleOnly = searchParams.get('sale') === 'true'

  const [clubs, setClubs] = useState<string[]>([])
  const [types, setTypes] = useState<ProductType[]>([])
  const [sort, setSort] = useState<SortId>('featured')

  const setSport = (value: string | null) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set('sport', value)
    else next.delete('sport')
    setSearchParams(next)
  }

  const toggleClub = (club: string) =>
    setClubs((prev) => (prev.includes(club) ? prev.filter((c) => c !== club) : [...prev, club]))
  const toggleType = (type: ProductType) =>
    setTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  const clearAll = () => {
    setClubs([])
    setTypes([])
  }

  const filtered = useMemo(() => {
    let list = [...products]

    if (sport) list = list.filter((p) => p.sport === sport)
    if (category) {
      list = list.filter(
        (p) => p.category === category || p.collections.includes(category),
      )
    }
    if (audience) list = list.filter((p) => p.audience === audience || p.audience === 'unisex')
    if (saleOnly) list = list.filter((p) => Boolean(p.originalPrice))
    if (clubs.length) list = list.filter((p) => clubs.includes(p.club))
    if (types.length) list = list.filter((p) => types.includes(p.type))

    switch (sort) {
      case 'newest':
        list.sort((a, b) => +new Date(b.releaseDate) - +new Date(a.releaseDate))
        break
      case 'price-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        list.sort((a, b) => b.rating - a.rating)
        break
      default:
        list.sort(
          (a, b) =>
            Number(b.collections.includes('featured')) - Number(a.collections.includes('featured')) ||
            b.rating - a.rating,
        )
    }
    return list
  }, [sport, category, audience, saleOnly, clubs, types, sort])

  const activeCount = clubs.length + types.length

  const heading = sport
    ? sportLabel(sport)
    : category
      ? `${category} collection`
      : saleOnly
        ? 'Sale'
        : 'All kits'

  return (
    <div className="px-gutter pb-20 pt-[calc(var(--header-h)+2rem)]">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Reveal>
            <p className="eyebrow meta mb-4">Shop</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="t-headline capitalize">{heading}</h1>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="meta text-smoke">
            <span className="num">{filtered.length}</span> pieces
          </p>
        </Reveal>
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-3 border-y border-hairline py-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="lg:hidden">
              <FilterIcon size={15} />
              Filters{activeCount > 0 ? ` (${activeCount})` : ''}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="px-6 pb-8 pt-6">
            <SheetTitle className="t-sub mb-4">Filters</SheetTitle>
            <Filters
              sport={sport}
              onSport={setSport}
              clubs={clubs}
              types={types}
              toggleClub={toggleClub}
              toggleType={toggleType}
            />
            <div className="mt-6 flex gap-3">
              <Button variant="outline" className="flex-1" onClick={clearAll}>
                Clear
              </Button>
              <SheetClose asChild>
                <Button className="flex-1">Show {filtered.length}</Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>

        <div className="hidden items-center gap-2 lg:flex">
          <FilterIcon size={15} className="text-smoke" />
          <span className="meta text-smoke">Filter</span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <SortIcon size={16} className="text-smoke" />
          <label className="sr-only" htmlFor="sort">
            Sort
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortId)}
            className="meta cursor-pointer border-0 bg-transparent pr-6 focus:outline-none"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[15rem_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-[calc(var(--header-h)+1rem)] max-h-[calc(100svh-var(--header-h)-2rem)] overflow-y-auto pr-1">
            <Filters
              sport={sport}
              onSport={setSport}
              clubs={clubs}
              types={types}
              toggleClub={toggleClub}
              toggleType={toggleType}
            />
            {activeCount > 0 && (
              <button onClick={clearAll} className="meta mt-6 text-clay hover:underline">
                Clear all
              </button>
            )}
          </div>
        </aside>

        <div>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-24 text-center">
              <p className="t-editorial-sm text-smoke">Nothing matches those filters.</p>
              <Button variant="outline" onClick={clearAll}>
                Reset filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product, i) => (
                <Reveal key={product.id} delay={Math.min(i, 6) * 0.05}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Filters({
  sport,
  onSport,
  clubs,
  types,
  toggleClub,
  toggleType,
}: {
  sport: string | null
  onSport: (value: string | null) => void
  clubs: string[]
  types: ProductType[]
  toggleClub: (club: string) => void
  toggleType: (type: ProductType) => void
}) {
  return (
    <div className="space-y-8">
      <div>
        <p className="meta mb-3 text-smoke">Sport</p>
        <div className="flex flex-wrap gap-2">
          <button className="chip" data-active={!sport} onClick={() => onSport(null)}>
            All
          </button>
          {SPORTS.map((option) => (
            <button
              key={option.id}
              className="chip"
              data-active={sport === option.id}
              onClick={() => onSport(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="meta mb-3 text-smoke">Type</p>
        <div className="flex flex-wrap gap-2">
          {PRODUCT_TYPES.map((type) => (
            <button
              key={type}
              className="chip"
              data-active={types.includes(type)}
              onClick={() => toggleType(type)}
            >
              {types.includes(type) && <CloseIcon size={11} />}
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="meta mb-3 text-smoke">Club / Nation</p>
        <div className="grid max-h-72 grid-cols-2 gap-x-3 gap-y-1.5 overflow-y-auto lg:max-h-80 lg:grid-cols-1">
          {CLUBS.map((club) => {
            const active = clubs.includes(club)
            return (
              <button
                key={club}
                onClick={() => toggleClub(club)}
                className={cn(
                  'flex items-center gap-2 text-left text-sm transition-colors',
                  active ? 'text-clay' : 'text-ink/75 hover:text-ink',
                )}
              >
                <span
                  className={cn(
                    'grid h-4 w-4 shrink-0 place-items-center rounded-[4px] border transition-colors',
                    active ? 'border-clay bg-clay text-paper' : 'border-hairline-strong',
                  )}
                >
                  {active && (
                    <svg viewBox="0 0 12 12" className="h-2.5 w-2.5">
                      <path d="M2 6.5 4.5 9 10 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  )}
                </span>
                <span className="truncate">{club}</span>
              </button>
            )
          })}
        </div>
      </div>

      <Link to="/shop" className="meta link-underline inline-block text-smoke">
        Back to all kits
      </Link>
    </div>
  )
}
