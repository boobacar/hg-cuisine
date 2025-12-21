import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navLinks } from '../data/site'
import { cn } from '../lib/cn'
import { Logo } from './Logo'

const linkBase =
  'rounded-full px-3 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory-100'

export function Header() {
  const [open, setOpen] = useState(false)
  const links = [
    { label: 'Home', to: '/' },
    ...navLinks.filter((l) => !['/', '/booking'].includes(l.to)),
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-ink-900/10 bg-ivory-100/35 backdrop-blur-2xl shadow-[0_10px_50px_rgba(0,0,0,0.08)]">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-sm focus:text-ivory-100"
      >
        Skip to content
      </a>
      <div className="container-pad flex h-16 items-center justify-between">
        <Logo onClick={() => setOpen(false)} />

        <nav className="hidden items-center gap-1 rounded-full border border-ivory-100/40 bg-ivory-50/30 px-2 py-1 backdrop-blur-xl shadow-soft lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  linkBase,
                  isActive
                    ? 'bg-ink-900 text-ivory-100'
                    : 'text-ink-900/80 hover:bg-ink-900/5',
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/booking" className="btn-gold ml-2">
            Request a booking
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-full border border-ink-900/10 bg-ivory-50/70 p-2 text-ink-900 shadow-soft hover:bg-ivory-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory-100 lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="border-t border-ink-900/10 bg-ivory-100/80 backdrop-blur-xl shadow-[0_12px_50px_rgba(0,0,0,0.08)] lg:hidden"
          >
            <div className="container-pad flex flex-col gap-2 py-4">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      linkBase,
                      'justify-start',
                      isActive
                        ? 'bg-ink-900 text-ivory-100'
                        : 'text-ink-900/80 hover:bg-ink-900/5',
                    )
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Link
                to="/booking"
                onClick={() => setOpen(false)}
                className="btn-gold mt-2 w-full"
              >
                Request a booking
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
