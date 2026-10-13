import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle } from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import type { EquipmentItem } from '../../types/equipment'

const ease = [0.32, 0.72, 0, 1] as const

interface ShowcaseCardProps {
  item: EquipmentItem
  index: number
}

export function ShowcaseCard({ item, index }: ShowcaseCardProps) {
  const t = useI18nStore((state) => state.t)
  const prefersReduced = usePrefersReducedMotion()
  const [imgError, setImgError] = useState(false)

  return (
    <motion.article
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={prefersReduced ? { duration: 0 } : { duration: 0.6, delay: index * 0.1, ease }}
      whileHover={prefersReduced ? {} : { y: -8 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_4px_24px_-8px_rgba(15,23,42,0.12)] transition-[border-color,box-shadow] duration-300 hover:border-[#4274D9]/45 hover:shadow-[0_18px_48px_-14px_rgba(66,116,217,0.28)] focus-within:border-[#4274D9]/50 dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-[#95CCDD]/35"
      aria-label={t(item.nameKey)}
    >
      <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200/80 dark:from-slate-900/60 dark:to-slate-950/60 ring-1 ring-inset ring-slate-900/5 dark:ring-white/5`}>
        {!imgError ? (
          <img
            src={item.image}
            alt={t(item.nameKey)}
            width={640}
            height={480}
            loading="lazy"
            decoding="async"
            className="relative h-full w-full scale-[1.02] object-contain p-5 drop-shadow-[0_10px_16px_rgba(15,23,42,0.18)] transition-transform duration-500 ease-out group-hover:scale-110 sm:p-6"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="relative flex h-full items-center justify-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {item.brand}
            </span>
          </div>
        )}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/40 via-white/5 to-transparent dark:from-slate-950/45 dark:via-slate-950/5" />
        <span className="absolute bottom-3 start-3 inline-flex items-center rounded-full border border-white/40 bg-white/70 px-2.5 py-1 text-[10px] font-bold tracking-wide text-[#293681] backdrop-blur-sm dark:border-white/10 dark:bg-slate-950/60 dark:text-[#95CCDD]">
          {item.brand}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-bold leading-snug text-slate-900 dark:text-white">
          {t(item.nameKey)}
        </h3>

        <ul className="mt-3 grid gap-1.5" aria-label={t('equipment.specs.label')}>
          {item.specKeys.map((specKey) => (
            <li key={specKey} className="flex items-start gap-2 text-[13px] text-slate-600 dark:text-slate-400">
              <CheckCircle size={15} weight="fill" className="mt-0.5 shrink-0 text-[#4274D9] dark:text-[#95CCDD]" />
              <span>{t(specKey)}</span>
            </li>
          ))}
        </ul>

        <div aria-hidden className="my-4 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700/80" />

        <div className="mt-auto flex items-center justify-between gap-3">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {t('equipment.price.label')}
          </span>
          <span
            className={
              item.price > 0
                ? 'text-xl font-extrabold tracking-tight text-[#293681] dark:text-[#95CCDD]'
                : 'rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 dark:bg-white/5 dark:text-slate-400'
            }
          >
            {t(item.priceKey)}
          </span>
        </div>
      </div>
    </motion.article>
  )
}
