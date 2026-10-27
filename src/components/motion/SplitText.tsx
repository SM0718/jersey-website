import type { ElementType } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  text: string
  as?: ElementType
  className?: string
  /** each unit animates individually */
  mode?: 'words' | 'chars'
  /** units already revealed (e.g. after the intro timeline) */
  revealed?: boolean
  delayPerUnit?: number
}

/**
 * Splits text into masked units for GSAP reveals.
 * Each unit is wrapped in an overflow-hidden shell so type can slide from below.
 */
export function SplitText({ text, as: Tag = 'span', className, mode = 'words', delayPerUnit = 0 }: Props) {
  const units = mode === 'words' ? text.split(' ') : Array.from(text)

  return (
    <Tag className={cn('inline-block', className)}>
      <span aria-hidden="true">
        {units.map((unit, i) => (
          <span key={`${unit}-${i}`} className="inline-block overflow-hidden align-bottom">
            <span
              className="inline-block will-change-transform"
              {...(mode === 'words' ? { 'data-reveal-word': '' } : { 'data-reveal-char': '' })}
              style={delayPerUnit ? { transitionDelay: `${i * delayPerUnit}ms` } : undefined}
            >
              {unit}
              {mode === 'words' && i < units.length - 1 ? '\u00A0' : ''}
            </span>
          </span>
        ))}
      </span>
      <span className="sr-only">{text}</span>
    </Tag>
  )
}
