import { motion } from 'framer-motion'
import { Check, Lightning } from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'
import type { PricingPackage } from '../../types/pricing'

interface PricingCardProps {
  pkg: PricingPackage
}

export function PricingCard({ pkg }: PricingCardProps) {
  const t = useI18nStore((state) => state.t)
  const isPopular = pkg.isPopular
  const speedValue = parseInt(pkg.speed)

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`relative flex flex-col rounded-[20px] ${
        isPopular
          ? 'shadow-[0_8px_40px_-8px_rgba(66,116,217,0.35)] dark:shadow-[0_8px_40px_-8px_rgba(149,204,221,0.2)]'
          : 'shadow-[0_2px_16px_-2px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_16px_-2px_rgba(0,0,0,0.3)]'
      }`}
    >
      {isPopular && (
        <div className="absolute -inset-px rounded-[20px] bg-gradient-to-b from-[#4274D9] via-[#95CCDD] to-[#D0E7E6] dark:from-[#95CCDD] dark:via-[#4274D9] dark:to-[#293681] -z-10" />
      )}

      <div className={`relative flex flex-col h-full rounded-[20px] p-5 sm:p-6 ${
        isPopular
          ? 'bg-gradient-to-b from-white via-white to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900'
          : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80'
      }`}>
        {isPopular && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#4274D9] to-[#293681] dark:from-[#95CCDD] dark:to-[#4274D9] rounded-full text-[10px] font-bold text-white dark:text-slate-900 tracking-wider uppercase w-fit mb-4">
            <Lightning size={10} weight="fill" />
            {t('pricing.popular')}
          </div>
        )}

        <div className="mb-4">
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
            {t(pkg.titleKey)}
          </h3>
          <div className="flex items-baseline gap-1.5">
            <span
              className={`text-[2.75rem] sm:text-5xl font-extrabold tracking-tighter leading-none ${
                isPopular
                  ? 'bg-gradient-to-br from-[#4274D9] to-[#293681] dark:from-[#95CCDD] dark:to-[#4274D9] bg-clip-text text-transparent'
                  : 'text-slate-900 dark:text-white'
              }`}
            >
              {speedValue}
            </span>
            <span className="text-sm font-medium text-slate-400 dark:text-slate-500">
              Mbps
            </span>
          </div>
        </div>

        <div className={`h-px mb-4 ${
          isPopular
            ? 'bg-gradient-to-r from-[#4274D9]/20 via-[#95CCDD]/30 to-transparent dark:from-[#95CCDD]/20 dark:via-[#4274D9]/30'
            : 'bg-slate-100 dark:bg-slate-800'
        }`} />

        <div className="mb-5">
          <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {t(pkg.priceKey)}
          </span>
          <span className="text-sm text-slate-400 dark:text-slate-500 mr-1">
            /شهرياً
          </span>
        </div>

        <ul className="space-y-2.5 mb-6 flex-1">
          {pkg.featuresKeys.map((key) => (
            <li key={key} className="flex items-center gap-2.5">
              <div className={`flex-shrink-0 w-[18px] h-[18px] rounded-full flex items-center justify-center ${
                isPopular
                  ? 'bg-[#4274D9]/10 dark:bg-[#95CCDD]/10'
                  : 'bg-slate-100 dark:bg-slate-800'
              }`}>
                <Check
                  className={`${
                    isPopular
                      ? 'text-[#4274D9] dark:text-[#95CCDD]'
                      : 'text-slate-400 dark:text-slate-500'
                  }`}
                  weight="bold"
                  size={11}
                />
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-300">{t(key)}</span>
            </li>
          ))}
        </ul>

        <a href="#contact" className="block w-full mt-auto">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer ${
              isPopular
                ? 'bg-gradient-to-r from-[#4274D9] to-[#293681] dark:from-[#95CCDD] dark:to-[#4274D9] text-white dark:text-slate-900 shadow-[0_4px_20px_-4px_rgba(66,116,217,0.4)] dark:shadow-[0_4px_20px_-4px_rgba(149,204,221,0.3)]'
                : 'bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900'
            }`}
          >
            {t('pricing.cta')}
          </motion.button>
        </a>
      </div>
    </motion.div>
  )
}
