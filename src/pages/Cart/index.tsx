import { Link } from 'react-router-dom'
import { useCartStore, selectCount } from '@/stores/cartStore'
import { products } from '@/data/products'
import { ProductMedia } from '@/components/product/ProductMedia'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon, MinusIcon, PlusIcon, TrashIcon } from '@/components/ui/icons'
import { FREE_SHIPPING_THRESHOLD, FLAT_SHIPPING } from '@/lib/constants'

export default function Cart() {
  const { lines, setQuantity, remove } = useCartStore()
  const count = selectCount(lines)

  const subtotal = lines.reduce((sum, line) => {
    const product = products.find((p) => p.id === line.productId)
    return sum + (product?.price ?? 0) * line.quantity
  }, 0)
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : FLAT_SHIPPING
  const total = subtotal + shipping
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)

  if (lines.length === 0) {
    return (
      <div className="flex min-h-[calc(100svh-var(--header-h))] flex-col items-center justify-center gap-5 px-gutter pt-[var(--header-h)] text-center">
        <p className="eyebrow meta">Your bag</p>
        <h1 className="t-display">Nothing here yet.</h1>
        <p className="max-w-sm text-ink/70">
          Your bag is empty. The 26/27 drops are waiting on the terrace.
        </p>
        <Button asChild>
          <Link to="/shop">
            Start Shopping
            <ArrowRightIcon size={16} />
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="px-gutter pb-20 pt-[calc(var(--header-h)+2rem)]">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow meta mb-4">Cart</p>
          <h1 className="t-headline">Your Selection</h1>
        </div>
        <p className="meta text-smoke">
          <span className="num">{count}</span> items
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <ul className="divide-y divide-hairline border-y border-hairline">
            {lines.map((line) => {
              const product = products.find((p) => p.id === line.productId)
              if (!product) return null
              return (
                <li key={line.key} className="flex gap-5 py-6">
                  <Link to={`/product/${product.id}`} className="media-frame h-32 w-26 shrink-0 sm:h-36 sm:w-30">
                    <ProductMedia
                      colorway={product.colorway}
                      pattern={product.pattern}
                      club={product.club}
                      number={product.number}
                      sport={product.sport}
                      mediaKind={product.mediaKind}
                    />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between gap-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="meta-sm text-smoke">{product.season}</p>
                        <h3 className="mt-1 font-display text-xl leading-tight">{product.club}</h3>
                        <p className="text-sm text-smoke">{product.name}</p>
                        <p className="meta-sm mt-1.5 text-fog">
                          Size {line.size}
                          {line.personalization
                            ? ` · ${line.personalization.name} ${line.personalization.number}`
                            : ''}
                        </p>
                      </div>
                      <p className="num shrink-0 text-sm font-semibold">
                        {formatPrice(product.price * line.quantity)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 rounded-full border border-hairline px-1.5 py-1">
                        <button
                          onClick={() => setQuantity(line.key, line.quantity - 1)}
                          className="grid h-7 w-7 place-items-center rounded-full transition-colors hover:bg-paper-dim"
                          aria-label="Decrease quantity"
                        >
                          <MinusIcon size={14} />
                        </button>
                        <span className="num w-7 text-center text-sm">{line.quantity}</span>
                        <button
                          onClick={() => setQuantity(line.key, line.quantity + 1)}
                          className="grid h-7 w-7 place-items-center rounded-full transition-colors hover:bg-paper-dim"
                          aria-label="Increase quantity"
                        >
                          <PlusIcon size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => remove(line.key)}
                        className="meta-sm flex items-center gap-2 text-smoke transition-colors hover:text-clay"
                      >
                        <TrashIcon size={15} />
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
          <Link to="/shop" className="meta link-underline mt-6 inline-flex items-center gap-2">
            Continue shopping
            <ArrowRightIcon size={14} />
          </Link>
        </div>

        <aside className="lg:col-span-4">
          <div className="surface sticky top-[calc(var(--header-h)+1.5rem)] p-6">
            <h2 className="t-sub">Order Summary</h2>

            {remaining > 0 ? (
              <div className="mt-5 rounded-md bg-paper-dim p-4">
                <p className="meta-sm text-smoke">
                  <span className="text-clay">{formatPrice(remaining)}</span> away from free shipping
                </p>
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-paper-deep">
                  <div
                    className="h-full rounded-full bg-clay"
                    style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="meta-sm mt-4 text-clay">Free shipping unlocked</p>
            )}

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-smoke">Subtotal</span>
                <span className="num">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-smoke">Shipping</span>
                <span className="num">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="rule my-3" />
              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span className="num">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <Button asChild className="w-full">
                <Link to="/checkout">
                  Proceed to Checkout
                  <ArrowRightIcon size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
