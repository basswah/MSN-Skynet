import React from 'react'
import { motion, type Variants } from 'framer-motion'
import { useI18nStore } from '../../store/useI18nStore'
import { pricingPackages } from './pricingData'
import { PricingCard } from './PricingCard'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
}

const itemVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 100 } },
}

export const PricingSection: React.FC = () => {
  const { t } = useI18nStore()
  return (
    <section className="py-16 bg-[#F5F5F5] dark:bg-[#0F172A]" id="pricing">
      <div className="container mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl font-bold mb-2 text-[#293681] dark:text-white">{t('pricing.title')}</h2>
        <p className="text-[#293681]/60 dark:text-white/50">{t('pricing.subtitle')}</p>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4"
      >
        {pricingPackages.map((pkg) => (
          <motion.div key={pkg.id} variants={itemVariants}>
            <PricingCard pkg={pkg} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
