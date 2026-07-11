import { motion } from 'framer-motion'
import {
  InstagramLogo,
  WhatsappLogo,
  TelegramLogo,
  FacebookLogo,
  Phone,
  Envelope,
  MapPin,
} from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'
import { navLinks } from '../../services/navigation'

const socialLinks = [
  { id: 'facebook', href: '#', icon: FacebookLogo, color: '#1877F2' },
  { id: 'instagram', href: '#', icon: InstagramLogo, color: '#E4405F' },
  { id: 'whatsapp', href: '#', icon: WhatsappLogo, color: '#25D366' },
  { id: 'telegram', href: '#', icon: TelegramLogo, color: '#0088CC' },
]

const contactItems = [
  { id: 'phone', icon: Phone, valueKey: 'contact.phone.value', dir: 'ltr' as const },
  { id: 'email', icon: Envelope, valueKey: 'contact.email.value' },
  { id: 'address', icon: MapPin, valueKey: 'contact.address.value' },
]

const ease = [0.32, 0.72, 0, 1] as const

export function FooterGrid() {
  const t = useI18nStore((state) => state.t)

  return (
    <div className="py-10 sm:py-14 lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease }}
          className="lg:col-span-5"
        >
          <a href="#hero" className="inline-flex items-center gap-3 mb-5 group">
            <img src="/MSN-SKYNET.png" alt="Skynet" className="h-[40px] w-auto object-contain" />
          </a>
          <p className="text-sm text-white/35 leading-[1.8] max-w-sm mb-6">
            {t('footer.description')}
          </p>
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.id}
                  href={social.href}
                  className="group/social w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-white hover:border-[#4274D9]/30 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4274D9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]"
                  aria-label={social.id}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={16} weight="fill" />
                </a>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="lg:col-span-3"
        >
          <h4 className="text-xs font-semibold tracking-wider text-white/40 mb-5">
            {t('footer.quickLinks')}
          </h4>
          <ul className="space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className="group/link inline-flex items-center gap-2 text-sm text-white/35 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4274D9] rounded px-1"
                >
                  <span className="w-0 h-px bg-[#4274D9] group-hover/link:w-3 transition-all duration-200" />
                  {t(link.labelKey)}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="lg:col-span-2"
        >
          <h4 className="text-xs font-semibold tracking-wider text-white/40 mb-5">
            {t('footer.services')}
          </h4>
          <ul className="space-y-2.5">
            {['pricing.starter.title', 'pricing.family.title', 'pricing.pro.title', 'pricing.business.title'].map((key) => (
              <li key={key}>
                <a
                  href="#services"
                  className="group/link inline-flex items-center gap-2 text-sm text-white/35 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4274D9] rounded px-1"
                >
                  <span className="w-0 h-px bg-[#95CCDD] group-hover/link:w-3 transition-all duration-200" />
                  {t(key)}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
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
                <div key={item.id} className="group flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-md bg-white/[0.04] flex items-center justify-center flex-shrink-0 group-hover:bg-[#4274D9]/10 transition-colors duration-200">
                    <Icon size={14} className="text-white/30 group-hover:text-[#95CCDD] transition-colors duration-200" weight="duotone" />
                  </div>
                  <p
                    className="text-[13px] text-white/35 group-hover:text-white/55 transition-colors duration-200 leading-relaxed pt-1"
                    dir={item.dir}
                  >
                    {t(item.valueKey)}
                  </p>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
