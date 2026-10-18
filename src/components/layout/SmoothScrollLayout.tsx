import { useEffect, useState, type ReactNode } from 'react'
import Lenis from 'lenis'
import { useI18nStore } from '../../store/useI18nStore'
import { useRouteScroll } from '../../hooks/useRouteScroll'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { SmoothScrollContext } from './SmoothScrollContext'

interface SmoothScrollLayoutProps {
  children: ReactNode
  enabled?: boolean
}

export function SmoothScrollLayout({
  children,
  enabled = true,
}: SmoothScrollLayoutProps) {
  const t = useI18nStore((state) => state.t)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [lenis, setLenis] = useState<Lenis | null>(null)
  useRouteScroll()

  useEffect(() => {
    let lenis: Lenis | null = null
    let rafId = 0

    function raf(time: number) {
      if (!lenis) return
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    const initRafId = requestAnimationFrame((time) => {
      if (!enabled || prefersReducedMotion) {
        setLenis(null)
        return
      }

      lenis = new Lenis({
        duration: 1.2,
        easing: (progress: number) => Math.min(1, 1.001 - Math.pow(2, -10 * progress)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      })
      setLenis(lenis)
      raf(time)
    })

    return () => {
      cancelAnimationFrame(initRafId)
      cancelAnimationFrame(rafId)
      lenis?.destroy()
    }
  }, [enabled, prefersReducedMotion])

  return (
    <SmoothScrollContext.Provider value={{ lenis }}>
      <div data-lenis-prevent={false}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[9999] focus:p-4 focus:bg-[#4274D9] focus:text-white focus:rounded-br-xl focus:font-semibold focus:text-sm focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#4274D9] focus:ring-offset-2"
        >
          {t('a11y.skipToContent')}
        </a>
        {children}
      </div>
    </SmoothScrollContext.Provider>
  )
}
