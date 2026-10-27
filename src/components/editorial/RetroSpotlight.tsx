import { Reveal } from '@/components/motion/Reveal'
import { MediaReveal } from '@/components/motion/MediaReveal'
import { photo } from '@/lib/images'

export function RetroSpotlight() {
  return (
    <section className="bg-paper-dim px-gutter py-16 lg:py-24">
      <div className="mb-8 grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <Reveal>
            <p className="eyebrow meta mb-4">Retro / Archive</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="t-headline max-w-3xl">
              Reissued from the archive, preserved for the terrace.
            </h2>
          </Reveal>
        </div>
        <div className="lg:col-span-4">
          <Reveal delay={0.15}>
            <p className="text-base leading-relaxed text-ink/70">
              Faithful patterns, woven crests and boxy terrace fits — limited runs, never re-cut.
            </p>
          </Reveal>
        </div>
      </div>
      <MediaReveal className="h-[58svh] lg:h-[70svh]">
        <div data-media-inner className="h-full w-full">
          <img
            src={photo('footballLineup', 1920)}
            alt="Archive football shirts lined up on the pitch"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </MediaReveal>
    </section>
  )
}
