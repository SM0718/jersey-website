import { Marquee } from '@/components/motion/Marquee'
import { products } from '@/data/products'

export function ProductMarquee() {
  const names = products.slice(0, 12).map((p) => `${p.club} · ${p.name}`)
  const track = [...names, ...names]

  return (
    <section className="border-y border-hairline bg-ink-soft py-5 text-paper">
      <Marquee duration={52} reverse>
        {track.map((item, i) => (
          <span key={i} className="mx-6 flex items-center gap-6 whitespace-nowrap">
            <span className="t-sub text-paper/90">{item}</span>
            <span className="text-brass-soft">✦</span>
          </span>
        ))}
      </Marquee>
    </section>
  )
}
