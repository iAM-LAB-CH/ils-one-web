'use client';

import { ComparisonTable } from '@/components/ui';
import { TextSplitReveal, RevealOnScroll } from '@/components/animations';
import type { ComparisonContent } from '@/lib/types/content';

interface ComparisonSectionProps {
  content: ComparisonContent;
  onContactClick?: () => void;
}

export function ComparisonSection({ content, onContactClick }: ComparisonSectionProps) {
  return (
    <section id="compare" className="section-padding bg-dark-900">
      <div className="container-wide">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-50 mb-4">
            <TextSplitReveal splitBy="words" staggerAmount={0.05}>
              {content.headline}
            </TextSplitReveal>
          </h2>
          {content.subheadline && (
            <RevealOnScroll delay={0.2}>
              <p className="text-xl text-dark-400">
                {content.subheadline}
              </p>
            </RevealOnScroll>
          )}
        </div>

        {/* Comparison table */}
        <ComparisonTable tiers={content.tiers} onContactClick={onContactClick} />
      </div>
    </section>
  );
}
