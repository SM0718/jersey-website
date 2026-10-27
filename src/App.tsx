import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { registerGSAP, ScrollTrigger } from '@/lib/animations'
import { Header } from '@/components/navigation/Header'
import { Footer } from '@/components/navigation/Footer'
import { GyroscopeCursor } from '@/components/motion/GyroscopeCursor'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { SearchOverlay } from '@/components/search/SearchOverlay'
import { useLenis } from '@/hooks/useLenis'
import { ScrollToTop } from '@/components/motion/ScrollToTop'
import Home from '@/pages/Home'
import Shop from '@/pages/Shop'
import Product from '@/pages/Product'
import Cart from '@/pages/Cart'
import Wishlist from '@/pages/Wishlist'
import Checkout from '@/pages/Checkout'
import Profile from '@/pages/Profile'
import NotFound from '@/pages/NotFound'

function RouteRefresh() {
  const { pathname } = useLocation()
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 250)
    return () => window.clearTimeout(id)
  }, [pathname])
  return null
}

function App() {
  useLenis()
  useEffect(() => {
    registerGSAP()
    document.documentElement.classList.add('js-ready')
  }, [])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouteRefresh />
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <SearchOverlay />
      <GyroscopeCursor />
    </BrowserRouter>
  )
}

export default App
