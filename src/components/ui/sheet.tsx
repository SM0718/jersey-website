import * as SheetPrimitive from '@radix-ui/react-dialog'
import type { ComponentProps } from 'react'
import { CloseIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

const Sheet = SheetPrimitive.Root
const SheetTrigger = SheetPrimitive.Trigger
const SheetClose = SheetPrimitive.Close
const SheetPortal = SheetPrimitive.Portal
const SheetTitle = SheetPrimitive.Title
const SheetDescription = SheetPrimitive.Description

const SheetOverlay = ({ className, ...props }: ComponentProps<typeof SheetPrimitive.Overlay>) => (
  <SheetPrimitive.Overlay
    className={cn('ui-overlay fixed inset-0 z-overlay bg-ink/45 backdrop-blur-[3px]', className)}
    {...props}
  />
)

const sideClasses: Record<string, string> = {
  right: 'inset-y-0 right-0 h-full w-[min(26rem,100vw)] border-l',
  left: 'inset-y-0 left-0 h-full w-[min(24rem,100vw)] border-r',
  bottom: 'inset-x-0 bottom-0 max-h-[85svh] w-full rounded-t-[26px] border-t',
  top: 'inset-x-0 top-0 max-h-[85svh] w-full rounded-b-[26px] border-b',
}

type SheetContentProps = ComponentProps<typeof SheetPrimitive.Content> & {
  side?: 'right' | 'left' | 'bottom' | 'top'
  showClose?: boolean
}

const SheetContent = ({
  side = 'right',
  className,
  children,
  showClose = true,
  ...props
}: SheetContentProps) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      data-side={side}
      className={cn(
        'ui-sheet fixed z-drawer flex flex-col border-hairline bg-paper text-ink shadow-[0_40px_120px_-40px_rgba(33,26,20,0.6)]',
        sideClasses[side],
        className,
      )}
      {...props}
    >
      {children}
      {showClose && (
        <SheetPrimitive.Close
          className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-hairline text-ink transition-colors hover:bg-ink hover:text-paper focus-visible:outline-none"
          aria-label="Close"
        >
          <CloseIcon size={18} />
        </SheetPrimitive.Close>
      )}
    </SheetPrimitive.Content>
  </SheetPortal>
)

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetDescription,
}
