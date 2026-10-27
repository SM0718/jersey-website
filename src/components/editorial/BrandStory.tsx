import { Reveal, StaggerGroup } from '@/components/motion/Reveal'
import { MediaReveal } from '@/components/motion/MediaReveal'
import { photo } from '@/lib/images'

const PILLARS = [
  'Woven crests, not heat transfers',
  'Faithful archive patterns',
  'Cotton-rich, match-issue handles',
]

export function BrandStory() {
  return (
    <section className="px-gutter py-16 lg:py-24">
      <div className="mb-10">
        <Reveal>
          <p className="eyebrow meta mb-4">More Than A Shirt</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="t-display max-w-5xl">The pitch. The court. The people.</h2>
        </Reveal>
      </div>
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <MediaReveal className="h-[46svh] lg:h-[62svh]">
            <div data-media-inner className="h-full w-full">
              <img
                src={photo('footballFans', 1400)}
                alt="Supporters in club colours on the walk to the ground"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </MediaReveal>
        </div>
        <StaggerGroup className="flex flex-col gap-6 lg:col-span-5 lg:col-start-8">
          <p className="font-editorial text-2xl leading-snug lg:text-3xl">
            TERRACE documents and produces match-issue kits with an eye for craft and a mind for culture.
          </p>
          <p className="text-base leading-relaxed text-ink/75">
            From reissuing archive shirts to producing contemporary matchday editions across six sports,
            the focus stays the same — the kit tells the story.
          </p>
          <p className="text-base leading-relaxed text-ink/75">
            No hype for hype’s sake. Just the weight of the badge, the fall of the fabric and the memory
            stitched in.
          </p>
          <ul className="mt-2 space-y-3 border-t border-hairline pt-5">
            {PILLARS.map((pillar) => (
              <li key={pillar} className="meta flex items-center gap-3 text-smoke">
                <span className="h-1.5 w-1.5 rounded-full bg-clay" />
                {pillar}
              </li>
            ))}
          </ul>
        </StaggerGroup>
      </div>
    </section>
  )
}
