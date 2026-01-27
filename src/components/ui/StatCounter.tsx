'use client';

import { CountUpAnimation } from '@/components/animations';
import { RevealOnScroll } from '@/components/animations';

interface StatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
  decimals?: number;
  className?: string;
  delay?: number;
}

export function StatCounter({
  value,
  suffix = '',
  prefix = '',
  label,
  description,
  decimals = 0,
  className = '',
  delay = 0,
}: StatCounterProps) {
  return (
    <RevealOnScroll delay={delay} className={className}>
      <div className="text-center">
        {/* Value */}
        <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-dark-50 mb-2">
          <CountUpAnimation
            value={value}
            prefix={prefix}
            suffix={suffix}
            decimals={decimals}
            duration={2}
          />
        </div>

        {/* Label */}
        <div className="text-lg font-medium text-accent-400 mb-1">{label}</div>

        {/* Description */}
        {description && (
          <p className="text-sm text-dark-500">{description}</p>
        )}
      </div>
    </RevealOnScroll>
  );
}
