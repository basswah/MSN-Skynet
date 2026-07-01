import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { CaretRight } from '@phosphor-icons/react'

interface IButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  href?: string
  type?: 'button' | 'submit'
  showArrow?: boolean
}

const variantStyles: Record<string, string> = {
  primary: 'bg-primary-blue text-white hover:brightness-110 shadow-lg shadow-primary-blue/20',
  secondary: 'ring-1 ring-white/20 text-secondary hover:bg-white/5',
  ghost: 'text-white/60 hover:text-white hover:bg-white/5',
}

const sizeStyles: Record<string, string> = {
  sm: 'px-5 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-3.5 text-lg',
}

export function Button({ children, variant = 'primary', size = 'md', className = '', onClick, href, type = 'button', showArrow = true }: IButtonProps) {
  const base = `group inline-flex items-center justify-center gap-3 rounded-full font-semibold transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring' as const, stiffness: 300, damping: 18 },
  }

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
          <CaretRight size={14} weight="bold" className="text-current" />
        </span>
      )}
    </>
  )

  if (href) {
    return (
      <motion.a href={href} className={base} {...motionProps}>
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button type={type} className={base} onClick={onClick} {...motionProps}>
      {content}
    </motion.button>
  )
}
