import { useEffect, useState, useCallback, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { List } from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'
import { useThemeStore } from '../../store/useThemeStore'
import { useUIStore } from '../../store/useUIStore'
import { ThemeToggle } from '../ui/ThemeToggle'
import { LanguageToggle } from '../ui/LanguageToggle'
import { navLinks } from '../../services/navigation'
import { DesktopNav } from './DesktopNav'
import { MobileNav } from './MobileNav'

export type NavItem = ReturnType<typeof useNavItems>[number]

const NAV_ITEMS = ['hero', 'services', 'features', 'contact']
const SCROLL_THRESHOLD = 20

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
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

function useNavItems(activeId: string) {
  return useMemo(
    () =>
      navLinks.map((link) => ({
        ...link,
        isActive: activeId === link.href.slice(1),
      })),
    [activeId]
  )
}

function useScrollEffects() {
  const { scrollY } = useScroll()
  const [isOverDarkBg, setIsOverDarkBg] = useState(true)

  useEffect(() => {
    const unsub = scrollY.on('change', (latest) => {
      setIsOverDarkBg(latest < window.innerHeight * 0.75)
    })
    return unsub
  }, [scrollY])

  const headerShadow = useTransform(
    scrollY,
    [0, SCROLL_THRESHOLD],
    ['0 4px 30px rgba(0,0,0,0.05)', '0 8px 40px rgba(0,0,0,0.08)']
  )
  const headerShadowDark = useTransform(
    scrollY,
    [0, SCROLL_THRESHOLD],
    ['0 4px 30px rgba(0,0,0,0.08)', '0 8px 40px rgba(0,0,0,0.15)']
  )
  const headerBorderLight = useTransform(
    scrollY,
    [0, SCROLL_THRESHOLD],
    ['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.3)']
  )
  const headerBorderDark = useTransform(
    scrollY,
    [0, SCROLL_THRESHOLD],
    ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.1)']
  )

  return { isOverDarkBg, headerShadow, headerShadowDark, headerBorderLight, headerBorderDark }
}

function useActiveSection() {
  const [activeId, setActiveId] = useState('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )

    NAV_ITEMS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return activeId
}

function useScrollLock(isOpen: boolean) {
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
      document.documentElement.style.setProperty('--scroll-y', `-${scrollY}px`)
    } else {
      const raw = document.documentElement.style.getPropertyValue('--scroll-y')
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      document.documentElement.style.removeProperty('--scroll-y')
      if (raw) {
        const y = -parseInt(raw || '0', 10)
        window.scrollTo({ top: y, behavior: 'instant' })
      }
    }
    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      document.documentElement.style.removeProperty('--scroll-y')
    }
  }, [isOpen])
}

export function Navbar() {
  const t = useI18nStore((state) => state.t)
  const { isDarkMode } = useThemeStore()
  const { isMobileMenuOpen, setMobileMenuOpen, toggleMobileMenu } = useUIStore()

  const activeId = useActiveSection()
  const { isOverDarkBg, headerShadow, headerShadowDark, headerBorderLight, headerBorderDark } = useScrollEffects()
  useScrollLock(isMobileMenuOpen)

  const navItems = useNavItems(activeId)
  const closeMobile = useCallback(() => setMobileMenuOpen(false), [setMobileMenuOpen])
  const logoSrc = !isOverDarkBg && !isDarkMode ? '/MSN-SKYNET-light.png' : '/MSN-SKYNET.png'

  return (
    <>
      <motion.header
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="fixed top-0 inset-x-0 z-50 will-change-transform bg-white/10 dark:bg-slate-950/20 backdrop-blur-lg"
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
            <motion.a href="#hero" variants={staggerItem} className="flex items-center shrink-0">
              <img src={logoSrc} alt="Skynet" className="h-10 lg:h-[60px] w-auto object-contain" />
            </motion.a>

            <DesktopNav navItems={navItems} isOverDarkBg={isOverDarkBg} />

            <motion.div variants={staggerItem} className="flex lg:hidden items-center gap-1.5">
              <LanguageToggle lightOverride={isOverDarkBg} />
              <ThemeToggle lightOverride={isOverDarkBg} />
              <motion.button
                onClick={toggleMobileMenu}
                className={`relative w-11 h-11 flex items-center justify-center rounded-xl transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4274D9] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${
                  isOverDarkBg ? 'text-white hover:bg-white/10' : 'text-slate-800 hover:bg-slate-900/5 dark:text-white dark:hover:bg-white/5'
                }`}
                whileTap={{ scale: 0.92 }}
                aria-label={isMobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              >
                <List size={22} weight="bold" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <MobileNav isOpen={isMobileMenuOpen} navItems={navItems} onClose={closeMobile} />
    </>
  )
}
