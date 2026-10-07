import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CaretRight } from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'
import { mobileLinkVariants } from './navAnimations'
import type { INavItem } from '../../types'

interface MobileNavLinksProps {
  navItems: INavItem[]
  onClose: () => void
  scrollTo: (href: string) => void
  prefersReduced: boolean
}

const linkClass = (isActive: boolean) =>
  `group flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4274D9] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-white ${
    isActive
      ? 'text-[#4274D9] dark:text-[#95CCDD] bg-[#4274D9]/8 dark:bg-[#95CCDD]/10'
      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
  }`

const caretClass = (isActive: boolean) =>
  `transition-all duration-200 ${
    isActive
      ? 'text-[#4274D9] dark:text-[#95CCDD] opacity-100 translate-x-0'
      : 'text-slate-300 dark:text-slate-600 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
  }`

export function MobileNavLinks({ navItems, onClose, scrollTo, prefersReduced }: MobileNavLinksProps) {
  const t = useI18nStore((state) => state.t)
  const isRouterLink = (href: string) => href.startsWith('/')

  return (
    <div className="space-y-1">
      {navItems.map((link, i) => {
        const caret = <CaretRight size={14} weight="bold" className={caretClass(link.isActive)} />

        if (isRouterLink(link.href)) {
          return (
            <motion.div
              key={link.id}
              custom={i}
              variants={prefersReduced ? {} : mobileLinkVariants}
              initial="hidden"
              animate="visible"
            >
              <Link to={link.href} onClick={onClose} className={linkClass(link.isActive)}>
                <span className="flex-1">{t(link.labelKey)}</span>
                {caret}
              </Link>
            </motion.div>
          )
        }

        return (
          <motion.a
            key={link.id}
            href={link.href}
            custom={i}
            variants={prefersReduced ? {} : mobileLinkVariants}
            initial="hidden"
            animate="visible"
            onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
            className={linkClass(link.isActive)}
          >
            <span className="flex-1">{t(link.labelKey)}</span>
            {caret}
          </motion.a>
        )
      })}
    </div>
  )
}
