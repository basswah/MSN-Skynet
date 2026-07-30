import { motion } from 'framer-motion'
import { Phone, Envelope, MapPin } from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'

const ease = [0.32, 0.72, 0, 1] as const

const contactItems = [
  { id: 'phone', icon: Phone, valueKey: 'contact.phone.value', href: 'https://wa.me/963994817193', dir: 'ltr' as const },
  { id: 'email', icon: Envelope, valueKey: 'contact.email.value', href: 'mailto:skynetconpany@gmail.com' },
  { id: 'address', icon: MapPin, valueKey: 'contact.address.value', href: 'https://www.google.com/maps/search/?api=1&query=33.5363381,36.359278' },
]

export function FooterContact({ prefersReduced }: { prefersReduced: boolean }) {
  const t = useI18nStore((state) => state.t)

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: 0.3, ease }}
      className="lg:col-span-2"
    >
      <h4 className="text-xs font-semibold tracking-wider text-white/40 mb-5">
        {t('contact.title')}
      </h4>
      <div className="space-y-3.5">
        {contactItems.map((item) => {
          const Icon = item.icon
          return (
            <a
              key={item.id}
              href={item.href}
              target={item.id !== 'phone' ? '_blank' : undefined}
              rel={item.id !== 'phone' ? 'noopener noreferrer' : undefined}
              className="group flex items-start gap-2.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4274D9] rounded"
            >
              <div className="w-8 h-8 rounded-md bg-white/[0.04] flex items-center justify-center flex-shrink-0 group-hover:bg-[#4274D9]/10 transition-colors duration-200">
                <Icon size={14} className="text-white/30 group-hover:text-[#95CCDD] transition-colors duration-200" weight="duotone" />
              </div>
              <p
                className="text-[13px] text-white/35 group-hover:text-white/55 transition-colors duration-200 leading-relaxed pt-1"
                dir={item.dir}
              >
                {t(item.valueKey)}
              </p>
            </a>
          )
        })}
      </div>
    </motion.div>
  )
}
