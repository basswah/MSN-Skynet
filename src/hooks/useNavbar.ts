import { useEffect, useState, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { navLinks } from '../services/navigation'

const NAV_ITEMS = ['hero', 'about', 'coverage', 'services', 'testimonials', 'contact']
const SCROLL_THRESHOLD = 20

export function useNavItems(activeId: string) {
  const { pathname } = useLocation()
  return useMemo(
    () =>
      navLinks.map((link) => ({
        ...link,
        isActive:
          link.href === pathname ||
          (pathname === '/' && link.href.startsWith('#') && activeId === link.id),
      })),
    [activeId, pathname]
  )
}

export function useScrollEffects() {
  const { pathname } = useLocation()
  const isHomePage = pathname === '/'
  const { scrollY } = useScroll()
  const [scrolledPastHero, setScrolledPastHero] = useState(
    () => scrollY.get() >= window.innerHeight * 0.75
  )

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolledPastHero(latest >= window.innerHeight * 0.75)
  })

  const isOverDarkBg = isHomePage && !scrolledPastHero

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
