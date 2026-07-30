import { useRef, useCallback, type ReactNode, type MouseEvent } from 'react';
import { motion } from 'framer-motion';

type MagneticButtonVariant = 'primary' | 'secondary' | 'ghost';
type MagneticButtonSize = 'sm' | 'md' | 'lg';

interface MagneticButtonProps {
  children: ReactNode;
  variant?: MagneticButtonVariant;
  size?: MagneticButtonSize;
  strength?: number;
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

function smoothScrollTo(el: Element) {
  const targetY = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top: targetY, behavior: 'smooth' });
}

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
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const handleClick = useCallback((e: MouseEvent<HTMLElement>) => {
    if (disabled) { e.preventDefault(); return; }
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        smoothScrollTo(el);
      }
    }
    onClick?.();
  }, [disabled, href, onClick]);

  const buttonClasses = `${variantStyles[variant]} ${sizeStyles[size]} ${className} inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4274D9] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 touch-action-manipulation`;

  const motionProps = {
    className: buttonClasses,
    onClick: handleClick,
    whileTap: { scale: 0.95 },
    ...(window.matchMedia('(hover: hover)').matches && {
      whileHover: { scale: 1.05 },
    }),
  };

  return href ? (
    <motion.a ref={ref} href={href} target={target} rel={rel} {...motionProps}>
      {children}
    </motion.a>
  ) : (
    <motion.button ref={ref} type={type} disabled={disabled} {...motionProps}>
      {children}
    </motion.button>
  );
}
