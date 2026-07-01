import React from 'react'
import { motion } from 'framer-motion'
import { Check } from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'
import type { PricingPackage } from '../../types/pricing'

export const PricingCard: React.FC<{ pkg: PricingPackage }> = ({ pkg }) => {
  const { t } = useI18nStore()
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`relative flex flex-col p-6 lg:p-8 bg-white/80 dark:bg-[#1E293B]/80 backdrop-blur-md rounded-2xl border border-[#D0E7E6] dark:border-[#334155] transition-shadow ${pkg.isPopular ? 'border-2 border-[#4274D9] scale-105' : ''}`}
    >
      {pkg.isPopular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#4274D9] text-white px-3 py-1 rounded-full text-sm">
          {t('pricing.popular')}
        </div>
      )}
      <h3 className="text-xl font-bold text-center mb-2 text-[#293681] dark:text-white">{t(pkg.titleKey)}</h3>
      <p className="text-center text-[#293681]/60 dark:text-white/50 mb-4">{pkg.speed}</p>
      <div className="text-3xl font-extrabold text-center mb-6 text-[#293681] dark:text-white">{t(pkg.priceKey)}</div>
      <ul className="flex-1 space-y-2 mb-6">
        {pkg.featuresKeys.map((key) => (
          <li key={key} className="flex items-center space-x-2 rtl:space-x-reverse">
            <Check className="flex-shrink-0 text-[#4274D9]" weight="fill" size={20} />
            <span className="text-[#293681]/80 dark:text-white/80">{t(key)}</span>
          </li>
        ))}
      </ul>
      <button
        className={`mt-auto w-full py-2 px-4 rounded-lg font-medium transition-colors ${pkg.isPopular ? 'bg-gradient-to-r from-[#4274D9] to-[#293681] text-white' : 'bg-[#D0E7E6] dark:bg-[#334155] text-[#293681] dark:text-white'}`}
      >
        {t('pricing.cta')}
      </button>
    </motion.div>
  )
}
