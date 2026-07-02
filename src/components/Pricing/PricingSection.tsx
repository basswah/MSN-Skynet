import { motion } from 'framer-motion'
import { useI18nStore } from '../../store/useI18nStore'
import { pricingPackages } from './pricingData'
import { PricingCard } from './PricingCard'

const ease = [0.32, 0.72, 0, 1] as const

export function PricingSection() {
  const t = useI18nStore((state) => state.t)

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-slate-50 dark:bg-slate-950 overflow-hidden" id="services">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-10 sm:mb-14 lg:mb-18"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-none text-slate-900 dark:text-white">
            <span className="bg-gradient-to-r from-[#4274D9] to-[#95CCDD] bg-clip-text text-transparent">
              {t('pricing.title')}
            </span>
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-[#4274D9] to-[#95CCDD] rounded-full mx-auto mt-5" />
          <p className="mt-5 text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 items-start">
          {pricingPackages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.15, ease }}
              className={pkg.isPopular ? 'md:-mt-4 lg:-mt-6' : ''}
            >
              <PricingCard pkg={pkg} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
