import { useRef, useEffect } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { WifiHigh } from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'
import { WaveRings } from './WaveRings'
import { OrbitalRing } from './OrbitalRing'
import { OrbitDots } from './OrbitDots'

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
