export function isPrefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function isFinePointer() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

export function isMobileViewport() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(max-width: 767px)').matches
}

export function isTabletViewport() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(max-width: 1023px)').matches
}

/** WebGL is only worth it on capable desktop hardware. */
export function supportsWebGL() {
  if (typeof window === 'undefined') return false
  if (isPrefersReducedMotion() || isMobileViewport()) return false
  if (navigator.deviceMemory && navigator.deviceMemory < 4) return false
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) return false
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

declare global {
  interface Navigator {
    deviceMemory?: number
  }
}
