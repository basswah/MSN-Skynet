import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface IScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function ScrollReveal({ children, className = '', delay = 0 }: IScrollRevealProps) {
  const prefersReduced = usePrefersReducedMotion()

  return (
    <motion.div
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={
        prefersReduced
          ? { duration: 0 }
          : {
              type: 'spring' as const,
              stiffness: 100,
              damping: 20,
              delay,
            }
      }
      className={className}
    >
      {children}
    </motion.div>
  )
}
