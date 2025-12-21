import { Link } from 'react-router-dom'
import { cn } from '../lib/cn'

export function Logo({
  className,
  onClick,
}: {
  className?: string
  onClick?: () => void
}) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className={cn(
        'group inline-flex items-center gap-3 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory-100',
        className,
      )}
    >
      <span className="relative grid h-9 w-9 place-items-center rounded-full bg-ink-900 text-ivory-100 shadow-soft">
        <span className="font-display text-sm tracking-wide">HG</span>
        <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-gold-500/30" />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-base tracking-wide text-ink-950">
          HG Cuisine
        </span>
        <span className="block text-xs text-ink-900/70">
          Private dining & catering
        </span>
      </span>
    </Link>
  )
}
