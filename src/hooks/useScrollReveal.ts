import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { isPrefersReducedMotion } from '@/lib/capabilities'

type Options = {
  y?: number
  opacity?: boolean
  delay?: number
  stagger?: number
  start?: string
  once?: boolean
}

/**
 * Reveals children with [data-reveal] (or the element itself) when scrolled into view.
 * Content already on screen animates immediately so a section is never left blank.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(options: Options = {}) {
  const ref = useRef<T | null>(null)
  const { y = 40, opacity = true, delay = 0, stagger = 0.08, start = 'top 88%', once = true } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const targets = Array.from(el.querySelectorAll<HTMLElement>('[data-reveal]'))
    const items = targets.length ? targets : [el]

    if (isPrefersReducedMotion()) {
      gsap.set(items, { clearProps: 'all' })
      return
    }

    const from = { y, ...(opacity ? { opacity: 0 } : {}) }
    const to = { y: 0, ...(opacity ? { opacity: 1 } : {}), duration: 1, ease: 'expo.out', delay, stagger }

    const rect = el.getBoundingClientRect()
    const onScreen = rect.top < window.innerHeight * 0.92 && rect.bottom > 0

    if (onScreen) {
      const tween = gsap.fromTo(items, from, to)
      return () => {
        tween.kill()
        gsap.set(items, { clearProps: 'all' })
      }
    }

    gsap.set(items, from)
    const tween = gsap.to(items, {
      ...to,
      scrollTrigger: { trigger: el, start, once },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [y, opacity, delay, stagger, start, once])

  return ref
}

export function useScrollRefresh(deps: unknown[] = []) {
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
    // eslint-disable-next-line
  }, deps)
}
