import { useEffect, useState, useCallback, useMemo } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { List, X, WifiHigh } from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'
import { useUIStore } from '../../store/useUIStore'
import { ThemeToggle } from '../ui/ThemeToggle'
import { LanguageToggle } from '../ui/LanguageToggle'
import { MagneticButton } from '../ui/MagneticButton'
import { navLinks } from '../../services/navigation'

const NAV_ITEMS = ['hero', 'services', 'features', 'contact']

const ease = [0.32, 0.72, 0, 1] as [number, number, number, number]

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
}

const staggerItem = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease, type: 'spring' as const, stiffness: 120, damping: 18 },
  },
}

const mobileOverlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2, delay: 0.1 } },
}

const mobilePanelVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { duration: 0.45, ease, type: 'spring' as const, stiffness: 300, damping: 30 },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.3, ease },
  },
}

const mobileLinkVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease, delay: 0.1 + i * 0.05 },
  }),
}

export function Navbar() {
  const t = useI18nStore((state) => state.t)
  const { isMobileMenuOpen, setMobileMenuOpen, toggleMobileMenu } = useUIStore()
  const [activeId, setActiveId] = useState('hero')
  const { scrollY } = useScroll()
  const [isOverDarkBg, setIsOverDarkBg] = useState(true)

  useEffect(() => {
    const unsub = scrollY.on('change', (latest) => {
      setIsOverDarkBg(latest < window.innerHeight * 0.75)
    })
    return unsub
  }, [scrollY])

  const SCROLL_THRESHOLD = 20

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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.insetInline = '0'
      document.body.style.top = `-${window.scrollY}px`
    } else {
      const scrollY = document.body.style.top
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.insetInline = ''
      document.body.style.top = ''
      if (scrollY) {
        window.scrollTo(0, -parseInt(scrollY || '0', 10))
      }
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.insetInline = ''
      document.body.style.top = ''
    }
  }, [isMobileMenuOpen])

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

  const closeMobile = useCallback(() => setMobileMenuOpen(false), [setMobileMenuOpen])

  const navItems = useMemo(
    () =>
      navLinks.map((link) => ({
        ...link,
        isActive: activeId === link.href.slice(1),
      })),
    [activeId]
  )

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
          <div className="flex items-center justify-between h-[72px]">
            <motion.a
              href="#hero"
              variants={staggerItem}
              className={`flex items-center gap-2.5 text-lg lg:text-xl font-extrabold tracking-tight shrink-0 group transition-colors duration-300 ${isOverDarkBg ? 'text-white' : 'text-slate-900'}`}
            >
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="flex items-center justify-center"
              >
                <WifiHigh size={26} weight="fill" className="text-[#4274D9]" />
              </motion.span>
              <span className="text-[#4274D9]">SKY</span>
              <span className={isOverDarkBg ? 'text-white' : 'text-slate-900'}>NET</span>
            </motion.a>

            <nav className="hidden lg:flex items-center gap-1" role="navigation">
              {navItems.map((link) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  variants={staggerItem}
                  className="relative px-4 py-2 text-sm font-medium transition-colors duration-300 group"
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
                      backgroundColor: link.isActive
                        ? 'rgb(66,116,217)'
                        : 'rgba(66,116,217,0.3)',
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

            <motion.div variants={staggerItem} className="flex lg:hidden items-center gap-1">
              <ThemeToggle lightOverride={isOverDarkBg} />
              <motion.button
                onClick={toggleMobileMenu}
                className={`relative w-10 h-10 flex items-center justify-center rounded-xl transition-colors duration-300 cursor-pointer ${isOverDarkBg ? 'text-white hover:bg-white/10' : 'text-slate-900 hover:bg-slate-900/5 dark:text-white dark:hover:bg-white/5'}`}
                whileTap={{ scale: 0.9 }}
                aria-label={isMobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.25, ease }}
                    >
                      <X size={20} weight="bold" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.25, ease }}
                    >
                      <List size={20} weight="bold" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              key="mobile-overlay"
              variants={mobileOverlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={closeMobile}
            />
            <motion.div
              key="mobile-panel"
              variants={mobilePanelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 end-0 bottom-0 z-50 w-[min(320px,85vw)] lg:hidden flex flex-col bg-white/20 dark:bg-slate-950/30 backdrop-blur-xl border-s border-slate-200/60 dark:border-slate-800/60 shadow-[-20px_0_60px_rgba(0,0,0,0.15)]"
            >
              <div className="flex items-center justify-between px-5 h-16 border-b border-slate-200/40 dark:border-slate-800/40">
                <a href="#hero" onClick={closeMobile} className="flex items-center gap-2 font-extrabold text-lg text-slate-900 dark:text-white">
                  <WifiHigh size={22} weight="fill" className="text-[#4274D9]" />
                  <span className="text-[#4274D9]">SKY</span>
                  <span>NET</span>
                </a>
                <motion.button
                  onClick={closeMobile}
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-900/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  whileTap={{ scale: 0.9 }}
                  aria-label={t('nav.closeMenu')}
                >
                  <X size={18} weight="bold" />
                </motion.button>
              </div>

              <nav className="flex-1 overflow-y-auto px-3 py-4">
                {navItems.map((link, i) => (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    custom={i}
                    variants={mobileLinkVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={closeMobile}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-300 ${
                      link.isActive
                        ? 'text-[#4274D9] dark:text-[#95CCDD] bg-[#4274D9]/5 dark:bg-white/5'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900/[0.03] dark:hover:bg-white/[0.03]'
                    }`}
                  >
                    {t(link.labelKey)}
                    {link.isActive && (
                      <motion.span
                        layoutId="mobile-active-dot"
                        className="ms-auto w-1.5 h-1.5 rounded-full bg-[#4274D9] dark:bg-[#95CCDD]"
                        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                      />
                    )}
                  </motion.a>
                ))}
              </nav>

              <div className="px-3 pb-4 space-y-3 border-t border-slate-200/40 dark:border-slate-800/40 pt-4">
                <div className="flex items-center justify-center gap-2 px-3">
                  <LanguageToggle />
                  <ThemeToggle />
                </div>
                <MagneticButton variant="primary" size="md" strength={0.15} className="w-full">
                  <a href="#contact" onClick={closeMobile} className="w-full text-center">
                    {t('nav.cta')}
                  </a>
                </MagneticButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
