'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

type RevealDirection = 'up' | 'down' | 'left' | 'right';

interface MaskRevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  duration?: number;
  delay?: number;
  className?: string;
  startTrigger?: string;
  once?: boolean;
}

const getClipPath = (direction: RevealDirection, revealed: boolean) => {
  if (revealed) return 'inset(0% 0% 0% 0%)';
  
  switch (direction) {
    case 'up':
      return 'inset(100% 0% 0% 0%)';
    case 'down':
      return 'inset(0% 0% 100% 0%)';
    case 'left':
      return 'inset(0% 100% 0% 0%)';
    case 'right':
      return 'inset(0% 0% 0% 100%)';
    default:
      return 'inset(100% 0% 0% 0%)';
  }
};

export function MaskReveal({
  children,
  direction = 'up',
  duration = 1.2,
  delay = 0,
  className = '',
  startTrigger = 'top 80%',
  once = true,
}: MaskRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reducedMotion) return;

    gsap.set(container, {
      clipPath: getClipPath(direction, false),
      opacity: 0,
    });

    const ctx = gsap.context(() => {
      gsap.to(container, {
        clipPath: getClipPath(direction, true),
        opacity: 1,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: startTrigger,
          toggleActions: once ? 'play none none none' : 'play reverse play reverse',
        },
      });
    });

    return () => ctx.revert();
  }, [direction, duration, delay, startTrigger, once, reducedMotion]);

  return (
    <div 
      ref={containerRef} 
      className={className}
      style={reducedMotion ? {} : { willChange: 'clip-path, opacity' }}
    >
      {children}
    </div>
  );
}
