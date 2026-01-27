'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

interface GradientTextProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  className?: string;
  animate?: boolean;
  colors?: string[];
}

export function GradientText({
  children,
  as: Tag = 'span',
  className = '',
  animate = true,
  colors = ['#ff6b35', '#ff8c42', '#ffa64d', '#ff6b35'],
}: GradientTextProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || !animate || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        backgroundPosition: '200% center',
        duration: 3,
        ease: 'none',
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, [animate, reducedMotion]);

  const gradientStyle = {
    background: `linear-gradient(90deg, ${colors.join(', ')})`,
    backgroundSize: '200% 100%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
      className={className}
      style={gradientStyle}
    >
      {children}
    </Tag>
  );
}
