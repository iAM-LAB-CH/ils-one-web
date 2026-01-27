'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  scale?: number;
  opacity?: number;
  startTrigger?: string;
  once?: boolean;
}

export function RevealOnScroll({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  y = 40,
  x = 0,
  scale = 1,
  opacity = 0,
  startTrigger = 'top 85%',
  once = true,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reducedMotion) return;

    gsap.set(element, {
      opacity,
      y,
      x,
      scale,
    });

    const ctx = gsap.context(() => {
      gsap.to(element, {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: startTrigger,
          toggleActions: once ? 'play none none none' : 'play reverse play reverse',
        },
      });
    });

    return () => ctx.revert();
  }, [delay, duration, y, x, scale, opacity, startTrigger, once, reducedMotion]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
