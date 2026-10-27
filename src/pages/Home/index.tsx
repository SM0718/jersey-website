import { Hero } from '@/components/editorial/Hero'
import { CollectionIntro } from '@/components/editorial/CollectionIntro'
import { FeaturedCollection } from '@/components/editorial/FeaturedCollection'
import { ProductMarquee } from '@/components/editorial/ProductMarquee'
import { ShopBySport } from '@/components/editorial/ShopBySport'
import { TrendingRail } from '@/components/editorial/TrendingRail'
import { RetroSpotlight } from '@/components/editorial/RetroSpotlight'
import { BrandStory } from '@/components/editorial/BrandStory'
import { Newsletter } from '@/components/editorial/Newsletter'
import { useScrollRefresh } from '@/hooks/useScrollReveal'

export default function Home() {
  useScrollRefresh([0])
  return (
    <div className="pt-[var(--header-h)]">
      <Hero />
      <CollectionIntro />
      <FeaturedCollection />
      <ProductMarquee />
      <ShopBySport />
      <TrendingRail />
      <RetroSpotlight />
      <BrandStory />
      <Newsletter />
    </div>
  )
}
