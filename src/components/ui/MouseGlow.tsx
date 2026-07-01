import { useCallback, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function MouseGlow() {
  const mouseX = useMotionValue(-1000)
  const mouseY = useMotionValue(-1000)

  const springX = useSpring(mouseX, { stiffness: 80, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 80, damping: 25 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
  }, [mouseX, mouseY])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    >
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          left: springX,
          top: springY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(149,204,221,0.08) 0%, transparent 60%)',
        }}
      />
    </motion.div>
  )
}
