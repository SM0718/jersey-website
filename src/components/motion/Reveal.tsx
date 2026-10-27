import type { ElementType, ReactNode } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { cn } from '@/lib/utils'

type RevealProps = {
  children: ReactNode
  as?: ElementType
  className?: string
  y?: number
  delay?: number
  stagger?: number
  start?: string
  id?: string
}

export function Reveal({ children, as: Tag = 'div', className, y = 44, delay = 0, stagger = 0.09, start, id }: RevealProps) {
  const ref = useScrollReveal<HTMLDivElement>({ y, delay, stagger, start })
  return (
    <Tag ref={ref} className={className} id={id}>
      {children}
    </Tag>
  )
}

export function StaggerGroup({
  children,
  className,
  as: Tag = 'div',
  stagger = 0.08,
  y = 36,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  as?: ElementType
  stagger?: number
  y?: number
  delay?: number
}) {
  const ref = useScrollReveal<HTMLDivElement>({ y, stagger, delay })
  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  )
}
