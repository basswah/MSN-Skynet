import type { ReactNode } from 'react'
import { useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface ITiltCardProps {
  children: ReactNode
  className?: string
}

export function TiltCard({ children, className = '' }: ITiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 120, damping: 20 })
  const springY = useSpring(y, { stiffness: 120, damping: 20 })

  const rotateX = useTransform(springY, (v) => v * 0.08)
  const rotateY = useTransform(springX, (v) => v * -0.08)
  const translateX = useTransform(springX, (v) => v * 0.05)
  const translateY = useTransform(springY, (v) => v * 0.05)

  const handleMouseMove = useCallback((e: { clientX: number; clientY: number }) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }, [x, y])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        translateX,
        translateY,
        perspective: 1200,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
