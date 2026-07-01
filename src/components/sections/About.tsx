import { motion } from 'framer-motion'
import { Satellite, Globe, Shield } from 'lucide-react'
import { useI18nStore } from '../../store/useI18nStore'
import { ScrollReveal } from '../ui/ScrollReveal'

const milestones = [
  { icon: Globe, year: '2009', key: 'stats.years' },
  { icon: Satellite, year: '2015', key: 'stats.cities' },
  { icon: Shield, year: '2026', key: 'stats.clients' },
]

function AboutContent() {
  const t = useI18nStore((state) => state.t)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      <ScrollReveal>
        <div>
          <span className="inline-block px-4 py-1.5 rounded-full bg-tertiary text-primary-dark/70 text-sm font-medium mb-6">
            {t('about.title')}
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-dark tracking-tighter leading-tight mb-6">
            {t('about.title')}
          </h2>

          <p className="text-base leading-relaxed text-primary-dark/70 mb-4 max-w-lg">
            {t('about.paragraph1')}
          </p>

          <p className="text-base leading-relaxed text-primary-dark/70 max-w-lg">
            {t('about.paragraph2')}
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <div className="space-y-5">
          {milestones.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                type: 'spring' as const,
                stiffness: 100,
                damping: 20,
                delay: 0.1 * i,
              }}
              className="flex items-center gap-5 bg-white rounded-2xl p-5 border border-tertiary/50 shadow-[0_4px_20px_-8px_rgba(41,54,129,0.08)]"
            >
              <div className="w-14 h-14 rounded-2xl bg-tertiary flex items-center justify-center flex-shrink-0">
                <item.icon size={26} className="text-primary-blue" />
              </div>
              <div>
                <p className="text-xl font-extrabold text-primary-dark">
                  {item.year}
                </p>
                <p className="text-sm text-primary-dark/60">
                  {t(item.key)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  )
}

export function About() {
  return (
    <section id="about" className="bg-bg py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <AboutContent />
      </div>
    </section>
  )
}
