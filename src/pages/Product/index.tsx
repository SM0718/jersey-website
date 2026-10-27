import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { products, relatedProducts } from '@/data/products'
import { ProductMedia } from '@/components/product/ProductMedia'
import type { JerseyView } from '@/components/art/JerseySvg'
import { formatPrice, discountPercent } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { CartIcon, CheckIcon, HeartIcon, StarIcon } from '@/components/ui/icons'
import { useCartStore } from '@/stores/cartStore'
import { useWishlistStore } from '@/stores/wishlistStore'
import { PLAYER_PRESETS, SIZES, sportLabel, type Size } from '@/lib/constants'
import { ProductCard } from '@/components/product/ProductCard'
import { Reveal } from '@/components/motion/Reveal'
import { cn } from '@/lib/utils'

const VIEWS: { id: JerseyView; label: string }[] = [
  { id: 'front', label: 'Front' },
  { id: 'back', label: 'Back' },
  { id: 'detail', label: 'Detail' },
]

export default function Product() {
  const { id } = useParams()
  const product = products.find((p) => p.id === id)
  const [view, setView] = useState<JerseyView>('front')
  const [selectedSize, setSelectedSize] = useState<Size | ''>('')
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [added, setAdded] = useState(false)
  const { add } = useCartStore()
  const { ids, toggle } = useWishlistStore()

  if (!product) {
    return (
      <div className="flex min-h-[60svh] flex-col items-center justify-center gap-4 px-gutter pt-[var(--header-h)] text-center">
        <p className="t-headline">Shirt not found</p>
        <Button asChild>
          <Link to="/shop">Back to shop</Link>
        </Button>
      </div>
    )
  }

  const isSaved = ids.includes(product.id)
  const discount = discountPercent(product.price, product.originalPrice)
  const soldOut = product.availableSizes.length === 0
  const presets = PLAYER_PRESETS[product.club] ?? PLAYER_PRESETS.default
  const related = relatedProducts(product)

  const handleAdd = () => {
    if (!selectedSize) return
    add({
      productId: product.id,
      size: selectedSize,
      quantity: 1,
      ...(name || number ? { personalization: { name: name.toUpperCase(), number } } : {}),
    })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="px-gutter pb-20 pt-[calc(var(--header-h)+1.5rem)]">
      <nav className="meta mb-8 flex items-center gap-2 text-smoke">
        <Link to="/shop" className="hover:text-clay">
          Shop
        </Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category}`} className="capitalize hover:text-clay">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-ink">{product.club}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="media-frame aspect-[4/5]">
            <ProductMedia
              key={view}
              colorway={product.colorway}
              pattern={product.pattern}
              view={view}
              name={name.toUpperCase() || product.name}
              club={product.club}
              number={number || product.number}
              sport={product.sport}
              mediaKind={product.mediaKind}
              className="animate-rise"
            />
          </div>
          <div className="mt-4 flex gap-3">
            {VIEWS.map((v) => (
              <button
                key={v.id}
                onClick={() => setView(v.id)}
                aria-label={`${v.label} view`}
                className={cn(
                  'media-frame h-24 w-20 overflow-hidden border transition-all',
                  view === v.id ? 'border-clay' : 'border-transparent opacity-70 hover:opacity-100',
                )}
              >
                <ProductMedia
                  colorway={product.colorway}
                  pattern={product.pattern}
                  view={v.id}
                  club={product.club}
                  number={product.number}
                  sport={product.sport}
                  mediaKind={product.mediaKind}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:space-y-6">
            <div>
              <div className="flex items-center justify-between gap-3">
                <p className="meta-sm text-smoke">
                  {sportLabel(product.sport)} · {product.season} · {product.type}
                </p>
                <span className="meta-sm flex items-center gap-1 text-brass">
                  <StarIcon size={13} className="fill-brass" />
                  <span className="num">{product.rating}</span>
                  <span className="text-smoke">({product.reviews})</span>
                </span>
              </div>
              <h1 className="mt-2 font-display text-4xl leading-none">{product.club}</h1>
              <p className="mt-1 text-lg text-smoke">{product.name}</p>
            </div>

            <div className="flex items-baseline gap-3 border-y border-hairline py-4">
              <p className="num text-2xl font-semibold">{formatPrice(product.price)}</p>
              {product.originalPrice && (
                <p className="num text-sm text-fog line-through">{formatPrice(product.originalPrice)}</p>
              )}
              {discount > 0 && (
                <span className="rounded-full bg-clay px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-paper">
                  {discount}% off
                </span>
              )}
            </div>

            <p className="text-base leading-relaxed text-ink/75">{product.description}</p>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <p className="meta">Select size</p>
                <span className="meta-sm text-smoke">Sizes run true</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((size) => {
                  const available = product.availableSizes.includes(size)
                  return (
                    <button
                      key={size}
                      onClick={() => available && setSelectedSize(size)}
                      disabled={!available}
                      className={cn(
                        'min-w-[3.4rem] rounded-full border px-4 py-2.5 text-sm transition-colors',
                        selectedSize === size
                          ? 'border-ink bg-ink text-paper'
                          : 'border-hairline hover:border-ink',
                        !available && 'cursor-not-allowed text-fog line-through hover:border-hairline',
                      )}
                    >
                      {size}
                    </button>
                  )
                })}
              </div>
            </div>

            {product.personalizationAvailable && (
              <div className="surface p-5">
                <div className="flex items-center justify-between">
                  <p className="meta">Personalise</p>
                  <span className="meta-sm text-clay">Free</span>
                </div>
                <div className="mt-3 grid grid-cols-[1fr_6rem] gap-3">
                  <input
                    value={name}
                    maxLength={12}
                    onChange={(e) => setName(e.target.value.toUpperCase())}
                    placeholder="Name"
                    className="field"
                  />
                  <input
                    value={number}
                    maxLength={2}
                    inputMode="numeric"
                    onChange={(e) => setNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="10"
                    className="field text-center"
                  />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {presets.slice(0, 3).map((preset) => (
                    <button
                      key={preset.name}
                      className="chip"
                      onClick={() => {
                        setName(preset.name)
                        setNumber(preset.number)
                      }}
                    >
                      {preset.name} {preset.number}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button className="flex-1" onClick={handleAdd} disabled={!selectedSize || soldOut}>
                {added ? <CheckIcon size={17} /> : <CartIcon size={17} />}
                {soldOut ? 'Sold out' : added ? 'Added to bag' : 'Add to bag'}
              </Button>
              <Button variant="outline" onClick={() => toggle(product.id)} aria-label="Toggle wishlist">
                <HeartIcon size={17} className={cn(isSaved && 'fill-clay text-clay')} />
                {isSaved ? 'Saved' : 'Save'}
              </Button>
            </div>
            {!selectedSize && !soldOut && (
              <p className="meta-sm text-smoke">Choose a size to continue</p>
            )}

            <div className="divide-y divide-hairline border-t border-hairline">
              <details className="group py-4" open>
                <summary className="meta flex cursor-pointer list-none items-center justify-between">
                  Details
                  <span className="text-smoke transition-transform group-open:rotate-45">+</span>
                </summary>
                <ul className="mt-3 space-y-2 text-sm text-ink/75">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </details>
              <details className="group py-4">
                <summary className="meta flex cursor-pointer list-none items-center justify-between">
                  Shipping & returns
                  <span className="text-smoke transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-ink/75">
                  Free shipping on orders over ₹1,500. Dispatched within 48 hours, with 30-day returns on
                  unworn shirts.
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <Reveal>
            <h2 className="t-headline mb-8">You may also like</h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.08}>
                <ProductCard product={item} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
