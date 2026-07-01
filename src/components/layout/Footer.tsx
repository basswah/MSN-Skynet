'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUp, Lightning, InstagramLogo, WhatsappLogo, TelegramLogo, FacebookLogo } from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'
import { navLinks } from '../../services/navigation'

gsap.registerPlugin(ScrollTrigger)

const socialLinks = [
  { id: 'facebook', href: '#', icon: FacebookLogo },
  { id: 'instagram', href: '#', icon: InstagramLogo },
  { id: 'whatsapp', href: '#', icon: WhatsappLogo },
  { id: 'telegram', href: '#', icon: TelegramLogo },
]

export function Footer() {
  const t = useI18nStore((state) => state.t)
  const footerRef = useRef<HTMLElement>(null)

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.f-cta', {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.f-cta', start: 'top 90%' },
      })

      gsap.from('.f-col', {
        opacity: 0,
        y: 25,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.f-col', start: 'top 90%' },
      })

      gsap.from('.f-social', {
        opacity: 0,
        scale: 0.8,
        stagger: 0.06,
        duration: 0.5,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: '.f-social', start: 'top 90%' },
      })

      gsap.from('.f-bottom', {
        opacity: 0,
        y: 15,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.f-bottom', start: 'top 95%' },
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="relative bg-[#0F172A] dark:bg-[#0A0F1D] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#4274D9]/3 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-[#95CCDD]/3 rounded-full blur-[100px] translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="f-cta py-16 lg:py-24 border-b border-white/8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#95CCDD]/60 mb-4">
              {t('footer.cta.title')}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tighter text-white leading-[1.1] mb-8">
              {t('footer.cta.subtitle')}
            </h2>
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-[#4274D9] to-[#293681] text-white text-sm font-semibold rounded-xl shadow-[0_8px_24px_-4px_rgba(66,116,217,0.4)] hover:shadow-[0_12px_32px_-4px_rgba(66,116,217,0.5)] transition-all duration-300 active:scale-[0.98]"
            >
              <span>{t('nav.cta')}</span>
            </a>
          </div>
        </div>

        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 lg:gap-10">
            <div className="f-col">
              <a href="#hero" className="inline-flex items-center gap-2 mb-5 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#4274D9] to-[#293681] flex items-center justify-center shadow-[0_4px_12px_-2px_rgba(66,116,217,0.4)]">
                  <Lightning size={18} weight="fill" className="text-white" />
                </div>
                <span className="text-xl font-extrabold tracking-tight">
                  <span className="text-[#95CCDD]">SKY</span>
                  <span className="text-white">NET</span>
                </span>
              </a>
              <p className="text-sm text-white/35 leading-relaxed max-w-xs mb-8">
                {t('footer.description')}
              </p>

              <div className="flex items-center gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.id}
                      href={social.href}
                      className="f-social w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-white/35 hover:text-[#95CCDD] hover:bg-[#4274D9]/15 hover:border-[#4274D9]/30 transition-all duration-300"
                      aria-label={social.id}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon size={16} weight="fill" />
                    </a>
                  )
                })}
              </div>
            </div>

            <div className="f-col">
              <h4 className="text-[11px] font-semibold tracking-[0.15em] uppercase text-white/30 mb-5">
                {t('footer.quickLinks')}
              </h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className="text-sm text-white/40 hover:text-[#95CCDD] transition-colors duration-300"
                    >
                      {t(link.labelKey)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="f-col">
              <h4 className="text-[11px] font-semibold tracking-[0.15em] uppercase text-white/30 mb-5">
                {t('footer.services')}
              </h4>
              <ul className="space-y-3">
                {['pricing.browsing.title', 'pricing.family.title', 'pricing.business.title'].map((key) => (
                  <li key={key}>
                    <span className="text-sm text-white/40 hover:text-[#95CCDD] transition-colors duration-300 cursor-pointer">
                      {t(key)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="f-col">
              <h4 className="text-[11px] font-semibold tracking-[0.15em] uppercase text-white/30 mb-5">
                {t('contact.title')}
              </h4>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] text-white/20 uppercase tracking-wider mb-1">{t('contact.phone')}</p>
                  <p className="text-sm text-white/50" dir="ltr">{t('contact.phone.value')}</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/20 uppercase tracking-wider mb-1">{t('contact.email')}</p>
                  <p className="text-sm text-white/50">{t('contact.email.value')}</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/20 uppercase tracking-wider mb-1">{t('contact.address')}</p>
                  <p className="text-sm text-white/50">{t('contact.address.value')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="f-bottom py-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20 text-center sm:text-start">
            {t('footer.copyright')}
          </p>

          <button
            onClick={backToTop}
            className="group w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-white/25 hover:text-[#95CCDD] hover:bg-[#4274D9]/15 hover:border-[#4274D9]/30 transition-all duration-300"
            aria-label={t('footer.backToTop')}
          >
            <ArrowUp size={16} weight="bold" className="transition-transform duration-300 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  )
}
