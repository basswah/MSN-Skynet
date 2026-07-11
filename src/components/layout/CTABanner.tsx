import { motion } from 'framer-motion'
import { ArrowUp } from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'

const ease = [0.32, 0.72, 0, 1] as const

export function CTABanner() {
  const t = useI18nStore((state) => state.t)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease }}
      className="pt-12 sm:pt-16 lg:pt-20 pb-10 sm:pb-14 lg:pb-16"
    >
      <div className="relative rounded-2xl bg-gradient-to-br from-[#4274D9]/10 via-[#293681]/5 to-transparent border border-white/[0.06] p-6 sm:p-8 lg:p-10">
        <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_30%_50%,rgba(66,116,217,0.08),transparent_60%)] pointer-events-none" />
        <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-10">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.15em] text-[#95CCDD]/60 mb-3">
              {t('footer.cta.title')}
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {t('footer.cta.subtitle')}
            </h2>
            <p className="mt-3 text-sm text-white/40 leading-relaxed">
              {t('footer.cta.description')}
            </p>
          </div>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-6 py-3.5 bg-[#4274D9] text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:bg-[#3a64d2] hover:shadow-[0_8px_30px_-12px_rgba(66,116,217,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4274D9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617] active:scale-[0.98] shrink-0"
            aria-label={t('nav.cta')}
          >
            {t('nav.cta')}
            <ArrowUp
              size={16}
              weight="bold"
              className="rotate-[-90deg] transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-90 rtl:group-hover:-translate-x-1"
            />
          </a>
        </div>
      </div>
    </motion.div>
  )
}
