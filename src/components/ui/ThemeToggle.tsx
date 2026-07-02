import { motion } from 'framer-motion'
import { Sun, Moon } from '@phosphor-icons/react'
import { useThemeStore } from '../../store/useThemeStore'
import { useI18nStore } from '../../store/useI18nStore'

interface ThemeToggleProps {
  lightOverride?: boolean
}

export function ThemeToggle({ lightOverride = false }: ThemeToggleProps) {
  const { isDarkMode, toggleTheme } = useThemeStore()
  const t = useI18nStore((state) => state.t)

  return (
    <motion.button
      onClick={toggleTheme}
      className={`group relative flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-300 cursor-pointer ${
        lightOverride
          ? 'text-white/70 hover:text-white hover:bg-white/10'
          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900/5 dark:hover:bg-white/5'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isDarkMode ? t('theme.toggle.light') : t('theme.toggle.dark')}
    >
      <motion.span
        key={isDarkMode ? 'moon' : 'sun'}
        initial={{ rotate: -90, scale: 0, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 90, scale: 0, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="flex items-center justify-center"
      >
        {isDarkMode ? <Moon size={18} weight="bold" /> : <Sun size={18} weight="bold" />}
      </motion.span>
    </motion.button>
  )
}
