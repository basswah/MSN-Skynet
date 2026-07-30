import { useEffect, useState, useMemo } from 'react'
import { useScroll, useTransform } from 'framer-motion'
import { navLinks } from '../services/navigation'

const NAV_ITEMS = ['hero', 'about', 'coverage', 'services', 'testimonials', 'contact']
const SCROLL_THRESHOLD = 20

export function useNavItems(activeId: string) {
  return useMemo(
    () =>
      navLinks.map((link) => ({
        ...link,
        isActive: activeId === link.id,
      })),
    [activeId]
  )
}

export function useScrollEffects() {
  const { scrollY } = useScroll()
  const [isOverDarkBg, setIsOverDarkBg] = useState(true)

  useEffect(() => {
    const unsub = scrollY.on('change', (latest) => {
      setIsOverDarkBg(latest < window.innerHeight * 0.75)
    })
    return unsub
  }, [scrollY])

  const headerShadow = useTransform(
    scrollY,
    [0, SCROLL_THRESHOLD],
    ['0 4px 30px rgba(0,0,0,0.05)', '0 8px 40px rgba(0,0,0,0.1)']
  )
  const headerShadowDark = useTransform(
    scrollY,
    [0, SCROLL_THRESHOLD],
    ['0 4px 30px rgba(0,0,0,0.08)', '0 8px 40px rgba(0,0,0,0.2)']
  )
  const headerBorderLight = useTransform(
    scrollY,
    [0, SCROLL_THRESHOLD],
    ['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.25)']
  )
  const headerBorderDark = useTransform(
    scrollY,
    [0, SCROLL_THRESHOLD],
    ['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.08)']
  )

  return { isOverDarkBg, headerShadow, headerShadowDark, headerBorderLight, headerBorderDark }
}

export function useActiveSection() {
  const [activeId, setActiveId] = useState('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    )

    NAV_ITEMS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return activeId
}

export function useScrollLock(isOpen: boolean) {
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
      document.documentElement.style.setProperty('--scroll-y', `-${scrollY}px`)
    } else {
      const raw = document.documentElement.style.getPropertyValue('--scroll-y')
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      document.documentElement.style.removeProperty('--scroll-y')
      if (raw) {
        const y = -parseInt(raw || '0', 10)
        window.scrollTo({ top: y, behavior: 'instant' })
      }
    }
    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      document.documentElement.style.removeProperty('--scroll-y')
    }
  }, [isOpen])
}
