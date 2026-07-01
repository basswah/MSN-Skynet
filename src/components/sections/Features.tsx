import { motion } from 'framer-motion'
import { Lightning, MapPin, WifiHigh, Headset } from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'

interface IFeatureItem {
  id: string
  titleKey: string
  descriptionKey: string
  icon: keyof typeof iconMap
}

const iconMap = {
  Lightning,
  MapPin,
  WifiHigh,
  Headset,
}

const features: IFeatureItem[] = [
  { id: 'installation', titleKey: 'feature.installation', descriptionKey: 'feature.installation.desc', icon: 'Lightning' },
  { id: 'coverage', titleKey: 'feature.coverage', descriptionKey: 'feature.coverage.desc', icon: 'MapPin' },
  { id: 'stability', titleKey: 'feature.stability', descriptionKey: 'feature.stability.desc', icon: 'WifiHigh' },
  { id: 'support', titleKey: 'feature.support', descriptionKey: 'feature.support.desc', icon: 'Headset' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] },
  },
}

export function Features() {
  const t = useI18nStore((state) => state.t)

  return (
    <section id="features" className="relative bg-[#F5F5F5] dark:bg-[#0F172A] py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#4274D9]/5 dark:bg-[#95CCDD]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-none text-[#293681] dark:text-white">
            <span className="bg-gradient-to-r from-[#4274D9] to-[#95CCDD] bg-clip-text text-transparent">
              {t('features.sectionTitle')}
            </span>
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-[#4274D9] to-[#95CCDD] rounded-full mx-auto mt-5" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => {
            const Icon = iconMap[feature.icon]
            return (
              <motion.div
                key={feature.id}
                variants={cardVariants}
                className="group relative bg-white/50 dark:bg-[#1E293B]/40 backdrop-blur-sm border border-[#D0E7E6] dark:border-[#334155]/50 rounded-2xl p-8 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[#4274D9]/40 dark:hover:border-[#95CCDD]/30 hover:shadow-xl hover:shadow-[#4274D9]/5"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4274D9] to-[#95CCDD] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 ease-out">
                  <Icon size={22} weight="fill" className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#293681] dark:text-white mb-2">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-sm text-[#293681]/60 dark:text-white/50 leading-relaxed">
                  {t(feature.descriptionKey)}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
