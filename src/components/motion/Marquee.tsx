import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  children: ReactNode
  className?: string
  /** seconds for one full cycle */
  duration?: number
  reverse?: boolean
  pauseOnHover?: boolean
}

export function Marquee({ children, className, duration = 38, reverse = false, pauseOnHover = true }: Props) {
  return (
    <div className={cn('group relative overflow-hidden', className)}>
      <div
        className={cn(
          'flex w-max will-change-transform',
          pauseOnHover && 'group-hover:[animation-play-state:paused]',
        )}
        style={{
          animation: `${reverse ? 'marquee-right' : 'marquee-left'} ${duration}s linear infinite`,
        }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
