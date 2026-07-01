'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useI18nStore } from '../../store/useI18nStore'

interface IInfiniteMarqueeProps {
  texts?: string[]
}

export function InfiniteMarquee({ texts = [] }: IInfiniteMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const t = useI18nStore((state) => state.t)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.marquee-content', {
        xPercent: -50,
        repeat: -1,
        duration: 30,
        ease: 'none',
      })
    }, marqueeRef)

    return () => ctx.revert()
  }, [])

  const defaultTexts = [
    t('features.title'),
    t('pricing.title'),
    t('stats.title'),
    t('testimonials.title'),
    t('contact.title'),
  ]

  const displayTexts = texts.length > 0 ? texts : defaultTexts

  return (
    <div ref={marqueeRef} className="relative overflow-hidden py-16">
      <div className="absolute inset-0 bg-gradient-to-r from-[#F5F5F5] via-transparent to-[#F5F5F5] dark:from-[#0F172A] dark:via-transparent dark:to-[#0F172A] z-10 pointer-events-none" />
      
      <div className="marquee-content flex whitespace-nowrap">
        {[...displayTexts, ...displayTexts].map((text, i) => (
          <span key={i} className="inline-block px-12 text-5xl md:text-6xl font-extrabold text-[#4274D9]/10 dark:text-[#95CCDD]/10 uppercase">
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
