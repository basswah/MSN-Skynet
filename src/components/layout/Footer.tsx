import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import {
  ArrowUp,
  WifiHigh,
  InstagramLogo,
  WhatsappLogo,
  TelegramLogo,
  FacebookLogo,
  Phone,
  Envelope,
  MapPin,
} from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'
import { useSmoothScroll } from './SmoothScrollLayout'
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

export function Footer() {
  const t = useI18nStore((state) => state.t)
  const { lenis } = useSmoothScroll()
  const footerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  })

  const meshOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const meshScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])

  const backToTop = () => {
    lenis?.scrollTo(0, { duration: 1.5 })
  }

  return (
    <footer ref={footerRef} className="relative bg-[#020617] overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{ opacity: meshOpacity, scale: meshScale }}
          className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[900px] h-[600px]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(66,116,217,0.15),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_60%,rgba(149,204,221,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(41,54,129,0.2),transparent_60%)]" />
        </motion.div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#4274D9]/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/3 right-0 w-[300px] h-[300px] bg-[#95CCDD]/5 rounded-full blur-[120px]" />
      </div>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — The Grand CTA
          ═══════════════════════════════════════════════════════════ */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease }}
          className="pt-12 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24"
        >
          <div className="relative">
            {/* Decorative grid lines */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-end">
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1, ease }}
                  className="text-xs font-semibold tracking-[0.3em] uppercase text-[#95CCDD]/50 mb-6"
                >
                  {t('footer.cta.title')}
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease }}
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tighter text-white leading-[1.05] max-w-4xl"
                >
                  {t('footer.cta.subtitle')}
                </motion.h2>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4, ease }}
              >
                <a
                  href="#contact"
                  className="group relative inline-flex items-center gap-3 sm:gap-4 px-6 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-[#4274D9] to-[#293681] text-white font-semibold rounded-2xl shadow-[0_0_40px_rgba(66,116,217,0.3)] hover:shadow-[0_0_60px_rgba(66,116,217,0.5)] transition-all duration-500 active:scale-[0.97] overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#95CCDD]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 text-base">{t('nav.cta')}</span>
                  <ArrowUp
                    size={18}
                    weight="bold"
                    className="relative z-10 rotate-[-90deg] transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-90 rtl:group-hover:-translate-x-1"
                  />
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 2 — The Main Content
            ═══════════════════════════════════════════════════════════ */}
        <div className="py-10 sm:py-16 lg:py-20 border-t border-white/[0.06]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-8">
            {/* Brand Column — spans 5 cols */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, ease }}
              className="lg:col-span-5"
            >
              <a href="#hero" className="inline-flex items-center gap-3 mb-6 group">
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#4274D9] to-[#293681] flex items-center justify-center shadow-[0_4px_20px_rgba(66,116,217,0.4)] group-hover:shadow-[0_4px_30px_rgba(66,116,217,0.6)] transition-shadow duration-500">
                    <WifiHigh size={22} weight="fill" className="text-white" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-[#4274D9] to-[#95CCDD] rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500" />
                </div>
                <span className="text-2xl font-extrabold tracking-tight">
                  <span className="text-[#95CCDD]">SKY</span>
                  <span className="text-white">NET</span>
                </span>
              </a>

              <p className="text-sm text-white/30 leading-[1.8] max-w-sm mb-8">
                {t('footer.description')}
              </p>

              {/* Social icons with brand colors */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.id}
                      href={social.href}
                      className="group/social relative w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-white transition-all duration-300 overflow-hidden"
                      aria-label={social.id}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span
                        className="absolute inset-0 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300"
                        style={{ backgroundColor: `${social.color}15` }}
                      />
                      <Icon size={17} weight="fill" className="relative z-10" />
                    </a>
                  )
                })}
              </div>
            </motion.div>

            {/* Navigation — spans 3 cols */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: 0.08, ease }}
              className="lg:col-span-3"
            >
              <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/20 mb-6">
                {t('footer.quickLinks')}
              </h4>
              <ul className="space-y-0">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className="group/link flex items-center gap-2 py-2.5 text-[15px] text-white/35 hover:text-white transition-colors duration-300"
                    >
                      <span className="w-0 h-px bg-[#4274D9] group-hover/link:w-4 transition-all duration-300" />
                      {t(link.labelKey)}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services — spans 2 cols */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: 0.16, ease }}
              className="lg:col-span-2"
            >
              <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/20 mb-6">
                {t('footer.services')}
              </h4>
              <ul className="space-y-0">
                {['pricing.browsing.title', 'pricing.family.title', 'pricing.business.title'].map((key) => (
                  <li key={key}>
                    <span className="group/link flex items-center gap-2 py-2.5 text-[15px] text-white/35 hover:text-white transition-colors duration-300 cursor-pointer">
                      <span className="w-0 h-px bg-[#95CCDD] group-hover/link:w-4 transition-all duration-300" />
                      {t(key)}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact — spans 2 cols */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: 0.24, ease }}
              className="lg:col-span-2"
            >
              <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/20 mb-6">
                {t('contact.title')}
              </h4>
              <div className="space-y-5">
                {contactItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.id} className="group flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#4274D9]/10 transition-colors duration-300">
                        <Icon size={14} className="text-white/25 group-hover:text-[#95CCDD] transition-colors duration-300" weight="duotone" />
                      </div>
                      <p
                        className="text-[13px] text-white/30 group-hover:text-white/50 transition-colors duration-300 leading-relaxed pt-1"
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

        {/* ═══════════════════════════════════════════════════════════
            SECTION 3 — The Bottom Bar
            ═══════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.8, ease }}
          className="py-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <p className="text-xs text-white/15 text-center sm:text-start">
            {t('footer.copyright')}
          </p>

          <div className="flex items-center gap-4">
            <a href="#" className="text-[11px] text-white/15 hover:text-white/40 transition-colors duration-300">
              Privacy Policy
            </a>
            <span className="w-px h-3 bg-white/10" />
            <a href="#" className="text-[11px] text-white/15 hover:text-white/40 transition-colors duration-300">
              Terms of Service
            </a>
          </div>

          <button
            onClick={backToTop}
            className="group relative w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/20 hover:text-[#95CCDD] hover:bg-[#4274D9]/10 hover:border-[#4274D9]/20 transition-all duration-500 overflow-hidden"
            aria-label={t('footer.backToTop')}
          >
            <span className="absolute inset-0 bg-gradient-to-t from-[#4274D9]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <ArrowUp size={16} weight="bold" className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1" />
          </button>
        </motion.div>
      </div>
    </footer>
  )
}
