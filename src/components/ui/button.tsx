import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

type Variant = 'solid' | 'outline' | 'ghost' | 'link'
type Size = 'sm' | 'md' | 'lg' | 'icon'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: Variant
  size?: Size
  invert?: boolean
}

const sizeClass: Record<Size, string> = {
  sm: 'px-4 py-2.5 text-[10px]',
  md: 'px-6 py-3.5 text-[11px]',
  lg: 'px-8 py-4.5 text-xs',
  icon: 'p-2.5',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, variant = 'solid', size = 'md', invert = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    const base =
      'relative inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap font-semibold uppercase tracking-[0.18em] transition-colors duration-300 disabled:pointer-events-none disabled:opacity-40'

    const variants: Record<Variant, string> = {
      solid: 'btn-solid',
      outline: 'btn-outline',
      ghost:
        'border border-hairline-strong bg-transparent text-ink hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper',
      link: 'link-underline px-0 py-0 tracking-[0.18em] text-[11px] font-semibold uppercase',
    }

    return (
      <Comp
        ref={ref}
        className={cn(base, variants[variant], sizeClass[size], className)}
        {...(variant === 'outline' || variant === 'solid' ? { 'data-invert': String(invert) } : {})}
        {...props}
      >
        {children}
      </Comp>
    )
  },
)

Button.displayName = 'Button'
