'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface CountUpAnimationProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
  startTrigger?: string;
  once?: boolean;
}

export function CountUpAnimation({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  decimals = 0,
  className = '',
  startTrigger = 'top 80%',
  once = true,
}: CountUpAnimationProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef({ value: 0 });
  const [displayValue, setDisplayValue] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (reducedMotion) {
      setDisplayValue(value);
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(counterRef.current, {
        value,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: startTrigger,
          toggleActions: once ? 'play none none none' : 'play reverse play reverse',
        },
        onUpdate: () => {
          setDisplayValue(counterRef.current.value);
        },
      });
    });

    return () => ctx.revert();
  }, [value, duration, startTrigger, once, reducedMotion]);

  const formattedValue = decimals > 0 
    ? displayValue.toFixed(decimals)
    : Math.round(displayValue).toLocaleString();

  return (
    <span ref={containerRef} className={className}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}
