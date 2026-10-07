import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle } from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import type { EquipmentItem } from '../../types/equipment'
import { equipmentIconMap, equipmentIconColor, equipmentTypeStyles } from './equipmentStyles'

interface EquipmentCardProps {
  item: EquipmentItem
  index: number
}

export function EquipmentCard({ item, index }: EquipmentCardProps) {
  const t = useI18nStore((state) => state.t)
  const prefersReduced = usePrefersReducedMotion()
  const [imgError, setImgError] = useState(false)

  const Icon = equipmentIconMap[item.type]
  const styles = equipmentTypeStyles[item.type]

  return (
    <motion.article
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={prefersReduced ? { duration: 0 } : { duration: 0.55, delay: Math.min(index, 8) * 0.07, ease: [0.32, 0.72, 0, 1] }}
      whileHover={prefersReduced ? {} : { y: -8 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_24px_-6px_rgba(15,23,42,0.12),0_2px_6px_-2px_rgba(15,23,42,0.06)] transition-[border-color,box-shadow] duration-300 hover:border-[#4274D9]/45 hover:shadow-[0_18px_48px_-14px_rgba(66,116,217,0.3),0_4px_12px_-4px_rgba(15,23,42,0.08)] focus-within:border-[#4274D9]/50 dark:border-white/10 dark:bg-slate-900/55 dark:shadow-[0_4px_24px_-6px_rgba(0,0,0,0.4)] dark:hover:border-[#95CCDD]/35 dark:hover:shadow-[0_18px_48px_-14px_rgba(149,204,221,0.18)]"
      aria-label={t(item.nameKey)}
    >
      <div aria-hidden className="absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent dark:via-white/20" />

      <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${styles.imageBg} ring-1 ring-inset ring-slate-900/5 dark:ring-white/5`}>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-slate-100 via-slate-100/90 to-slate-200/80 dark:from-slate-900/60 dark:via-slate-900/40 dark:to-slate-950/50" />
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:16px_16px] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_1px,transparent_1px)]" />
        {!imgError ? (
          <img
            src={item.image}
            alt={t(item.nameKey)}
            width={640}
            height={480}
            loading={index < 3 ? 'eager' : 'lazy'}
            decoding="async"
            className="relative h-full w-full scale-[1.02] object-contain p-5 drop-shadow-[0_10px_16px_rgba(15,23,42,0.2)] transition-transform duration-500 ease-out group-hover:scale-110 group-hover:drop-shadow-[0_14px_22px_rgba(15,23,42,0.24)] dark:drop-shadow-[0_8px_14px_rgba(0,0,0,0.45)] sm:p-6"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="relative flex h-full flex-col items-center justify-center gap-3">
            <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${styles.iconBg} shadow-[0_8px_24px_-8px_rgba(66,116,217,0.45)]`}>
              <Icon size={30} weight="fill" className={equipmentIconColor(item.type)} />
            </div>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{item.brand}</span>
          </div>
        )}

        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/40 via-white/5 to-transparent dark:from-slate-950/45 dark:via-slate-950/5" />

        <span className={`absolute top-3 end-3 z-10 inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase backdrop-blur-sm ${styles.badge}`}>
          {t(`equipment.type.${item.type}`)}
        </span>

        <span className="absolute bottom-3 start-3 z-10 inline-flex items-center rounded-full border border-white/40 bg-white/70 px-2.5 py-1 text-[10px] font-bold tracking-wide text-[#293681] backdrop-blur-sm dark:border-white/10 dark:bg-slate-950/60 dark:text-[#95CCDD]">
          {item.brand}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-bold leading-snug text-slate-900 dark:text-white">
          {t(item.nameKey)}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {t(item.descriptionKey)}
        </p>

        <ul className="mt-4 grid gap-1.5" aria-label={t('equipment.specs.label')}>
          {item.specKeys.map((specKey) => (
            <li key={specKey} className="flex items-start gap-2 text-[13px] text-slate-600 dark:text-slate-400">
              <CheckCircle size={15} weight="fill" className="mt-0.5 shrink-0 text-[#4274D9] dark:text-[#95CCDD]" />
              <span>{t(specKey)}</span>
            </li>
          ))}
        </ul>

        <div aria-hidden className="my-5 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700/80" />

        <div className="mt-auto">
          <Link
            to="/#contact"
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4274D9] to-[#293681] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_4px_16px_-4px_rgba(66,116,217,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-6px_rgba(66,116,217,0.55)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4274D9] focus-visible:ring-offset-2 dark:from-[#95CCDD] dark:to-[#4274D9] dark:focus-visible:ring-offset-slate-950"
          >
            {t('equipment.orderCta')}
            <ArrowRight size={15} weight="bold" className="rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
