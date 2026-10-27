import * as DialogPrimitive from '@radix-ui/react-dialog'
import type { ComponentProps } from 'react'
import { CloseIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close
const DialogTitle = DialogPrimitive.Title
const DialogDescription = DialogPrimitive.Description

const DialogOverlay = ({ className, ...props }: ComponentProps<typeof DialogPrimitive.Overlay>) => (
  <DialogPrimitive.Overlay
    className={cn('ui-overlay fixed inset-0 z-overlay bg-ink/45 backdrop-blur-[3px]', className)}
    {...props}
  />
)

type DialogContentProps = ComponentProps<typeof DialogPrimitive.Content> & {
  showClose?: boolean
}

const DialogContent = ({ className, children, showClose = true, ...props }: DialogContentProps) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      className={cn(
        'ui-dialog fixed left-1/2 top-1/2 z-drawer w-[min(40rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-hairline bg-paper p-6 text-ink shadow-[0_40px_120px_-40px_rgba(33,26,20,0.6)]',
        className,
      )}
      {...props}
    >
      {children}
      {showClose && (
        <DialogPrimitive.Close
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-hairline text-ink transition-colors hover:bg-ink hover:text-paper focus-visible:outline-none"
          aria-label="Close"
        >
          <CloseIcon size={16} />
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
)

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
}
