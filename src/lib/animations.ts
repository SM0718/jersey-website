import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

export function registerGSAP() {
  if (registered) return
  gsap.registerPlugin(ScrollTrigger)
  registered = true
}

registerGSAP()

export const EASE = {
  editorial: 'expo.out',
  snap: 'power4.inOut',
  settle: 'back.out(1.4)',
  soft: 'power3.out',
} as const

export type TweenTarget = gsap.TweenTarget

/** Words wrapped in mask spans, revealed from below. */
export function revealText(target: TweenTarget, options?: gsap.TweenVars) {
  const chars = gsap.utils.toArray<HTMLElement>('[data-reveal-char]', target as HTMLElement)
  const charsOrWords = chars.length ? chars : gsap.utils.toArray<HTMLElement>('[data-reveal-word]', target as HTMLElement)
  if (!charsOrWords.length) {
    return gsap.fromTo(target, { yPercent: 110 }, { yPercent: 0, duration: 1, ease: EASE.editorial, ...options })
  }
  return gsap.fromTo(
    charsOrWords,
    { yPercent: 115, rotate: 2 },
    { yPercent: 0, rotate: 0, duration: 1.05, ease: EASE.editorial, stagger: 0.035, ...options },
  )
}

/** Generic scroll-in for editorial blocks. */
export function fadeUp(target: TweenTarget, options?: gsap.TweenVars) {
  return gsap.fromTo(
    target,
    { y: 44, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: EASE.editorial, ...options },
  )
}

/** Image clip reveal + inner scale settle. */
export function imageReveal(target: HTMLElement, options?: gsap.TweenVars) {
  const inner = target.querySelector('[data-media-inner]') ?? target
  const tl = gsap.timeline()
  tl.fromTo(target, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: EASE.snap })
  tl.fromTo(inner, { scale: 1.18 }, { scale: 1, duration: 1.4, ease: EASE.editorial }, 0)
  if (options) tl.totalDuration(tl.duration())
  return tl
}

/** Vertical parallax tied to scroll. */
export function parallax(target: HTMLElement, amount = 12, trigger?: Element) {
  return gsap.fromTo(
    target,
    { yPercent: -amount },
    {
      yPercent: amount,
      ease: 'none',
      scrollTrigger: {
        trigger: trigger ?? target,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    },
  )
}

/** Moves a wide track horizontally while the section is pinned/scrubbed. */
export function horizontalDrift(track: HTMLElement, distance: number, trigger?: Element) {
  return gsap.fromTo(
    track,
    { x: 0 },
    {
      x: -distance,
      ease: 'none',
      scrollTrigger: {
        trigger: trigger ?? track,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.6,
      },
    },
  )
}

/** Pin + horizontal scroll of a rail (used for collection storytelling). */
export function pinnedHorizontal(section: HTMLElement, track: HTMLElement, options?: { padding?: number }) {
  const padding = options?.padding ?? 0
  const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth + padding)
  return gsap.to(track, {
    x: () => -getDistance(),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${getDistance() + window.innerHeight * 0.4}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    },
  })
}

export function marqueeDuration(el: HTMLElement) {
  const width = el.scrollWidth / 2
  return Math.max(18, width / 55)
}

export { gsap, ScrollTrigger }
