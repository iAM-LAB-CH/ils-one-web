'use client';

import { useEffect, useRef, type RefObject } from 'react';

interface UseVideoScrollOptions {
  start?: string;
  end?: string;
}

export function useVideoScroll(
  options: UseVideoScrollOptions = {}
): [RefObject<HTMLVideoElement | null>, RefObject<HTMLDivElement | null>] {
  const { start = 'top bottom', end = 'bottom top' } = options;
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    
    if (!video || !container) return;

    // Ensure video is ready
    const handleLoadedMetadata = () => {
      video.currentTime = 0;
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Parse start/end positions
      const parsePosition = (pos: string, defaultValue: number) => {
        if (pos.includes('bottom')) return windowHeight;
        if (pos.includes('center')) return windowHeight / 2;
        if (pos.includes('top')) return 0;
        return defaultValue;
      };

      const startOffset = parsePosition(start.split(' ')[1] || 'bottom', windowHeight);
      const endOffset = parsePosition(end.split(' ')[1] || 'top', 0);
      
      // Calculate progress
      const elementStart = rect.top;
      const elementEnd = rect.bottom;
      
      let progress = 0;
      
      if (elementStart < startOffset && elementEnd > endOffset) {
        const totalDistance = (startOffset - endOffset) + rect.height;
        const traveled = startOffset - elementStart;
        progress = Math.max(0, Math.min(1, traveled / totalDistance));
      } else if (elementStart >= startOffset) {
        progress = 0;
      } else {
        progress = 1;
      }

      // Update video time
      if (video.duration && !isNaN(video.duration)) {
        video.currentTime = progress * video.duration;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [start, end]);

  return [videoRef, containerRef];
}
