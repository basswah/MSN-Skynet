import { motion } from 'framer-motion'
import { Lightning, MapPin, WifiHigh, Headset } from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'
import type { IFeature } from '../../types'

const iconMap = { Lightning, MapPin, WifiHigh, Headset } as const

const features: IFeature[] = [
  { id: 'installation', iconName: 'Lightning', titleKey: 'feature.installation', descriptionKey: 'feature.installation.desc' },
  { id: 'coverage', iconName: 'MapPin', titleKey: 'feature.coverage', descriptionKey: 'feature.coverage.desc' },
  { id: 'stability', iconName: 'WifiHigh', titleKey: 'feature.stability', descriptionKey: 'feature.stability.desc' },
  { id: 'support', iconName: 'Headset', titleKey: 'feature.support', descriptionKey: 'feature.support.desc' },
]

const ease = [0.32, 0.72, 0, 1] as const

export function Features() {
  const t = useI18nStore((state) => state.t)

  return (
    <section id="features" className="relative bg-slate-50 dark:bg-slate-950 py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#4274D9]/5 dark:bg-[#95CCDD]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-none text-slate-900 dark:text-white">
            <span className="bg-gradient-to-r from-[#4274D9] to-[#95CCDD] bg-clip-text text-transparent">
              {t('features.sectionTitle')}
            </span>
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-[#4274D9] to-[#95CCDD] rounded-full mx-auto mt-5" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = iconMap[feature.iconName as keyof typeof iconMap]
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                className="group relative bg-white/50 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-5 sm:p-8 transition-all duration-200 ease-out hover:-translate-y-2 hover:border-[#4274D9]/40 dark:hover:border-[#95CCDD]/30 hover:shadow-xl hover:shadow-[#4274D9]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4274D9] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 will-change-transform"
                tabIndex={0}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4274D9] to-[#95CCDD] flex items-center justify-center mb-5 transition-transform duration-500 ease-out group-hover:scale-110">
                  <Icon size={22} weight="fill" className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t(feature.descriptionKey)}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
