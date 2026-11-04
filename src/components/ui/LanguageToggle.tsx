import { motion } from 'framer-motion'
import { useI18nStore } from '../../store/useI18nStore'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import type { ILanguageToggleProps } from '../../types/languageToggle'

export function LanguageToggle({ lightOverride = false }: ILanguageToggleProps) {
  const { locale, setLanguage, t } = useI18nStore()
  const prefersReduced = usePrefersReducedMotion()
  const isAr = locale.lang === 'ar'

  return (
    <button
      onClick={() => setLanguage(isAr ? 'en' : 'ar')}
      className={`relative flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-300 motion-reduce:transition-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4274D9] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${
        lightOverride
          ? 'text-white/70 hover:text-white hover:bg-white/10'
          : 'text-slate-600 hover:bg-slate-900/5 dark:text-[#95CCDD] dark:hover:bg-white/5'
      }`}
      aria-label={isAr ? t('lang.toggle.en') : t('lang.toggle.ar')}
    >
      <motion.span
        key={locale.lang}
        initial={prefersReduced ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={prefersReduced ? { duration: 0 } : { duration: 0.2 }}
      >
        {isAr ? 'EN' : 'AR'}
      </motion.span>
      <span className="hidden sm:inline text-xs opacity-40" aria-hidden="true">|</span>
      <span className="hidden sm:inline text-xs opacity-60">{isAr ? t('lang.toggle.en') : t('lang.toggle.ar')}</span>
    </button>
  )
}
