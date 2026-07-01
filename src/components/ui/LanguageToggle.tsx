import { motion } from 'framer-motion'
import { useI18nStore } from '../../store/useI18nStore'

export function LanguageToggle() {
  const { locale, setLanguage, t } = useI18nStore()
  const isAr = locale.lang === 'ar'

  return (
    <button
      onClick={() => setLanguage(isAr ? 'en' : 'ar')}
      className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-[#95CCDD] hover:bg-white/5 transition-colors duration-300 cursor-pointer"
      aria-label={isAr ? t('lang.toggle.en') : t('lang.toggle.ar')}
    >
      <motion.span
        key={locale.lang}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {isAr ? 'EN' : 'AR'}
      </motion.span>
      <span className="text-xs opacity-40">|</span>
      <span className="text-xs opacity-60">{isAr ? t('lang.toggle.en') : t('lang.toggle.ar')}</span>
    </button>
  )
}
