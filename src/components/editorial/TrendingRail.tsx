import { products, diverseBySport } from '@/data/products'
import { ProductCard } from '@/components/product/ProductCard'
import { Reveal } from '@/components/motion/Reveal'
import { ArrowRightIcon } from '@/components/ui/icons'
import { Link } from 'react-router-dom'

export function TrendingRail() {
  const trending = diverseBySport(
    products.filter((p) => p.collections.includes('trending')),
    4,
  )

  return (
    <section className="px-gutter py-16 lg:py-24">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <Reveal>
          <div>
            <p className="eyebrow meta mb-4">Trending Now</p>
            <h2 className="t-headline">What’s Moving</h2>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <Link to="/shop" className="meta link-underline inline-flex items-center gap-2">
            Shop All
            <ArrowRightIcon size={15} />
          </Link>
        </Reveal>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {trending.map((product, i) => (
          <Reveal key={product.id} delay={i * 0.1}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
