import { useEffect, useRef } from 'react'
import { isFinePointer, isPrefersReducedMotion } from '@/lib/capabilities'

export type GyroscopeCursorProps = {
  /** Fill of the arrowhead, its name tag and its click ripple. */
  color?: string
  /** Sticker outline around the arrowhead, and the text colour of its name tag. */
  outlineColor?: string
  /** Length of the arrowhead from tip to wings, in px. The tip is the exact click point. */
  size?: number
  outlineWidth?: number
  /** Soft drop shadow strength, 0–1. Keeps the arrow legible on light pages. */
  shadow?: number
  /** How far the arrowhead turns into its direction of travel, 0 (static) to 1. */
  turn?: number
  /** Stiffness of the gyroscopic spring that turns the arrowhead. */
  turnSpeed?: number
  /** How far the arrowhead swings past its heading before settling, 0–1. */
  overshoot?: number
  /** Squash and stretch along the direction of travel at speed, 0–1. */
  stretch?: number
  /** Seconds the arrowhead holds its heading after you slow down before returning to rest. */
  settle?: number
  /** Heading at rest, degrees clockwise from pointing straight up. -45 is the classic pointer. */
  restAngle?: number
  /** Dip the arrowhead while a button is held. */
  press?: boolean
  /** Send a thin ring out from the tip on each click. */
  ripple?: boolean
  /** Grow slightly over links, buttons and other interactive elements. */
  hover?: boolean
  /** Name tag trailing the cursor. Empty hides it. */
  label?: string
  disabled?: boolean
}

const INTERACTIVE = 'a, button, [role="button"], summary, label, [data-cursor-label]'
const NATIVE = 'input, textarea, [contenteditable="true"], [data-cursor="native"]'
/** px per frame at which the arrowhead is considered fully "at speed" */
const MAX_SPEED = 26
/** px per frame below which the pointer counts as still */
const MOVE_THRESHOLD = 0.4

const toRad = (deg: number) => (deg * Math.PI) / 180

function shortestDelta(from: number, to: number) {
  let d = (to - from) % (Math.PI * 2)
  if (d > Math.PI) d -= Math.PI * 2
  if (d < -Math.PI) d += Math.PI * 2
  return d
}

/**
 * A sticker-style arrowhead cursor that gyroscopically turns toward the direction it moves,
 * swinging past its heading before it settles and back to its rest angle when you stop.
 */
export function GyroscopeCursor({
  color = '#c1542a',
  outlineColor = '#f7f2e8',
  size = 24,
  outlineWidth = 3,
  shadow = 0.5,
  turn = 1,
  turnSpeed = 1,
  overshoot = 0.4,
  stretch = 0.4,
  settle = 0.45,
  restAngle = -45,
  press = true,
  ripple = true,
  hover = true,
  label = '',
  disabled = false,
}: GyroscopeCursorProps) {
  const arrowRef = useRef<HTMLDivElement | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)
  const tagRef = useRef<HTMLDivElement | null>(null)
  const layerRef = useRef<HTMLDivElement | null>(null)

  const active = !disabled && isFinePointer() && !isPrefersReducedMotion()

  // Arrowhead geometry — drawn pointing straight up with its tip at the origin,
  // then padded so the sticker outline is never clipped.
  const wing = size / 3
  const notchY = size * 0.708
  const padX = wing + outlineWidth / 2
  const padY = outlineWidth / 2
  const boxW = padX * 2
  const boxH = size + outlineWidth
  const path = `M 0 0 L ${-wing} ${size} L 0 ${notchY} L ${wing} ${size} Z`

  useEffect(() => {
    if (!active) return
    const arrow = arrowRef.current
    const svg = svgRef.current
    const layer = layerRef.current
    if (!arrow || !svg || !layer) return

    const rootEl = document.documentElement
    rootEl.dataset.customCursor = 'true'

    let raf = 0
    let last = performance.now()
    let tipX = 0
    let tipY = 0
    let prevX = 0
    let prevY = 0
    let visible = false
    let pressed = false
    let overNative = false
    let overInteractive = false
    let tag = label
    let angle = toRad(restAngle)
    let angVelocity = 0
    let lastHeading = toRad(restAngle)
    let lastMoveAt = 0

    const stiffness = 200 * Math.max(0.25, turnSpeed)
    const damping = 2 * Math.sqrt(stiffness) * Math.max(0.2, 0.92 - 0.55 * overshoot)
    const restRad = toRad(restAngle)
    const turnAmount = Math.min(1, Math.max(0, turn))

    const spawnRipple = (x: number, y: number) => {
      if (!ripple) return
      const ring = document.createElement('span')
      ring.className = 'gyro-ripple'
      ring.style.left = `${x}px`
      ring.style.top = `${y}px`
      ring.style.borderColor = color
      ring.addEventListener('animationend', () => ring.remove())
      layer.appendChild(ring)
    }

    const onPointerMove = (e: PointerEvent) => {
      tipX = e.clientX
      tipY = e.clientY
      if (!visible) {
        visible = true
        prevX = tipX
        prevY = tipY
      }
    }

    const onPointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null
      if (!target || typeof target.closest !== 'function') return
      overNative = Boolean(target.closest(NATIVE))
      overInteractive = !overNative && Boolean(target.closest(INTERACTIVE))
      const labelled = overNative
        ? null
        : (target.closest('[data-cursor-label]') as HTMLElement | null)
      tag = labelled?.dataset.cursorLabel || label
    }

    const onPointerDown = () => {
      pressed = true
      if (visible && !overNative) spawnRipple(tipX, tipY)
    }
    const onPointerUp = () => {
      pressed = false
    }
    const onLeave = () => {
      visible = false
      pressed = false
    }

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000))
      last = now

      const dx = tipX - prevX
      const dy = tipY - prevY
      const speed = Math.hypot(dx, dy)
      prevX = tipX
      prevY = tipY

      const moving = speed > MOVE_THRESHOLD
      if (moving) {
        // atan2 gives the travel bearing; the arrowhead is authored pointing up (+90°).
        lastHeading = Math.atan2(dy, dx) + Math.PI / 2
        lastMoveAt = now
      }

      const settled = now - lastMoveAt > settle * 1000
      const heading = moving || !settled ? lastHeading : restRad
      const target = settled ? restRad : restRad + shortestDelta(restRad, heading) * turnAmount

      angVelocity += (shortestDelta(angle, target) * stiffness - angVelocity * damping) * dt
      angle += angVelocity * dt

      const speedNorm = Math.min(1, speed / MAX_SPEED)
      const stretchAmount = 1 + stretch * speedNorm * 0.35
      const scale = (overInteractive && hover ? 1.16 : 1) * (pressed && press ? 0.86 : 1)

      arrow.style.transform = `translate3d(${tipX - padX}px, ${tipY - padY}px, 0)`
      svg.style.transform = `rotate(${angle}rad) scale(${stretchAmount * scale}, ${(1 / stretchAmount) * scale})`

      const show = visible && !overNative
      arrow.style.opacity = show ? '1' : '0'
      if (tagRef.current) {
        if (tag !== tagRef.current.textContent) tagRef.current.textContent = tag
        tagRef.current.style.opacity = show && tag ? '1' : '0'
      }
    }

    raf = requestAnimationFrame(frame)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerover', onPointerOver, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    window.addEventListener('pointerup', onPointerUp, { passive: true })
    window.addEventListener('pointercancel', onPointerUp, { passive: true })
    rootEl.addEventListener('mouseleave', onLeave)
    rootEl.addEventListener('mouseenter', onPointerMove as EventListener)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerover', onPointerOver)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
      rootEl.removeEventListener('mouseleave', onLeave)
      rootEl.removeEventListener('mouseenter', onPointerMove as EventListener)
      layer.querySelectorAll('.gyro-ripple').forEach((el) => el.remove())
      delete rootEl.dataset.customCursor
    }
  }, [
    active,
    color,
    label,
    overshoot,
    padX,
    padY,
    press,
    restAngle,
    ripple,
    settle,
    stretch,
    turn,
    turnSpeed,
    hover,
  ])

  if (!active) return null

  return (
    <div ref={layerRef} className="pointer-events-none fixed inset-0 z-[100]" aria-hidden="true">
      <div
        ref={arrowRef}
        className="gyro-arrow"
        style={{
          filter: `drop-shadow(0 ${size * 0.22}px ${size * 0.38}px rgba(33, 26, 20, ${0.45 * shadow}))`,
        }}
      >
        <svg
          ref={svgRef}
          className="gyro-arrow__svg"
          width={boxW}
          height={boxH}
          viewBox={`${-padX} ${-padY} ${boxW} ${boxH}`}
          style={{ transformOrigin: `${padX}px ${padY}px` }}
        >
          <path
            d={path}
            fill={color}
            stroke={outlineColor}
            strokeWidth={outlineWidth}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
        <div
          ref={tagRef}
          className="gyro-tag"
          style={{
            left: padX + 14,
            top: padY + size * 0.5,
            background: color,
            color: outlineColor,
          }}
        />
      </div>
    </div>
  )
}
