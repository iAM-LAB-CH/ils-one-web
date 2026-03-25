'use client';

import { TextSplitReveal, RevealOnScroll, StaggerReveal } from '@/components/animations';
import type { AudienceContent } from '@/lib/types/content';

interface AudienceSectionProps {
  content: AudienceContent;
}

// Icon components for each audience type
function InstitutionalIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  );
}

function ReinsurerIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function BrokerIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
  );
}

function getIcon(iconId: string, className: string) {
  switch (iconId) {
    case 'institutional':
      return <InstitutionalIcon className={className} />;
    case 'reinsurer':
      return <ReinsurerIcon className={className} />;
    case 'broker':
      return <BrokerIcon className={className} />;
    default:
      return <InstitutionalIcon className={className} />;
  }
}

export function AudienceSection({ content }: AudienceSectionProps) {
  return (
    <section id="audience" className="section-padding bg-dark-950">
      <div className="container-wide">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-50 mb-6">
            <TextSplitReveal splitBy="words" staggerAmount={0.05}>
              {content.headline}
            </TextSplitReveal>
          </h2>
          {content.subheadline && (
            <RevealOnScroll delay={0.2}>
              <p className="text-xl md:text-2xl text-dark-400">
                {content.subheadline}
              </p>
            </RevealOnScroll>
          )}
        </div>

        {/* Audience cards grid */}
        <StaggerReveal stagger={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.cards.map((card) => (
            <div
              key={card.id}
              className="group relative p-6 rounded-2xl bg-dark-900 border border-white/[0.08] hover:border-accent-500/30 transition-all duration-300 hover:bg-dark-850"
            >
              {/* Orange glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-accent-500/0 via-accent-500/0 to-accent-500/0 group-hover:from-accent-500/5 group-hover:via-accent-500/10 group-hover:to-accent-500/5 transition-all duration-300 pointer-events-none" />
              <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ boxShadow: '0 0 40px -10px rgba(255, 122, 51, 0.4), inset 0 0 20px -10px rgba(255, 122, 51, 0.1)' }} />
              
              {/* Icon */}
              <div className="relative w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center mb-5 group-hover:bg-accent-500/20 transition-colors duration-300">
                {getIcon(card.icon || card.id, 'w-6 h-6 text-accent-500')}
              </div>

              {/* Title */}
              <h3 className="relative text-xl font-semibold text-dark-50 mb-4">
                {card.title}
              </h3>

              {/* Pain point */}
              <div className="relative mb-4">
                <p className="text-xs uppercase tracking-wider text-dark-500 mb-1.5">Challenge</p>
                <p className="text-dark-400 text-sm leading-relaxed">
                  {card.painPoint}
                </p>
              </div>

              {/* Value proposition */}
              <div className="relative">
                <p className="text-xs uppercase tracking-wider text-accent-500/80 mb-1.5">Solution</p>
                <p className="text-dark-200 text-sm leading-relaxed font-medium">
                  {card.valueProposition}
                </p>
              </div>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
