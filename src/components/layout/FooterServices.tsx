import { motion } from 'framer-motion'
import { useI18nStore } from '../../store/useI18nStore'
import { SmoothScrollLink } from '../ui/SmoothScrollLink'

const ease = [0.32, 0.72, 0, 1] as const
const serviceKeys = ['pricing.starter.title', 'pricing.family.title', 'pricing.pro.title', 'pricing.business.title']

export function FooterServices({ prefersReduced }: { prefersReduced: boolean }) {
  const t = useI18nStore((state) => state.t)

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: 0.2, ease }}
      className="lg:col-span-2"
    >
      <h4 className="text-xs font-semibold tracking-wider text-white/40 mb-5">
        {t('footer.services')}
      </h4>
      <ul className="space-y-2.5">
        {serviceKeys.map((key) => (
          <li key={key}>
            <SmoothScrollLink
              href="#services"
              className="group/link inline-flex items-center gap-2 text-sm text-white/35 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4274D9] rounded px-1"
            >
              <span className="w-0 h-px bg-[#95CCDD] group-hover/link:w-3 transition-all duration-200" />
              {t(key)}
            </SmoothScrollLink>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
