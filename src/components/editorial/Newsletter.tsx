import { ArrowRightIcon } from '@/components/ui/icons'
import { Reveal, StaggerGroup } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Newsletter() {
  return (
    <section className="bg-ink-soft px-gutter py-16 text-paper lg:py-24">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow meta mb-4 text-brass-soft">Stay Close To The Game</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="t-headline max-w-2xl">
              Release dates. Archive drops. Matchday edits.
            </h2>
          </Reveal>
        </div>
        <StaggerGroup className="flex flex-col gap-4 lg:col-span-5">
          <form className="flex flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 border-paper/30 bg-transparent text-paper placeholder:text-paper/50 focus-visible:border-brass-soft focus-visible:ring-0"
            />
            <Button variant="outline" className="border-paper/50 text-paper hover:bg-paper hover:text-ink" invert>
              Subscribe
              <ArrowRightIcon size={16} />
            </Button>
          </form>
          <p className="text-xs text-paper/55">No spam. Only the kits that matter.</p>
        </StaggerGroup>
      </div>
    </section>
  )
}
