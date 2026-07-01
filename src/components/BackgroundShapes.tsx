import { useMemo } from 'react'
import { motion } from 'framer-motion'

interface IShape {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

function createShapes(): IShape[] {
  return Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 60 + Math.random() * 160,
    duration: 14 + Math.random() * 18,
    delay: Math.random() * 6,
  }))
}

export function BackgroundShapes() {
  const shapes = useMemo(() => createShapes(), [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute rounded-full"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
            background: shape.id % 2 === 0
              ? 'radial-gradient(circle, rgba(149, 204, 221, 0.1) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(66, 116, 217, 0.07) 0%, transparent 70%)',
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, 30, -30, 0],
            scale: [1, 1.1, 0.9, 1],
            rotate: [0, 120, 240, 360],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: [0.32, 0.72, 0, 1],
          }}
        />
      ))}
    </div>
  )
}
