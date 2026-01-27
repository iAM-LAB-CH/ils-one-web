'use client';

import Image from 'next/image';
import { TextSplitReveal, RevealOnScroll, MaskReveal } from '@/components/animations';
import type { DesignContent } from '@/lib/types/content';

interface DesignSectionProps {
  content: DesignContent;
}

export function DesignSection({ content }: DesignSectionProps) {
  return (
    <section id="design" className="section-padding bg-dark-900">
      <div className="container-wide">
        {/* Section header */}
        <div className="max-w-3xl mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-50 mb-6">
            <TextSplitReveal splitBy="words" staggerAmount={0.05}>
              {content.headline}
            </TextSplitReveal>
          </h2>
          <RevealOnScroll delay={0.2}>
            <p className="text-xl md:text-2xl text-dark-300 mb-4">
              {content.subheadline}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.3}>
            <p className="text-lg text-dark-400">
              {content.description}
            </p>
          </RevealOnScroll>
        </div>

        {/* Feature blocks */}
        <div className="space-y-32">
          {content.features.map((feature, index) => (
            <div
              key={feature.title}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-12 lg:gap-20`}
            >
              {/* Image */}
              <MaskReveal
                direction={index % 2 === 0 ? 'left' : 'right'}
                className="flex-1 w-full"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-dark-800">
                  <Image
                    src={feature.image}
                    alt={feature.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/50 via-transparent to-transparent" />
                </div>
              </MaskReveal>

              {/* Content */}
              <div className="flex-1">
                <RevealOnScroll>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-dark-100 mb-4">
                    {feature.title}
                  </h3>
                </RevealOnScroll>
                <RevealOnScroll delay={0.1}>
                  <p className="text-lg text-dark-400 leading-relaxed">
                    {feature.description}
                  </p>
                </RevealOnScroll>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
