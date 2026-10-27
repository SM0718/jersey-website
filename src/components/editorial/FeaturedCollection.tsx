import { Link } from 'react-router-dom'
import { products, diverseBySport } from '@/data/products'
import { ProductCard } from '@/components/product/ProductCard'
import { Reveal } from '@/components/motion/Reveal'
import { ArrowRightIcon } from '@/components/ui/icons'

export function FeaturedCollection() {
  const featured = diverseBySport(
    products.filter((p) => p.collections.includes('featured')),
    3,
  )

  return (
    <section className="px-gutter py-16 lg:py-24">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <Reveal>
          <div>
            <p className="eyebrow meta mb-4">Featured Collection</p>
            <h2 className="t-headline">Matchday Essentials</h2>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <Link to="/shop" className="meta link-underline inline-flex items-center gap-2">
            View All
            <ArrowRightIcon size={15} />
          </Link>
        </Reveal>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((product, i) => (
          <Reveal key={product.id} delay={i * 0.12}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
