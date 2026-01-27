'use client';

import { useEffect, useRef, type ReactNode, Children } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  childClassName?: string;
  stagger?: number;
  duration?: number;
  y?: number;
  startTrigger?: string;
  once?: boolean;
}

export function StaggerReveal({
  children,
  className = '',
  childClassName = '',
  stagger = 0.1,
  duration = 0.8,
  y = 40,
  startTrigger = 'top 85%',
  once = true,
}: StaggerRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reducedMotion) return;

    const items = container.children;

    gsap.set(items, {
      opacity: 0,
      y,
    });

    const ctx = gsap.context(() => {
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: startTrigger,
          toggleActions: once ? 'play none none none' : 'play reverse play reverse',
        },
      });
    });

    return () => ctx.revert();
  }, [stagger, duration, y, startTrigger, once, reducedMotion]);

  return (
    <div ref={containerRef} className={className}>
      {Children.map(children, (child) => (
        <div className={childClassName}>{child}</div>
      ))}
    </div>
  );
}
