/**
 * Photography sourced from Pexels (https://www.pexels.com) — free to use under the
 * Pexels licence. Each URL is built from a real photo id via the Pexels image CDN.
 */
const CDN = 'https://images.pexels.com/photos'

export function pexels(id: number, width = 1600) {
  return `${CDN}/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`
}

/** Curated, verified photo ids grouped by sport. */
export const PHOTO_ID = {
  footballNight: 34414418,
  footballLineup: 12239380,
  footballAction: 38338519,
  footballPitch: 17955586,
  footballHuddle: 34742833,
  footballFans: 26630669,

  cricketBatting: 28758998,
  cricketCatch: 29047136,
  cricketSwing: 17628651,
  cricketDust: 4747325,
  cricketJersey: 17628624,

  basketballGame: 32619168,
  basketballCourt: 33566143,
  basketballBall: 32371318,
  basketballAction: 32600319,

  badmintonHall: 19902436,
  badmintonGym: 26238648,
  badmintonCourt: 8007173,
  badmintonAction: 8007094,

  tennisCourt: 29439343,
  rugby: 13142768,
  volleyball: 38037862,
} as const

export type PhotoKey = keyof typeof PHOTO_ID

/** Returns a usable image URL for a curated photo key. */
export function photo(key: PhotoKey, width = 1600) {
  return pexels(PHOTO_ID[key], width)
}
