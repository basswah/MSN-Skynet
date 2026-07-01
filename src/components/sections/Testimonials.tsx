'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Quotes, Star, ArrowRight, ArrowLeft } from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'

gsap.registerPlugin(ScrollTrigger)

interface ITestimonial {
  id: number
  nameKey: string
  roleKey: string
  quoteKey: string
  rating: number
}

const testimonials: ITestimonial[] = [
  { id: 1, nameKey: 'testimonial.name.1', roleKey: 'testimonial.role.1', quoteKey: 'testimonial.quote.1', rating: 5 },
  { id: 2, nameKey: 'testimonial.name.2', roleKey: 'testimonial.role.2', quoteKey: 'testimonial.quote.2', rating: 5 },
  { id: 3, nameKey: 'testimonial.name.3', roleKey: 'testimonial.role.3', quoteKey: 'testimonial.quote.3', rating: 4 },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          weight={i < rating ? 'fill' : 'regular'}
          className={i < rating ? 'text-[#4274D9]' : 'text-[#D0E7E6] dark:text-[#334155]'}
        />
      ))}
    </div>
  )
}

export function Testimonials() {
  const t = useI18nStore((state) => state.t)
  const sectionRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLButtonElement | null)[]>([])

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.t-hero-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.t-hero-title', start: 'top 85%' },
      })

      gsap.from('.t-hero-sub', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.t-hero-sub', start: 'top 85%' },
      })

      gsap.from(mainRef.current, {
        opacity: 0,
        x: -60,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: mainRef.current, start: 'top 80%' },
      })

      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.from(card, {
          opacity: 0,
          x: 80,
          duration: 0.7,
          delay: 0.1 * i,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%' },
        })
      })

      gsap.from('.t-quote-icon', {
        opacity: 0,
        scale: 0.6,
        rotation: -20,
        duration: 1.2,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: { trigger: '.t-quote-icon', start: 'top 80%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSelect = (index: number) => {
    const mainCard = mainRef.current
    if (!mainCard) return

    gsap.to(mainCard, {
      opacity: 0,
      y: 20,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        mainCard.dataset.active = String(index)
        gsap.to(mainCard, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power3.out',
        })
      },
    })

    cardsRef.current.forEach((card, i) => {
      if (!card) return
      gsap.to(card, {
        scale: i === index ? 1.02 : 1,
        duration: 0.4,
        ease: 'power2.out',
      })
    })
  }

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative bg-gradient-to-b from-[#F5F5F5] via-[#D0E7E6]/30 to-[#D0E7E6] dark:from-[#0F172A] dark:via-[#1E293B] dark:to-[#1E293B] py-24 lg:py-36 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#4274D9]/5 dark:bg-[#95CCDD]/3 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#293681]/5 dark:bg-[#4274D9]/5 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-24">
          <div className="t-hero-title">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#293681]/5 dark:bg-[#95CCDD]/10 text-[#4274D9] dark:text-[#95CCDD] text-xs font-semibold tracking-widest uppercase mb-6">
              <Quotes size={14} weight="fill" />
              {t('testimonials.title')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tighter text-[#293681] dark:text-white leading-none">
              {t('testimonials.title')}
            </h2>
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-[#4274D9] to-[#95CCDD] dark:from-[#95CCDD] dark:to-[#4274D9] rounded-full mx-auto mt-6 mb-6" />
          <p className="t-hero-sub text-base lg:text-lg text-[#293681]/60 dark:text-white/50 max-w-xl mx-auto leading-relaxed">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-start">
          <div ref={mainRef} data-active="0" className="relative">
            <MainTestimonialCard testimonial={testimonials[0]} t={t} />
          </div>

          <div className="flex flex-col gap-4">
            {testimonials.map((item, index) => (
              <button
                key={item.id}
                ref={(el) => { cardsRef.current[index] = el }}
                onClick={() => handleSelect(index)}
                className="group relative text-start w-full p-5 lg:p-6 rounded-2xl bg-white/60 dark:bg-[#1E293B]/40 backdrop-blur-sm border border-[#4274D9]/8 dark:border-[#95CCDD]/10 hover:bg-white/90 dark:hover:bg-[#1E293B]/70 hover:border-[#4274D9]/20 dark:hover:border-[#95CCDD]/25 transition-all duration-300 cursor-pointer hover:shadow-[0_8px_30px_-8px_rgba(66,116,217,0.12)]"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#95CCDD]/30 to-[#D0E7E6]/40 dark:from-[#4274D9]/20 dark:to-[#95CCDD]/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img
                      src={`https://picsum.photos/seed/sky${item.id}/100/100`}
                      alt={t(item.nameKey)}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#293681] dark:text-white truncate">
                      {t(item.nameKey)}
                    </p>
                    <p className="text-xs text-[#293681]/45 dark:text-white/35 truncate">
                      {t(item.roleKey)}
                    </p>
                  </div>
                  <div className="ms-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {index === 0 ? <ArrowLeft size={16} weight="bold" className="text-[#4274D9] dark:text-[#95CCDD]" /> : <ArrowRight size={16} weight="bold" className="text-[#4274D9] dark:text-[#95CCDD]" />}
                  </div>
                </div>
                <p className="text-sm text-[#293681]/60 dark:text-white/45 leading-relaxed line-clamp-2">
                  {t(item.quoteKey)}
                </p>
                <div className="mt-3">
                  <StarRating rating={item.rating} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function MainTestimonialCard({ testimonial, t }: { testimonial: ITestimonial; t: (key: string) => string }) {
  return (
    <div className="relative rounded-3xl p-8 lg:p-10 bg-white/80 dark:bg-[#1E293B]/60 backdrop-blur-md border border-[#4274D9]/10 dark:border-[#95CCDD]/15 shadow-[0_20px_60px_-15px_rgba(66,116,217,0.15)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]">
      <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#4274D9]/3 via-transparent to-[#95CCDD]/5 dark:from-[#4274D9]/5 dark:via-transparent dark:to-[#95CCDD]/5" />
        <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] rounded-3xl" />
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-8">
          <div className="t-quote-icon w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br from-[#4274D9] to-[#293681] dark:from-[#95CCDD] dark:to-[#4274D9] flex items-center justify-center shadow-[0_8px_20px_-4px_rgba(66,116,217,0.4)] dark:shadow-[0_8px_20px_-4px_rgba(149,204,221,0.3)]">
            <Quotes size={28} weight="fill" className="text-white dark:text-[#0F172A]" />
          </div>
          <StarRating rating={testimonial.rating} />
        </div>

        <blockquote className="text-xl lg:text-2xl font-medium text-[#293681]/85 dark:text-white/85 leading-relaxed mb-10 min-h-[120px]">
          {t(testimonial.quoteKey)}
        </blockquote>

        <div className="flex items-center gap-4 pt-6 border-t border-[#4274D9]/8 dark:border-[#95CCDD]/10">
          <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#D0E7E6]/40 dark:bg-[#4274D9]/15">
            <img
              src={`https://picsum.photos/seed/sky${testimonial.id}/200/200`}
              alt={t(testimonial.nameKey)}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-bold text-[#293681] dark:text-white text-base">
              {t(testimonial.nameKey)}
            </p>
            <p className="text-sm text-[#293681]/45 dark:text-white/35">
              {t(testimonial.roleKey)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
