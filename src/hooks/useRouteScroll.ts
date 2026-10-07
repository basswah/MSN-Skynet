import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const NAV_OFFSET = 80
const HASH_SCROLL_DELAY = 100

export function useRouteScroll() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    const timer = window.setTimeout(() => {
      const el = document.querySelector(hash)
      if (!el) return
      const y = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
      window.scrollTo({ top: y, behavior: 'smooth' })
    }, HASH_SCROLL_DELAY)

    return () => window.clearTimeout(timer)
  }, [pathname, hash])
}
