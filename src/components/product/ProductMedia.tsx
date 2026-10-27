import { SceneArt, type SceneVariant } from '@/components/art/SceneArt'
import { JerseySvg, type Colorway, type JerseyPattern, type JerseyView } from '@/components/art/JerseySvg'
import { garmentFor, type SportId } from '@/lib/constants'
import { cn } from '@/lib/utils'

type Props = {
  colorway: Colorway
  pattern?: JerseyPattern
  view?: JerseyView
  sport?: SportId
  name?: string
  number?: string
  club?: string
  mediaKind?: 'jersey' | 'textile'
  textileScene?: SceneVariant
  tone?: 'light' | 'dark'
  /** large ghosted initials behind the product */
  mark?: string | null
  className?: string
}

/**
 * Single source of truth for product imagery.
 * Swapping to real photography = replace the two renders below with <img>.
 */
export function ProductMedia({
  colorway,
  pattern = 'plain',
  view = 'front',
  sport = 'football',
  name,
  number,
  club,
  mediaKind = 'jersey',
  textileScene = 'fabric',
  tone = 'light',
  mark,
  className,
}: Props) {
  const dark = tone === 'dark'

  return (
    <div
      className={cn(
        'relative flex h-full w-full items-center justify-center overflow-hidden',
        dark ? 'bg-ink-soft' : 'bg-paper-dim',
        className,
      )}
      style={
        dark
          ? undefined
          : {
              backgroundImage:
                'radial-gradient(120% 90% at 50% 8%, rgba(255,255,255,0.75), rgba(247,242,232,0) 58%), radial-gradient(70% 60% at 50% 108%, rgba(193,84,42,0.12), rgba(247,242,232,0) 60%)',
            }
      }
    >
      {mark && (
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none font-display leading-none',
            dark ? 'text-paper/[0.06]' : 'text-ink/[0.06]',
          )}
          style={{ fontSize: 'clamp(6rem, 30vh, 22rem)' }}
        >
          {mark}
        </span>
      )}

      {mediaKind === 'textile' ? (
        <div className="absolute inset-0">
          <SceneArt
            variant={textileScene}
            palette={{ bg: colorway.base, mid: colorway.secondary, accent: colorway.accent }}
          />
        </div>
      ) : (
        <div
          className="relative z-[1] h-[88%] w-auto"
          style={{
            aspectRatio: '600 / 720',
            filter: 'drop-shadow(0 34px 30px rgba(33,26,20,0.24))',
          }}
        >
          <JerseySvg
            colorway={colorway}
            pattern={pattern}
            view={view}
            garment={garmentFor(sport)}
            name={name}
            number={number}
            club={club}
            className="h-full w-full"
          />
        </div>
      )}
    </div>
  )
}
