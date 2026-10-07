import { AnimatePresence, motion } from 'framer-motion'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import type { EquipmentItem } from '../../types/equipment'
import { EquipmentCard } from './EquipmentCard'
import { EASE } from './equipmentStyles'

interface EquipmentGridProps {
  items: EquipmentItem[]
  totalCount: number
}

export function EquipmentGrid({ items, totalCount }: EquipmentGridProps) {
  const t = useI18nStore((state) => state.t)
  const prefersReduced = usePrefersReducedMotion()

  return (
    <section aria-label={t('equipment.title')} className="relative pb-8">
      <div className="mb-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-slate-500 dark:text-slate-400 sm:mb-8">
        <span className="font-medium">{t('equipment.results.label')}</span>
        <span className="inline-flex min-w-8 items-center justify-center rounded-full bg-[#4274D9]/10 px-2 py-0.5 text-xs font-bold tabular-nums text-[#4274D9] dark:bg-[#95CCDD]/12 dark:text-[#95CCDD]">
          {items.length}
        </span>
        <span aria-hidden>/</span>
        <span className="tabular-nums">{totalCount}</span>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                layout={!prefersReduced}
                exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                className="h-full"
              >
                <EquipmentCard item={item} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.45, ease: EASE }}
          className="glass mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl px-8 py-16 text-center"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4274D9] to-[#95CCDD] text-white shadow-[0_8px_24px_-8px_rgba(66,116,217,0.45)]">
            <MagnifyingGlass size={24} weight="bold" />
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('equipment.empty.title')}</h3>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{t('equipment.empty.desc')}</p>
        </motion.div>
      )}
    </section>
  )
}
