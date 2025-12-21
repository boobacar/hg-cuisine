import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { ScrollToTop } from './components/ScrollToTop'
import About from './pages/About'
import Booking from './pages/Booking'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Services from './pages/Services'

export default function App() {
  const location = useLocation()

  useEffect(() => {
    const base = 'HG Cuisine'
    const titles: Record<string, string> = {
      '/': base,
      '/about': `About | ${base}`,
      '/services': `Services | ${base}`,
      '/faq': `FAQ | ${base}`,
      '/booking': `Booking | ${base}`,
      '/contact': `Contact | ${base}`,
    }
    document.title = titles[location.pathname] ?? base
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-ivory-100">
      <ScrollToTop />
      <Header />
      <main id="content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
