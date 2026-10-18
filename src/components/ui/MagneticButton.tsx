import { useCallback, type ReactNode, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

type MagneticButtonVariant = 'primary' | 'secondary' | 'ghost';
type MagneticButtonSize = 'sm' | 'md' | 'lg';

interface MagneticButtonProps {
  children: ReactNode;
  variant?: MagneticButtonVariant;
  size?: MagneticButtonSize;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  target?: string;
  rel?: string;
}

const variantStyles: Record<MagneticButtonVariant, string> = {
  primary: 'bg-[#4274D9] text-white hover:bg-[#293681] shadow-[0_0_20px_rgba(66,116,217,0.4)]',
  secondary: 'bg-transparent text-[#4274D9] border-2 border-[#4274D9] hover:bg-[#4274D9] hover:text-white',
  ghost: 'bg-transparent text-[#4274D9] hover:bg-[#4274D9]/10',
};

const sizeStyles: Record<MagneticButtonSize, string> = {
  sm: 'px-6 py-3 text-sm gap-2',
  md: 'px-8 py-4 text-base gap-2.5',
  lg: 'px-10 py-5 text-lg gap-3',
};

export function MagneticButton({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = '',
  type = 'button',
  href,
  target,
  rel,
}: MagneticButtonProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleClick = useCallback((e: MouseEvent<HTMLElement>) => {
    if (disabled) { e.preventDefault(); return; }
    if (href && href.startsWith('#')) {
      const el = document.getElementById(href.slice(1));
      if (el) {
        e.preventDefault();
        const targetY = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: targetY, behavior: prefersReducedMotion ? 'instant' : 'smooth' });
      }
    }
    onClick?.();
  }, [disabled, href, onClick, prefersReducedMotion]);

  const buttonClasses = `${variantStyles[variant]} ${sizeStyles[size]} ${className} inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4274D9] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 touch-action-manipulation`;

  const supportsHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;
  const motionProps = {
    className: buttonClasses,
    onClick: handleClick,
    whileTap: prefersReducedMotion ? undefined : { scale: 0.98 },
    ...(!prefersReducedMotion && supportsHover && {
      whileHover: { scale: 1.05 },
    }),
  };

  return href ? (
    <motion.a href={href} target={target} rel={rel} aria-disabled={disabled || undefined} {...motionProps}>
      {children}
    </motion.a>
  ) : (
    <motion.button type={type} disabled={disabled} {...motionProps}>
      {children}
    </motion.button>
  );
}
