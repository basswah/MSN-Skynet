import { useRef, useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Buildings, Users, MapPin, Pulse } from '@phosphor-icons/react'
import { useI18nStore } from '../../store/useI18nStore'
import type { IStatItem } from '../../types'

const statsData: IStatItem[] = [
  { id: 'years', value: 15, suffixKey: '+', labelKey: 'stats.years', iconName: 'Buildings' },
  { id: 'clients', value: 50000, suffixKey: '+', labelKey: 'stats.clients', iconName: 'Users' },
  { id: 'cities', value: 20, suffixKey: '+', labelKey: 'stats.cities', iconName: 'MapPin' },
  { id: 'uptime', value: 99.9, suffixKey: '%', labelKey: 'stats.uptime', iconName: 'Pulse' },
]

const iconMap = { Buildings, Users, MapPin, Pulse }

const ease = [0.32, 0.72, 0, 1] as const
const COUNT_DURATION = 2000

function useCountUp(target: number, shouldStart: boolean) {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)

  const animate = useCallback((timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp
    const elapsed = timestamp - startTimeRef.current
    const progress = Math.min(elapsed / COUNT_DURATION, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    setValue(eased * target)

    if (progress < 1) {
      rafRef.current = requestAnimationFrame(animate)
    }
  }, [target])

  useEffect(() => {
    if (!shouldStart) return
    startTimeRef.current = 0
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [shouldStart, animate])

  return value
}

function formatNumber(n: number): string {
  if (n >= 1000) return Math.round(n).toLocaleString()
  if (n % 1 !== 0) return n.toFixed(1)
  return Math.round(n).toString()
}

interface StatCardProps {
  stat: IStatItem
  index: number
}

function StatCard({ stat, index }: StatCardProps) {
  const t = useI18nStore((state) => state.t)
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const count = useCountUp(stat.value, inView)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const Icon = iconMap[stat.iconName as keyof typeof iconMap]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease }}
      className="group relative bg-white/70 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl p-5 sm:p-6 lg:p-8 border border-[#4274D9]/10 dark:border-[#95CCDD]/20 transition-all duration-300 ease-out hover:shadow-[0_20px_60px_-15px_rgba(66,116,217,0.25)] dark:hover:shadow-[0_20px_60px_-15px_rgba(149,204,221,0.15)] hover:-translate-y-1 will-change-transform"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#4274D9]/5 to-transparent dark:from-[#95CCDD]/5 rounded-2xl pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-[#4274D9]/10 dark:bg-[#95CCDD]/10 flex items-center justify-center mb-5 lg:mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#4274D9]/20 dark:group-hover:bg-[#95CCDD]/20">
          <Icon
            size={28}
            className="text-[#4274D9] dark:text-[#95CCDD]"
            weight="duotone"
          />
        </div>
        <div className="mb-2">
          <span className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
            {formatNumber(count)}
            {stat.suffixKey}
          </span>
        </div>
        <p className="text-sm lg:text-base text-slate-600 dark:text-slate-400 font-medium leading-tight">
          {t(stat.labelKey)}
        </p>
      </div>
    </motion.div>
  )
}

export function Stats() {
  const t = useI18nStore((state) => state.t)

  return (
    <section className="relative bg-gradient-to-b from-slate-50 to-[#D0E7E6] dark:from-slate-950 dark:to-[#293681] py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-[#4274D9]/10 dark:bg-[#95CCDD]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-[#293681]/10 dark:bg-[#95CCDD]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-12 sm:mb-20 lg:mb-28"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tighter text-slate-900 dark:text-white mb-4">
            {t('stats.title')}
          </h2>
          <div className="w-24 h-1 bg-[#4274D9] dark:bg-[#95CCDD] rounded-full mx-auto mb-6" />
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t('stats.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {statsData.map((stat, i) => (
            <StatCard key={stat.id} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
