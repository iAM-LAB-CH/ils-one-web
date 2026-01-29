'use client';

import { TextSplitReveal, RevealOnScroll, StaggerReveal } from '@/components/animations';
import { Badge } from '@/components/ui';
import type { SecurityContent } from '@/lib/types/content';

interface SecuritySectionProps {
  content: SecurityContent;
}

// Shield icon component
function ShieldIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

// Lock icon component
function LockIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

// Audit icon component
function AuditIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14,2 14,8 20,8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10,9 9,9 8,9" />
    </svg>
  );
}

// Eye icon component (for transparency)
function EyeIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

// Users icon (for multi-sig)
function UsersIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

// Activity icon (for monitoring)
function ActivityIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
    </svg>
  );
}

// Map icon id to component
function getIcon(iconId: string, className: string) {
  switch (iconId) {
    case 'shield':
      return <ShieldIcon className={className} />;
    case 'lock':
      return <LockIcon className={className} />;
    case 'audit':
      return <AuditIcon className={className} />;
    case 'eye':
      return <EyeIcon className={className} />;
    case 'users':
      return <UsersIcon className={className} />;
    case 'activity':
      return <ActivityIcon className={className} />;
    default:
      return <ShieldIcon className={className} />;
  }
}

export function SecuritySection({ content }: SecuritySectionProps) {
  return (
    <section id="security" className="section-padding bg-dark-950">
      <div className="container-wide">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <RevealOnScroll>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-500/10 mb-6">
              <ShieldIcon className="w-8 h-8 text-accent-500" />
            </div>
          </RevealOnScroll>
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
          {content.description && (
            <RevealOnScroll delay={0.3}>
              <p className="text-lg text-dark-500 mt-4">
                {content.description}
              </p>
            </RevealOnScroll>
          )}
        </div>

        {/* Security credentials grid - auto-rows ensures equal height */}
        <StaggerReveal stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {content.credentials.map((credential) => (
            <div
              key={credential.id}
              className="group relative p-6 rounded-2xl bg-dark-900 border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 hover:bg-dark-850 flex flex-col"
            >
              {/* Badge */}
              {credential.badge && (
                <div className="absolute top-4 right-4">
                  <Badge variant="accent" size="sm">
                    {credential.badge}
                  </Badge>
                </div>
              )}

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center mb-4 group-hover:bg-accent-500/20 transition-colors duration-300">
                {getIcon(credential.icon, 'w-6 h-6 text-accent-500')}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-dark-50 mb-2">
                {credential.title}
              </h3>

              {/* Description */}
              <p className="text-dark-400 leading-relaxed flex-grow">
                {credential.description}
              </p>

              {/* Link */}
              {credential.link && (
                <a
                  href={credential.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-accent-500 hover:text-accent-400 transition-colors mt-4"
                >
                  {credential.link.text}
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              )}
            </div>
          ))}
        </StaggerReveal>

        {/* Trust reinforcement */}
        <RevealOnScroll delay={0.5}>
          <div className="mt-16 text-center">
            <p className="text-dark-500 text-sm">
              Security is not a feature — it&apos;s the foundation of everything we build.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
