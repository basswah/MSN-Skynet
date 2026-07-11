import { motion, AnimatePresence } from 'framer-motion'
import { X, CaretRight } from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'
import { MagneticButton } from '../ui/MagneticButton'
import type { NavItem } from './Navbar'

interface MobileNavProps {
  isOpen: boolean
  navItems: NavItem[]
  onClose: () => void
}

const ease = [0.32, 0.72, 0, 1] as [number, number, number, number]

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, transition: { duration: 0.25, delay: 0.15 } },
}

const panelVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { type: 'spring' as const, stiffness: 260, damping: 28 },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.35, ease },
  },
}

const linkVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease, delay: 0.08 + i * 0.04 },
  }),
}

export function MobileNav({ isOpen, navItems, onClose }: MobileNavProps) {
  const t = useI18nStore((state) => state.t)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />

          <motion.div
            key="panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 end-0 bottom-0 z-50 w-[min(340px,88vw)] lg:hidden flex flex-col bg-white dark:bg-slate-950 shadow-[-24px_0_60px_rgba(0,0,0,0.2)] dark:shadow-[-24px_0_60px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100 dark:border-slate-800/80">
              <a href="#hero" onClick={onClose}>
                <img src="/MSN-SKYNET.png" alt="Skynet" className="h-9 w-auto object-contain" />
              </a>
              <motion.button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4274D9] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
                whileTap={{ scale: 0.9 }}
                aria-label={t('nav.closeMenu')}
              >
                <X size={18} weight="bold" />
              </motion.button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-5">
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-slate-400 dark:text-slate-500 mb-3 px-1">
                {t('nav.home')}
              </p>
              <div className="space-y-1">
                {navItems.map((link, i) => (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    custom={i}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={onClose}
                    className={`group flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4274D9] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-white ${
                      link.isActive
                        ? 'text-[#4274D9] dark:text-[#95CCDD] bg-[#4274D9]/8 dark:bg-[#95CCDD]/10'
                        : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="flex-1">{t(link.labelKey)}</span>
                    <CaretRight
                      size={14}
                      weight="bold"
                      className={`transition-all duration-200 ${
                        link.isActive
                          ? 'text-[#4274D9] dark:text-[#95CCDD] opacity-100 translate-x-0'
                          : 'text-slate-300 dark:text-slate-600 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
                      }`}
                    />
                  </motion.a>
                ))}
              </div>
            </nav>

            <div className="px-4 pb-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
              <MagneticButton variant="primary" size="md" strength={0.15} className="w-full">
                <a href="#contact" onClick={onClose} className="w-full text-center">
                  {t('nav.cta')}
                </a>
              </MagneticButton>
              <p className="text-center text-[11px] text-slate-400 dark:text-slate-600">
                © 2026 Skynet
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
