'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { Button, ProductCard } from '@/components/ui';
import { TextSplitReveal } from '@/components/animations';
import type { HeroContent, TrustInstitution } from '@/lib/types/content';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

interface HeroSectionProps {
  content: HeroContent;
  onContactClick?: () => void;
}

// Company logo component with actual logo or placeholder
function CompanyLogo({ institution }: { institution: TrustInstitution }) {
  return (
    <div className="flex-shrink-0 flex items-center opacity-60 hover:opacity-90 transition-opacity duration-300">
      {institution.logo ? (
        /* Actual logo image - monochrome/grayscale filter applied */
        <Image
          src={institution.logo}
          alt={institution.name}
          width={120}
          height={32}
          className="h-6 sm:h-7 w-auto object-contain"
          style={{ filter: 'grayscale(100%) brightness(0) invert(1)' }}
        />
      ) : (
        /* Placeholder with company name */
        <span className="text-sm sm:text-base font-medium text-white/80 whitespace-nowrap">
          {institution.name}
        </span>
      )}
    </div>
  );
}

// Marquee component for infinite scroll animation using CSS
function LogoMarquee({ institutions }: { institutions: TrustInstitution[] }) {
  // Double the institutions array for seamless loop
  const doubledInstitutions = [...institutions, ...institutions];
  
  return (
    <div className="overflow-hidden">
      <div 
        className="flex animate-marquee"
        style={{
          animation: 'marquee 25s linear infinite',
        }}
      >
        {doubledInstitutions.map((institution, index) => (
          <div 
            key={`${institution.name}-${index}`} 
            className="flex-shrink-0 px-8 sm:px-10 lg:px-14"
          >
            <CompanyLogo institution={institution} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroSection({ content, onContactClick }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // Animate badge
      gsap.from('.hero-badge', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
      });

      // Animate description
      gsap.from('.hero-description', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.8,
        ease: 'power3.out',
      });

      // Animate CTAs
      gsap.from('.hero-ctas', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 1,
        ease: 'power3.out',
      });

      // Product cards animation - smoother and longer transition
      if (content.productCards && content.productCards.length > 0) {
        const cardElements = cardsRef.current?.querySelectorAll(".product-card");
        if (cardElements) {
          gsap.fromTo(
            cardElements,
            { 
              opacity: 0, 
              y: 300, 
              scale: 0.7,
              rotateX: 20,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              duration: 1,
              stagger: 0.2,
              ease: "expo",
              delay: 0.8,
            }
          );
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion, content.productCards]);

  const hasProductCards = content.productCards && content.productCards.length > 0;
  const hasTrustBanner = content.trustBanner && content.trustBanner.institutions.length > 0;

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen bg-dark-950 overflow-hidden"
    >
      {/* Background - Hero image with overlay */}
      <div className="absolute inset-0">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pt-4"
          style={{ backgroundImage: 'url(/images/hero/earth-hurricane.png)' }}
        />
        
        {/* Bottom gradient fade to dark */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-[120px] pt-24">
        <div className="max-w-[1728px] mx-auto">
          {/* Hero Text */}
          <div ref={textRef} className="text-center mb-[48px]">
            {/* Badge - Plain text styling, not button-like */}
            {content.badge && (
              <div className="hero-badge mb-3">
                <span className="text-[14px] font-medium text-accent-500 tracking-wide">
                  {content.badge}
                </span>
              </div>
            )}

            {/* Main headline */}
            <h1 className="font-semibold tracking-[-0.04em] mb-4">
              <TextSplitReveal
                splitBy="chars"
                staggerAmount={0.02}
                className="text-dark-50"
              >
                {content.headline}
              </TextSplitReveal>
            </h1>

            {/* Description */}
            {content.description && (
              <p className="hero-description text-lg md:text-xl text-dark-500 max-w-2xl mx-auto mb-8 leading-[1.4] tracking-[-0.01em]">
                {content.description}
              </p>
            )}

            {/* CTAs - z-index ensures they stay above product cards */}
            <div className="hero-ctas relative z-20 flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              {/* Primary CTA: Request Walkthrough - opens modal */}
              <Button 
                onClick={onContactClick}
                size="lg" 
                variant="primary"
              >
                {content.primaryCta.text}
              </Button>
              {/* Secondary CTA: Launch App - external link */}
              {content.secondaryCta && (
                <Button
                  href={content.secondaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  variant="ghost"
                >
                  {content.secondaryCta.text}
                </Button>
              )}
            </div>
          </div>

          {/* Product Cards - Fanned Layout */}
          {hasProductCards && (
            <div 
              ref={cardsRef} 
              className="relative h-[180px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[750px] flex items-start justify-center -mt-24 sm:-mt-12 md:-mt-16 lg:-mt-20 overflow-visible"
            >
              {/* Responsive scale wrapper: 80% mobile, 100% tablet, 150% large desktop */}
              <div className="relative w-full max-w-[1200px] h-full flex items-center justify-center origin-top scale-[0.8] sm:scale-90 md:scale-100 lg:scale-110 xl:scale-[1.5] transition-transform duration-300 -translate-y-[100px] sm:translate-y-0">
                {content.productCards!.map((card, index) => {
                  // Calculate position to center cards
                  const totalCards = content.productCards!.length;
                  const centerOffset = ((totalCards - 1) / 2) * 180;
                  const leftPosition = index * 180 - centerOffset + 50;
                  
                  return (
                    <ProductCard
                      key={card.id}
                      card={card}
                      className="absolute product-card opacity-0"
                      style={{
                        left: `calc(45% + ${leftPosition}px)`,
                        top: `${card.translateY + 100}px`,
                        transform: `translateX(-50%) rotate(${card.rotation}deg)`,
                        zIndex: index + 1,
                        width: 'clamp(300px, 22vw, 340px)',
                      }}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Trust Banner - Fixed at bottom with animated logos (hidden for now) */}
      {false && hasTrustBanner && (
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-dark-950 via-dark-950/95 to-dark-950/80 backdrop-blur-md py-6 sm:py-8 lg:py-10 border-t border-white/[0.08]">
          <p className="text-center text-dark-300 text-xs sm:text-sm uppercase tracking-[0.15em] mb-5 sm:mb-6 font-medium">
            {content.trustBanner!.headline}
          </p>
          <LogoMarquee institutions={content.trustBanner!.institutions} />
        </div>
      )}

      {/* Scroll indicator - Minimal */}
      {(
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-dark-600 to-transparent" />
        </div>
      )}
    </section>
  );
}
