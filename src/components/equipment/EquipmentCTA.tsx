import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, ChatsCircle } from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { EASE } from './equipmentStyles'

const WHATSAPP_URL = 'https://wa.me/963994817193'

export function EquipmentCTA() {
  const t = useI18nStore((state) => state.t)
  const prefersReduced = usePrefersReducedMotion()

  return (
    <section className="relative mt-16 overflow-hidden py-16 sm:mt-24 sm:py-20 lg:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#293681] via-[#1E2A6B] to-[#4274D9]" />
        <div className="absolute -top-20 start-1/4 h-72 w-72 rounded-full bg-[#95CCDD]/25 blur-3xl" />
        <div className="absolute bottom-0 end-10 h-64 w-64 rounded-full bg-[#4274D9]/40 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(2,6,23,0.35))]" />
      </div>

      <motion.div
        initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={prefersReduced ? { duration: 0 } : { duration: 0.7, ease: EASE }}
        className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-6 lg:px-8"
      >
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-wide text-white/90 backdrop-blur-sm">
          <ShieldCheck size={14} weight="fill" />
          {t('equipment.cta.note')}
        </span>

        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
          {t('equipment.cta.title')}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
          {t('equipment.cta.subtitle')}
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-[#293681] shadow-[0_8px_28px_-8px_rgba(255,255,255,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#95CCDD] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#293681] sm:w-auto sm:text-base"
          >
            <ChatsCircle size={18} weight="fill" />
            {t('equipment.cta.primary')}
          </a>
          <Link
            to="/#services"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-white/35 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/12 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#293681] sm:w-auto sm:text-base"
          >
            {t('equipment.cta.secondary')}
            <ArrowRight size={16} weight="bold" className="rtl:rotate-180" />
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
