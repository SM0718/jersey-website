import { useId } from 'react'
import { cn } from '@/lib/utils'

export type SceneVariant =
  | 'stadium'
  | 'crowd'
  | 'floodlights'
  | 'pitch'
  | 'fabric'
  | 'ball'
  | 'silhouette'
  | 'archive'

export type ScenePalette = {
  bg: string
  mid: string
  accent: string
  light: string
}

const DEFAULT_PALETTES: Record<SceneVariant, ScenePalette> = {
  stadium: { bg: '#241b15', mid: '#3a2c22', accent: '#c1542a', light: '#f7f2e8' },
  crowd: { bg: '#2a211b', mid: '#4a3a2e', accent: '#c1542a', light: '#f7f2e8' },
  floodlights: { bg: '#241c17', mid: '#3c2f24', accent: '#c9ae6e', light: '#fff3d8' },
  pitch: { bg: '#22392a', mid: '#31543a', accent: '#f7f2e8', light: '#dfe8d5' },
  fabric: { bg: '#3a2c22', mid: '#5a4433', accent: '#c1542a', light: '#f0e6d4' },
  ball: { bg: '#241b15', mid: '#3a2c22', accent: '#f7f2e8', light: '#ffffff' },
  silhouette: { bg: '#211a14', mid: '#3a2c22', accent: '#c1542a', light: '#f7f2e8' },
  archive: { bg: '#ecdfc8', mid: '#d3bf9c', accent: '#b8451f', light: '#f9f4ea' },
}

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Oversized pictogram footballer — used at editorial scale. */
function PlayerFigure({ color, className }: { color: string; className?: string }) {
  return (
    <g className={className} stroke={color} strokeWidth="34" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <circle cx="96" cy="42" r="30" fill={color} stroke="none" />
      <path d="M 96 76 L 80 170" strokeWidth="42" />
      <path d="M 92 92 L 142 114 L 160 68" />
      <path d="M 92 92 L 46 122 L 26 84" />
      <path d="M 80 170 L 126 220 L 122 286" />
      <path d="M 80 170 L 36 224 L 8 272" />
      <path d="M 122 286 L 154 292" strokeWidth="26" />
      <path d="M 8 272 L -18 280" strokeWidth="26" />
      <circle cx="196" cy="284" r="36" strokeWidth="8" />
      <path d="M 176 262 L 216 262 M 196 248 L 196 320 M 172 300 L 222 268" strokeWidth="5" opacity="0.7" />
    </g>
  )
}

function CrowdFigures({ palette, rows }: { palette: ScenePalette; rows: number }) {
  const rand = mulberry32(7411)
  const figures: React.ReactNode[] = []
  for (let row = 0; row < rows; row++) {
    const y = 180 + row * (640 / rows)
    const scale = 0.55 + (row / rows) * 0.9
    const count = Math.ceil(18 / scale)
    for (let i = 0; i < count; i++) {
      const jitter = (rand() - 0.5) * 30
      const x = (i + (row % 2) * 0.5) * (1700 / count) - 40 + jitter
      const tone = rand()
      const color = tone > 0.93 ? palette.accent : tone > 0.55 ? palette.mid : palette.bg
      const raised = rand() > 0.86
      figures.push(
        <g key={`${row}-${i}`} transform={`translate(${x} ${y + jitter * 0.4}) scale(${scale})`}>
          <circle cx="0" cy="0" r="24" fill={color} />
          <path d="M -52 96 C -50 40 -26 22 0 22 C 26 22 50 40 52 96 Z" fill={color} />
          {raised && <rect x="-6" y="-72" width="12" height="66" fill={color} />}
        </g>,
      )
    }
  }
  return <>{figures}</>
}

type Props = {
  variant: SceneVariant
  palette?: Partial<ScenePalette>
  className?: string
  /** decorative scenes stay out of the accessibility tree */
  decorative?: boolean
  label?: string
}

export function SceneArt({ variant, palette: paletteOverride, className, decorative = true, label }: Props) {
  const uid = useId().replace(/:/g, '')
  const palette: ScenePalette = { ...DEFAULT_PALETTES[variant], ...paletteOverride }
  const grainId = `grain-${uid}`
  const vignetteId = `vig-${uid}`
  const rand = mulberry32(variant.length * 917 + 13)

  return (
    <svg
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      className={cn('h-full w-full', className)}
      role={decorative ? 'presentation' : 'img'}
      aria-label={decorative ? undefined : label ?? variant}
      aria-hidden={decorative ? true : undefined}
    >
      <defs>
        <filter id={grainId}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <radialGradient id={vignetteId} cx="50%" cy="45%" r="75%">
          <stop offset="55%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.55" />
        </radialGradient>
        <linearGradient id={`beam-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.light} stopOpacity="0.35" />
          <stop offset="100%" stopColor={palette.light} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`lamp-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.light} stopOpacity="0.95" />
          <stop offset="100%" stopColor={palette.light} stopOpacity="0.05" />
        </linearGradient>
        <pattern id={`crowd-dots-${uid}`} width="26" height="20" patternUnits="userSpaceOnUse">
          <rect width="26" height="20" fill={palette.bg} />
          <circle cx="7" cy="7" r="4.5" fill={palette.mid} />
          <circle cx="20" cy="15" r="4.5" fill={palette.mid} opacity="0.75" />
        </pattern>
        <pattern id={`weave-${uid}`} width="44" height="44" patternUnits="userSpaceOnUse">
          <rect width="44" height="44" fill={palette.bg} />
          <path d="M 0 22 Q 11 4 22 22 Q 33 40 44 22" fill="none" stroke={palette.mid} strokeWidth="9" />
          <path d="M 0 44 Q 11 26 22 44" fill="none" stroke="#000" strokeWidth="3" opacity="0.25" />
        </pattern>
        <pattern id={`halftone-${uid}`} width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="9" cy="9" r="5.5" fill={palette.bg} />
        </pattern>
        <clipPath id={`ball-clip-${uid}`}>
          <circle cx="1040" cy="560" r="330" />
        </clipPath>
        <clipPath id={`archive-clip-${uid}`}>
          <rect x="140" y="140" width="640" height="640" />
        </clipPath>
      </defs>

      <rect width="1600" height="1000" fill={palette.bg} />

      {variant === 'stadium' && (
        <g>
          {/* flood beams */}
          <polygon points="180,0 420,0 760,760 340,760" fill={`url(#beam-${uid})`} opacity="0.5" />
          <polygon points="1180,0 1420,0 1260,760 840,760" fill={`url(#beam-${uid})`} opacity="0.4" />
          {/* tiers */}
          <rect y="300" width="1600" height="130" fill={`url(#crowd-dots-${uid})`} />
          <rect y="436" width="1600" height="130" fill={`url(#crowd-dots-${uid})`} opacity="0.92" />
          <rect y="572" width="1600" height="120" fill={`url(#crowd-dots-${uid})`} opacity="0.86" />
          <rect y="428" width="1600" height="10" fill="#000" opacity="0.6" />
          <rect y="564" width="1600" height="10" fill="#000" opacity="0.6" />
          <rect y="690" width="1600" height="16" fill="#000" opacity="0.55" />
          {/* scattered flags / accent crowd */}
          {Array.from({ length: 42 }, (_, i) => (
            <rect
              key={i}
              x={rand() * 1560}
              y={310 + rand() * 370}
              width={rand() > 0.5 ? 16 : 9}
              height={rand() > 0.5 ? 26 : 14}
              fill={rand() > 0.6 ? palette.accent : palette.light}
              opacity={0.75}
            />
          ))}
          {/* pitch */}
          <rect y="706" width="1600" height="294" fill={palette.mid} />
          {Array.from({ length: 10 }, (_, i) => (
            <rect key={i} x={i * 160} y="706" width="80" height="294" fill={palette.bg} opacity="0.35" />
          ))}
          <path d="M 0 840 H 1600" stroke={palette.light} strokeWidth="3" opacity="0.5" />
          <g transform="translate(430 748) scale(0.42)" opacity="0.92">
            <PlayerFigure color={palette.bg} />
          </g>
          <g transform="translate(1120 776) scale(0.36)" opacity="0.85">
            <PlayerFigure color={palette.accent} />
          </g>
        </g>
      )}

      {variant === 'crowd' && (
        <g>
          <rect width="1600" height="1000" fill={palette.bg} />
          <CrowdFigures palette={palette} rows={7} />
          <rect y="0" width="1600" height="120" fill={palette.bg} opacity="0.7" />
        </g>
      )}

      {variant === 'floodlights' && (
        <g>
          <rect width="1600" height="1000" fill={palette.bg} />
          {/* truss */}
          <g stroke={palette.mid} strokeWidth="10" fill="none">
            <path d="M 0 240 H 1600 M 0 340 H 1600" />
            {Array.from({ length: 26 }, (_, i) => (
              <path key={i} d={`M ${i * 64} 240 L ${i * 64 + 64} 340 M ${i * 64} 340 L ${i * 64 + 64} 240`} strokeWidth="5" />
            ))}
          </g>
          {/* lamps */}
          {Array.from({ length: 5 }, (_, i) => (
            <g key={i} transform={`translate(${140 + i * 300} 350)`}>
              <rect width="180" height="120" fill={palette.light} opacity="0.95" />
              <rect width="180" height="120" fill="none" stroke={palette.bg} strokeWidth="8" />
              <polygon points="0,120 180,120 300,640 -120,640" fill={`url(#lamp-${uid})`} opacity="0.35" />
            </g>
          ))}
          <rect y="640" width="1600" height="360" fill={palette.bg} />
          <rect y="636" width="1600" height="8" fill={palette.accent} opacity="0.7" />
        </g>
      )}

      {variant === 'pitch' && (
        <g>
          <rect width="1600" height="1000" fill={palette.bg} />
          {Array.from({ length: 8 }, (_, i) => (
            <rect key={i} x={i * 200} width="100" height="1000" fill={palette.mid} />
          ))}
          <g stroke={palette.light} strokeWidth="6" fill="none" opacity="0.85">
            <path d="M 800 0 V 1000" />
            <circle cx="800" cy="500" r="210" />
            <path d="M 0 120 H 1600 M 0 880 H 1600" strokeWidth="4" />
            <circle cx="800" cy="500" r="10" fill={palette.light} />
            <path d="M 0 500 m 130 -130 a 130 130 0 0 0 0 260" strokeWidth="4" />
            <path d="M 1600 500 m -130 -130 a 130 130 0 0 1 0 260" strokeWidth="4" />
          </g>
        </g>
      )}

      {variant === 'fabric' && (
        <g>
          <rect width="1600" height="1000" fill={`url(#weave-${uid})`} />
          <path d="M -40 760 C 420 660 1080 880 1660 700" fill="none" stroke="#000" strokeWidth="6" opacity="0.4" />
          <path d="M -40 776 C 420 676 1080 896 1660 716" fill="none" stroke={palette.accent} strokeWidth="10" strokeDasharray="26 20" />
          <rect x="1120" y="120" width="320" height="140" fill={palette.bg} opacity="0.95" />
          <rect x="1148" y="152" width="264" height="8" fill={palette.light} opacity="0.8" />
          <rect x="1148" y="182" width="180" height="8" fill={palette.light} opacity="0.55" />
          <rect x="1148" y="212" width="220" height="8" fill={palette.light} opacity="0.35" />
          <rect width="1600" height="1000" fill={`url(#${vignetteId})`} />
        </g>
      )}

      {variant === 'ball' && (
        <g>
          <rect width="1600" height="1000" fill={palette.bg} />
          <g clipPath={`url(#ball-clip-${uid})`}>
            <rect x="710" y="230" width="660" height="660" fill={palette.light} />
            <polygon points="1040,400 1150,480 1108,610 972,610 930,480" fill={palette.bg} />
            <polygon points="1040,250 1130,318 1040,386 950,318" fill={palette.bg} opacity="0.9" />
            <polygon points="1240,470 1330,420 1370,520 1290,590" fill={palette.bg} opacity="0.9" />
            <polygon points="840,470 750,420 710,520 790,590" fill={palette.bg} opacity="0.9" />
            <polygon points="1170,690 1260,650 1300,760 1200,820" fill={palette.bg} opacity="0.9" />
            <polygon points="910,690 820,650 780,760 880,820" fill={palette.bg} opacity="0.9" />
            <rect x="710" y="560" width="660" height="330" fill={`url(#halftone-${uid})`} opacity="0.35" />
          </g>
          <g stroke={palette.accent} strokeWidth="8" opacity="0.8">
            <path d="M 60 300 H 460" />
            <path d="M 100 420 H 420" />
            <path d="M 140 540 H 380" />
          </g>
        </g>
      )}

      {variant === 'silhouette' && (
        <g>
          <rect width="1600" height="1000" fill={palette.bg} />
          <text
            x="1150"
            y="880"
            textAnchor="middle"
            fill="none"
            stroke={palette.mid}
            strokeWidth="6"
            fontFamily="Anton, sans-serif"
            fontSize="760"
            opacity="0.9"
          >
            10
          </text>
            <g transform='translate(300 180) scale(2.4) skewX(-5)'>
            <PlayerFigure color={palette.accent} />
          </g>
          <rect y="946" width="1600" height="4" fill={palette.mid} />
        </g>
      )}

      {variant === 'archive' && (
        <g>
          <rect width="1600" height="1000" fill={palette.bg} />
          <g>
            <rect x="140" y="140" width="640" height="640" fill={palette.mid} />
            <g clipPath={`url(#archive-clip-${uid})`}>
              <rect x="140" y="140" width="640" height="640" fill={palette.mid} />
            </g>
            <circle cx="460" cy="460" r="230" fill={palette.light} opacity="0.9" />
            <rect x="140" y="140" width="640" height="640" fill={`url(#halftone-${uid})`} opacity="0.55" />
            <rect x="140" y="140" width="640" height="640" fill="none" stroke={palette.bg} strokeWidth="10" />
          </g>
          <g fill={palette.bg}>
            <rect x="880" y="140" width="580" height="46" />
            <rect x="880" y="222" width="440" height="46" />
            <rect x="880" y="304" width="520" height="46" />
          </g>
          <rect x="880" y="420" width="200" height="14" fill={palette.accent} />
          <g stroke={palette.bg} strokeWidth="4" opacity="0.7">
            <path d="M 900 560 h 90 M 945 515 v 90" />
            <path d="M 1300 560 h 90 M 1345 515 v 90" />
          </g>
          <rect x="880" y="640" width="580" height="3" fill={palette.bg} opacity="0.5" />
          <rect x="880" y="700" width="360" height="3" fill={palette.bg} opacity="0.5" />
          <rect x="880" y="760" width="460" height="3" fill={palette.bg} opacity="0.5" />
          {/* torn tape */}
          <rect x="70" y="90" width="260" height="54" fill={palette.light} opacity="0.55" transform="rotate(-4 70 90)" />
        </g>
      )}

      <rect width="1600" height="1000" fill={`url(#${vignetteId})`} opacity={variant === 'archive' ? 0.12 : 0.9} />
      <rect width="1600" height="1000" filter={`url(#${grainId})`} opacity={variant === 'archive' ? 0.16 : 0.11} />
    </svg>
  )
}


