import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
type ExcludedKeys = 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag';

interface Props extends Omit<ButtonProps, ExcludedKeys> {
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'outline' | 'solid';
  full?: boolean;
  size?: 'md' | 'lg';
  to?: string;
}

const MotionLink = motion(Link);

export default function PrimaryButton({
  children,
  variant = 'primary',
  full = false,
  size = 'md',
  className = '',
  disabled,
  to,
  ...rest
}: Props) {
  const reduce = useReducedMotion();

  const base =
    'group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full font-ko font-normal transition-all duration-500 ease-velvet disabled:cursor-not-allowed disabled:opacity-40';

  const sizeClass = size === 'lg' ? 'px-9 py-4 text-[13px]' : 'px-6 py-3 text-[12px]';

  // primary는 이제 outline 톤이 기본 (quiet luxury)
  // solid는 검은 fill이 필요한 곳에서만 명시적으로 사용
  const variantClass =
    variant === 'primary' || variant === 'outline'
      ? 'border border-ink-900/20 bg-transparent text-ink-900 hover:border-ink-900/50 hover:bg-ink-900/[0.02]'
      : variant === 'solid'
        ? 'bg-ink-900 text-ivory hover:bg-ink-700'
        : 'bg-transparent text-taupe-500 hover:text-ink-900';

  const width = full ? 'w-full' : '';
  const classes = `${base} ${sizeClass} ${variantClass} ${width} ${className}`;

  const hover = reduce || disabled ? undefined : { y: -1 };
  const tap = reduce || disabled ? undefined : { y: 0, scale: 0.99 };
  const transition = { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const };

  const inner = (
    <span className="relative z-10 inline-flex items-center gap-3 tracking-wide">
      {children}
    </span>
  );

  if (to && !disabled) {
    return (
      <MotionLink
        to={to}
        whileHover={hover}
        whileTap={tap}
        transition={transition}
        className={classes}
      >
        {inner}
      </MotionLink>
    );
  }

  return (
    <motion.button
      whileHover={hover}
      whileTap={tap}
      transition={transition}
      className={classes}
      disabled={disabled}
      {...rest}
    >
      {inner}
    </motion.button>
  );
}