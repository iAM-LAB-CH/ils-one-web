'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface DeviceMockupProps {
  imageSrc: string;
  imageAlt: string;
  device?: 'phone' | 'tablet' | 'laptop' | 'desktop';
  className?: string;
  animate?: boolean;
  glow?: boolean;
}

export function DeviceMockup({
  imageSrc,
  imageAlt,
  device = 'phone',
  className = '',
  animate = true,
  glow = false,
}: DeviceMockupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !animate || reducedMotion) return;

    gsap.set(container, {
      opacity: 0,
      y: 40,
      scale: 0.98,
    });

    const ctx = gsap.context(() => {
      gsap.to(container, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
        },
      });
    });

    return () => ctx.revert();
  }, [animate, reducedMotion]);

  const deviceStyles = {
    phone: {
      wrapper: 'w-[280px] sm:w-[320px] md:w-[360px]',
      frame: 'rounded-[2.75rem] p-[10px] aspect-[9/19.5]',
      screen: 'rounded-[2.25rem]',
      notch: true,
    },
    tablet: {
      wrapper: 'w-[400px] md:w-[500px]',
      frame: 'rounded-[1.75rem] p-4 aspect-[4/3]',
      screen: 'rounded-[1.25rem]',
      notch: false,
    },
    laptop: {
      wrapper: 'w-[500px] md:w-[700px]',
      frame: 'rounded-t-[1rem] p-2 aspect-[16/10]',
      screen: 'rounded-[0.5rem]',
      notch: false,
    },
    desktop: {
      wrapper: 'w-[600px] md:w-[800px]',
      frame: 'rounded-[1rem] p-3 aspect-[16/9]',
      screen: 'rounded-[0.5rem]',
      notch: false,
    },
  };

  const styles = deviceStyles[device];

  return (
    <div
      ref={containerRef}
      className={`relative ${styles.wrapper} ${className}`}
    >
      {/* Subtle shadow glow */}
      {glow && (
        <div className="absolute inset-0 blur-3xl opacity-20 bg-gradient-to-b from-accent-500/50 via-accent-600/30 to-transparent -z-10 scale-110" />
      )}

      {/* Device frame - Apple style */}
      <div
        className={`relative bg-dark-900 border border-white/[0.08] ${styles.frame} shadow-2xl shadow-black/50`}
      >
        {/* Dynamic Island for phones */}
        {styles.notch && device === 'phone' && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[90px] h-[28px] bg-dark-950 rounded-full z-20" />
        )}

        {/* Screen */}
        <div className={`relative w-full h-full overflow-hidden bg-dark-950 ${styles.screen}`}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 360px"
            className="object-cover"
            priority
          />
        </div>

        {/* Home indicator for phones */}
        {device === 'phone' && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-[4px] bg-dark-700 rounded-full" />
        )}
      </div>

      {/* Laptop base */}
      {device === 'laptop' && (
        <div className="relative w-[110%] -ml-[5%] h-3 bg-dark-800 rounded-b-xl border-t-0 border border-white/[0.06]">
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-14 h-1 bg-dark-700 rounded-full" />
        </div>
      )}

      {/* Desktop stand */}
      {device === 'desktop' && (
        <>
          <div className="relative mx-auto w-20 h-14 bg-dark-800 border-x border-white/[0.06]" />
          <div className="relative mx-auto w-36 h-2 bg-dark-800 rounded-full border border-white/[0.06]" />
        </>
      )}
    </div>
  );
}
