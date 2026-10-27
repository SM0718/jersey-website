import { Reveal } from '@/components/motion/Reveal'

export function CollectionIntro() {
  return (
    <section className="px-gutter py-16 lg:py-24">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-9">
          <Reveal>
            <p className="eyebrow meta mb-6">Football Is Culture</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="t-display max-w-5xl">
              The shirt tells the story — from the terraces to the floodlights, built for matchday.
            </h2>
          </Reveal>
        </div>
        <div className="lg:col-span-3">
          <Reveal delay={0.15}>
            <p className="font-editorial text-xl italic leading-snug text-ink/70">
              Woven badges. Faithful patterns. Cut the way the club cuts it.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
