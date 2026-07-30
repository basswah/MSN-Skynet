import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const rings = Array.from({ length: 3 }).map((_, i) => ({
  id: i,
  size: 80 + i * 40,
  duration: 3 + i * 1.5,
  delay: i * 0.8,
}))

const dots = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  angle: (i / 12) * Math.PI * 2,
  radius: 0.35 + Math.random() * 0.55,
  size: 3 + Math.random() * 3,
  delay: Math.random() * 2,
}))

export function CoverageVisual() {
  const prefersReduced = usePrefersReducedMotion()

  return (
    <div className="relative w-full max-w-[320px] aspect-square mx-auto" aria-hidden="true">
      {rings.map((ring) => (
        <motion.div
          key={ring.id}
          className="absolute rounded-full border border-[#4274D9]/20 dark:border-[#95CCDD]/20"
          style={{
            width: ring.size + '%',
            height: ring.size + '%',
            top: (100 - ring.size) / 2 + '%',
            left: (100 - ring.size) / 2 + '%',
          }}
          animate={prefersReduced ? {} : { opacity: [0.3, 0.7, 0.3], scale: [0.92, 1, 0.92] }}
          transition={{ duration: ring.duration, repeat: Infinity, delay: ring.delay, ease: [0.32, 0.72, 0, 1] }}
        />
      ))}

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#4274D9] dark:bg-[#95CCDD] shadow-[0_0_20px_rgba(66,116,217,0.5)] dark:shadow-[0_0_20px_rgba(149,204,221,0.5)]" />

      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full bg-[#4274D9]/40 dark:bg-[#95CCDD]/40"
          style={{
            width: dot.size,
            height: dot.size,
            top: '50%',
            left: '50%',
            transform: `translate(calc(-50% + ${Math.cos(dot.angle) * dot.radius * 100}%), calc(-50% + ${Math.sin(dot.angle) * dot.radius * 100}%))`,
          }}
          animate={prefersReduced ? {} : { opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: dot.delay, ease: [0.32, 0.72, 0, 1] }}
        />
      ))}

      <motion.div
        className="absolute inset-0 rounded-full border border-[#4274D9]/10 dark:border-[#95CCDD]/10"
        animate={prefersReduced ? {} : { rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute inset-[15%] rounded-full border border-dashed border-[#95CCDD]/15 dark:border-[#4274D9]/15"
        animate={prefersReduced ? {} : { rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}
