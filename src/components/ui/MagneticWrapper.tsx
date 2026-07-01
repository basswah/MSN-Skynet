import type { ReactNode } from 'react'
import { useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface IMagneticWrapperProps {
  children: ReactNode
  strength?: number
}

export function MagneticWrapper({ children, strength = 0.25 }: IMagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 200, damping: 20 })
  const springY = useSpring(y, { stiffness: 200, damping: 20 })

  const transformX = useTransform(springX, (v) => v * strength)
  const transformY = useTransform(springY, (v) => v * strength)

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
      style={{ x: transformX, y: transformY }}
    >
      {children}
    </motion.div>
  )
}
