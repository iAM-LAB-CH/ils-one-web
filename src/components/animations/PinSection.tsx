'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface PinSectionProps {
  children: ReactNode;
  className?: string;
  pinDuration?: string; // e.g., '+=200%' or '+=1000'
  scrub?: boolean | number;
  anticipatePin?: number;
  onProgress?: (progress: number) => void;
}

export function PinSection({
  children,
  className = '',
  pinDuration = '+=100%',
  scrub = 1,
  anticipatePin = 1,
  onProgress,
}: PinSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reducedMotion) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        pin: true,
        start: 'top top',
        end: pinDuration,
        scrub,
        anticipatePin,
        onUpdate: (self) => {
          onProgress?.(self.progress);
        },
      });
    });

    return () => ctx.revert();
  }, [pinDuration, scrub, anticipatePin, onProgress, reducedMotion]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
