import { useRef, useEffect } from 'react'
import { motion, useMotionValue, useTransform, useAnimationFrame } from 'framer-motion'
import { IoWifiOutline } from 'react-icons/io5'
import { useI18nStore } from '../../store/useI18nStore'

const RIPPLE_COUNT = 3
const RIPPLE_DURATION = 3.2

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const t = useI18nStore((state) => state.t)

  const rotateX = useTransform(mouseY, [0, 1], [16, -16])
  const rotateY = useTransform(mouseX, [0, 1], [-16, 16])
  const translateZ = useTransform(mouseX, [0, 1], [10, -10])

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect()
      mouseX.set((e.clientX - rect.left) / rect.width)
      mouseY.set((e.clientY - rect.top) / rect.height)
    }

    const handleMouseLeave = () => {
      mouseX.set(0.5)
      mouseY.set(0.5)
    }

    node.addEventListener('mousemove', handleMouseMove)
    node.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      node.removeEventListener('mousemove', handleMouseMove)
      node.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [mouseX, mouseY])

  return (
    <div ref={ref} className="relative w-full aspect-square max-w-[480px] mx-auto select-none" role="img" aria-label={t('hero.visual.aria')}>
      <Ripples />
      <OrbitalRing />

      <motion.div
        className="relative z-10 w-full h-full flex items-center justify-center"
        style={{ rotateX, rotateY, z: translateZ, transformStyle: 'preserve-3d' }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#4274D9]/30 via-[#95CCDD]/20 to-transparent blur-3xl scale-150 -z-10" />
          <IoWifiOutline
            size={140}
            className="text-white dark:text-[#95CCDD] drop-shadow-[0_0_30px_rgba(66,116,217,0.8)] dark:drop-shadow-[0_0_50px_rgba(149,204,221,0.7)]"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

function Ripples() {
  return (
    <>
      {Array.from({ length: RIPPLE_COUNT }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] aspect-square rounded-full border border-[#4274D9]/30 dark:border-[#95CCDD]/20 pointer-events-none"
          initial={{ scale: 0.8, opacity: 0.6 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{
            duration: RIPPLE_DURATION,
            repeat: Infinity,
            delay: i * (RIPPLE_DURATION / RIPPLE_COUNT),
            ease: 'easeOut',
          }}
        />
      ))}
    </>
  )
}

function OrbitalRing() {
  const angle = useMotionValue(0)

  useAnimationFrame((_, delta) => {
    angle.set(angle.get() + delta * 0.04)
  })

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{ rotate: angle }}
    >
      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient id="orbit-grad-light" x1="0" y1="0" x2="100" y2="100">
            <stop offset="0%" stopColor="#4274D9" stopOpacity="0" />
            <stop offset="40%" stopColor="#4274D9" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#4274D9" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#4274D9" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="orbit-grad-dark" x1="0" y1="0" x2="100" y2="100">
            <stop offset="0%" stopColor="#95CCDD" stopOpacity="0" />
            <stop offset="40%" stopColor="#95CCDD" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#95CCDD" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#95CCDD" stopOpacity="0" />
          </linearGradient>
        </defs>
        <ellipse
          cx="50"
          cy="50"
          rx="48"
          ry="48"
          stroke="url(#orbit-grad-light)"
          strokeWidth="1.5"
          strokeDasharray="3 8"
          className="dark:hidden"
        />
        <ellipse
          cx="50"
          cy="50"
          rx="48"
          ry="48"
          stroke="url(#orbit-grad-dark)"
          strokeWidth="1.5"
          strokeDasharray="3 8"
          className="hidden dark:block"
        />
      </svg>
    </motion.div>
  )
}
