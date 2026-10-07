import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useI18nStore } from '../../store/useI18nStore'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { equipmentItems } from '../../data/equipmentData'
import type { EquipmentFilterType } from '../../types/equipment'
import { EASE } from './equipmentStyles'

interface EquipmentFilterProps {
  activeFilter: EquipmentFilterType
  onFilterChange: (filter: EquipmentFilterType) => void
}

const FILTER_OPTIONS: { key: EquipmentFilterType; labelKey: string }[] = [
  { key: 'all', labelKey: 'equipment.filter.all' },
  { key: 'dish', labelKey: 'equipment.filter.dish' },
  { key: 'router', labelKey: 'equipment.filter.router' },
  { key: 'accessory', labelKey: 'equipment.filter.accessory' },
  { key: 'switch', labelKey: 'equipment.filter.switch' },
  { key: 'power', labelKey: 'equipment.filter.power' },
]

export function EquipmentFilter({ activeFilter, onFilterChange }: EquipmentFilterProps) {
  const t = useI18nStore((state) => state.t)
  const prefersReduced = usePrefersReducedMotion()

  const counts = useMemo(() => {
    const map: Record<EquipmentFilterType, number> = {
      all: equipmentItems.length,
      dish: 0,
      router: 0,
      accessory: 0,
      switch: 0,
      power: 0,
    }
    for (const item of equipmentItems) {
      map[item.type] += 1
    }
    return map
  }, [])

  return (
    <motion.div
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={prefersReduced ? { duration: 0 } : { duration: 0.55, ease: EASE }}
      className="mx-auto mb-10 max-w-4xl lg:mb-14"
      role="group"
      aria-label={t('equipment.title')}
    >
      <div className="glass-strong flex flex-wrap items-center justify-center gap-2 rounded-2xl p-2 shadow-[0_8px_32px_-12px_rgba(66,116,217,0.2)] sm:gap-2.5 sm:p-2.5">
        {FILTER_OPTIONS.map((filter) => {
          const isActive = activeFilter === filter.key
          return (
            <motion.button
              key={filter.key}
              type="button"
              onClick={() => onFilterChange(filter.key)}
              aria-pressed={isActive}
              whileHover={prefersReduced ? {} : { scale: 1.03 }}
              whileTap={prefersReduced ? {} : { scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className={`relative inline-flex min-h-11 items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4274D9] focus-visible:ring-offset-2 sm:px-4 ${
                isActive
                  ? 'text-white'
                  : 'text-slate-600 hover:bg-[#4274D9]/8 hover:text-[#293681] dark:text-slate-400 dark:hover:bg-[#95CCDD]/10 dark:hover:text-[#95CCDD]'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="equipment-filter-active"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#4274D9] to-[#293681] shadow-[0_4px_18px_-4px_rgba(66,116,217,0.5)] dark:from-[#95CCDD] dark:to-[#4274D9]"
                  transition={prefersReduced ? { duration: 0 } : { type: 'spring', stiffness: 320, damping: 28 }}
                />
              )}
              <span className="relative z-10">{t(filter.labelKey)}</span>
              <span
                aria-hidden
                className={`relative z-10 inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-900/6 text-slate-500 dark:bg-white/8 dark:text-slate-400'
                }`}
              >
                {counts[filter.key]}
              </span>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
