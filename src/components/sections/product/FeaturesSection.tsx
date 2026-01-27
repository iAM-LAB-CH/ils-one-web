'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui';
import { TextSplitReveal, RevealOnScroll, MaskReveal, StaggerReveal } from '@/components/animations';
import type { FeaturesContent } from '@/lib/types/content';

interface FeaturesSectionProps {
  content: FeaturesContent;
}

export function FeaturesSection({ content }: FeaturesSectionProps) {
  return (
    <section id="features" className="section-padding bg-dark-950">
      <div className="container-wide">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-50 mb-4">
            <TextSplitReveal splitBy="words" staggerAmount={0.05}>
              {content.headline}
            </TextSplitReveal>
          </h2>
          {content.subheadline && (
            <RevealOnScroll delay={0.2}>
              <p className="text-lg md:text-xl text-dark-400">
                {content.subheadline}
              </p>
            </RevealOnScroll>
          )}
        </div>

        {/* Feature blocks */}
        <div className="space-y-40">
          {content.features.map((feature, index) => (
            <div
              key={feature.id}
              className={`flex flex-col ${
                feature.alignment === 'right' ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-12 lg:gap-24`}
            >
              {/* Image */}
              <div className="flex-1 w-full">
                <MaskReveal direction={feature.alignment === 'right' ? 'right' : 'left'}>
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-dark-800 glow-accent-sm">
                    <Image
                      src={feature.image}
                      alt={feature.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 via-transparent to-transparent" />
                  </div>
                </MaskReveal>
              </div>

              {/* Content */}
              <div className="flex-1 max-w-xl">
                {/* Badge */}
                {feature.badge && (
                  <RevealOnScroll>
                    <Badge variant="accent" size="md" className="mb-4">
                      {feature.badge}
                    </Badge>
                  </RevealOnScroll>
                )}

                {/* Headline */}
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-50 mb-3">
                  <TextSplitReveal splitBy="words" staggerAmount={0.04}>
                    {feature.headline}
                  </TextSplitReveal>
                </h3>

                {/* Subheadline */}
                <RevealOnScroll delay={0.1}>
                  <p className="text-xl md:text-2xl text-accent-400 font-medium mb-4">
                    {feature.subheadline}
                  </p>
                </RevealOnScroll>

                {/* Description */}
                <RevealOnScroll delay={0.2}>
                  <p className="text-lg text-dark-400 leading-relaxed mb-8">
                    {feature.description}
                  </p>
                </RevealOnScroll>

                {/* Highlights */}
                {feature.highlights && (
                  <StaggerReveal stagger={0.1} className="space-y-3">
                    {feature.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3"
                      >
                        <span className="w-6 h-6 rounded-full bg-accent-500/20 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-dark-200">{highlight}</span>
                      </div>
                    ))}
                  </StaggerReveal>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
