import { useEffect } from 'react'
import { useUIStore } from '../store/useUIStore'

export function useScrollPosition(): void {
  const setScrolled = useUIStore((state) => state.setScrolled)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [setScrolled])
}
