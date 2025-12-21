import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

export function PageShell({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={cn('min-h-[60vh]', className)}
    >
      {children}
    </motion.div>
  )
}

