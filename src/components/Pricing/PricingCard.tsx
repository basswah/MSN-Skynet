import { Check } from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'
import { MagneticButton } from '../ui/MagneticButton'
import type { PricingPackage } from '../../types/pricing'

interface PricingCardProps {
  pkg: PricingPackage
}

export function PricingCard({ pkg }: PricingCardProps) {
  const t = useI18nStore((state) => state.t)

  return (
    <div
      className={`relative flex flex-col p-6 lg:p-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-xl hover:shadow-[#4274D9]/10 dark:hover:shadow-[#95CCDD]/5 ${
        pkg.isPopular
          ? 'border-2 border-[#4274D9] scale-105 dark:border-[#95CCDD]'
          : 'border-slate-200/60 dark:border-slate-800/60 hover:border-[#4274D9]/40 dark:hover:border-[#95CCDD]/30'
      }`}
    >
      {pkg.isPopular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#4274D9] text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg shadow-[#4274D9]/30">
          {t('pricing.popular')}
        </div>
      )}

      <h3 className="text-xl font-bold text-center mb-2 text-slate-900 dark:text-white">
        {t(pkg.titleKey)}
      </h3>
      <p className="text-center text-slate-600 dark:text-slate-400 mb-4 text-sm">
        {pkg.speed}
      </p>
      <div className="text-3xl font-extrabold text-center mb-6 text-slate-900 dark:text-white">
        {t(pkg.priceKey)}
      </div>

      <ul className="flex-1 space-y-3 mb-6">
        {pkg.featuresKeys.map((key) => (
          <li key={key} className="flex items-center gap-2.5">
            <Check className="flex-shrink-0 text-[#4274D9] dark:text-[#95CCDD]" weight="fill" size={18} />
            <span className="text-sm text-slate-700 dark:text-slate-300">{t(key)}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <MagneticButton
          variant={pkg.isPopular ? 'primary' : 'secondary'}
          size="md"
          strength={0.15}
          className="w-full"
        >
          <span className="w-full text-center">{t('pricing.cta')}</span>
        </MagneticButton>
      </div>
    </div>
  )
}
