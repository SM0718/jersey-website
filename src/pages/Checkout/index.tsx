import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRightIcon, CheckIcon } from '@/components/ui/icons'
import { useCartStore, selectCount } from '@/stores/cartStore'
import { products } from '@/data/products'
import { ProductMedia } from '@/components/product/ProductMedia'
import { formatPrice } from '@/lib/utils'
import { FREE_SHIPPING_THRESHOLD, FLAT_SHIPPING } from '@/lib/constants'

const checkoutSchema = z.object({
  email: z.string().email('Enter a valid email'),
  fullName: z.string().min(1, 'Required'),
  address: z.string().min(1, 'Required'),
  city: z.string().min(1, 'Required'),
  postalCode: z.string().min(1, 'Required'),
  country: z.string().min(1, 'Required'),
})

type CheckoutForm = z.infer<typeof checkoutSchema>

export default function Checkout() {
  const { lines, clear } = useCartStore()
  const [placed, setPlaced] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({ resolver: zodResolver(checkoutSchema) })

  const subtotal = lines.reduce((sum, line) => {
    const product = products.find((p) => p.id === line.productId)
    return sum + (product?.price ?? 0) * line.quantity
  }, 0)
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : FLAT_SHIPPING
  const count = selectCount(lines)

  const onSubmit = (_data: CheckoutForm) => {
    setPlaced(true)
    clear()
  }

  if (placed) {
    return (
      <div className="flex min-h-[calc(100svh-var(--header-h))] flex-col items-center justify-center gap-5 px-gutter pt-[var(--header-h)] text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-clay text-paper">
          <CheckIcon size={30} />
        </span>
        <h1 className="t-display">Order placed.</h1>
        <p className="max-w-md text-ink/70">
          Thanks — your shirts are being packed. A confirmation is on its way to your inbox.
        </p>
        <Button asChild>
          <Link to="/shop">
            Keep Shopping
            <ArrowRightIcon size={16} />
          </Link>
        </Button>
      </div>
    )
  }

  if (lines.length === 0) {
    return (
      <div className="flex min-h-[calc(100svh-var(--header-h))] flex-col items-center justify-center gap-5 px-gutter pt-[var(--header-h)] text-center">
        <h1 className="t-display">Your bag is empty.</h1>
        <p className="max-w-sm text-ink/70">Add a shirt before heading to checkout.</p>
        <Button asChild>
          <Link to="/shop">Browse Jerseys</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="px-gutter pb-20 pt-[calc(var(--header-h)+2rem)]">
      <div className="mb-8">
        <p className="eyebrow meta mb-4">Checkout</p>
        <h1 className="t-headline">Complete Your Order</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-10 lg:grid-cols-12">
        <div className="space-y-10 lg:col-span-7">
          <section className="space-y-4">
            <h2 className="t-sub">Contact</h2>
            <Field label="Email" error={errors.email?.message}>
              <Input {...register('email')} placeholder="you@example.com" />
            </Field>
          </section>

          <section className="space-y-4">
            <h2 className="t-sub">Shipping</h2>
            <Field label="Full name" error={errors.fullName?.message}>
              <Input {...register('fullName')} placeholder="Alex Terrace" />
            </Field>
            <Field label="Address" error={errors.address?.message}>
              <Input {...register('address')} placeholder="12 Turnstile Lane" />
            </Field>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="City" error={errors.city?.message}>
                <Input {...register('city')} placeholder="Mumbai" />
              </Field>
              <Field label="Postal code" error={errors.postalCode?.message}>
                <Input {...register('postalCode')} placeholder="400001" />
              </Field>
              <Field label="Country" error={errors.country?.message}>
                <Input {...register('country')} placeholder="India" />
              </Field>
            </div>
          </section>

          <Button type="submit" className="w-full sm:w-auto">
            Place Order
            <ArrowRightIcon size={16} />
          </Button>
        </div>

        <aside className="lg:col-span-5">
          <div className="surface sticky top-[calc(var(--header-h)+1.5rem)] p-6">
            <h2 className="t-sub mb-5">Your Order ({count})</h2>
            <ul className="max-h-72 space-y-4 overflow-y-auto pr-1" data-lenis-prevent>
              {lines.map((line) => {
                const product = products.find((p) => p.id === line.productId)
                if (!product) return null
                return (
                  <li key={line.key} className="flex items-center gap-3">
                    <span className="media-frame relative h-16 w-14 shrink-0">
                      <ProductMedia
                        colorway={product.colorway}
                        pattern={product.pattern}
                        club={product.club}
                        sport={product.sport}
                        mediaKind={product.mediaKind}
                      />
                      <span className="num absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-ink text-[10px] text-paper">
                        {line.quantity}
                      </span>
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-medium">{product.club}</span>
                      <span className="meta-sm block text-smoke">Size {line.size}</span>
                    </span>
                    <span className="num text-sm">{formatPrice(product.price * line.quantity)}</span>
                  </li>
                )
              })}
            </ul>
            <div className="rule my-5" />
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
          </div>
        </aside>
      </form>
    </div>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      {children}
      {error && <span className="field-error block">{error}</span>}
    </label>
  )
}
