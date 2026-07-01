'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Buildings, Users, MapPin, Pulse } from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'
import type { IStatItem } from '../../types'

gsap.registerPlugin(ScrollTrigger)

const statsData: IStatItem[] = [
  { id: 'years', value: 15, suffixKey: '+', labelKey: 'stats.years', iconName: 'Buildings' },
  { id: 'clients', value: 50000, suffixKey: '+', labelKey: 'stats.clients', iconName: 'Users' },
  { id: 'cities', value: 20, suffixKey: '+', labelKey: 'stats.cities', iconName: 'MapPin' },
  { id: 'uptime', value: 999, suffixKey: '%', labelKey: 'stats.uptime', iconName: 'Pulse' },
]

const iconMap = {
  Buildings,
  Users,
  MapPin,
  Pulse,
}

export function Stats() {
  const t = useI18nStore((state) => state.t)
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([] as (HTMLDivElement | null)[])

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stats-title', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.stats-title',
          start: 'top 85%',
        },
      })

      cardRefs.current.forEach((card, i) => {
        if (!card) return
        gsap.from(card, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          delay: i * 0.15,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-[#F5F5F5] to-[#D0E7E6] dark:from-[#0F172A] dark:to-[#293681] py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-[#4274D9]/10 dark:bg-[#95CCDD]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-[#293681]/10 dark:bg-[#95CCDD]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 lg:mb-28">
          <h2 className="stats-title text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tighter text-[#293681] dark:text-white mb-4">
            {t('stats.title')}
          </h2>
          <div className="w-24 h-1 bg-[#4274D9] dark:bg-[#95CCDD] rounded-full mx-auto mb-6" />
          <p className="text-base text-[#293681]/70 dark:text-white/60 max-w-2xl mx-auto">
            {t('stats.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {statsData.map((stat, index) => {
            const Icon = iconMap[stat.iconName as keyof typeof iconMap]
            return (
              <div
                key={stat.id}
                ref={(el: HTMLDivElement | null) => { cardRefs.current[index] = el }}
                className="group relative bg-white/70 dark:bg-[#1E293B]/50 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-[#4274D9]/10 dark:border-[#95CCDD]/20 hover:shadow-[0_20px_60px_-15px_rgba(66,116,217,0.25)] dark:hover:shadow-[0_20px_60px_-15px_rgba(149,204,221,0.15)] transition-all duration-300 cursor-pointer"
                data-stat-card
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#4274D9]/5 to-transparent dark:from-[#95CCDD]/5 rounded-2xl" />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-[#4274D9]/10 dark:bg-[#95CCDD]/10 flex items-center justify-center mb-5 lg:mb-6 group-hover:scale-110 group-hover:bg-[#4274D9]/20 dark:group-hover:bg-[#95CCDD]/20 transition-all duration-300">
                    <Icon
                      size={28}
                      className="text-[#4274D9] dark:text-[#95CCDD]"
                      weight="duotone"
                    />
                  </div>
                  <div className="mb-2">
                    <span className="text-3xl lg:text-4xl font-extrabold text-[#293681] dark:text-white font-mono tracking-tight">
                      <CountUp value={stat.value} />
                    </span>
                  </div>
                  <p className="text-sm lg:text-base text-[#293681]/70 dark:text-white/60 font-medium leading-tight">
                    {t(stat.labelKey)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

interface CountUpProps {
  value: number
}

function CountUp({ value }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const end = value

  useGSAP(() => {
    if (!ref.current) return
    const num = gsap.fromTo(
      ref.current,
      { innerText: '0' },
      {
        innerText: end.toLocaleString(),
        duration: 2,
        ease: 'power2.out',
        snap: {
          innerText: 1,
        },
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
        },
      }
    )
    return num
  }, [])

  return <span ref={ref} />
}
