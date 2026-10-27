import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  CartIcon,
  CloseIcon,
  HeartIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from '@/components/ui/icons'
import { useCartStore, selectCount } from '@/stores/cartStore'
import { useWishlistStore } from '@/stores/wishlistStore'
import { useUiStore } from '@/stores/uiStore'
import { BRAND, NAV_LINKS } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

function CountBadge({ count }: { count: number }) {
  if (count <= 0) return null
  return (
    <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-clay px-1 text-[9px] font-bold text-paper">
      {count}
    </span>
  )
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const cartCount = useCartStore((s) => selectCount(s.lines))
  const wishCount = useWishlistStore((s) => s.ids.length)
  const { menuOpen, setMenuOpen, setCartOpen, setSearchOpen } = useUiStore()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname, setMenuOpen])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-header border-b border-transparent',
        scrolled ? 'header--scrolled' : 'bg-paper/60 backdrop-blur-sm',
      )}
    >
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-gutter py-4">
        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-6 xl:flex">
            {NAV_LINKS.map((link) => (
              <Link key={link.label} to={link.to} className="meta link-underline whitespace-nowrap">
                {link.label}
              </Link>
            ))}
          </nav>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="xl:hidden" aria-label="Open menu">
                <MenuIcon size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" showClose={false} className="w-[min(22rem,100vw)]">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex h-full flex-col px-6 py-7">
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl tracking-[0.24em]">{BRAND.name}</span>
                  <SheetClose
                    className="grid h-10 w-10 place-items-center rounded-full border border-hairline transition-colors hover:bg-ink hover:text-paper"
                    aria-label="Close menu"
                  >
                    <CloseIcon size={18} />
                  </SheetClose>
                </div>
                <nav className="mt-10 flex flex-col">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.label}
                      to={link.to}
                      className="border-b border-hairline py-4 font-display text-2xl transition-colors hover:text-clay"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto flex flex-col gap-3 pt-10">
                  <Link to="/wishlist" className="meta flex items-center gap-3">
                    <HeartIcon size={18} /> Wishlist
                  </Link>
                  <Link to="/profile" className="meta flex items-center gap-3">
                    <UserIcon size={18} /> Account
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <Link
          to="/"
          className="font-display text-2xl font-medium tracking-[0.22em]"
          aria-label={`${BRAND.name} home`}
        >
          {BRAND.name}
        </Link>

        <div className="flex items-center justify-end gap-1">
          <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)} aria-label="Search">
            <SearchIcon size={20} />
          </Button>
          <Link to="/profile" className="hidden sm:block">
            <Button variant="ghost" size="icon" aria-label="Account">
              <UserIcon size={20} />
            </Button>
          </Link>
          <Link to="/wishlist">
            <Button variant="ghost" size="icon" className="relative" aria-label="Wishlist">
              <HeartIcon size={20} />
              <CountBadge count={wishCount} />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setCartOpen(true)}
            aria-label="Cart"
          >
            <CartIcon size={20} />
            <CountBadge count={cartCount} />
          </Button>
        </div>
      </div>
    </header>
  )
}
