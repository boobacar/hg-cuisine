import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useId, useState } from 'react'
import { cn } from '../../lib/cn'

export function Accordion({
  items,
}: {
  items: { q: string; a: string }[]
}) {
  const baseId = useId()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="divide-y divide-ink-900/10 overflow-hidden rounded-xl2 border border-ink-900/10 bg-ivory-50 shadow-soft">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const contentId = `${baseId}-content-${index}`
        const triggerId = `${baseId}-trigger-${index}`
        return (
          <div key={item.q} className="p-5 sm:p-6">
            <button
              id={triggerId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={contentId}
              onClick={() => setOpenIndex((v) => (v === index ? null : index))}
              className="flex w-full items-center justify-between gap-4 text-left"
            >
              <span className="font-medium text-ink-950">{item.q}</span>
              <ChevronDown
                className={cn(
                  'h-5 w-5 shrink-0 text-ink-900/70 transition-transform',
                  isOpen && 'rotate-180',
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={contentId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <p className="mt-3 text-sm leading-relaxed text-ink-900/70 sm:text-base">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

