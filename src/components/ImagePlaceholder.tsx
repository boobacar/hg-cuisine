import { cn } from '../lib/cn'

export function ImagePlaceholder({
  label = 'Photo coming soon',
  className,
}: {
  label?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl2 border border-ink-900/10 bg-gradient-to-br from-ink-900 via-ink-800 to-ink-900 shadow-soft',
        'before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_20%_20%,rgba(184,144,71,0.25),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(203,191,177,0.2),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(255,254,251,0.15),transparent_45%)]',
        className,
      )}
      aria-label={label}
      role="img"
    >
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-end gap-2 bg-gradient-to-t from-ink-900/70 via-ink-900/30 to-transparent p-4 text-center">
        <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-ivory-100">
          Visual placeholder
        </span>
        <p className="font-display text-lg text-ivory-50">{label}</p>
      </div>
    </div>
  )
}

