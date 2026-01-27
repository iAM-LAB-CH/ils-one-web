'use client';

import Image from 'next/image';
import { Badge } from './Badge';
import { RevealOnScroll } from '@/components/animations';

interface FeatureCardProps {
  icon?: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  badge?: string;
  stats?: {
    value: string;
    label: string;
  };
  className?: string;
  delay?: number;
}

export function FeatureCard({
  icon,
  title,
  description,
  image,
  imageAlt,
  badge,
  stats,
  className = '',
  delay = 0,
}: FeatureCardProps) {
  return (
    <RevealOnScroll delay={delay} className={className}>
      <div className="group relative h-full bg-dark-900/50 border border-dark-800 rounded-2xl overflow-hidden transition-all duration-500 hover:border-dark-700 hover:bg-dark-900/80">
        {/* Image */}
        {image && (
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={image}
              alt={imageAlt || title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />
            
            {/* Badge overlay */}
            {badge && (
              <div className="absolute top-4 left-4">
                <Badge variant="accent" size="sm">
                  {badge}
                </Badge>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Icon and title row */}
          <div className="flex items-start gap-3 mb-3">
            {icon && (
              <span className="text-2xl flex-shrink-0" aria-hidden="true">
                {icon}
              </span>
            )}
            <div>
              <h3 className="text-lg font-semibold text-dark-100 group-hover:text-accent-400 transition-colors">
                {title}
              </h3>
              {!image && badge && (
                <Badge variant="accent" size="sm" className="mt-2">
                  {badge}
                </Badge>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-dark-400 text-sm leading-relaxed">
            {description}
          </p>

          {/* Stats */}
          {stats && (
            <div className="mt-4 pt-4 border-t border-dark-800">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-accent-400">
                  {stats.value}
                </span>
                <span className="text-dark-500 text-sm">{stats.label}</span>
              </div>
            </div>
          )}
        </div>

        {/* Hover glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 via-transparent to-transparent" />
        </div>
      </div>
    </RevealOnScroll>
  );
}
