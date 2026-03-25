'use client';

import Link from 'next/link';
import { Button } from '@/components/ui';
import { TextSplitReveal, RevealOnScroll } from '@/components/animations';
import type { CTAFooterContent, FooterContent } from '@/lib/types/content';

interface FooterSectionProps {
  ctaContent: CTAFooterContent;
  footerContent: FooterContent;
  onContactClick?: () => void;
}

export function FooterSection({ ctaContent, footerContent, onContactClick }: FooterSectionProps) {
  return (
    <footer className="relative overflow-hidden">
      {/* CTA Section */}
      <section className="relative py-32 md:py-40">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900 to-dark-950">
          {/* Accent gradients */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-600/5 rounded-full blur-[80px]" />
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent-500/5 rounded-full blur-[60px]" />
        </div>

        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />

        <div className="relative container-narrow text-center">
          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-dark-50 mb-6">
            <TextSplitReveal splitBy="words" staggerAmount={0.05}>
              {ctaContent.headline}
            </TextSplitReveal>
          </h2>

          {/* Subheadline */}
          <RevealOnScroll delay={0.3}>
            <p className="text-xl md:text-2xl text-dark-300 mb-12 max-w-2xl mx-auto">
              {ctaContent.subheadline}
            </p>
          </RevealOnScroll>

          {/* CTAs */}
          <RevealOnScroll delay={0.5}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button onClick={onContactClick} size="xl" variant="primary">
                {ctaContent.cta.text}
              </Button>
              {ctaContent.secondaryCta && (
                <Button
                  onClick={onContactClick}
                  size="xl"
                  variant="outline"
                >
                  {ctaContent.secondaryCta.text}
                </Button>
              )}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Footer with Company Info */}
      <div className="bg-dark-950 border-t border-white/[0.06]">
        <div className="container-wide py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold text-dark-50 mb-4">
                {footerContent.company.name}
              </h3>
              <p className="text-sm text-dark-400 mb-2">
                {footerContent.company.legalEntity}
              </p>
              {footerContent.company.registryInfo && (
                <p className="text-sm text-dark-500 mb-4">
                  {footerContent.company.registryInfo}
                </p>
              )}
              <address className="not-italic text-sm text-dark-400 mb-4">
                {footerContent.company.address}
              </address>
              <div className="space-y-1">
                <a 
                  href={`mailto:${footerContent.company.email}`}
                  className="block text-sm text-accent-500 hover:text-accent-400 transition-colors"
                >
                  {footerContent.company.email}
                </a>
                {footerContent.company.phone && (
                  <a 
                    href={`tel:${footerContent.company.phone.replace(/\s/g, '')}`}
                    className="block text-sm text-dark-400 hover:text-dark-200 transition-colors"
                  >
                    {footerContent.company.phone}
                  </a>
                )}
              </div>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-sm font-semibold text-dark-300 uppercase tracking-wider mb-4">
                Legal
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href={footerContent.links.impressum}
                    className="text-sm text-dark-400 hover:text-dark-200 transition-colors"
                  >
                    Impressum
                  </Link>
                </li>
                <li>
                  <Link 
                    href={footerContent.links.privacy}
                    className="text-sm text-dark-400 hover:text-dark-200 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                {footerContent.links.legal && (
                  <li>
                    <Link 
                      href={footerContent.links.legal}
                      className="text-sm text-dark-400 hover:text-dark-200 transition-colors"
                    >
                      Legal Notice
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            {/* Social Links */}
            {footerContent.social && (
              <div>
                <h4 className="text-sm font-semibold text-dark-300 uppercase tracking-wider mb-4">
                  Connect
                </h4>
                <div className="flex gap-4">
                  {footerContent.social.linkedin && (
                    <a 
                      href={footerContent.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-dark-400 hover:text-dark-200 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-white/[0.06]">
            <p className="text-sm text-dark-500 text-center">
              © {new Date().getFullYear()} {footerContent.company.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
