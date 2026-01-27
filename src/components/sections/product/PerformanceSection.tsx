'use client';

import { StatCounter } from '@/components/ui';
import { TextSplitReveal, RevealOnScroll, StaggerReveal } from '@/components/animations';
import type { PerformanceContent } from '@/lib/types/content';

interface PerformanceSectionProps {
  content: PerformanceContent;
}

export function PerformanceSection({ content }: PerformanceSectionProps) {
  return (
    <section id="performance" className="section-padding bg-dark-900 overflow-hidden">
      <div className="container-wide">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-50 mb-4">
            <TextSplitReveal splitBy="words" staggerAmount={0.05}>
              {content.headline}
            </TextSplitReveal>
          </h2>
          <RevealOnScroll delay={0.2}>
            <p className="text-xl md:text-2xl text-dark-300">
              {content.subheadline}
            </p>
          </RevealOnScroll>
        </div>

        {/* Engine info */}
        <RevealOnScroll>
          <div className="relative max-w-4xl mx-auto mb-20 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-dark-800/80 to-dark-900/80 border border-dark-700">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-500/20 via-accent-600/10 to-accent-500/20 rounded-3xl blur-xl opacity-50" />
            
            <div className="relative">
              <h3 className="text-3xl md:text-4xl font-bold text-dark-50 mb-4">
                {content.engineName}
              </h3>
              <p className="text-lg text-dark-400 max-w-2xl">
                {content.engineDescription}
              </p>
            </div>
          </div>
        </RevealOnScroll>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-20">
          {content.stats.map((stat, index) => (
            <StatCounter
              key={stat.id}
              value={stat.value}
              suffix={stat.suffix}
              prefix={stat.prefix}
              label={stat.label}
              description={stat.description}
              decimals={stat.suffix === '%' && stat.value % 1 !== 0 ? 1 : 0}
              delay={index * 0.15}
            />
          ))}
        </div>

        {/* Comparison bars */}
        <RevealOnScroll>
          <div className="max-w-3xl mx-auto">
            <h4 className="text-xl font-semibold text-dark-100 text-center mb-8">
              Performance Comparison
            </h4>
            <StaggerReveal stagger={0.15} className="space-y-8">
              {content.comparisons.map((comparison) => (
                <div key={comparison.label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-dark-300 font-medium">{comparison.label}</span>
                    <span className="text-dark-500">{comparison.unit}</span>
                  </div>
                  <div className="space-y-2">
                    {/* Our product */}
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-dark-400 w-20">AppName Pro</span>
                      <div className="flex-1 h-3 bg-dark-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-accent-500 to-accent-400 rounded-full transition-all duration-1000"
                          style={{ width: `${comparison.ourValue}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-accent-400 w-12 text-right">
                        {comparison.ourValue}%
                      </span>
                    </div>
                    {/* Competitor */}
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-dark-500 w-20">Industry Avg</span>
                      <div className="flex-1 h-3 bg-dark-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-dark-600 rounded-full transition-all duration-1000"
                          style={{ width: `${comparison.competitorValue}%` }}
                        />
                      </div>
                      <span className="text-sm text-dark-500 w-12 text-right">
                        {comparison.competitorValue}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </StaggerReveal>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
