'use client';

import { Button } from '@/components/ui';
import { TextSplitReveal, RevealOnScroll, StaggerReveal } from '@/components/animations';
import type { PricingContent } from '@/lib/types/content';

interface PricingSectionProps {
  content: PricingContent;
}

export function PricingSection({ content }: PricingSectionProps) {
  return (
    <section id="pricing" className="section-padding bg-dark-900">
      <div className="container-narrow">
        <div className="relative">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 via-transparent to-accent-600/5 rounded-3xl blur-3xl" />
          
          {/* Card */}
          <RevealOnScroll>
            <div className="relative bg-dark-800/50 border border-dark-700 rounded-3xl p-8 md:p-12 text-center">
              {/* Header */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-50 mb-4">
                <TextSplitReveal splitBy="words" staggerAmount={0.04}>
                  {content.headline}
                </TextSplitReveal>
              </h2>
              <RevealOnScroll delay={0.2}>
                <p className="text-xl md:text-2xl text-dark-300 mb-4">
                  {content.subheadline}
                </p>
              </RevealOnScroll>
              {content.description && (
                <RevealOnScroll delay={0.3}>
                  <p className="text-dark-400 max-w-xl mx-auto mb-8">
                    {content.description}
                  </p>
                </RevealOnScroll>
              )}

              {/* Price */}
              <RevealOnScroll delay={0.4}>
                <div className="mb-8">
                  <span className="text-6xl md:text-7xl font-bold text-dark-50">
                    {content.price}
                  </span>
                  <span className="text-xl text-dark-400">{content.period}</span>
                </div>
              </RevealOnScroll>

              {/* Features */}
              <div className="max-w-md mx-auto mb-10">
                <StaggerReveal stagger={0.1} className="space-y-3">
                  {content.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-accent-500/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-2.5 h-2.5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-dark-300 text-left">{feature}</span>
                    </div>
                  ))}
                </StaggerReveal>
              </div>

              {/* CTAs */}
              <RevealOnScroll delay={0.6}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button href={content.cta.href} size="xl" variant="primary">
                    {content.cta.text}
                  </Button>
                  {content.secondaryCta && (
                    <Button
                      href={content.secondaryCta.href}
                      size="xl"
                      variant="ghost"
                    >
                      {content.secondaryCta.text}
                    </Button>
                  )}
                </div>
              </RevealOnScroll>

              {/* Guarantee */}
              {content.guarantee && (
                <RevealOnScroll delay={0.7}>
                  <p className="text-sm text-dark-500 mt-6">
                    {content.guarantee}
                  </p>
                </RevealOnScroll>
              )}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
