import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Lightning } from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'
import { MagneticButton } from '../ui/MagneticButton'
import { HeroVisual } from '../ui/HeroVisual'

const ease = [0.32, 0.72, 0, 1] as [number, number, number, number]

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
}

const titleWords = (text: string) =>
  text.split(' ').map((word, i) => ({
    word,
    id: i,
  }))

const particles = Array.from({ length: 40 }).map((_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  duration: 3 + Math.random() * 4,
  delay: Math.random() * 3,
}))

export function Hero() {
  const t = useI18nStore((state) => state.t)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const textY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -120]), {
    stiffness: 100,
    damping: 30,
  })
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const textBlur = useTransform(scrollYProgress, [0, 0.4], [0, 6])

  const visualY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -60]), {
    stiffness: 80,
    damping: 30,
  })
  const visualScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92])
  const visualOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3])

  const badgeScale = useSpring(1, { stiffness: 200, damping: 15 })

  const titleText = t('hero.title')

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative bg-[#293681] dark:bg-[#0F172A] min-h-[100dvh] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(66,116,217,0.2),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(149,204,221,0.08),transparent_60%)] pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-1 h-1 rounded-full bg-[#95CCDD]/30 hidden sm:block"
            style={{ left: p.left, top: p.top }}
            animate={{ opacity: [0.2, 0.6, 0.2], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12 min-h-[100dvh] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-16 items-center w-full py-24 sm:py-32 md:py-40">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            style={{ y: textY, opacity: textOpacity, filter: useTransform(textBlur, (v) => `blur(${v}px)`) }}
            className="order-2 lg:order-1"
          >
            <motion.div variants={staggerItem}>
              <motion.span
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-[#95CCDD] text-[11px] sm:text-xs font-medium tracking-widest mb-6 sm:mb-8"
                whileHover={{ scale: 1.03 }}
                onHoverStart={() => badgeScale.set(1.03)}
                onHoverEnd={() => badgeScale.set(1)}
                style={{ scale: badgeScale }}
              >
                <Lightning size={14} weight="fill" className="text-[#95CCDD]" />
                {t('nav.services')}
              </motion.span>
            </motion.div>

            <motion.h1
              variants={staggerItem}
              className="text-[2.25rem] sm:text-[clamp(2.25rem,5vw,4rem)] lg:text-[clamp(2.5rem,4vw,4.5rem)] font-extrabold tracking-tight leading-[1.1] max-w-3xl"
            >
              <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent dark:from-white dark:via-[#95CCDD] dark:to-white/70">
                {titleWords(titleText).map(({ word, id }) => (
                  <motion.span
                    key={id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + id * 0.06, ease }}
                    className="inline-block"
                  >
                    {word}
                    {id < titleWords(titleText).length - 1 && '\u00A0'}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-white/55 dark:text-white/50 leading-relaxed max-w-2xl"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              variants={staggerItem}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-8 sm:mt-10"
            >
              <MagneticButton variant="primary" size="lg" strength={0.25}>
                <a href="#contact">{t('hero.cta.primary')}</a>
              </MagneticButton>
              <MagneticButton variant="secondary" size="lg" strength={0.25}>
                <a href="#services">{t('hero.cta.secondary')}</a>
              </MagneticButton>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease, delay: 0.3 }}
            style={{ y: visualY, scale: visualScale, opacity: visualOpacity }}
            className="hidden lg:block order-1 lg:order-2 w-full max-w-none mx-auto lg:mx-0"
          >
            <HeroVisual scrollProgress={scrollYProgress} />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 inset-x-0 h-40 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, #F8FAFC 0%, transparent 100%)' }}
      />
    </section>
  )
}
