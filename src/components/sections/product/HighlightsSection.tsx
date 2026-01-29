'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { TabNav } from '@/components/ui';
import { TextSplitReveal, RevealOnScroll } from '@/components/animations';
import type { HighlightsContent } from '@/lib/types/content';

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface HighlightsSectionProps {
  content: HighlightsContent;
}

// Hook to detect mobile device for performance optimization
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  return isMobile;
}

export function HighlightsSection({ content }: HighlightsSectionProps) {
  const [activeTab, setActiveTab] = useState(content.tabs[0]?.id || '');
  const [lottieData, setLottieData] = useState<Record<string, unknown> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useIsMobile();

  const activeTabData = content.tabs.find((tab) => tab.id === activeTab);

  // Mobile: prefer video for performance, Desktop: prefer Lottie for quality
  const hasVideo = !!activeTabData?.videoUrl;
  const hasLottie = !!activeTabData?.lottieUrl;
  
  // On mobile, use video if available; on desktop, use Lottie if available
  const shouldShowVideo = isMobile ? hasVideo : (hasVideo && !hasLottie);
  const shouldShowLottie = !isMobile && hasLottie;

  // Load Lottie data when tab changes (only on desktop)
  useEffect(() => {
    if (!shouldShowLottie || !activeTabData?.lottieUrl) {
      setLottieData(null);
      return;
    }

    setIsLoading(true);
    fetch(activeTabData.lottieUrl)
      .then((res) => res.json())
      .then((data) => {
        setLottieData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load Lottie animation:', err);
        setLottieData(null);
        setIsLoading(false);
      });
  }, [activeTabData?.lottieUrl, shouldShowLottie]);

  // Auto-play video when tab changes
  useEffect(() => {
    if (shouldShowVideo && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked by browser
      });
    }
  }, [shouldShowVideo, activeTab]);

  // Make configuration animation slightly smaller
  const isConfiguration = activeTab === 'configuration';
  
  return (
    <section id="highlights" className="section-padding">
      <div className="container-wide">
        {/* Section header - Apple style centered - reduced spacing */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h2 className="text-dark-50 mb-4">
            <TextSplitReveal splitBy="words" staggerAmount={0.05}>
              {content.headline}
            </TextSplitReveal>
          </h2>
          {content.subheadline && (
            <RevealOnScroll delay={0.2}>
              <p className="text-xl md:text-2xl text-dark-400 font-normal tracking-[-0.01em]">
                {content.subheadline}
              </p>
            </RevealOnScroll>
          )}
        </div>

        {/* Tabs - Apple style pill navigation - minimal margin */}
        <RevealOnScroll delay={0.3}>
          <div className="flex justify-center mb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="overflow-x-auto scrollbar-hide max-w-full">
              <TabNav
                tabs={content.tabs.map((tab) => ({
                  id: tab.id,
                  label: tab.label,
                  icon: tab.icon,
                }))}
                defaultTab={activeTab}
                onChange={setActiveTab}
                variant="pills"
                className="min-w-max"
              />
            </div>
          </div>
        </RevealOnScroll>

        {/* Animation Display - Clean Apple style - reduced spacing */}
        {activeTabData && (
          <RevealOnScroll delay={0.4}>
            <div className="flex flex-col items-center">
              {/* Animation Container - Video on mobile, Lottie on desktop */}
              <div className={`relative w-full rounded-3xl border border-white/[0.04] overflow-hidden mb-4 ${
                isConfiguration ? 'max-w-4xl aspect-[16/9]' : 'max-w-5xl aspect-[16/9]'
              }`}>
                {shouldShowVideo ? (
                  // Video with bottom 32px cropped to hide watermark using clip-path
                  <video
                    ref={videoRef}
                    src={activeTabData.videoUrl}
                    className="w-full h-full"
                    style={{ 
                      clipPath: 'inset(0 0 32px 0)'
                    }}
                    loop
                    muted
                    playsInline
                    autoPlay
                  />
                ) : shouldShowLottie && isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 border-2 border-dark-700 border-t-dark-400 rounded-full animate-spin" />
                  </div>
                ) : shouldShowLottie && lottieData ? (
                  <Lottie
                    animationData={lottieData}
                    loop={true}
                    autoplay={true}
                    className="w-full h-full"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-dark-500">
                    <div className="text-5xl mb-6 opacity-40">{activeTabData.icon}</div>
                    <p className="text-sm text-dark-500">
                      Upload animation to: <code className="text-dark-400 bg-dark-800 px-2 py-1 rounded-md">/public/animations/highlights/{activeTabData.id}.mp4</code>
                    </p>
                  </div>
                )}
              </div>
              {/* Tab Title and Description - no margin */}
              <div className="text-center max-w-2xl mt-0">
                {activeTabData.features[0] && (
                  <h3 className="text-lg md:text-xl leading-snug text-dark-300 mb-0">
                    {activeTabData.features[0].description}
                  </h3>
                )}
              </div>
            </div>
          </RevealOnScroll>
        )}
      </div>
    </section>
  );
}
