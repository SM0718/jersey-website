import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '@/components/ui/icons'
import { HeroCarousel } from '@/components/editorial/HeroCarousel'
import { SplitText } from '@/components/motion/SplitText'
import { Reveal, StaggerGroup } from '@/components/motion/Reveal'
import { EDITORIAL } from '@/lib/constants'
import { Button } from '@/components/ui/button'

const STATS = [
  { value: '6', label: 'Sports covered' },
  { value: '40+', label: 'Clubs & nations' },
  { value: '999', label: 'Archive units' },
]

export function Hero() {
  return (
    <section className="px-gutter pb-8 pt-6 lg:pb-10 lg:pt-8">
      <div className="relative min-h-[calc(100svh-var(--header-h)-2.5rem)] overflow-hidden rounded-lg bg-ink-soft text-paper">
        <HeroCarousel>
          <div className="absolute inset-0 z-10 flex flex-col p-6 pb-32 lg:p-10 lg:pb-40">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-7">
                <Reveal delay={0.05}>
                  <p className="eyebrow meta mb-5 text-brass-soft">{EDITORIAL.hero.eyebrow}</p>
                </Reveal>
                <h1 className="t-hero text-paper">
                  <SplitText text={EDITORIAL.hero.headline[0]} />{' '}
                  <span className="italic text-brass-soft">
                    <SplitText text={EDITORIAL.hero.headline[1]} />
                  </span>
                </h1>
              </div>

              <div className="flex flex-col gap-6 lg:col-span-5 lg:col-start-8 lg:items-start">
                <Reveal delay={0.25}>
                  <p className="max-w-sm text-base leading-relaxed text-paper/80">
                    {EDITORIAL.hero.caption}
                  </p>
                </Reveal>
                <StaggerGroup className="flex flex-wrap gap-3">
                  <Button asChild invert>
                    <Link to="/shop">
                      Explore Collection
                      <ArrowRightIcon size={16} />
                    </Link>
                  </Button>
                  <Button variant="outline" invert asChild>
                    <Link to="/shop?category=retro">Shop Retro</Link>
                  </Button>
                </StaggerGroup>
                <StaggerGroup className="mt-2 grid w-full grid-cols-3 gap-4 border-t border-paper/20 pt-5">
                  {STATS.map((stat) => (
                    <div key={stat.label}>
                      <p className="t-numeric text-2xl leading-none text-paper">{stat.value}</p>
                      <p className="meta-sm mt-1 text-paper/60">{stat.label}</p>
                    </div>
                  ))}
                </StaggerGroup>
              </div>
            </div>
          </div>
        </HeroCarousel>
      </div>
    </section>
  )
}
