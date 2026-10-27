import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'
import { photo } from '@/lib/images'
import { Reveal } from '@/components/motion/Reveal'

export default function NotFound() {
  return (
    <div className="relative flex min-h-[calc(100svh-var(--header-h))] flex-col items-center justify-center gap-6 overflow-hidden px-gutter pt-[var(--header-h)] text-center">
      <div className="absolute inset-0 -z-10">
        <img
          src={photo('footballNight', 1920)}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-paper/55" />
      </div>
      <Reveal>
        <p className="eyebrow meta justify-center">Error 404</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h1 className="t-display">Offside.</h1>
      </Reveal>
      <Reveal delay={0.16}>
        <p className="max-w-md text-lg text-ink/75">
          Looks like this page went too far forward. Back to the terrace.
        </p>
      </Reveal>
      <Reveal delay={0.24}>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link to="/shop">
              Back to Shop
              <ArrowRightIcon size={16} />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/">Go Home</Link>
          </Button>
        </div>
      </Reveal>
    </div>
  )
}
