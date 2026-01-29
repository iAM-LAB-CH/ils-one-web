'use client';

import { Button } from '@/components/ui';
import { TextSplitReveal, RevealOnScroll } from '@/components/animations';
import type { CTAFooterContent } from '@/lib/types/content';

interface CTAFooterSectionProps {
  content: CTAFooterContent;
  onContactClick?: () => void;
}

export function CTAFooterSection({ content, onContactClick }: CTAFooterSectionProps) {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 to-dark-950">
        {/* Accent gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-600/5 rounded-full blur-[80px]" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent-500/5 rounded-full blur-[60px]" />
      </div>

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative container-narrow text-center">
        {/* Headline */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-dark-50 mb-6">
          <TextSplitReveal splitBy="words" staggerAmount={0.05}>
            {content.headline}
          </TextSplitReveal>
        </h2>

        {/* Subheadline */}
        <RevealOnScroll delay={0.3}>
          <p className="text-xl md:text-2xl text-dark-300 mb-12 max-w-2xl mx-auto">
            {content.subheadline}
          </p>
        </RevealOnScroll>

        {/* CTAs */}
        <RevealOnScroll delay={0.5}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={onContactClick} size="xl" variant="primary">
              {content.cta.text}
            </Button>
            {content.secondaryCta && (
              <Button
                href={content.secondaryCta.href}
                size="xl"
                variant="outline"
              >
                {content.secondaryCta.text}
              </Button>
            )}
          </div>
        </RevealOnScroll>

        {/* Footer links */}
        <RevealOnScroll delay={0.7}>
          <div className="mt-20 pt-8 border-t border-dark-800">
            <p className="text-sm text-dark-500">
              © {new Date().getFullYear()} Invest One AG. All rights reserved.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
