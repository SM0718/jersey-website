import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BagIcon, HeartIcon, LocationIcon, UserIcon, ArrowRightIcon } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'
import { useCartStore, selectCount } from '@/stores/cartStore'
import { useWishlistStore } from '@/stores/wishlistStore'
import { products } from '@/data/products'
import { ProductCard } from '@/components/product/ProductCard'
import { cn } from '@/lib/utils'

const TABS = [
  { id: 'profile', label: 'Profile', Icon: UserIcon },
  { id: 'orders', label: 'Orders', Icon: BagIcon },
  { id: 'wishlist', label: 'Wishlist', Icon: HeartIcon },
  { id: 'addresses', label: 'Addresses', Icon: LocationIcon },
] as const

type TabId = (typeof TABS)[number]['id']

export default function Profile() {
  const [tab, setTab] = useState<TabId>('profile')
  const cartCount = useCartStore((s) => selectCount(s.lines))
  const wishIds = useWishlistStore((s) => s.ids)
  const saved = products.filter((p) => wishIds.includes(p.id)).slice(0, 3)

  return (
    <div className="px-gutter pb-20 pt-[calc(var(--header-h)+2rem)]">
      <div className="mb-8">
        <p className="eyebrow meta mb-4">Account</p>
        <h1 className="t-headline">Your Profile</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {TABS.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={cn(
                  'flex shrink-0 items-center gap-3 rounded-full border px-4 py-3 text-left text-sm transition-colors lg:rounded-md',
                  tab === id
                    ? 'border-ink bg-ink text-paper'
                    : 'border-hairline text-ink hover:border-ink',
                )}
              >
                <Icon size={17} />
                {label}
              </button>
            ))}
          </div>
        </aside>

        <div className="lg:col-span-9">
          {tab === 'profile' && (
            <div className="space-y-6">
              <div className="surface p-8">
                <h2 className="t-sub">Welcome back</h2>
                <p className="mt-2 max-w-lg text-ink/75">
                  Manage your orders, addresses and saved shirts. Sign in to sync your bag across devices.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button>Sign in</Button>
                  <Button variant="outline">Create account</Button>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Link to="/cart" className="surface flex items-center justify-between p-6">
                  <div>
                    <p className="meta-sm text-smoke">In your bag</p>
                    <p className="t-display mt-1 text-4xl">{cartCount}</p>
                  </div>
                  <ArrowRightIcon size={18} className="text-clay" />
                </Link>
                <Link to="/wishlist" className="surface flex items-center justify-between p-6">
                  <div>
                    <p className="meta-sm text-smoke">Saved shirts</p>
                    <p className="t-display mt-1 text-4xl">{wishIds.length}</p>
                  </div>
                  <ArrowRightIcon size={18} className="text-clay" />
                </Link>
              </div>
            </div>
          )}

          {tab === 'orders' && (
            <div className="surface p-8">
              <h2 className="t-sub">Order history</h2>
              <p className="mt-3 text-ink/70">No orders yet. Your first drop is waiting.</p>
              <Button asChild variant="outline" className="mt-6">
                <Link to="/shop">Shop the collection</Link>
              </Button>
            </div>
          )}

          {tab === 'wishlist' && (
            <div>
              <h2 className="t-sub mb-6">Saved shirts</h2>
              {saved.length === 0 ? (
                <p className="text-ink/70">Nothing saved yet.</p>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {saved.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'addresses' && (
            <div className="surface p-8">
              <h2 className="t-sub">Saved addresses</h2>
              <p className="mt-3 text-ink/70">You have no saved addresses yet.</p>
              <Button variant="outline" className="mt-6">
                Add address
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
