import type { SVGProps } from 'react'

export type IconProps = Omit<SVGProps<SVGSVGElement>, 'children'> & {
  size?: number
  strokeWidth?: number
}

function Svg({ size = 20, strokeWidth = 1.6, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    />
  )
}

export function SearchIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.6-3.6" />
    </Svg>
  )
}

export function HeartIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 20.5C7.5 17.6 3.5 14.2 3.5 9.9 3.5 7.2 5.6 5.2 8.2 5.2c1.6 0 3 .8 3.8 2 .8-1.2 2.2-2 3.8-2 2.6 0 4.7 2 4.7 4.7 0 4.3-4 7.7-8.5 10.6Z" />
    </Svg>
  )
}

export function CartIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M2.5 3.5h2l1.9 10.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L19.5 7H5.2" />
      <circle cx="9" cy="19.5" r="1.4" />
      <circle cx="17" cy="19.5" r="1.4" />
    </Svg>
  )
}

export function UserIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="8" r="3.8" />
      <path d="M4.8 20a7.2 7.2 0 0 1 14.4 0" />
    </Svg>
  )
}

export function MenuIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
    </Svg>
  )
}

export function CloseIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />
    </Svg>
  )
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </Svg>
  )
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M20 12H5M11 6l-6 6 6 6" />
    </Svg>
  )
}

export function PlusIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 5v14M5 12h14" />
    </Svg>
  )
}

export function MinusIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 12h14" />
    </Svg>
  )
}

export function TrashIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 7h16M9 7V5.2A1.2 1.2 0 0 1 10.2 4h3.6A1.2 1.2 0 0 1 15 5.2V7M6.5 7l.9 12a1.6 1.6 0 0 0 1.6 1.5h6a1.6 1.6 0 0 0 1.6-1.5l.9-12" />
      <path d="M10 11v6M14 11v6" />
    </Svg>
  )
}

export function FilterIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 7h16M7 12h10M10 17h4" />
    </Svg>
  )
}

export function SortIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M7 4v16M7 20l-3-3M7 20l3-3M17 20V4M17 4l-3 3M17 4l3 3" />
    </Svg>
  )
}

export function BagIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5.4 7.5h13.2l1.1 11.2a1.6 1.6 0 0 1-1.6 1.8H5.9a1.6 1.6 0 0 1-1.6-1.8Z" />
      <path d="M8.8 7.5V6.2a3.2 3.2 0 0 1 6.4 0v1.3" />
    </Svg>
  )
}

export function LocationIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 21c4-4.2 6-7.3 6-10a6 6 0 1 0-12 0c0 2.7 2 5.8 6 10Z" />
      <circle cx="12" cy="11" r="2.2" />
    </Svg>
  )
}

export function CheckIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 12.5l4.5 4.5L19 7" />
    </Svg>
  )
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m6 9.5 6 6 6-6" />
    </Svg>
  )
}

export function StarIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m12 4 2.5 5.1 5.6.8-4 3.9 1 5.6L12 16.8 6.9 19.4l1-5.6-4-3.9 5.6-.8Z" />
    </Svg>
  )
}

export function ShirtIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9 4 5 6.2 2.5 11l3 1.6.8-1.2V20h11.4v-8.6l.8 1.2 3-1.6L19 6.2 15 4a3 3 0 0 1-6 0Z" />
    </Svg>
  )
}
