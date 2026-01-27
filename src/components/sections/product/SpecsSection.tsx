'use client';

import { AccordionGroup, AccordionItem } from '@/components/ui';
import { TextSplitReveal, RevealOnScroll } from '@/components/animations';
import type { SpecsContent } from '@/lib/types/content';

interface SpecsSectionProps {
  content: SpecsContent;
}

export function SpecsSection({ content }: SpecsSectionProps) {
  return (
    <section id="specs" className="section-padding bg-dark-950">
      <div className="container-narrow">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-50 mb-4">
            <TextSplitReveal splitBy="words" staggerAmount={0.05}>
              {content.headline}
            </TextSplitReveal>
          </h2>
          {content.subheadline && (
            <RevealOnScroll delay={0.2}>
              <p className="text-lg text-dark-400">
                {content.subheadline}
              </p>
            </RevealOnScroll>
          )}
        </div>

        {/* Accordion */}
        <RevealOnScroll delay={0.3}>
          <AccordionGroup allowMultiple defaultOpen={[content.categories[0]?.id || '']}>
            {content.categories.map((category) => (
              <AccordionItem
                key={category.id}
                id={category.id}
                title={category.title}
                icon={category.icon}
              >
                <div className="grid gap-4">
                  {category.specs.map((spec, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-3 border-b border-dark-800 last:border-0"
                    >
                      <span className="text-sm font-medium text-dark-300 sm:w-48 flex-shrink-0">
                        {spec.label}
                      </span>
                      <span className="text-sm text-dark-400">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </AccordionItem>
            ))}
          </AccordionGroup>
        </RevealOnScroll>
      </div>
    </section>
  );
}
