import { Link } from 'react-router-dom'
import { SPORTS } from '@/lib/constants'
import { Reveal } from '@/components/motion/Reveal'
import { ArrowRightIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export function ShopBySport() {
  return (
    <section className="px-gutter py-16 lg:py-24">
      <div className="mb-10">
        <Reveal>
          <p className="eyebrow meta mb-4">Shop By Sport</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="t-headline">Every game. One wardrobe.</h2>
        </Reveal>
      </div>
      <div className="grid gap-4 md:grid-cols-12">
        {SPORTS.map((sport, i) => (
          <Reveal key={sport.id} delay={i * 0.06} className={cn(colSpan(i))}>
            <Link
              to={`/shop?sport=${sport.id}`}
              className="group relative flex h-full min-h-[26svh] flex-col justify-between overflow-hidden rounded-md p-6 text-paper transition-transform duration-500 hover:-translate-y-1 lg:min-h-[30svh]"
            >
              <img
                src={sport.image}
                alt={`${sport.label} — ${sport.blurb}`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/50 to-ink/25" />
              <div className="relative z-10">
                <h3 className="t-sub">{sport.label}</h3>
                <p className="mt-2 max-w-sm text-sm text-paper/80">{sport.blurb}</p>
              </div>
              <span className="meta relative z-10 mt-6 inline-flex items-center gap-2 text-paper/90">
                Shop Now
                <ArrowRightIcon size={14} className="transition-transform duration-500 group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function colSpan(index: number) {
  const cols: Record<number, string> = {
    0: 'md:col-span-7',
    1: 'md:col-span-5',
    2: 'md:col-span-5',
    3: 'md:col-span-7',
    4: 'md:col-span-6',
    5: 'md:col-span-6',
  }
  return cols[index] ?? 'md:col-span-6'
}
