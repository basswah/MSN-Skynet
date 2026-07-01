import { motion } from 'framer-motion'
import { Lightning } from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'
import { Button } from '../ui/Button'
import { MagneticWrapper } from '../ui/MagneticWrapper'
import { HeroVisual } from '../ui/HeroVisual'

const ease = [0.32, 0.72, 0, 1] as [number, number, number, number]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
}

const textVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease },
  },
}

const visualVariants = {
  hidden: { opacity: 0, scale: 0.92, x: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 1, ease, delay: 0.2 },
  },
}

export function Hero() {
  const t = useI18nStore((state) => state.t)

  return (
    <section
      id="hero"
      className="relative bg-[#293681] dark:bg-[#0F172A] min-h-[100dvh] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(66,116,217,0.15),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(149,204,221,0.06),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 min-h-[100dvh] flex items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 items-center w-full py-32 md:py-40"
        >
          <motion.div variants={textVariants} className="order-2 lg:order-1">
            <motion.span
              variants={textVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#95CCDD]/90 text-xs font-medium tracking-widest mb-8"
            >
              <Lightning size={14} weight="fill" className="text-[#95CCDD]" />
              {t('nav.services')}
            </motion.span>

            <motion.h1
              variants={textVariants}
              className="text-[clamp(2rem,5vw,4rem)] lg:text-[clamp(2.5rem,4vw,4.5rem)] font-extrabold tracking-tight leading-[1.1] max-w-3xl"
            >
              <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent dark:from-white dark:via-[#95CCDD] dark:to-white/70">
                {t('hero.title')}
              </span>
            </motion.h1>

            <motion.p
              variants={textVariants}
              className="mt-6 text-base md:text-lg text-white/55 dark:text-white/50 leading-relaxed max-w-2xl"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              variants={textVariants}
              className="flex flex-wrap gap-4 mt-10"
            >
              <MagneticWrapper strength={0.25}>
                <Button variant="primary" size="lg" href="#contact">
                  {t('hero.cta.primary')}
                </Button>
              </MagneticWrapper>
              <MagneticWrapper strength={0.25}>
                <Button variant="secondary" size="lg" href="#services">
                  {t('hero.cta.secondary')}
                </Button>
              </MagneticWrapper>
            </motion.div>
          </motion.div>

          <motion.div
            variants={visualVariants}
            className="order-1 lg:order-2 w-full max-w-[520px] lg:max-w-none mx-auto lg:mx-0"
          >
            <HeroVisual />
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#F5F5F5] dark:from-[#0F172A] to-transparent pointer-events-none z-10" />
    </section>
  )
}
