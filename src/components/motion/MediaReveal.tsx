import { useLayoutEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { isPrefersReducedMotion } from '@/lib/capabilities'
import { cn } from '@/lib/utils'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
}

/** Clip reveal + inner scale settle. Plays on scroll, or immediately when already on screen. */
export function MediaReveal({ children, className, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (isPrefersReducedMotion()) return
    const inner = el.querySelector('[data-media-inner]') as HTMLElement | null

    gsap.set(el, { clipPath: 'inset(0 0 100% 0)' })
    if (inner) gsap.set(inner, { scale: 1.14 })

    const tl = gsap.timeline({ paused: true, delay })
    tl.to(el, { clipPath: 'inset(0 0 0% 0)', duration: 1.2, ease: 'expo.out' })
    if (inner) tl.to(inner, { scale: 1, duration: 1.5, ease: 'expo.out' }, '<0.06')

    const rect = el.getBoundingClientRect()
    const onScreen = rect.top < window.innerHeight * 0.95 && rect.bottom > 0

    if (onScreen) {
      tl.play()
      return () => {
        tl.kill()
        gsap.set(el, { clearProps: 'clipPath' })
      }
    }

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => tl.play(),
    })

    return () => {
      st.kill()
      tl.kill()
    }
  }, [delay])

  return (
    <div ref={ref} className={cn('relative overflow-hidden rounded-md', className)}>
      <div data-media-inner className="h-full w-full">
        {children}
      </div>
    </div>
  )
}
