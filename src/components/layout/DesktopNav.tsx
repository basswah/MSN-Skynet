import { motion } from 'framer-motion'
import { useI18nStore } from '../../store/useI18nStore'
import { ThemeToggle } from '../ui/ThemeToggle'
import { LanguageToggle } from '../ui/LanguageToggle'
import { MagneticButton } from '../ui/MagneticButton'
import type { NavItem } from './Navbar'

interface DesktopNavProps {
  navItems: NavItem[]
  isOverDarkBg: boolean
}

const ease = [0.32, 0.72, 0, 1] as [number, number, number, number]

const staggerItem = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease, type: 'spring' as const, stiffness: 120, damping: 18 },
  },
}

export function DesktopNav({ navItems, isOverDarkBg }: DesktopNavProps) {
  const t = useI18nStore((state) => state.t)

  return (
    <>
      <nav className="hidden lg:flex items-center gap-1" role="navigation">
        {navItems.map((link) => (
          <motion.a
            key={link.id}
            href={link.href}
            variants={staggerItem}
            className="relative px-4 py-2 text-sm font-medium transition-colors duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4274D9] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 rounded-lg"
          >
            <span
              className={`relative z-10 transition-colors duration-300 ${
                link.isActive
                  ? 'text-[#4274D9] dark:text-[#95CCDD]'
                  : isOverDarkBg
                    ? 'text-white/70 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {t(link.labelKey)}
            </span>
            <motion.span
              layoutId="nav-indicator"
              className="absolute inset-x-3 bottom-0 h-[2px] rounded-full"
              initial={false}
              animate={{
                scaleX: link.isActive ? 1 : 0,
                opacity: link.isActive ? 1 : 0,
                backgroundColor: link.isActive ? 'rgb(66,116,217)' : 'rgba(66,116,217,0.3)',
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            />
          </motion.a>
        ))}
      </nav>

      <motion.div variants={staggerItem} className="hidden lg:flex items-center gap-2">
        <LanguageToggle lightOverride={isOverDarkBg} />
        <ThemeToggle lightOverride={isOverDarkBg} />
        <MagneticButton variant="primary" size="sm" strength={0.2}>
          <a href="#contact">{t('nav.cta')}</a>
        </MagneticButton>
      </motion.div>
    </>
  )
}
