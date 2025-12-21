import { useState } from 'react'
import { Link } from 'react-router-dom'
import { navLinks, site } from '../data/site'
import { Logo } from './Logo'
import { sendForm } from '../lib/sendForm'

export function Footer() {
  const [lead, setLead] = useState({ name: '', email: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  return (
    <footer className="border-t border-ink-900/10 bg-ivory-50">
      <div className="container-pad grid gap-10 py-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Logo />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-900/70">
            HG Cuisine creates elevated dining experiences with refined menus,
            warm hospitality, and seamless execution—so you can focus on your
            guests.
          </p>
          <p className="mt-4 text-sm text-ink-900/70">
            <span className="font-medium text-ink-900">Contact:</span>{' '}
            <a className="link-inline text-sm" href={`mailto:${site.email}`}>
              {site.email}
            </a>{' '}
            •{' '}
            <a className="link-inline text-sm" href={`tel:${site.phone}`}>
              {site.formattedPhone}
            </a>
          </p>
        </div>

        <div className="lg:col-span-3">
          <h3 className="font-display text-sm tracking-wide text-ink-950">
            Explore
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-900/70">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link className="link-inline text-sm" to={l.to}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h3 className="font-display text-sm tracking-wide text-ink-950">
            Stay in the loop
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-ink-900/70">
            Drop your email and we'll follow up with menus, availability, or a
            quick intro call. Sends directly to {site.email}.
          </p>
          <form
            className="mt-4 space-y-3"
            onSubmit={async (e) => {
              e.preventDefault()
              setStatus('sending')
              setError(null)
              const result = await sendForm({
                _subject: 'HG Cuisine — Lead capture',
                _template: 'table',
                _captcha: 'false',
                form: 'Footer lead',
                name: lead.name,
                email: lead.email,
              })
              if (result.ok) {
                setStatus('success')
                setLead({ name: '', email: '' })
              } else {
                setStatus('error')
                setError(result.error || 'Something went wrong. Please try again.')
              }
            }}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                className="h-11 rounded-xl2 border border-ink-900/10 bg-white px-4 text-sm text-ink-950 outline-none ring-gold-500/40 focus:ring-2"
                placeholder="Name (optional)"
                value={lead.name}
                onChange={(e) => setLead({ ...lead, name: e.target.value })}
              />
              <input
                className="h-11 rounded-xl2 border border-ink-900/10 bg-white px-4 text-sm text-ink-950 outline-none ring-gold-500/40 focus:ring-2"
                placeholder="Email"
                type="email"
                required
                value={lead.email}
                onChange={(e) => setLead({ ...lead, email: e.target.value })}
              />
            </div>
            <button type="submit" className="btn-gold w-full sm:w-auto">
              {status === 'sending' ? 'Sending...' : 'Send my details'}
            </button>
            {status === 'success' && (
              <p className="text-xs text-emerald-700">Sent. We'll reach out soon.</p>
            )}
            {status === 'error' && (
              <p className="text-xs text-red-700">
                {error || 'Unable to send right now.'}
              </p>
            )}
          </form>
        </div>
      </div>

      <div className="border-t border-ink-900/10">
        <div className="container-pad flex flex-col gap-2 py-6 text-xs text-ink-900/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>{site.locationLabel}</p>
        </div>
      </div>
    </footer>
  )
}
