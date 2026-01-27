'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button, Badge, ProductCard } from '@/components/ui';
import { TextSplitReveal } from '@/components/animations';
import type { HeroContent } from '@/lib/types/content';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

interface HeroSectionProps {
  content: HeroContent;
}

// Company logo component with placeholder that shows company initial
function CompanyLogo({ company }: { company: string }) {
  const initial = company.charAt(0).toUpperCase();
  
  return (
    <div className="flex-shrink-0 flex items-center gap-3 opacity-60 hover:opacity-90 transition-opacity duration-300">
      {/* Logo placeholder - circle with initial */}
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
        <span className="text-sm sm:text-base font-bold text-white/80">{initial}</span>
      </div>
      {/* Company name */}
      <span className="text-sm sm:text-base font-medium text-white/80 whitespace-nowrap">
        {company}
      </span>
    </div>
  );
}

// Marquee component for infinite scroll animation
function LogoMarquee({ institutions }: { institutions: string[] }) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;

    const marquee = marqueeRef.current;
    const content = marquee.querySelector('.marquee-content') as HTMLElement;
    if (!content) return;

    // Clone content for seamless loop
    const clone = content.cloneNode(true) as HTMLElement;
    marquee.appendChild(clone);

    // Animate with GSAP - slower for better readability
    const totalWidth = content.offsetWidth;
    
    gsap.to(marquee.children, {
      x: -totalWidth,
      duration: 40,
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <div className="overflow-hidden">
      <div ref={marqueeRef} className="flex">
        <div className="marquee-content flex items-center gap-10 sm:gap-14 lg:gap-20 px-6 sm:px-8 lg:px-12">
          {institutions.map((company, index) => (
            <CompanyLogo key={`${company}-${index}`} company={company} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function HeroSection({ content }: HeroSectionProps) {
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
      <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-[120px] pt-8 sm:pt-12 md:pt-16 lg:pt-[60px]">
        <div className="max-w-[1728px] mx-auto">
          {/* Hero Text */}
          <div ref={textRef} className="text-center mb-[48px]">
            {/* Badge */}
            {content.badge && (
              <div className="hero-badge mb-6">
                <Badge variant="accent" size="lg">
                  {content.badge}
                </Badge>
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

            {/* Subheadline */}
            <div className="text-[clamp(1.5rem,4vw,2.5rem)] font-semibold text-dark-400 mb-8 max-w-4xl mx-auto tracking-[-0.02em] leading-[1.15]">
              <TextSplitReveal
                splitBy="words"
                staggerAmount={0.04}
                delay={0.3}
              >
                {content.subheadline}
              </TextSplitReveal>
            </div>

            {/* Description */}
            {content.description && (
              <p className="hero-description text-lg md:text-xl text-dark-500 max-w-2xl mx-auto mb-12 leading-[1.2] tracking-[-0.01em] whitespace-pre-line">
                {content.description}
              </p>
            )}

            {/* CTAs - z-index ensures they stay above product cards */}
            <div className="hero-ctas relative z-20 flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button href={content.primaryCta.href} size="lg" variant="primary">
                {content.primaryCta.text}
              </Button>
              {content.secondaryCta && (
                <Button
                  href={content.secondaryCta.href}
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

      {/* Trust Banner - Fixed at bottom with animated logos */}
      {hasTrustBanner && (
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-dark-950 via-dark-950/95 to-dark-950/80 backdrop-blur-md py-6 sm:py-8 lg:py-10 border-t border-white/[0.08]">
          <p className="text-center text-dark-300 text-xs sm:text-sm uppercase tracking-[0.15em] mb-5 sm:mb-6 font-medium">
            {content.trustBanner!.headline}
          </p>
          <LogoMarquee institutions={content.trustBanner!.institutions} />
        </div>
      )}

      {/* Scroll indicator - Minimal (only show if no trust banner) */}
      {!hasTrustBanner && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-dark-600 to-transparent" />
        </div>
      )}
    </section>
  );
}
