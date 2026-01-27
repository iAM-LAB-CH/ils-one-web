'use client';

import { Badge } from './Badge';
import { Button } from './Button';
import { RevealOnScroll } from '@/components/animations';
import type { PricingTier } from '@/lib/types/content';
import clsx from 'clsx';

interface ComparisonTableProps {
  tiers: PricingTier[];
  className?: string;
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function DashIcon({ className }: { className?: string }) {
  return <span className={clsx('block w-2 h-0.5 bg-current', className)} />;
}

export function ComparisonTable({ tiers, className = '' }: ComparisonTableProps) {
  return (
    <div className={clsx('grid gap-6', className)}>
      {/* Mobile: Stack cards */}
      <div className="lg:hidden space-y-6">
        {tiers.map((tier, index) => (
          <RevealOnScroll key={tier.id} delay={index * 0.1}>
            <div
              className={clsx(
                'relative rounded-2xl border p-6',
                tier.highlighted
                  ? 'bg-dark-800/80 border-accent-500/50 shadow-lg shadow-accent-500/10'
                  : 'bg-dark-900/50 border-dark-800'
              )}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="accent">{tier.badge}</Badge>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-dark-100">{tier.name}</h3>
                <p className="text-dark-400 text-sm mt-1">{tier.description}</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-dark-50">{tier.price}</span>
                  {tier.period && (
                    <span className="text-dark-400 text-sm">{tier.period}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm">
                    <span
                      className={clsx(
                        'flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center',
                        feature.included
                          ? 'bg-accent-500/20 text-accent-400'
                          : 'bg-dark-800 text-dark-600'
                      )}
                    >
                      {feature.included ? <CheckIcon className="w-2.5 h-2.5" /> : <DashIcon />}
                    </span>
                    <span
                      className={clsx(
                        feature.included ? 'text-dark-200' : 'text-dark-500'
                      )}
                    >
                      {feature.name}
                      {typeof feature.included === 'string' && (
                        <span className="text-accent-400 ml-2">
                          ({feature.included})
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                href={tier.cta.href}
                variant={tier.highlighted ? 'primary' : 'secondary'}
                className="w-full"
              >
                {tier.cta.text}
              </Button>
            </div>
          </RevealOnScroll>
        ))}
      </div>

      {/* Desktop: Side by side */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-6">
        {tiers.map((tier, index) => (
          <RevealOnScroll key={tier.id} delay={index * 0.1}>
            <div
              className={clsx(
                'relative rounded-2xl border p-8 h-full flex flex-col',
                tier.highlighted
                  ? 'bg-dark-800/80 border-accent-500/50 shadow-lg shadow-accent-500/10 scale-105 z-10'
                  : 'bg-dark-900/50 border-dark-800'
              )}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="accent">{tier.badge}</Badge>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-dark-100">{tier.name}</h3>
                <p className="text-dark-400 text-sm mt-2 min-h-[40px]">
                  {tier.description}
                </p>
                <div className="mt-6">
                  <span className="text-5xl font-bold text-dark-50">{tier.price}</span>
                  {tier.period && (
                    <span className="text-dark-400">{tier.period}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span
                      className={clsx(
                        'flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5',
                        feature.included
                          ? 'bg-accent-500/20 text-accent-400'
                          : 'bg-dark-800 text-dark-600'
                      )}
                    >
                      {feature.included ? <CheckIcon className="w-2.5 h-2.5" /> : <DashIcon />}
                    </span>
                    <span
                      className={clsx(
                        'text-sm',
                        feature.included ? 'text-dark-200' : 'text-dark-500'
                      )}
                    >
                      {feature.name}
                      {typeof feature.included === 'string' && (
                        <span className="text-accent-400 ml-1">
                          ({feature.included})
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                href={tier.cta.href}
                variant={tier.highlighted ? 'primary' : 'secondary'}
                size="lg"
                className="w-full"
              >
                {tier.cta.text}
              </Button>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
