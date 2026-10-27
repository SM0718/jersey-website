import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '@/components/ui/icons'
import { BRAND } from '@/lib/constants'

const COLUMNS = [
  {
    title: 'Shop',
    links: [
      { label: 'Clubs', to: '/shop?category=club' },
      { label: 'National Teams', to: '/shop?category=national' },
      { label: 'Retro', to: '/shop?category=retro' },
      { label: 'Training', to: '/shop?category=training' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Profile', to: '/profile' },
      { label: 'Cart', to: '/cart' },
      { label: 'Wishlist', to: '/wishlist' },
      { label: 'Checkout', to: '/checkout' },
    ],
  },
]

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="bg-ink-soft text-paper">
      <div className="px-gutter py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link to="/" className="font-display text-4xl tracking-[0.2em]">
              {BRAND.name}
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/70">
              Premium football shirts, archive kits and terrace staples. Cut for matchday, built to last.
            </p>
            <p className="mt-6 font-editorial text-xl italic text-brass-soft">{BRAND.tagline}</p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h3 className="meta mb-5 text-brass-soft">{col.title}</h3>
              <ul className="space-y-3 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="link-underline text-paper/80">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-3">
            <h3 className="meta mb-5 text-brass-soft">The List</h3>
            <p className="text-sm text-paper/70">
              Release dates, archive drops and matchday edits — straight to your inbox.
            </p>
            <Link to="/shop" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-paper">
              Browse the collection
              <ArrowRightIcon size={16} />
            </Link>
          </div>
        </div>

        <div className="rule-invert mt-14 flex flex-col items-start justify-between gap-4 pt-6 lg:flex-row lg:items-center">
          <p className="meta-sm text-paper/55">
            © {YEAR} {BRAND.name}. All rights reserved.
          </p>
          <p className="meta-sm text-paper/55">
            {BRAND.city} · Est. {BRAND.founded}
          </p>
        </div>
      </div>
    </footer>
  )
}
