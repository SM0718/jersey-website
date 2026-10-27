import { useId } from 'react'
import { cn } from '@/lib/utils'
import type { Garment } from '@/lib/constants'

export type Colorway = {
  base: string
  secondary: string
  accent: string
  ink: string
}

export type JerseyPattern = 'plain' | 'stripes' | 'hoops' | 'halves' | 'sash' | 'panels' | 'blades'

export type JerseyView = 'front' | 'back' | 'detail' | 'fabric'

type Props = {
  colorway: Colorway
  pattern?: JerseyPattern
  view?: JerseyView
  garment?: Garment
  name?: string
  number?: string
  club?: string
  className?: string
  sponsor?: string
  /** changes the collar treatment on shirt garments */
  collar?: 'round' | 'v'
}

const SHIRT_PATH = [
  'M 252 86',
  'C 216 78 178 88 150 106',
  'C 118 126 92 146 74 172',
  'C 58 200 52 236 54 274',
  'C 90 306 122 320 152 326',
  'C 162 330 165 336 164 348',
  'C 158 430 150 530 146 650',
  'C 216 666 384 666 454 650',
  'C 450 530 442 430 436 348',
  'C 435 336 438 330 448 326',
  'C 478 320 510 306 546 274',
  'C 548 236 542 200 526 172',
  'C 508 146 482 126 450 106',
  'C 422 88 384 78 348 86',
  'C 332 98 328 112 324 126',
  'C 316 142 284 142 276 126',
  'C 272 112 268 98 252 86',
  'Z',
].join(' ')

/** Sleeveless basketball cut — narrower shoulders, deep armholes. */
const TANK_PATH = [
  'M 238 92',
  'C 214 98 196 112 184 132',
  'C 166 162 156 202 158 240',
  'C 160 276 178 302 206 316',
  'C 218 321 222 330 220 346',
  'C 214 446 208 560 204 658',
  'C 262 672 338 672 396 658',
  'C 392 560 386 446 380 346',
  'C 378 330 382 321 394 316',
  'C 422 302 440 276 442 240',
  'C 444 202 434 162 416 132',
  'C 404 112 386 98 362 92',
  'C 348 118 336 132 300 132',
  'C 264 132 252 118 238 92',
  'Z',
].join(' ')

const COLLAR_PATH =
  'M 252 86 C 268 98 272 112 276 126 C 284 142 316 142 324 126 C 328 112 332 98 348 86'

const COLLAR_V_PATH = 'M 252 86 L 300 152 L 348 86'

const TANK_NECK_PATH = 'M 238 92 C 252 118 264 132 300 132 C 336 132 348 118 362 92'

const TANK_ARM_LEFT =
  'M 238 92 C 214 98 196 112 184 132 C 166 162 156 202 158 240 C 160 276 178 302 206 316'

const TANK_ARM_RIGHT =
  'M 362 92 C 386 98 404 112 416 132 C 434 162 444 202 442 240 C 440 276 422 302 394 316'

const CUFF_LEFT = '54,274 152,326 152,300 54,248'
const CUFF_RIGHT = '546,274 448,326 448,300 546,248'

function patternLayers(pattern: JerseyPattern, colorway: Colorway) {
  const { secondary } = colorway
  switch (pattern) {
    case 'stripes':
      return Array.from({ length: 9 }, (_, i) => (
        <rect key={i} x={64 + i * 54} y={40} width={26} height={660} fill={secondary} />
      ))
    case 'hoops':
      return Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={40} y={70 + i * 78} width={520} height={38} fill={secondary} />
      ))
    case 'halves':
      return <rect x={300} y={40} width={300} height={660} fill={secondary} />
    case 'sash':
      return <polygon points="101,102 179,58 509,638 431,682" fill={secondary} />
    case 'panels':
      return (
        <>
          <rect x={140} y={40} width={62} height={660} fill={secondary} />
          <rect x={398} y={40} width={62} height={660} fill={secondary} />
        </>
      )
    case 'blades':
      return Array.from({ length: 7 }, (_, i) => (
        <polygon key={i} points={`${60 + i * 76},40 ${96 + i * 76},40 ${34 + i * 76},700 ${-2 + i * 76},700`} fill={secondary} />
      ))
    case 'plain':
    default:
      return null
  }
}

function Badge({ x, y, colorway }: { x: number; y: number; colorway: Colorway }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d="M 0 0 H 46 V 32 C 46 50 23 62 23 62 C 23 62 0 50 0 32 Z"
        fill={colorway.accent}
        stroke={colorway.ink}
        strokeWidth="2"
      />
      <path d="M 10 12 H 36 M 10 22 H 36" stroke={colorway.ink} strokeWidth="3" opacity="0.75" />
      <circle cx="23" cy="40" r="7" fill={colorway.ink} opacity="0.85" />
    </g>
  )
}

function BrandMark({ x, y, colorway }: { x: number; y: number; colorway: Colorway }) {
  return (
    <g transform={`translate(${x} ${y})`} fill={colorway.ink} opacity="0.9">
      <polygon points="0,26 8,0 15,3 7,29" />
      <polygon points="11,26 19,0 26,3 18,29" />
      <polygon points="22,26 30,0 37,3 29,29" />
    </g>
  )
}

export function JerseySvg({
  colorway,
  pattern = 'plain',
  view = 'front',
  garment = 'shirt',
  name,
  number,
  club,
  className,
  sponsor = 'AERO',
  collar = 'round',
}: Props) {
  const uid = useId().replace(/:/g, '')
  const clipId = `shirt-clip-${uid}`
  const shadeId = `shirt-shade-${uid}`
  const knitId = `knit-${uid}`

  const viewBox =
    view === 'detail'
      ? '140 55 320 300'
      : view === 'fabric'
        ? '0 0 600 480'
        : '0 0 600 720'

  if (view === 'fabric') {
    return (
      <svg viewBox={viewBox} className={cn('h-full w-full', className)} role="img" aria-label={`${club ?? ''} fabric detail`}>
        <defs>
          <pattern id={knitId} width="26" height="26" patternUnits="userSpaceOnUse">
            <rect width="26" height="26" fill={colorway.base} />
            <path d="M 0 13 Q 6.5 0 13 13 Q 19.5 26 26 13" fill="none" stroke={colorway.secondary} strokeWidth="5" opacity="0.75" />
            <path d="M 0 26 Q 6.5 13 13 26" fill="none" stroke="#000" strokeWidth="1.5" opacity="0.14" />
          </pattern>
          <linearGradient id={`fab-shade-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#000" stopOpacity="0.28" />
            <stop offset="45%" stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.34" />
          </linearGradient>
        </defs>
        <rect width="600" height="480" fill={`url(#${knitId})`} />
        <rect width="600" height="480" fill={`url(#fab-shade-${uid})`} />
        <path d="M -20 350 C 160 300 420 400 640 330" fill="none" stroke={colorway.ink} strokeWidth="3" opacity="0.55" />
        <path
          d="M -20 356 C 160 306 420 406 640 336"
          fill="none"
          stroke={colorway.accent}
          strokeWidth="6"
          strokeDasharray="14 12"
          opacity="0.9"
        />
        <rect x="380" y="60" width="150" height="70" fill={colorway.ink} opacity="0.88" />
        <text
          x="455"
          y="103"
          textAnchor="middle"
          fill={colorway.base}
          fontFamily="Archivo, sans-serif"
          fontSize="24"
          fontWeight="700"
          letterSpacing="4"
        >
          {sponsor}
        </text>
      </svg>
    )
  }

  const isBack = view === 'back'
  const isTank = garment === 'tank'
  const isPolo = garment === 'polo'
  const bodyPath = isTank ? TANK_PATH : SHIRT_PATH
  const collarPath = isTank ? TANK_NECK_PATH : collar === 'v' ? COLLAR_V_PATH : COLLAR_PATH

  return (
    <svg
      viewBox={viewBox}
      className={cn('h-full w-full', className)}
      role="img"
      aria-label={`${club ?? 'Football'} jersey — ${view} view`}
    >
      <defs>
        <clipPath id={clipId}>
          <path d={bodyPath} />
        </clipPath>
        <linearGradient id={shadeId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#000" stopOpacity="0.34" />
          <stop offset="14%" stopColor="#000" stopOpacity="0.05" />
          <stop offset="42%" stopColor="#fff" stopOpacity="0.1" />
          <stop offset="72%" stopColor="#000" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.36" />
        </linearGradient>
        <linearGradient id={`hem-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.22" />
        </linearGradient>
      </defs>

      {/* silhouette */}
      <path d={bodyPath} fill={colorway.base} />

      <g clipPath={`url(#${clipId})`}>
        {patternLayers(pattern, colorway)}

        {/* knit micro texture */}
        <path
          d={bodyPath}
          fill="none"
          stroke={colorway.ink}
          strokeWidth="1"
          opacity="0.08"
          strokeDasharray="3 5"
          transform="translate(0 18)"
        />

        {/* volume shading */}
        <rect x="0" y="0" width="600" height="700" fill={`url(#${shadeId})`} />
        <rect x="0" y="540" width="600" height="160" fill={`url(#hem-${uid})`} />

        {/* seams */}
        <path d="M 300 150 L 300 660" stroke={colorway.ink} strokeWidth="1.5" opacity="0.16" />

        {isTank ? (
          <>
            <path d={TANK_ARM_LEFT} fill="none" stroke={colorway.accent} strokeWidth="11" opacity="0.95" />
            <path d={TANK_ARM_RIGHT} fill="none" stroke={colorway.accent} strokeWidth="11" opacity="0.95" />
          </>
        ) : (
          <>
            <path d="M 164 348 C 220 372 380 372 436 348" stroke={colorway.ink} strokeWidth="2" opacity="0.2" fill="none" />
            <polygon points={CUFF_LEFT} fill={colorway.accent} opacity="0.95" />
            <polygon points={CUFF_RIGHT} fill={colorway.accent} opacity="0.95" />
          </>
        )}
      </g>

      {/* collar */}
      <path
        d={collarPath}
        fill="none"
        stroke={colorway.secondary === colorway.base ? colorway.accent : colorway.secondary}
        strokeWidth={isTank ? 13 : 17}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d={collarPath} fill="none" stroke={colorway.ink} strokeWidth="1.5" opacity="0.35" />

      {/* polo placket */}
      {isPolo && (
        <g>
          <rect
            x={288}
            y={132}
            width={24}
            height={96}
            rx={3}
            fill={colorway.base}
            stroke={colorway.ink}
            strokeWidth="1.5"
            opacity="0.96"
          />
          <circle cx={300} cy={156} r={4.5} fill={colorway.ink} opacity="0.6" />
          <circle cx={300} cy={192} r={4.5} fill={colorway.ink} opacity="0.6" />
        </g>
      )}

      {/* hardware / identity */}
      {!isBack && (
        <>
          <Badge x={isTank ? 214 : 202} y={188} colorway={colorway} />
          <BrandMark x={isTank ? 340 : 352} y={192} colorway={colorway} />
          <text
            x="300"
            y="330"
            textAnchor="middle"
            fill={colorway.ink}
            fontFamily="Archivo, sans-serif"
            fontSize="34"
            fontWeight="700"
            letterSpacing="5"
            opacity="0.92"
          >
            {sponsor}
          </text>
          <text
            x="300"
            y="640"
            textAnchor="middle"
            fill={colorway.ink}
            fontFamily="Archivo, sans-serif"
            fontSize="13"
            fontWeight="600"
            letterSpacing="4"
            opacity="0.5"
          >
            {club?.toUpperCase()}
          </text>
        </>
      )}

      {isBack && (
        <>
          <text
            x="300"
            y="232"
            textAnchor="middle"
            fill={colorway.ink}
            fontFamily="Archivo, sans-serif"
            fontSize="30"
            fontWeight="700"
            letterSpacing="7"
          >
            {(name ?? club ?? '').toUpperCase()}
          </text>
          <text
            x="300"
            y="520"
            textAnchor="middle"
            fill={colorway.accent}
            stroke={colorway.ink}
            strokeWidth="4"
            paintOrder="stroke"
            fontFamily="Anton, sans-serif"
            fontSize="260"
            letterSpacing="-4"
          >
            {number ?? '10'}
          </text>
          <path d="M 190 258 H 410" stroke={colorway.ink} strokeWidth="2" opacity="0.35" />
        </>
      )}
    </svg>
  )
}
