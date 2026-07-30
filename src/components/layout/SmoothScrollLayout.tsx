import { useEffect, useState, type ReactNode } from 'react'
import Lenis from 'lenis'
import { useI18nStore } from '../../store/useI18nStore'
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
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (!enabled) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    const rafId = requestAnimationFrame(() => {
      setLenis(lenis)
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      setLenis(null)
    }
  }, [enabled])

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
