import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/ui/icons'
import { SPORTS, type SportId } from '@/lib/constants'
import { photo, type PhotoKey } from '@/lib/images'
import { isPrefersReducedMotion } from '@/lib/capabilities'
import { cn } from '@/lib/utils'

const HERO_PHOTO: Record<SportId, PhotoKey> = {
  football: 'footballNight',
  cricket: 'cricketDust',
  basketball: 'basketballGame',
  badminton: 'badmintonHall',
  tennis: 'tennisCourt',
  rugby: 'rugby',
}

const SLIDES = SPORTS.map((sport) => ({
  id: sport.id,
  label: sport.label,
  blurb: sport.blurb,
  src: photo(HERO_PHOTO[sport.id], 1920),
}))

const INTERVAL = 5600

export function HeroCarousel({ children }: { children?: ReactNode }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = SLIDES.length

  useEffect(() => {
    if (paused || isPrefersReducedMotion()) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL)
    return () => window.clearInterval(id)
  }, [paused, count])

  const go = (step: number) => setIndex((i) => (i + step + count) % count)
  const active = SLIDES[index]

  return (
    <div
      className="absolute inset-0"
      role="region"
      aria-roledescription="carousel"
      aria-label="Shop by sport"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          className={cn(
            'absolute inset-0 transition-opacity duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
            i === index ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
          aria-hidden={i !== index}
        >
          <img
            src={slide.src}
            alt={`${slide.label} — ${slide.blurb}`}
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchPriority={i === 0 ? 'high' : 'auto'}
            className={cn(
              'h-full w-full object-cover transition-transform duration-[7000ms] ease-out',
              i === index ? 'scale-[1.06]' : 'scale-100',
            )}
          />
        </div>
      ))}

      {/* legibility scrims — darker top and bottom, lighter through the middle */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/45 to-ink/88" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />

      {children}

      <div className="absolute inset-x-0 bottom-0 z-20 flex flex-wrap items-end justify-between gap-6 p-6 lg:p-10">
        <div key={index} className="animate-rise max-w-sm text-paper">
          <p className="meta-sm mb-1 text-brass-soft">
            {active.label}
          </p>
          <Link
            to={`/shop?sport=${active.id}`}
            className="group/cta inline-flex items-center gap-2 font-display text-xl leading-tight lg:text-2xl"
          >
            <span className="link-underline">{active.blurb}</span>
            <ArrowRightIcon size={18} className="shrink-0 transition-transform duration-500 group-hover/cta:translate-x-1" />
          </Link>
        </div>

        <div className="flex items-center gap-5">
          <span className="meta hidden text-paper/60 sm:inline">
            <span className="num text-paper">{String(index + 1).padStart(2, '0')}</span>
            <span className="mx-1">/</span>
            <span className="num">{String(count).padStart(2, '0')}</span>
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous slide"
              className="grid h-11 w-11 place-items-center rounded-full border border-paper/40 text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              <ArrowLeftIcon size={18} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next slide"
              className="grid h-11 w-11 place-items-center rounded-full border border-paper/40 text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              <ArrowRightIcon size={18} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to ${slide.label}`}
                aria-current={i === index}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-500',
                  i === index ? 'w-9 bg-paper' : 'w-3 bg-paper/40 hover:bg-paper/70',
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
