import { motion } from 'framer-motion'
import {
  InstagramLogo,
  WhatsappLogo,
  TelegramLogo,
  FacebookLogo,
} from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'
import { SmoothScrollLink } from '../ui/SmoothScrollLink'

const socialLinks = [
  { id: 'facebook', href: 'https://www.facebook.com/share/16rXMYyMRy/', icon: FacebookLogo, ariaKey: 'social.facebook' },
  { id: 'instagram', href: 'https://www.instagram.com/skyabonnet/', icon: InstagramLogo, ariaKey: 'social.instagram' },
  { id: 'whatsapp', href: 'https://wa.me/963994817193', icon: WhatsappLogo, ariaKey: 'social.whatsapp' },
  { id: 'telegram', href: 'https://t.me/alsakabnet93', icon: TelegramLogo, ariaKey: 'social.telegram' },
]

const ease = [0.32, 0.72, 0, 1] as const

export function FooterBrand({ prefersReduced }: { prefersReduced: boolean }) {
  const t = useI18nStore((state) => state.t)

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease }}
      className="lg:col-span-5"
    >
      <SmoothScrollLink href="#hero" className="inline-flex items-center gap-3 mb-5 group">
        <img src="/skynetLogo-dark.svg" alt="" className="h-[80px] w-auto object-contain" />
      </SmoothScrollLink>
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
              aria-label={t(social.ariaKey)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon size={16} weight="fill" />
            </a>
          )
        })}
      </div>
    </motion.div>
  )
}
