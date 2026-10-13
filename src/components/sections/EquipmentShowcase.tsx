import { motion } from 'framer-motion'
import { ArrowRight, SquaresFour } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { useI18nStore } from '../../store/useI18nStore'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { equipmentItems } from '../../data/equipmentData'
import { ShowcaseCard } from './ShowcaseCard'

const featuredIds = ['cudy-tr3000', 'netis-n6', 'mimosa-c5x'] as const

const featuredItems = featuredIds
  .map((id) => equipmentItems.find((item) => item.id === id))
  .filter((item): item is (typeof equipmentItems)[number] => item !== undefined)

const ease = [0.32, 0.72, 0, 1] as const

export function EquipmentShowcase() {
  const t = useI18nStore((state) => state.t)
  const prefersReduced = usePrefersReducedMotion()

  if (featuredItems.length === 0) return null

  return (
    <section id="showcase" className="relative bg-slate-50 dark:bg-slate-950 py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#4274D9]/5 dark:bg-[#95CCDD]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.8, ease }}
          className="flex flex-col items-center text-center mb-14 lg:mb-18"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#293681]/5 dark:bg-[#95CCDD]/10 text-[#4274D9] dark:text-[#95CCDD] text-xs font-semibold tracking-wider mb-5">
            <SquaresFour size={14} weight="fill" />
            {t('showcase.badge')}
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-none text-slate-900 dark:text-white">
            <span className="bg-gradient-to-r from-[#4274D9] to-[#95CCDD] bg-clip-text text-transparent">
              {t('showcase.title')}
            </span>
          </h2>
          <div aria-hidden className="w-12 h-0.5 bg-gradient-to-r from-[#4274D9] to-[#95CCDD] rounded-full mt-5" />
          <p className="mt-5 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400">
            {t('showcase.desc')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredItems.map((item, i) => (
            <ShowcaseCard key={item.id} item={item} index={i} />
          ))}
        </div>

        <motion.div
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.6, delay: 0.3, ease }}
          className="mt-12 flex justify-center"
        >
          <Link
            to="/equipment"
            className="group inline-flex min-h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-[#4274D9] to-[#293681] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_4px_16px_-4px_rgba(66,116,217,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-6px_rgba(66,116,217,0.55)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4274D9] focus-visible:ring-offset-2 dark:from-[#95CCDD] dark:to-[#4274D9] dark:text-slate-950 dark:focus-visible:ring-offset-slate-950"
            aria-label={t('showcase.browseAll')}
          >
            {t('showcase.browseAll')}
            <ArrowRight size={16} weight="bold" className="transition-transform duration-200 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
