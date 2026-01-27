import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

interface ButtonBaseProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

interface ButtonAsButton extends ButtonBaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  href?: never;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  target?: string;
  rel?: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  iconPosition = 'right',
  ...props
}: ButtonProps) {
  const baseStyles = clsx(
    'inline-flex items-center justify-center transition-all duration-200',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'tracking-[-0.01em]',
    {
      // Variants - Apple style
      'bg-accent-500 text-white hover:bg-accent-600 active:scale-[0.98]':
        variant === 'primary',
      'bg-dark-800 text-dark-100 hover:bg-dark-700 border border-white/[0.08]':
        variant === 'secondary',
      'bg-dark-800 text-white hover:text-white/90':
        variant === 'ghost',
      'bg-transparent border border-white/[0.12] text-dark-100 hover:border-white/[0.2] hover:bg-white/[0.04]':
        variant === 'outline',
      // Sizes - Apple proportions with pill shape
      'text-sm px-5 py-2.5 rounded-full gap-2 font-normal': size === 'sm',
      'text-[0.9375rem] px-6 py-3 rounded-full gap-2 font-normal': size === 'md',
      'text-[1.0625rem] px-7 py-3.5 rounded-full gap-2.5 font-normal': size === 'lg',
      'text-lg px-8 py-4 rounded-full gap-3 font-normal': size === 'xl',
    },
    className
  );

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </>
  );

  if ('href' in props && props.href) {
    const { href, target, rel, ...rest } = props;
    return (
      <Link 
        href={href} 
        target={target} 
        rel={rel}
        className={baseStyles}
        {...rest}
      >
        {content}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button className={baseStyles} {...buttonProps}>
      {content}
    </button>
  );
}
