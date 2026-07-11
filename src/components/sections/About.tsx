import { motion } from 'framer-motion'
import { GlobeHemisphereWest } from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'
import { NetworkViz } from './NetworkViz'

const ease = [0.32, 0.72, 0, 1] as const

export function About() {
  const t = useI18nStore((state) => state.t)

  return (
    <section id="about" className="relative bg-slate-50 dark:bg-slate-950 py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#95CCDD]/5 dark:bg-[#4274D9]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease }}
          >
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#293681]/5 dark:bg-[#95CCDD]/10 text-[#4274D9] dark:text-[#95CCDD] text-xs font-semibold tracking-wider mb-6"
            >
              <GlobeHemisphereWest size={14} weight="duotone" />
              {t('about.title')}
            </motion.span>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tighter text-slate-900 dark:text-white leading-none mb-6">
              {t('about.title')}
            </h2>
            
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="w-16 h-1 bg-gradient-to-r from-[#4274D9] to-[#95CCDD] rounded-full mb-8 origin-left"
            />
            
            <p className="text-base lg:text-lg leading-relaxed text-slate-600 dark:text-slate-400 mb-4 max-w-lg">
              {t('about.paragraph1')}
            </p>
            <p className="text-base lg:text-lg leading-relaxed text-slate-600 dark:text-slate-400 max-w-lg">
              {t('about.paragraph2')}
            </p>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-6 py-3 bg-[#4274D9] text-white rounded-xl font-semibold text-sm shadow-lg shadow-[#4274D9]/25 cursor-pointer mt-8"
            >
              {t('nav.cta')}
            </motion.a>
          </motion.div>

          <NetworkViz />
        </div>
      </div>
    </section>
  )
}
