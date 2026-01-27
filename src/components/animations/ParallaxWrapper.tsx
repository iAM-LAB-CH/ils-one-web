'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxWrapperProps {
  children: ReactNode;
  className?: string;
  speed?: number; // 0.5 = half speed, 2 = double speed
  direction?: 'vertical' | 'horizontal';
}

export function ParallaxWrapper({
  children,
  className = '',
  speed = 0.5,
  direction = 'vertical',
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        [direction === 'vertical' ? 'y' : 'x']: () => {
          const scrollDistance = window.innerHeight;
          return scrollDistance * (1 - speed);
        },
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [speed, direction, reducedMotion]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
