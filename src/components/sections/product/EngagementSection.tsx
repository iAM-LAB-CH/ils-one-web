'use client';

import { Button } from '@/components/ui';
import { TextSplitReveal, RevealOnScroll, StaggerReveal } from '@/components/animations';

interface EngagementSectionProps {
  onContactClick?: () => void;
}

const ENGAGEMENT_CARDS = [
  {
    title: '01 Walkthrough',
    description:
      'See the platform with your use case \u2014 not a generic demo. We\u2019ll map ILS One to your deal types, roles, and workflows in a live session.',
  },
  {
    title: '02 Scoping',
    description:
      'Together we define what to build: which instruments, which counterparties, which integrations. Every project is custom-scoped \u2014 no template engagements.',
  },
  {
    title: '03 Go-Live',
    description:
      'From pilot to production on your timeline. Custom project-based engagement with dedicated support \u2014 no per-asset fees, no volume licensing.',
  },
];

export function EngagementSection({ onContactClick }: EngagementSectionProps) {
  return (
    <section id="get-started" className="section-padding bg-dark-950">
      <div className="container-wide">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-50 mb-6">
            <TextSplitReveal splitBy="words" staggerAmount={0.05}>
              How To Get Started
            </TextSplitReveal>
          </h2>
          <RevealOnScroll delay={0.2}>
            <p className="text-xl md:text-2xl text-dark-400">
              ILS One is live in production with leading reinsurers and asset managers.
              Learn more about how to get started with ILS One.
            </p>
          </RevealOnScroll>
        </div>

        {/* Engagement Cards */}
        <StaggerReveal
          stagger={0.15}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20"
        >
          {ENGAGEMENT_CARDS.map((card) => (
            <div
              key={card.title}
              className="group relative bg-dark-800/40 border border-white/[0.06] rounded-2xl p-8 md:p-10 transition-colors duration-300 hover:border-white/[0.12] hover:bg-dark-800/60"
            >
              <h3 className="text-xl md:text-2xl font-semibold text-dark-50 mb-3">
                {card.title}
              </h3>
              <p className="text-dark-400 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </StaggerReveal>

        {/* CTAs */}
        <RevealOnScroll delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={onContactClick} size="xl" variant="primary">
              Request Walkthrough
            </Button>
            <Button onClick={onContactClick} size="xl" variant="secondary">
              Contact Sales
            </Button>
          </div>
        </RevealOnScroll>

        {/* Social Proof */}
        <RevealOnScroll delay={0.3}>
          <p className="text-center text-dark-500 text-sm md:text-base tracking-wide mt-12 ">
            Already in production with{' '}
            <span className="text-dark-300">Schroders</span>,{' '}
            <span className="text-dark-300">Hannover Re</span>, and{' '}
            <span className="text-dark-300">Aon</span>.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
