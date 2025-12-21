import { CalendarDays, Mail, Users } from 'lucide-react'
import { useState } from 'react'
import { PageShell } from '../components/PageShell'
import { SectionHeading } from '../components/SectionHeading'
import { site } from '../data/site'
import { sendForm } from '../lib/sendForm'

type BookingForm = {
  fullName: string
  email: string
  phone: string
  service: string
  guests: string
  date: string
  location: string
  dietary: string
  notes: string
}

const serviceOptions = [
  'Private dining',
  'Bespoke catering',
  'Event / celebration',
  'Not sure yet',
] as const

export default function Booking() {
  const [form, setForm] = useState<BookingForm>({
    fullName: '',
    email: '',
    phone: '',
    service: serviceOptions[0],
    guests: '',
    date: '',
    location: '',
    dietary: '',
    notes: '',
  })

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  return (
    <PageShell>
      <section className="grain bg-hero-glow">
        <div className="container-pad py-16 sm:py-20">
          <SectionHeading
            eyebrow="Booking"
            title="Request your date."
            description="Submit a quick request and we’ll reply with availability, next steps, and a simple planning timeline."
          />
        </div>
      </section>

      <section className="container-pad grid gap-10 py-14 sm:py-18 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="card p-6">
            <p className="font-display text-xl text-ink-950">
              What happens next
            </p>
            <div className="mt-5 space-y-3 text-sm text-ink-900/70">
              <div className="flex gap-3">
                <CalendarDays className="mt-0.5 h-4 w-4 text-gold-700" />
                <p>
                  We confirm availability for your date and guest count, then
                  propose a planning timeline.
                </p>
              </div>
              <div className="flex gap-3">
                <Users className="mt-0.5 h-4 w-4 text-gold-700" />
                <p>
                  We curate a menu around preferences and dietary needs—clean,
                  modern, and luxurious.
                </p>
              </div>
              <div className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-gold-700" />
                <p>
                  You receive a clear confirmation with timing, service style,
                  and final details.
                </p>
              </div>
            </div>
            <p className="mt-6 text-sm text-ink-900/70">
              Prefer to email directly?{' '}
              <a className="link-inline text-sm" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="card p-6">
            <p className="font-display text-xl text-ink-950">Booking request</p>
            <p className="mt-2 text-sm text-ink-900/70">
              This request goes straight to {site.email}. No email app needed.
            </p>

            <form
              className="mt-6 grid gap-4"
              onSubmit={async (e) => {
                e.preventDefault()
                setStatus('sending')
                setError(null)
                const result = await sendForm({
                  _subject: site.bookingEmailSubject,
                  _template: 'table',
                  _captcha: 'false',
                  form: 'Booking',
                  service: form.service,
                  date: form.date,
                  guests: form.guests,
                  location: form.location,
                  name: form.fullName,
                  email: form.email,
                  phone: form.phone,
                  dietary: form.dietary,
                  notes: form.notes,
                })
                if (result.ok) {
                  setStatus('success')
                  setForm({
                    fullName: '',
                    email: '',
                    phone: '',
                    service: serviceOptions[0],
                    guests: '',
                    date: '',
                    location: '',
                    dietary: '',
                    notes: '',
                  })
                } else {
                  setStatus('error')
                  setError(result.error || 'Something went wrong. Please try again.')
                }
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm">
                  <span className="text-ink-900/70">Full name</span>
                  <input
                    className="h-11 rounded-xl2 border border-ink-900/10 bg-ivory-100 px-4 text-ink-950 outline-none ring-gold-500/40 focus:ring-2"
                    value={form.fullName}
                    onChange={(e) =>
                      setForm({ ...form, fullName: e.target.value })
                    }
                    placeholder="Your name"
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm">
                  <span className="text-ink-900/70">Email</span>
                  <input
                    className="h-11 rounded-xl2 border border-ink-900/10 bg-ivory-100 px-4 text-ink-950 outline-none ring-gold-500/40 focus:ring-2"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@email.com"
                    required
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm">
                  <span className="text-ink-900/70">Phone (optional)</span>
                  <input
                    className="h-11 rounded-xl2 border border-ink-900/10 bg-ivory-100 px-4 text-ink-950 outline-none ring-gold-500/40 focus:ring-2"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="(123) 456-7890"
                  />
                </label>
                <label className="grid gap-2 text-sm">
                  <span className="text-ink-900/70">Service</span>
                  <select
                    className="h-11 rounded-xl2 border border-ink-900/10 bg-ivory-100 px-4 text-ink-950 outline-none ring-gold-500/40 focus:ring-2"
                    value={form.service}
                    onChange={(e) =>
                      setForm({ ...form, service: e.target.value })
                    }
                  >
                    {serviceOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm">
                  <span className="text-ink-900/70">Guest count</span>
                  <input
                    className="h-11 rounded-xl2 border border-ink-900/10 bg-ivory-100 px-4 text-ink-950 outline-none ring-gold-500/40 focus:ring-2"
                    value={form.guests}
                    onChange={(e) =>
                      setForm({ ...form, guests: e.target.value })
                    }
                    placeholder="e.g. 10"
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm">
                  <span className="text-ink-900/70">Preferred date</span>
                  <input
                    className="h-11 rounded-xl2 border border-ink-900/10 bg-ivory-100 px-4 text-ink-950 outline-none ring-gold-500/40 focus:ring-2"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    placeholder="e.g. March 14, evening"
                    required
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm">
                <span className="text-ink-900/70">Location</span>
                <input
                  className="h-11 rounded-xl2 border border-ink-900/10 bg-ivory-100 px-4 text-ink-950 outline-none ring-gold-500/40 focus:ring-2"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  placeholder="City / neighborhood"
                  required
                />
              </label>

              <label className="grid gap-2 text-sm">
                <span className="text-ink-900/70">Dietary notes (optional)</span>
                <input
                  className="h-11 rounded-xl2 border border-ink-900/10 bg-ivory-100 px-4 text-ink-950 outline-none ring-gold-500/40 focus:ring-2"
                  value={form.dietary}
                  onChange={(e) =>
                    setForm({ ...form, dietary: e.target.value })
                  }
                  placeholder="Allergies, restrictions, preferences"
                />
              </label>

              <label className="grid gap-2 text-sm">
                <span className="text-ink-900/70">Notes / vision (optional)</span>
                <textarea
                  className="min-h-36 resize-y rounded-xl2 border border-ink-900/10 bg-ivory-100 px-4 py-3 text-ink-950 outline-none ring-gold-500/40 focus:ring-2"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Occasion, cuisine style, pacing, vibe, and anything you want your guests to feel."
                />
              </label>

              <button
                type="submit"
                className="btn-gold w-full"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending...' : 'Send request'}
              </button>
              {status === 'success' && (
                <p className="text-center text-xs text-emerald-700">
                  Request sent. We'll reply with availability shortly.
                </p>
              )}
              {status === 'error' && (
                <p className="text-center text-xs text-red-700">
                  {error || 'Unable to send right now.'}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
