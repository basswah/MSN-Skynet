import { useRef, useEffect } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useAnimationFrame,
  type MotionValue,
} from 'framer-motion'
import { WifiHigh } from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'

const WAVE_RING_COUNT = 3
const WAVE_DURATION = 3.2
const ORBIT_DOTS = 12

interface HeroVisualProps {
  scrollProgress: MotionValue<number>
}

export function HeroVisual({ scrollProgress }: HeroVisualProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const t = useI18nStore((state) => state.t)

  const rawRotateX = useTransform(mouseY, [0, 1], [18, -18])
  const rawRotateY = useTransform(mouseX, [0, 1], [-18, 18])
  const rotateX = useSpring(rawRotateX, { stiffness: 80, damping: 20 })
  const rotateY = useSpring(rawRotateY, { stiffness: 80, damping: 20 })

  const iconScale = useTransform(scrollProgress, [0, 0.5], [1, 0.75])
  const iconRotate = useTransform(scrollProgress, [0, 0.6], [0, 45])
  const iconOpacity = useTransform(scrollProgress, [0, 0.5], [1, 0.4])

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect()
      const normX = (e.clientX - rect.left) / rect.width
      const normY = (e.clientY - rect.top) / rect.height
      mouseX.set(Math.max(0, Math.min(1, normX)))
      mouseY.set(Math.max(0, Math.min(1, normY)))
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
    <div
      ref={containerRef}
      className="relative w-full aspect-square max-w-[480px] mx-auto select-none"
      role="img"
      aria-label={t('hero.visual.aria')}
    >
      <WaveRings />
      <OrbitalRing />
      <OrbitDots />

      <motion.div
        className="relative z-10 w-full h-full flex items-center justify-center"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          perspective: 800,
        }}
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#4274D9]/30 via-[#95CCDD]/20 to-transparent blur-3xl scale-[1.8] -z-10" />

          <motion.div
            className="relative flex items-center justify-center"
            style={{ scale: iconScale, rotate: iconRotate, opacity: iconOpacity }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#4274D9]/20 to-[#95CCDD]/10 rounded-full blur-2xl scale-[2.2]" />
            <div className="relative flex items-center justify-center w-[140px] h-[140px] rounded-full bg-white/[0.06] border border-white/[0.1] backdrop-blur-md dark:bg-white/[0.04] dark:border-white/[0.08]">
              <WifiHigh
                size={80}
                weight="duotone"
                className="text-white dark:text-[#95CCDD] drop-shadow-[0_0_30px_rgba(66,116,217,0.8)] dark:drop-shadow-[0_0_50px_rgba(149,204,221,0.7)]"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

function WaveRings() {
  return (
    <>
      {Array.from({ length: WAVE_RING_COUNT }).map((_, i) => {
        const delay = i * (WAVE_DURATION / WAVE_RING_COUNT)
        const baseScale = 0.8 + i * 0.25

        return (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              width: '90%',
              aspectRatio: '1',
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full border border-[#4274D9]/25 dark:border-[#95CCDD]/15"
              initial={{ scale: baseScale, opacity: 0.5 }}
              animate={{
                scale: [baseScale, baseScale + 0.8, baseScale + 1.4],
                opacity: [0.5, 0.3, 0],
              }}
              transition={{
                duration: WAVE_DURATION,
                repeat: Infinity,
                delay,
                ease: 'easeOut',
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-[#4274D9]/15 dark:border-[#95CCDD]/10"
              initial={{ scale: baseScale, opacity: 0.3 }}
              animate={{
                scale: [baseScale, baseScale + 0.6, baseScale + 1.2],
                opacity: [0.3, 0.15, 0],
              }}
              transition={{
                duration: WAVE_DURATION,
                repeat: Infinity,
                delay: delay + 0.4,
                ease: 'easeOut',
              }}
            />
          </motion.div>
        )
      })}
    </>
  )
}

function OrbitalRing() {
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

function OrbitDots() {
  const dots = Array.from({ length: ORBIT_DOTS }).map((_, i) => ({
    id: i,
    angle: (360 / ORBIT_DOTS) * i,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute top-1/2 left-1/2"
          style={{
            width: 3,
            height: 3,
            marginLeft: -1.5,
            marginTop: -1.5,
          }}
          animate={{
            rotate: [dot.angle, dot.angle + 360],
          }}
          transition={{
            duration: 20 + dot.id * 0.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div
            className="w-[3px] h-[3px] rounded-full bg-[#4274D9]/50 dark:bg-[#95CCDD]/40"
            style={{
              transform: `translateX(${180 + (dot.id % 3) * 8}px)`,
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}
