import { Link } from 'react-router-dom'
import { HeartIcon, PlusIcon } from '@/components/ui/icons'
import { ProductMedia } from '@/components/product/ProductMedia'
import { formatPrice, discountPercent } from '@/lib/utils'
import { sportLabel } from '@/lib/constants'
import type { Product } from '@/data/products'
import { useWishlistStore } from '@/stores/wishlistStore'
import { useCartStore } from '@/stores/cartStore'
import { cn } from '@/lib/utils'

const BADGE_LABEL: Record<string, string> = {
  new: 'New',
  sale: 'Sale',
  limited: 'Limited',
  archive: 'Archive',
  bestseller: 'Bestseller',
}

export function ProductCard({ product }: { product: Product }) {
  const { ids, toggle } = useWishlistStore()
  const { add } = useCartStore()
  const isSaved = ids.includes(product.id)
  const discount = discountPercent(product.price, product.originalPrice)
  const soldOut = product.availableSizes.length === 0

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!soldOut) add({ productId: product.id, size: product.availableSizes[0], quantity: 1 })
  }

  return (
    <article className="group relative flex flex-col">
      <Link to={`/product/${product.id}`} className="block">
        <div className="media-frame relative aspect-[4/5]">
          <ProductMedia
            colorway={product.colorway}
            pattern={product.pattern}
            view="front"
            name={product.name}
            club={product.club}
            number={product.number}
            sport={product.sport}
            mediaKind={product.mediaKind}
            className="transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/25 to-transparent" />

          {product.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-clay px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-paper">
              {BADGE_LABEL[product.badge] ?? product.badge}
            </span>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              toggle(product.id)
            }}
            aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
            className={cn(
              'absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-hairline bg-paper/85 backdrop-blur transition-colors',
              isSaved ? 'text-clay' : 'text-ink hover:text-clay',
            )}
          >
            <HeartIcon size={17} className={cn(isSaved && 'fill-clay')} />
          </button>

          {soldOut ? (
            <div className="absolute inset-0 grid place-items-center bg-paper/70 backdrop-blur-[2px]">
              <span className="meta rounded-full bg-ink px-4 py-2 text-paper">Sold Out</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleQuickAdd}
              className="absolute bottom-3 left-3 right-3 flex translate-y-3 items-center justify-center gap-2 rounded-full bg-ink py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-paper opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
            >
              <PlusIcon size={15} />
              Quick Add
            </button>
          )}
        </div>

        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="meta-sm text-smoke">
              {sportLabel(product.sport)} · {product.season}
            </p>
            <h3 className="mt-1 truncate font-display text-lg leading-tight">{product.club}</h3>
            <p className="truncate text-sm text-smoke">{product.name}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="num text-sm font-semibold">{formatPrice(product.price)}</p>
            {product.originalPrice && (
              <p className="num text-xs text-fog line-through">{formatPrice(product.originalPrice)}</p>
            )}
            {discount > 0 && <p className="meta-sm mt-0.5 text-clay">{discount}% off</p>}
          </div>
        </div>
      </Link>
    </article>
  )
}
