import { motion, type Variants } from 'framer-motion'
import { MapPin } from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { CoverageVisual } from './CoverageVisual'

const ease = [0.32, 0.72, 0, 1] as const

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.2 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 120, damping: 18 },
  },
}

const allAreaKeys = Array.from({ length: 14 }, (_, i) => `coverage.area.${i + 1}`)
const featuredKeys = allAreaKeys.slice(0, 3)
const secondaryKeys = allAreaKeys.slice(3)

export function Coverage() {
  const t = useI18nStore((state) => state.t)
  const prefersReduced = usePrefersReducedMotion()

  return (
    <section id="coverage" className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/80 to-white dark:from-slate-900 dark:via-slate-950/80 dark:to-slate-900" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4274D9]/[0.04] dark:bg-[#95CCDD]/[0.03] rounded-full blur-[140px] -translate-y-1/4 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#293681]/[0.03] dark:bg-[#4274D9]/[0.03] rounded-full blur-[120px] translate-y-1/4 -translate-x-1/4 pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-12 lg:gap-16 items-start mb-16 lg:mb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={headerVariants}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#293681]/5 dark:bg-[#95CCDD]/10 text-[#4274D9] dark:text-[#95CCDD] text-xs font-semibold tracking-wider mb-5">
              {t('coverage.title')}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] text-slate-900 dark:text-white mb-5">
              {t('coverage.subtitle')}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#4274D9] to-[#95CCDD] rounded-full mb-8" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <CoverageVisual />
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={prefersReduced ? {} : staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 mb-6"
        >
          {featuredKeys.map((key) => (
            <motion.div
              key={key}
              variants={cardVariants}
              className="group relative flex items-center gap-4 p-5 sm:p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm overflow-hidden cursor-default transition-all duration-300 hover:border-[#4274D9]/30 dark:hover:border-[#95CCDD]/20 hover:-translate-y-1 hover:shadow-[0_8px_30px_-12px_rgba(66,116,217,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4274D9] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 will-change-transform"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#4274D9]/0 via-transparent to-[#95CCDD]/0 group-hover:from-[#4274D9]/[0.03] group-hover:to-[#95CCDD]/[0.02] transition-all duration-500" />
              <div className="relative flex-shrink-0 w-10 h-10 rounded-xl bg-[#4274D9]/10 dark:bg-[#95CCDD]/10 flex items-center justify-center group-hover:bg-[#4274D9]/20 dark:group-hover:bg-[#95CCDD]/15 transition-colors duration-300">
                <MapPin size={18} weight="fill" className="text-[#4274D9] dark:text-[#95CCDD] transition-transform duration-300 group-hover:scale-110" />
              </div>
              <span className="relative text-sm font-semibold text-slate-700 dark:text-slate-300 transition-colors duration-200 group-hover:text-slate-900 dark:group-hover:text-white">
                {t(key)}
              </span>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#4274D9]/0 group-hover:bg-[#4274D9]/40 dark:group-hover:bg-[#95CCDD]/40 transition-all duration-300 group-hover:scale-100 scale-0" />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={prefersReduced ? {} : staggerContainer}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4"
        >
          {secondaryKeys.map((key) => (
            <motion.div
              key={key}
              variants={cardVariants}
              className="group relative flex items-center gap-2.5 p-3.5 sm:p-4 rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-white/40 dark:bg-slate-900/30 backdrop-blur-sm transition-all duration-200 hover:border-[#4274D9]/20 dark:hover:border-[#95CCDD]/15 hover:bg-white/70 dark:hover:bg-slate-900/50 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4274D9] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 will-change-transform"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#4274D9]/5 dark:bg-[#95CCDD]/5 flex items-center justify-center group-hover:bg-[#4274D9]/10 dark:group-hover:bg-[#95CCDD]/10 transition-colors duration-200">
                <MapPin size={14} weight="fill" className="text-[#4274D9]/60 dark:text-[#95CCDD]/60 group-hover:text-[#4274D9] dark:group-hover:text-[#95CCDD] transition-colors duration-200" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors duration-200 truncate">
                {t(key)}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}