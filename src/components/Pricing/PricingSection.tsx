import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowsClockwise } from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'
import { pricingPackages } from './pricingData'
import { PricingCard } from './PricingCard'

const ease = [0.32, 0.72, 0, 1] as const

export function PricingSection() {
  const t = useI18nStore((state) => state.t)
  const scrollRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start end', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['1%', '-1%'])

  return (
    <section className="relative py-20 sm:py-28 lg:py-36" id="services">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#4274D9]/5 dark:bg-[#95CCDD]/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#95CCDD]/5 dark:bg-[#4274D9]/3 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-16 lg:mb-20"
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

        <motion.div style={{ x }} className="mb-6">
          <div
            ref={scrollRef}
            className="flex gap-3 sm:gap-4 lg:gap-5 overflow-x-auto pb-6 pt-2 px-1 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {pricingPackages.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease }}
                className="snap-start flex-shrink-0 w-[260px] sm:w-[280px] lg:w-[300px]"
              >
                <PricingCard pkg={pkg} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-2 text-xs text-slate-400 dark:text-slate-500"
        >
          <ArrowsClockwise size={14} className="rotate-90" />
          <span>{t('pricing.scrollHint')}</span>
        </motion.div>
      </div>
    </section>
  )
}
