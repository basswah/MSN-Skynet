'use client'

import { useRef, useState, type FormEvent } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PaperPlaneRight, Phone, Envelope, MapPin, ArrowRight, Check, EnvelopeSimple } from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'

gsap.registerPlugin(ScrollTrigger)

interface IContactInfo {
  id: string
  icon: typeof Phone
  labelKey: string
  valueKey: string
}

const contactInfo: IContactInfo[] = [
  { id: 'phone', icon: Phone, labelKey: 'contact.phone', valueKey: 'contact.phone.value' },
  { id: 'email', icon: Envelope, labelKey: 'contact.email', valueKey: 'contact.email.value' },
  { id: 'address', icon: MapPin, labelKey: 'contact.address', valueKey: 'contact.address.value' },
]

export function Contact() {
  const t = useI18nStore((state) => state.t)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.c-title', {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.c-title', start: 'top 85%' },
      })

      gsap.from('.c-form', {
        opacity: 0,
        x: -50,
        duration: 0.8,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.c-form', start: 'top 80%' },
      })

      gsap.from('.c-info-card', {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.c-info-card', start: 'top 85%' },
      })

      gsap.from('.c-map', {
        opacity: 0,
        scale: 0.95,
        duration: 0.9,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.c-map', start: 'top 85%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
      setTimeout(() => setStatus('idle'), 3000)
    }, 1500)
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-gradient-to-b from-[#F5F5F5] via-[#D0E7E6]/30 to-[#D0E7E6] dark:from-[#0F172A] dark:via-[#1E293B] dark:to-[#1E293B] py-24 lg:py-36 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#4274D9]/5 dark:bg-[#95CCDD]/3 rounded-full blur-[140px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#293681]/5 dark:bg-[#4274D9]/5 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-24">
          <div className="c-title">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#293681]/5 dark:bg-[#95CCDD]/10 text-[#4274D9] dark:text-[#95CCDD] text-xs font-semibold tracking-widest uppercase mb-6">
              <EnvelopeSimple size={14} weight="fill" />
              {t('contact.title')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tighter text-[#293681] dark:text-white leading-none">
              {t('contact.form.title')}
            </h2>
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-[#4274D9] to-[#95CCDD] dark:from-[#95CCDD] dark:to-[#4274D9] rounded-full mx-auto mt-6 mb-6" />
          <p className="c-subtitle text-base lg:text-lg text-[#293681]/60 dark:text-white/50 max-w-xl mx-auto leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 items-start">
          <div className="c-form">
            <form
              onSubmit={handleSubmit}
              className="relative rounded-3xl p-8 lg:p-10 bg-white/70 dark:bg-[#1E293B]/50 backdrop-blur-md border border-[#4274D9]/10 dark:border-[#95CCDD]/15 shadow-[0_20px_60px_-15px_rgba(66,116,217,0.12)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)]"
            >
              <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] rounded-3xl" />
              </div>

              <div className="relative z-10 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="c-name" className="block text-[11px] font-semibold tracking-[0.15em] uppercase text-[#293681]/60 dark:text-white/40">
                      {t('contact.name')}
                    </label>
                    <input
                      type="text"
                      id="c-name"
                      required
                      className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-[#4274D9]/15 dark:border-[#95CCDD]/20 text-[#293681] dark:text-white text-sm focus:outline-none focus:border-[#4274D9] dark:focus:border-[#95CCDD] transition-colors duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="c-phone" className="block text-[11px] font-semibold tracking-[0.15em] uppercase text-[#293681]/60 dark:text-white/40">
                      {t('contact.phone')}
                    </label>
                    <input
                      type="tel"
                      id="c-phone"
                      required
                      dir="ltr"
                      className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-[#4274D9]/15 dark:border-[#95CCDD]/20 text-[#293681] dark:text-white text-sm focus:outline-none focus:border-[#4274D9] dark:focus:border-[#95CCDD] transition-colors duration-300 text-end"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="c-email" className="block text-[11px] font-semibold tracking-[0.15em] uppercase text-[#293681]/60 dark:text-white/40">
                    {t('contact.email')}
                  </label>
                  <input
                    type="email"
                    id="c-email"
                    required
                    dir="ltr"
                    className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-[#4274D9]/15 dark:border-[#95CCDD]/20 text-[#293681] dark:text-white text-sm focus:outline-none focus:border-[#4274D9] dark:focus:border-[#95CCDD] transition-colors duration-300 text-end"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="c-message" className="block text-[11px] font-semibold tracking-[0.15em] uppercase text-[#293681]/60 dark:text-white/40">
                    {t('contact.message')}
                  </label>
                  <textarea
                    id="c-message"
                    rows={4}
                    required
                    className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-[#4274D9]/15 dark:border-[#95CCDD]/20 text-[#293681] dark:text-white text-sm focus:outline-none focus:border-[#4274D9] dark:focus:border-[#95CCDD] transition-colors duration-300 resize-none leading-relaxed"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group relative inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-[#4274D9] to-[#293681] dark:from-[#95CCDD] dark:to-[#4274D9] text-white dark:text-[#0F172A] text-sm font-semibold shadow-[0_8px_24px_-4px_rgba(66,116,217,0.4)] dark:shadow-[0_8px_24px_-4px_rgba(149,204,221,0.3)] hover:shadow-[0_12px_32px_-4px_rgba(66,116,217,0.5)] dark:hover:shadow-[0_12px_32px_-4px_rgba(149,204,221,0.4)] transition-all duration-300 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed rounded-xl"
                  >
                    {status === 'loading' ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white dark:border-[#0F172A]/30 dark:border-t-[#0F172A] rounded-full animate-spin" />
                    ) : status === 'success' ? (
                      <>
                        <Check size={16} weight="bold" />
                        <span>{t('contact.sent')}</span>
                      </>
                    ) : (
                      <>
                        <PaperPlaneRight size={16} weight="fill" />
                        <span>{t('services.cta')}</span>
                        <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="flex flex-col gap-4">
            {contactInfo.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.id}
                  className="c-info-card group flex items-start gap-4 p-5 rounded-2xl bg-white/50 dark:bg-[#1E293B]/30 backdrop-blur-sm border border-[#4274D9]/8 dark:border-[#95CCDD]/10 hover:bg-white/80 dark:hover:bg-[#1E293B]/50 hover:border-[#4274D9]/15 dark:hover:border-[#95CCDD]/20 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#4274D9]/10 to-[#95CCDD]/10 dark:from-[#95CCDD]/10 dark:to-[#4274D9]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={20} className="text-[#4274D9] dark:text-[#95CCDD]" weight="duotone" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#293681]/40 dark:text-white/30 mb-1">
                      {t(item.labelKey)}
                    </p>
                    <p
                      className="text-sm font-medium text-[#293681] dark:text-white leading-tight"
                      dir={item.id === 'phone' ? 'ltr' : undefined}
                    >
                      {t(item.valueKey)}
                    </p>
                  </div>
                </div>
              )
            })}

            <div className="c-map mt-2 rounded-2xl overflow-hidden border border-[#4274D9]/10 dark:border-[#95CCDD]/15">
              <div className="relative h-48 bg-gradient-to-br from-[#D0E7E6] to-[#95CCDD]/30 dark:from-[#1E293B] dark:to-[#4274D9]/10 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={32} className="text-[#4274D9] dark:text-[#95CCDD] mx-auto mb-3" weight="duotone" />
                  <p className="text-sm font-medium text-[#293681] dark:text-white">
                    {t('contact.address.value')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
