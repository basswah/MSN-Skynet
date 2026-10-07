import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { EASE } from './equipmentStyles'

export function EquipmentHero() {
  const t = useI18nStore((state) => state.t)
  const prefersReduced = usePrefersReducedMotion()

  return (
    <section className="relative overflow-hidden pt-10 pb-14 sm:pt-14 sm:pb-18 lg:pt-16 lg:pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F8FF] via-white to-slate-50 dark:from-[#020617] dark:via-[#0B1224] dark:to-[#020617]" />
        <div className="absolute top-0 left-1/2 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-[#4274D9]/12 blur-[130px] dark:bg-[#95CCDD]/8" />
        <div className="absolute -top-24 end-[-8rem] h-72 w-72 rounded-full bg-[#95CCDD]/35 blur-3xl dark:bg-[#4274D9]/20" />
        <div className="absolute bottom-0 start-[-6rem] h-64 w-64 rounded-full bg-[#D0E7E6]/45 blur-3xl dark:bg-[#293681]/40" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(66,116,217,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(66,116,217,0.05)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] dark:bg-[linear-gradient(to_right,rgba(149,204,221,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(149,204,221,0.05)_1px,transparent_1px)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.75, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <Link
            to="/"
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#4274D9]/20 bg-white/70 px-4 py-2 text-sm font-medium text-[#4274D9] transition-colors hover:border-[#4274D9]/45 hover:bg-white dark:border-[#95CCDD]/20 dark:bg-white/5 dark:text-[#95CCDD] dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4274D9] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#020617]"
          >
            <ArrowRight size={14} weight="bold" className="ltr:rotate-180" />
            {t('equipment.backToHome')}
          </Link>

          <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-[4rem] dark:text-white">
            <span className="gradient-brand-text">{t('equipment.title')}</span>
          </h1>

          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-[#4274D9] via-[#95CCDD] to-[#D0E7E6]" />

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
            {t('equipment.subtitle')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
