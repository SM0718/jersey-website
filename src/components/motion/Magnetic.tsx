import { useEffect, useRef } from 'react'
import { isFinePointer } from '@/lib/capabilities'

export function Magnetic({
  children,
  className,
  strength = 0.32,
  as: Tag = 'div',
}: {
  children: React.ReactNode
  className?: string
  strength?: number
  as?: any
}) {
  const ref = useRef<any>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !isFinePointer()) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      el.style.transform = 'translate3d(' + (x * strength) + 'px, ' + (y * strength) + 'px, 0)'
    }

    const reset = () => {
      el.style.transform = 'translate3d(0,0,0)'
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', reset)

    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', reset)
    }
  }, [strength])

  return (
    <Tag ref={ref} className={'inline-block will-change-transform ' + (className || '')}>
      {children}
    </Tag>
  )
}
