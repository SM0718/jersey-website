import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { isPrefersReducedMotion } from '@/lib/capabilities'

export function useLenis() {
  useEffect(() => {
    if (isPrefersReducedMotion()) {
      return
    }

    const lenis: any = new (Lenis as any)({
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    lenis.on('scroll', () => {
      ScrollTrigger.update()
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])
}
