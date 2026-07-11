import { motion } from 'framer-motion'
import { Phone, Envelope, MapPin, EnvelopeSimple } from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'

interface IContactInfo {
  id: string
  icon: typeof Phone
  labelKey: string
  valueKey: string
  href: string
  dir?: 'ltr'
}

const contactInfo: IContactInfo[] = [
  { id: 'phone', icon: Phone, labelKey: 'contact.phone', valueKey: 'contact.phone.value', href: 'https://wa.me/963994817193', dir: 'ltr' },
  { id: 'email', icon: Envelope, labelKey: 'contact.email', valueKey: 'contact.email.value', href: 'mailto:info@skynet.sy' },
  { id: 'address', icon: MapPin, labelKey: 'contact.address', valueKey: 'contact.address.value', href: 'https://www.google.com/maps/search/?api=1&query=33.5363381,36.359278' },
]

const ease = [0.32, 0.72, 0, 1] as const

export function Contact() {
  const t = useI18nStore((state) => state.t)

  return (
    <section
      id="contact"
      className="relative bg-gradient-to-b from-slate-50 via-[#D0E7E6]/30 to-[#D0E7E6] dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 py-16 sm:py-24 lg:py-36 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#4274D9]/5 dark:bg-[#95CCDD]/3 rounded-full blur-[140px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#293681]/5 dark:bg-[#4274D9]/5 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-16 lg:mb-24"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#293681]/5 dark:bg-[#95CCDD]/10 text-[#4274D9] dark:text-[#95CCDD] text-xs font-semibold tracking-wider mb-6">
            <EnvelopeSimple size={14} weight="fill" />
            {t('contact.title')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tighter text-slate-900 dark:text-white leading-none">
            {t('contact.title')}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#4274D9] to-[#95CCDD] dark:from-[#95CCDD] dark:to-[#4274D9] rounded-full mx-auto mt-6 mb-6" />
          <p className="text-base lg:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {contactInfo.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.a
                key={item.id}
                href={item.href}
                target={item.id === 'address' ? '_blank' : undefined}
                rel={item.id === 'address' ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white/50 dark:bg-slate-900/30 backdrop-blur-sm border border-[#4274D9]/8 dark:border-[#95CCDD]/10 hover:bg-white/80 dark:hover:bg-slate-900/50 hover:border-[#4274D9]/15 dark:hover:border-[#95CCDD]/20 transition-all duration-300 cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4274D9]/10 to-[#95CCDD]/10 dark:from-[#95CCDD]/10 dark:to-[#4274D9]/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                  <Icon size={24} className="text-[#4274D9] dark:text-[#95CCDD]" weight="duotone" />
                </div>
                <p className="text-[11px] font-semibold tracking-[0.15em] text-slate-500 dark:text-slate-400 mb-2">
                  {t(item.labelKey)}
                </p>
                <p
                  className="text-sm font-medium text-slate-900 dark:text-white leading-tight"
                  dir={item.dir}
                >
                  {t(item.valueKey)}
                </p>
              </motion.a>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="mt-12 max-w-4xl mx-auto rounded-2xl overflow-hidden border border-[#4274D9]/10 dark:border-[#95CCDD]/15"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.0!2d36.359278!3d33.5363381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1518e5d075d02c03%3A0x87bb952a6ce03e11!2sArbin%2C%20Syria!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={t('contact.address.value')}
            className="w-full"
          />
        </motion.div>
      </div>
    </section>
  )
}
