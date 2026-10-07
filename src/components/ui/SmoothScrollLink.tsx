import { type ReactNode, type MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'

interface SmoothScrollLinkProps {
  href: string
  children: ReactNode
  className?: string
  target?: string
  rel?: string
  ariaLabel?: string
  onClick?: () => void
}

export function SmoothScrollLink({
  href,
  children,
  className,
  target,
  rel,
  ariaLabel,
  onClick,
}: SmoothScrollLinkProps) {
  const navigate = useNavigate()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (target === '_blank') return

    if (href.startsWith('#')) {
      e.preventDefault()
      const el = document.querySelector(href)
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80
        window.scrollTo({ top: y, behavior: 'smooth' })
      } else {
        navigate(`/${href}`)
      }
    }

    onClick?.()
  }

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}
