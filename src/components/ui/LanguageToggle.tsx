import { motion } from 'framer-motion'
import { useI18nStore } from '../../store/useI18nStore'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface LanguageToggleProps {
  lightOverride?: boolean
}

export function LanguageToggle({ lightOverride = false }: LanguageToggleProps) {
  const { locale, setLanguage, t } = useI18nStore()
  const prefersReduced = usePrefersReducedMotion()
  const isAr = locale.lang === 'ar'

  return (
    <button
      onClick={() => setLanguage(isAr ? 'en' : 'ar')}
      className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4274D9] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${
        lightOverride
          ? 'text-white/70 hover:text-white hover:bg-white/10'
          : 'text-[#95CCDD] hover:bg-white/5 dark:hover:bg-white/5'
      }`}
      aria-label={isAr ? t('lang.toggle.en') : t('lang.toggle.ar')}
    >
      <motion.span
        key={locale.lang}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={prefersReduced ? { duration: 0 } : { duration: 0.2 }}
      >
        {isAr ? 'EN' : 'AR'}
      </motion.span>
      <span className="text-xs opacity-40">|</span>
      <span className="text-xs opacity-60">{isAr ? t('lang.toggle.en') : t('lang.toggle.ar')}</span>
    </button>
  )
}
