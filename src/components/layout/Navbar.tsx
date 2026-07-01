import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { List, X, WifiHigh } from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'
import { useUIStore } from '../../store/useUIStore'
import { ThemeToggle } from '../ui/ThemeToggle'
import { MagneticWrapper } from '../ui/MagneticWrapper'
import { Button } from '../ui/Button'
import { navLinks } from '../../services/navigation'

const NAV_ITEMS = ['hero', 'services', 'features', 'contact']

const ease = [0.32, 0.72, 0, 1] as [number, number, number, number]

const containerVariants = {
  hidden: { y: -40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease, staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const childVariants = {
  hidden: { y: -16, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease, type: 'spring' as const, stiffness: 120, damping: 18 },
  },
}

const linkVariants = {
  hidden: { y: -12, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease, delay: 0.15 + i * 0.06 },
  }),
}

const mobileMenuVariants = {
  hidden: { opacity: 0, y: -24, scaleY: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scaleY: 1,
    transition: { duration: 0.5, ease, staggerChildren: 0.05, delayChildren: 0.12 },
  },
  exit: {
    opacity: 0,
    y: -24,
    scaleY: 0.96,
    transition: { duration: 0.3, ease },
  },
}

const mobileLinkVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease, type: 'spring' as const, stiffness: 100, damping: 20 },
  },
}

export function Navbar() {
  const t = useI18nStore((state) => state.t)
  const { isScrolled, isMobileMenuOpen, setScrolled, setMobileMenuOpen, toggleMobileMenu } = useUIStore()
  const [activeId, setActiveId] = useState('hero')

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > 20)
  }, [setScrolled])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
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

  return (
    <motion.header
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        isScrolled || isMobileMenuOpen
          ? 'bg-white/70 dark:bg-[#1E293B]/80 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] border-b border-white/10 dark:border-white/5'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <motion.a
            href="#hero"
            variants={childVariants}
            className="flex items-center gap-2 text-lg lg:text-xl font-extrabold tracking-tight text-primary-dark dark:text-white shrink-0 group"
          >
            <motion.span
              animate={{ y: [0, -2.5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center justify-center"
            >
              <WifiHigh size={24} weight="fill" className="text-primary-blue" />
            </motion.span>
            <span className="text-primary-blue">SKY</span>
            <span className="text-primary-dark dark:text-white">NET</span>
          </motion.a>

          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.id}
                href={link.href}
                custom={i}
                variants={linkVariants}
                className="relative px-4 py-2 text-sm font-medium transition-colors duration-300 group"
              >
                <span
                  className={`relative z-10 transition-colors duration-300 ${
                    activeId === link.href.slice(1)
                      ? 'text-primary-blue dark:text-secondary'
                      : 'text-primary-dark/65 dark:text-white/65 group-hover:text-primary-dark dark:group-hover:text-white'
                  }`}
                >
                  {t(link.labelKey)}
                </span>
                <motion.span
                  layoutId="nav-indicator"
                  className={`absolute inset-x-3 bottom-0 h-[2px] rounded-full ${
                    activeId === link.href.slice(1)
                      ? 'bg-primary-blue dark:bg-secondary'
                      : 'bg-primary-blue/30 dark:bg-white/20'
                  }`}
                  initial={false}
                  animate={{
                    scaleX: activeId === link.href.slice(1) ? 1 : 0,
                    opacity: activeId === link.href.slice(1) ? 1 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                />
              </motion.a>
            ))}
          </nav>

          <motion.div variants={childVariants} className="hidden lg:flex items-center gap-2">
            <ThemeToggle />
            <MagneticWrapper strength={0.2}>
              <Button variant="primary" size="sm" showArrow={false} href="#contact">
                {t('nav.cta')}
              </Button>
            </MagneticWrapper>
          </motion.div>

          <motion.div variants={childVariants} className="flex lg:hidden items-center gap-1">
            <ThemeToggle />
            <motion.button
              onClick={toggleMobileMenu}
              className="relative w-10 h-10 flex items-center justify-center rounded-xl text-primary-dark dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-300 cursor-pointer"
              whileTap={{ scale: 0.9 }}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3, ease }}
                  >
                    <X size={20} weight="bold" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3, ease }}
                  >
                    <List size={20} weight="bold" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="lg:hidden mx-4 mt-1 rounded-2xl border border-white/10 dark:border-white/5 bg-white/90 dark:bg-[#1E293B]/90 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_20px_40px_-15px_rgba(0,0,0,0.1)] overflow-hidden"
            style={{ transformOrigin: 'top center' }}
          >
            <nav className="flex flex-col px-3 py-4 gap-0.5">
              {navLinks.map((link) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  variants={mobileLinkVariants}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`relative px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-300 ${
                    activeId === link.href.slice(1)
                      ? 'text-primary-blue dark:text-secondary bg-primary-blue/5 dark:bg-white/5'
                      : 'text-primary-dark/70 dark:text-white/70 hover:text-primary-dark dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {t(link.labelKey)}
                  {activeId === link.href.slice(1) && (
                    <motion.span
                      layoutId="mobile-active-dot"
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary-blue dark:bg-secondary"
                      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                    />
                  )}
                </motion.a>
              ))}
            </nav>
            <div className="px-3 pb-4">
              <MagneticWrapper strength={0.15}>
                <Button variant="primary" size="md" className="w-full justify-center" showArrow={false} href="#contact">
                  {t('nav.cta')}
                </Button>
              </MagneticWrapper>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
