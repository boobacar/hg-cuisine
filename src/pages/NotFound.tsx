import { Link } from 'react-router-dom'
import { PageShell } from '../components/PageShell'

export default function NotFound() {
  return (
    <PageShell className="container-pad py-20">
      <p className="badge">404</p>
      <h1 className="mt-5 font-display text-4xl tracking-tight text-ink-950">
        This page doesn’t exist.
      </h1>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-900/70">
        If you followed a link, it may have moved. Head back home and explore
        the experience.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link to="/" className="btn-primary">
          Go home
        </Link>
        <Link to="/booking" className="btn-gold">
          Request a booking
        </Link>
      </div>
    </PageShell>
  )
}

