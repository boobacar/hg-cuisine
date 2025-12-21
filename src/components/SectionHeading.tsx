import { cn } from '../lib/cn'

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}) {
  const isCenter = align === 'center'
  return (
    <div className={cn(isCenter ? 'text-center' : 'text-left')}>
      {eyebrow && (
        <p className="badge mx-auto w-fit justify-center text-ink-900/70">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'mt-4 font-display text-3xl tracking-tight text-ink-950 sm:text-4xl',
          isCenter && 'mx-auto max-w-2xl',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 max-w-2xl text-sm leading-relaxed text-ink-900/70 sm:text-base',
            isCenter && 'mx-auto',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}

