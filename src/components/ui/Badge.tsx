import { type ReactNode } from 'react';
import clsx from 'clsx';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'accent' | 'outline' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center font-normal tracking-[-0.01em]',
        {
          // Variants - Apple style
          'bg-dark-800 text-dark-300': variant === 'default',
          'bg-accent-500/10 text-accent-500': variant === 'accent',
          'bg-transparent border border-white/[0.12] text-dark-400': variant === 'outline',
          'bg-dark-900 text-dark-500': variant === 'subtle',
          // Sizes - Apple proportions
          'text-xs px-2.5 py-1 rounded-full': size === 'sm',
          'text-sm px-3 py-1.5 rounded-full': size === 'md',
          'text-[0.9375rem] px-4 py-2 rounded-full': size === 'lg',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
