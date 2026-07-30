import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { List } from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'
import { useThemeStore } from '../../store/useThemeStore'
import { useUIStore } from '../../store/useUIStore'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useNavItems, useScrollEffects, useActiveSection, useScrollLock } from '../../hooks/useNavbar'
import { ThemeToggle } from '../ui/ThemeToggle'
import { LanguageToggle } from '../ui/LanguageToggle'
import { navStaggerContainer, navStaggerItem } from './navAnimations'
import { DesktopNav } from './DesktopNav'
import { MobileNav } from './MobileNav'

export function Navbar() {
  const t = useI18nStore((state) => state.t)
  const { isDarkMode } = useThemeStore()
  const { isMobileMenuOpen, setMobileMenuOpen, toggleMobileMenu } = useUIStore()
  const prefersReduced = usePrefersReducedMotion()

  const activeId = useActiveSection()
  const { isOverDarkBg, headerShadow, headerShadowDark, headerBorderLight, headerBorderDark } = useScrollEffects()
  useScrollLock(isMobileMenuOpen)

  const navItems = useNavItems(activeId)
  const closeMobile = useCallback(() => setMobileMenuOpen(false), [setMobileMenuOpen])
  const logoSrc = !isOverDarkBg && !isDarkMode ? '/skynetLogo-light.svg' : '/skynetLogo-dark.svg'

  const headerAnimation = prefersReduced ? {} : { variants: navStaggerContainer, initial: 'hidden', animate: 'visible' }

  return (
    <>
      <motion.header
        {...headerAnimation}
        className="fixed top-0 inset-x-0 z-[200] will-change-transform bg-white/10 dark:bg-slate-950/20 backdrop-blur-lg"
      >
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderBottom: `1px solid`,
            borderColor: isMobileMenuOpen ? 'transparent' : headerBorderLight,
            boxShadow: isMobileMenuOpen ? 'none' : headerShadow,
          }}
        />
        <motion.div
          className="absolute inset-0 pointer-events-none dark:block hidden"
          style={{
            borderBottom: `1px solid`,
            borderColor: isMobileMenuOpen ? 'transparent' : headerBorderDark,
            boxShadow: isMobileMenuOpen ? 'none' : headerShadowDark,
          }}
        />

        <div className="relative max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            <motion.a href="#hero" variants={navStaggerItem} className="flex items-center shrink-0">
              <img src={logoSrc} alt="" className="h-10 lg:h-[60px] w-auto object-contain" />
            </motion.a>

            <DesktopNav navItems={navItems} isOverDarkBg={isOverDarkBg} prefersReduced={prefersReduced} />

            <motion.div variants={navStaggerItem} className="flex lg:hidden items-center gap-1.5">
              <LanguageToggle lightOverride={isOverDarkBg} />
              <ThemeToggle lightOverride={isOverDarkBg} />
              <motion.button
                onClick={toggleMobileMenu}
                className={`relative w-11 h-11 flex items-center justify-center rounded-xl transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4274D9] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${
                  isOverDarkBg ? 'text-white hover:bg-white/10' : 'text-slate-800 hover:bg-slate-900/5 dark:text-white dark:hover:bg-white/5'
                }`}
                whileTap={prefersReduced ? {} : { scale: 0.92 }}
                aria-label={isMobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              >
                <List size={22} weight="bold" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <MobileNav isOpen={isMobileMenuOpen} navItems={navItems} onClose={closeMobile} prefersReduced={prefersReduced} />
    </>
  )
}
