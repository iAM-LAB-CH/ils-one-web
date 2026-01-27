'use client';

import { useEffect, useState, useRef, type RefObject } from 'react';

interface UseScrollProgressOptions {
  threshold?: number;
  offset?: number;
}

interface ScrollProgress {
  progress: number;
  isInView: boolean;
  hasEntered: boolean;
}

export function useScrollProgress<T extends HTMLElement = HTMLElement>(
  options: UseScrollProgressOptions = {}
): [RefObject<T | null>, ScrollProgress] {
  const { threshold = 0, offset = 0 } = options;
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState<ScrollProgress>({
    progress: 0,
    isInView: false,
    hasEntered: false,
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how much of the element is visible
      const elementTop = rect.top - offset;
      const elementBottom = rect.bottom - offset;
      const elementHeight = rect.height;
      
      // Calculate progress (0 = just entering, 1 = just leaving)
      const visibleHeight = Math.min(windowHeight, elementBottom) - Math.max(0, elementTop);
      const scrollProgress = Math.max(0, Math.min(1, visibleHeight / elementHeight));
      
      // Calculate linear progress through the element
      const startTrigger = windowHeight;
      const endTrigger = -elementHeight;
      const totalDistance = startTrigger - endTrigger;
      const currentPosition = elementTop;
      const linearProgress = 1 - (currentPosition - endTrigger) / totalDistance;
      
      const isInView = elementTop < windowHeight - threshold && elementBottom > threshold;
      const hasEntered = elementTop < windowHeight - threshold;

      setProgress({
        progress: Math.max(0, Math.min(1, linearProgress)),
        isInView,
        hasEntered,
      });
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [threshold, offset]);

  return [ref, progress];
}

export function useActiveSection(sectionIds: string[]): string | null {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          return;
        }
      }
      
      setActiveSection(sectionIds[0] || null);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  return activeSection;
}
