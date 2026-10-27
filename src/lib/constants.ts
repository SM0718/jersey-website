import { photo } from '@/lib/images'

export const BRAND = {
  name: 'TERRACE',
  tagline: 'The shirt tells the story.',
  founded: 2014,
  city: 'Bombay / London',
} as const

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const
export type Size = (typeof SIZES)[number]

export const FREE_SHIPPING_THRESHOLD = 1500
export const FLAT_SHIPPING = 99

export const NAV_LINKS = [
  { label: 'Football', to: '/shop?sport=football' },
  { label: 'Cricket', to: '/shop?sport=cricket' },
  { label: 'Basketball', to: '/shop?sport=basketball' },
  { label: 'Badminton', to: '/shop?sport=badminton' },
  { label: 'Retro', to: '/shop?category=retro' },
  { label: 'Sale', to: '/shop?sale=true' },
] as const

/** Garment silhouette a sport's kit is cut from. */
export type Garment = 'shirt' | 'polo' | 'tank'

export type SportId = 'football' | 'cricket' | 'basketball' | 'badminton' | 'tennis' | 'rugby'

export type SportInfo = {
  id: SportId
  label: string
  blurb: string
  garment: Garment
  image: string
}

export const SPORTS: SportInfo[] = [
  {
    id: 'football',
    label: 'Football',
    blurb: 'Club and national kits — home, away and third.',
    garment: 'shirt',
    image: photo('footballNight', 1100),
  },
  {
    id: 'cricket',
    label: 'Cricket',
    blurb: 'Test whites, ODI colour and T20 editions.',
    garment: 'polo',
    image: photo('cricketBatting', 1100),
  },
  {
    id: 'basketball',
    label: 'Basketball',
    blurb: 'Sleeveless hardwood classics and city editions.',
    garment: 'tank',
    image: photo('basketballGame', 1100),
  },
  {
    id: 'badminton',
    label: 'Badminton',
    blurb: 'Court-ready polos and national squads.',
    garment: 'polo',
    image: photo('badmintonHall', 1100),
  },
  {
    id: 'tennis',
    label: 'Tennis',
    blurb: 'Baseline polos and tournament whites.',
    garment: 'polo',
    image: photo('tennisCourt', 1100),
  },
  {
    id: 'rugby',
    label: 'Rugby',
    blurb: 'Heavyweight test shirts built to take a hit.',
    garment: 'shirt',
    image: photo('rugby', 1100),
  },
]

export function sportLabel(id: string) {
  return SPORTS.find((s) => s.id === id)?.label ?? id
}

export function garmentFor(sport: string): Garment {
  return SPORTS.find((s) => s.id === sport)?.garment ?? 'shirt'
}

export const CLUBS = [
  'Real Madrid',
  'FC Barcelona',
  'AC Milan',
  'Inter Milan',
  'Manchester United',
  'Liverpool',
  'Arsenal',
  'Chelsea',
  'Bayern Munich',
  'Borussia Dortmund',
  'Juventus',
  'Paris Saint-Germain',
  'Manchester City',
  'Tottenham Hotspur',
  'Napoli',
  'Atletico Madrid',
  'Brazil',
  'Argentina',
  'France',
  'Germany',
  'Italy',
  'Netherlands',
  'Portugal',
  'Japan',
  'India',
  'Australia',
  'Los Angeles',
  'Chicago',
  'Boston',
  'Malaysia',
  'New Zealand',
  'TERRACE',
] as const

export const SEASONS = [
  '2026/27',
  '2025/26',
  '2024/25',
  '2006/07',
  '1998/99',
  '1997/98',
  '1994/95',
  '1990/91',
] as const

export const PRODUCT_TYPES = ['home', 'away', 'third', 'goalkeeper', 'training', 'retro'] as const
export type ProductType = (typeof PRODUCT_TYPES)[number]

export const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured' },
  { id: 'newest', label: 'Newest' },
  { id: 'price-asc', label: 'Price — low to high' },
  { id: 'price-desc', label: 'Price — high to low' },
  { id: 'rating', label: 'Best rated' },
] as const

export const PLAYER_PRESETS: Record<string, { name: string; number: string }[]> = {
  'Real Madrid': [
    { name: 'MBAPPE', number: '10' },
    { name: 'BELLINGHAM', number: '5' },
    { name: 'VINICIUS', number: '7' },
  ],
  'FC Barcelona': [
    { name: 'YAMAL', number: '10' },
    { name: 'PEDRI', number: '8' },
    { name: 'LEWANDOWSKI', number: '9' },
  ],
  Argentina: [{ name: 'MESSI', number: '10' }, { name: 'ALVAREZ', number: '9' }],
  Portugal: [{ name: 'RONALDO', number: '7' }],
  'Manchester United': [
    { name: 'FERNANDES', number: '8' },
    { name: 'RASHFORD', number: '10' },
  ],
  'AC Milan': [{ name: 'LEAO', number: '10' }],
  default: [{ name: 'MESSI', number: '10' }],
}

export const EDITORIAL = {
  hero: {
    eyebrow: 'The 26/27 Collection',
    headline: ['Wear the', 'game.'],
    caption:
      'Match-issue kits for every sport — from the pitch to the court, the crease and the baseline.',
  },
} as const

export const SHIP_FREE_TEXT = `$${FREE_SHIPPING_THRESHOLD} away from free shipping`

