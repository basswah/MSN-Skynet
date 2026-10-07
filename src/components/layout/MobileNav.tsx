import { useEffect, useRef, useCallback } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'
import { MagneticButton } from '../ui/MagneticButton'
import {
  mobileOverlayVariants,
  mobilePanelVariants,
} from './navAnimations'
import { MobileNavLinks } from './MobileNavLinks'
import type { INavItem } from '../../types'

interface MobileNavProps {
  isOpen: boolean
  navItems: INavItem[]
  onClose: () => void
  prefersReduced: boolean
}

export function MobileNav({ isOpen, navItems, onClose, prefersReduced }: MobileNavProps) {
  const t = useI18nStore((state) => state.t)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const closeRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const handleLogoClick = () => {
    onClose()
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' })
    }
  }

  const scrollTo = useCallback(
    (href: string) => {
      onClose()
      const el = document.querySelector(href)
      if (!el) {
        navigate(`/${href}`)
        return
      }
      const y = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top: y, behavior: 'smooth' })
    },
    [onClose, navigate]
  )

  useEffect(() => {
    if (isOpen) {
      closeRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const panel = panelRef.current
    if (!panel) return

    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const focusable = Array.from(panel.querySelectorAll(focusableSelector)) as HTMLElement[]
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const overlayAnim = prefersReduced ? {} : { variants: mobileOverlayVariants, initial: 'hidden', animate: 'visible', exit: 'exit' }
  const panelAnim = prefersReduced ? {} : { variants: mobilePanelVariants, initial: 'hidden', animate: 'visible', exit: 'exit' }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            {...overlayAnim}
            className="fixed inset-0 z-[300] bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />

          <motion.div
            key="panel"
            id="mobile-nav-panel"
            ref={panelRef}
            {...panelAnim}
            className="fixed top-0 end-0 bottom-0 z-[400] w-[min(340px,88vw)] lg:hidden flex flex-col bg-white dark:bg-slate-950 shadow-[-24px_0_60px_rgba(0,0,0,0.2)] dark:shadow-[-24px_0_60px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100 dark:border-slate-800/80">
              <Link to="/" onClick={handleLogoClick}>
                <img src="/skynetLogo-dark.svg" alt="" className="h-9 w-auto object-contain" />
              </Link>
              <motion.button
                ref={closeRef}
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4274D9] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
                whileTap={prefersReduced ? {} : { scale: 0.9 }}
                aria-label={t('nav.closeMenu')}
              >
                <X size={18} weight="bold" />
              </motion.button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-5" aria-label={t('a11y.mobileNav')}>
              <MobileNavLinks
                navItems={navItems}
                onClose={onClose}
                scrollTo={scrollTo}
                prefersReduced={prefersReduced}
              />
            </nav>

            <div className="px-4 pb-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
              <MagneticButton variant="primary" size="md" strength={0.15} className="w-full">
                <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('#contact') }} className="w-full text-center">
                  {t('nav.cta')}
                </a>
              </MagneticButton>
              <p className="text-center text-[11px] text-slate-400 dark:text-slate-600">
                {t('footer.copyright')}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
