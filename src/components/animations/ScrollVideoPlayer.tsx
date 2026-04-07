'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface ScrollVideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  containerClassName?: string;
  scrollHeight?: string;
}

export function ScrollVideoPlayer({
  src,
  poster,
  className = '',
  containerClassName = '',
  scrollHeight = '300vh',
}: ScrollVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    
    if (!container || !video || reducedMotion) return;

    // Wait for video metadata
    const setupScrollTrigger = () => {
      if (!video.duration || isNaN(video.duration)) return;

      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          onUpdate: (self) => {
            const time = self.progress * video.duration;
            if (video.currentTime !== time) {
              video.currentTime = time;
            }
          },
        });
      });

      return () => ctx.revert();
    };

    if (video.readyState >= 1) {
      return setupScrollTrigger();
    }

    video.addEventListener('loadedmetadata', setupScrollTrigger);
    return () => {
      video.removeEventListener('loadedmetadata', setupScrollTrigger);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div className={containerClassName}>
        <video
          src={src}
          poster={poster}
          className={className}
          controls
          playsInline
        />
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className={containerClassName}
      style={{ height: scrollHeight }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className={className}
          muted
          playsInline
          preload="metadata"
        />
      </div>
    </div>
  );
}
