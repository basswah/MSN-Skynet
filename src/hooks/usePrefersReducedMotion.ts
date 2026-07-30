import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function getInitialValue(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia(QUERY).matches
}

export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(getInitialValue)

  useEffect(() => {
    const mql = window.matchMedia(QUERY)
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  return prefersReduced
}
