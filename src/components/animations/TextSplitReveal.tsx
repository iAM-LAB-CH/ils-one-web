'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface TextSplitRevealProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  className?: string;
  splitBy?: 'chars' | 'words' | 'lines';
  staggerAmount?: number;
  duration?: number;
  delay?: number;
  startTrigger?: string;
  once?: boolean;
}

export function TextSplitReveal({
  children,
  as: Tag = 'span',
  className = '',
  splitBy = 'chars',
  staggerAmount = 0.02,
  duration = 0.8,
  delay = 0,
  startTrigger = 'top 85%',
  once = true,
}: TextSplitRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reducedMotion) return;

    // Split text into spans
    const text = children;
    let elements: HTMLSpanElement[] = [];

    if (splitBy === 'chars') {
      container.innerHTML = text
        .split('')
        .map((char) =>
          char === ' '
            ? '<span class="inline-block">&nbsp;</span>'
            : `<span class="inline-block">${char}</span>`
        )
        .join('');
      elements = Array.from(container.querySelectorAll('span'));
    } else if (splitBy === 'words') {
      container.innerHTML = text
        .split(' ')
        .map((word) => `<span class="inline-block">${word}&nbsp;</span>`)
        .join('');
      elements = Array.from(container.querySelectorAll('span'));
    } else {
      // For lines, we'll treat the whole text as one element
      elements = [container as unknown as HTMLSpanElement];
    }

    // Set initial state
    gsap.set(elements, {
      opacity: 0,
      y: 50,
      rotateX: -45,
      transformOrigin: 'center bottom',
    });

    // Animate
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: startTrigger,
        toggleActions: once ? 'play none none none' : 'play reverse play reverse',
      },
    });

    tl.to(elements, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration,
      stagger: staggerAmount,
      ease: 'power3.out',
      delay,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [children, splitBy, staggerAmount, duration, delay, startTrigger, once, reducedMotion]);

  if (reducedMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
      className={`${className} perspective-[1000px]`}
      aria-label={children}
    >
      {children}
    </Tag>
  );
}
