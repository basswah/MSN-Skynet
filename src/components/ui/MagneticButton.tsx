import { useRef, useState, useCallback, type ReactNode, type MouseEvent } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionStyle,
} from 'framer-motion';

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
}

const variantStyles: Record<MagneticButtonVariant, string> = {
  primary:
    'bg-[#4274D9] text-white hover:bg-[#293681] shadow-[0_0_20px_rgba(66,116,217,0.4)]',
  secondary:
    'bg-transparent text-[#4274D9] border-2 border-[#4274D9] hover:bg-[#4274D9] hover:text-white',
  ghost:
    'bg-transparent text-[#4274D9] hover:bg-[#4274D9]/10',
};

const sizeStyles: Record<MagneticButtonSize, string> = {
  sm: 'px-5 py-2.5 text-sm gap-2',
  md: 'px-7 py-3.5 text-base gap-2.5',
  lg: 'px-9 py-4.5 text-lg gap-3',
};

export function MagneticButton({
  children,
  variant = 'primary',
  size = 'md',
  strength = 0.35,
  disabled = false,
  onClick,
  className = '',
  type = 'button',
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const scale = useSpring(1, { stiffness: 300, damping: 20 });
  const glowOpacity = useTransform(
    [springX, springY],
    ([latestX, latestY]: number[]) => {
      const distance = Math.sqrt(
        (latestX as number) ** 2 + (latestY as number) ** 2
      );
      return distance > 0 ? 0.6 : 0;
    }
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (disabled || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      x.set(deltaX);
      y.set(deltaY);
      scale.set(1.05);
    },
    [disabled, strength, x, y, scale]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    scale.set(1);
    setIsHovered(false);
  }, [x, y, scale]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const dynamicStyle: MotionStyle = {
    x: springX,
    y: springY,
    scale,
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={dynamicStyle}
      className={[
        'relative inline-flex items-center justify-center font-semibold',
        'rounded-xl transition-colors duration-300',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:focus-visible:outline-white',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(' ')}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      <motion.span
        className="absolute inset-0 rounded-xl bg-white/20"
        style={{ opacity: glowOpacity }}
        animate={isHovered ? { opacity: 0.15 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
      <span className="relative z-10 flex items-center gap-inherit">
        {children}
      </span>
    </motion.button>
  );
}
