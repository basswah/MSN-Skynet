import { motion, useMotionValue, useAnimationFrame } from 'framer-motion'

export function OrbitalRing() {
  const angle = useMotionValue(0)

  useAnimationFrame((_, delta) => {
    angle.set(angle.get() + delta * 0.035)
  })

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{ rotate: angle }}
    >
      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient id="orbit-light" x1="0" y1="0" x2="100" y2="100">
            <stop offset="0%" stopColor="#4274D9" stopOpacity="0" />
            <stop offset="35%" stopColor="#4274D9" stopOpacity="0.45" />
            <stop offset="65%" stopColor="#4274D9" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#4274D9" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="orbit-dark" x1="0" y1="0" x2="100" y2="100">
            <stop offset="0%" stopColor="#95CCDD" stopOpacity="0" />
            <stop offset="35%" stopColor="#95CCDD" stopOpacity="0.4" />
            <stop offset="65%" stopColor="#95CCDD" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#95CCDD" stopOpacity="0" />
          </linearGradient>
        </defs>
        <ellipse
          cx="50"
          cy="50"
          rx="47"
          ry="47"
          stroke="url(#orbit-light)"
          strokeWidth="1.2"
          strokeDasharray="4 8"
          className="dark:hidden"
        />
        <ellipse
          cx="50"
          cy="50"
          rx="47"
          ry="47"
          stroke="url(#orbit-dark)"
          strokeWidth="1.2"
          strokeDasharray="4 8"
          className="hidden dark:block"
        />
      </svg>
    </motion.div>
  )
}
