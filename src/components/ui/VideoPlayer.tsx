'use client';

import { useRef, useState, useEffect } from 'react';
import clsx from 'clsx';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  className?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | '9/16';
}

export function VideoPlayer({
  src,
  poster,
  autoPlay = false,
  muted = true,
  loop = true,
  controls = true,
  className = '',
  aspectRatio = '16/9',
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [showControls, setShowControls] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    video.currentTime = percentage * video.duration;
  };

  return (
    <div
      className={clsx('relative rounded-2xl overflow-hidden bg-dark-900', className)}
      style={{ aspectRatio }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline
        className="w-full h-full object-cover"
      />

      {/* Custom controls overlay */}
      {controls && (
        <div
          className={clsx(
            'absolute inset-0 flex flex-col justify-end transition-opacity duration-300',
            showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
          )}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent pointer-events-none" />

          {/* Play/Pause button (center) */}
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            <div
              className={clsx(
                'w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300',
                'hover:bg-white/20 hover:scale-110',
                isPlaying && showControls ? 'opacity-100' : !isPlaying ? 'opacity-100' : 'opacity-0'
              )}
            >
              {isPlaying ? (
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </div>
          </button>

          {/* Progress bar */}
          <div className="relative z-10 px-4 pb-4">
            <div
              onClick={handleSeek}
              className="h-1 bg-white/20 rounded-full cursor-pointer group"
            >
              <div
                className="h-full bg-accent-500 rounded-full relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
