import { Link } from 'react-router-dom'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { ProductMedia } from '@/components/product/ProductMedia'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon, MinusIcon, PlusIcon, TrashIcon } from '@/components/ui/icons'
import { useCartStore, selectCount } from '@/stores/cartStore'
import { useUiStore } from '@/stores/uiStore'
import { products } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import { FREE_SHIPPING_THRESHOLD, FLAT_SHIPPING } from '@/lib/constants'

export function CartDrawer() {
  const { cartOpen, setCartOpen } = useUiStore()
  const { lines, setQuantity, remove } = useCartStore()
  const count = selectCount(lines)

  const subtotal = lines.reduce((sum, line) => {
    const product = products.find((p) => p.id === line.productId)
    return sum + (product?.price ?? 0) * line.quantity
  }, 0)

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : FLAT_SHIPPING

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="w-[min(30rem,100vw)]">
        <div className="flex items-baseline justify-between border-b border-hairline px-6 py-5 pr-16">
          <SheetTitle className="t-sub">Your Bag</SheetTitle>
          <span className="meta-sm text-smoke">{count} item{count === 1 ? '' : 's'}</span>
        </div>

        {lines.length > 0 && (
          <div className="border-b border-hairline px-6 py-4">
            <p className="meta-sm text-smoke">
              {remaining > 0 ? `${formatPrice(remaining)} away from free shipping` : 'You’ve unlocked free shipping'}
            </p>
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-paper-deep">
              <div
                className="h-full rounded-full bg-clay transition-[width] duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6" data-lenis-prevent>
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-5 py-20 text-center">
              <p className="t-editorial-sm text-smoke">Nothing here yet.</p>
              <Button asChild onClick={() => setCartOpen(false)}>
                <Link to="/shop">
                  Start Shopping
                  <ArrowRightIcon size={16} />
                </Link>
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-hairline">
              {lines.map((line) => {
                const product = products.find((p) => p.id === line.productId)
                if (!product) return null
                return (
                  <li key={line.key} className="flex gap-4 py-5">
                    <Link
                      to={`/product/${product.id}`}
                      onClick={() => setCartOpen(false)}
                      className="media-frame h-24 w-20 shrink-0"
                    >
                      <ProductMedia
                        colorway={product.colorway}
                        pattern={product.pattern}
                        club={product.club}
                        number={product.number}
                        sport={product.sport}
                        mediaKind={product.mediaKind}
                      />
                    </Link>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium leading-tight">{product.club}</p>
                          <p className="text-sm text-smoke">{product.name}</p>
                          <p className="meta-sm mt-1 text-fog">
                            Size {line.size}
                            {line.personalization ? ` · ${line.personalization.name} ${line.personalization.number}` : ''}
                          </p>
                        </div>
                        <button
                          onClick={() => remove(line.key)}
                          className="text-fog transition-colors hover:text-clay"
                          aria-label={`Remove ${product.name}`}
                        >
                          <TrashIcon size={16} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 rounded-full border border-hairline px-1.5 py-1">
                          <button
                            onClick={() => setQuantity(line.key, line.quantity - 1)}
                            className="grid h-6 w-6 place-items-center rounded-full transition-colors hover:bg-paper-dim"
                            aria-label="Decrease quantity"
                          >
                            <MinusIcon size={14} />
                          </button>
                          <span className="num w-6 text-center text-sm">{line.quantity}</span>
                          <button
                            onClick={() => setQuantity(line.key, line.quantity + 1)}
                            className="grid h-6 w-6 place-items-center rounded-full transition-colors hover:bg-paper-dim"
                            aria-label="Increase quantity"
                          >
                            <PlusIcon size={14} />
                          </button>
                        </div>
                        <p className="text-sm font-medium">{formatPrice(product.price * line.quantity)}</p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-hairline px-6 py-5">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-smoke">Subtotal</span>
                <span className="num">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-smoke">Shipping</span>
                <span className="num">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between pt-2 text-base font-semibold">
                <span>Total</span>
                <span className="num">{formatPrice(subtotal + shipping)}</span>
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-2.5">
              <Button asChild className="w-full" onClick={() => setCartOpen(false)}>
                <Link to="/checkout">
                  Checkout
                  <ArrowRightIcon size={16} />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full" onClick={() => setCartOpen(false)}>
                <Link to="/cart">View Full Bag</Link>
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
