import { useMemo } from 'react'
import { motion } from 'framer-motion'

interface IParticle3DProps {
  count?: number
}

function Particle({ delay, size, x, y }: { delay: number; size: number; x: number; y: number }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        backgroundColor: '#95CCDD',
        filter: 'blur(1px)',
      }}
      animate={{
        x: [0, 30, -30, 0],
        y: [0, -40, 20, 0],
        scale: [1, 1.5, 0.8, 1],
        opacity: [0.3, 0.8, 0.4, 0.3],
      }}
      transition={{
        duration: 8 + Math.random() * 6,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

export function ParticleField3D({ count = 40 }: IParticle3DProps) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 3 + Math.random() * 6,
      delay: Math.random() * 2,
    }))
  }, [count])

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <Particle key={p.id} delay={p.delay} size={p.size} x={p.x} y={p.y} />
      ))}
      
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-[#95CCDD]/5 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/3 w-40 h-40 rounded-full bg-[#4274D9]/5 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  )
}
