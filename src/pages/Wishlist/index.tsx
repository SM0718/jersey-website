import { useWishlistStore } from '@/stores/wishlistStore'
import { products } from '@/data/products'
import { ProductCard } from '@/components/product/ProductCard'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '@/components/ui/icons'
import { Reveal } from '@/components/motion/Reveal'

export default function Wishlist() {
  const { ids } = useWishlistStore()
  const saved = products.filter((p) => ids.includes(p.id))

  if (saved.length === 0) {
    return (
      <div className="flex min-h-[calc(100svh-var(--header-h))] flex-col items-center justify-center gap-5 px-gutter pt-[var(--header-h)] text-center">
        <p className="eyebrow meta">Wishlist</p>
        <h1 className="t-display">Saved for later.</h1>
        <p className="max-w-sm text-ink/70">
          Tap the heart on any shirt to keep it here for the next drop.
        </p>
        <Button asChild>
          <Link to="/shop">
            Browse Jerseys
            <ArrowRightIcon size={16} />
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="px-gutter pb-20 pt-[calc(var(--header-h)+2rem)]">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow meta mb-4">Wishlist</p>
          <h1 className="t-headline">Saved For Later</h1>
        </div>
        <p className="meta text-smoke">
          <span className="num">{saved.length}</span> saved
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {saved.map((product, i) => (
          <Reveal key={product.id} delay={Math.min(i, 6) * 0.06}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}
