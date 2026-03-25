'use client';

import Image from 'next/image';
import { TextSplitReveal, RevealOnScroll } from '@/components/animations';
import type { TeamContent } from '@/lib/types/content';

interface TeamSectionProps {
  content: TeamContent;
}

export function TeamSection({ content }: TeamSectionProps) {
  return (
    <section id="team" className="section-padding bg-dark-900">
      <div className="container-wide">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-50 mb-6">
            <TextSplitReveal splitBy="words" staggerAmount={0.05}>
              {content.headline}
            </TextSplitReveal>
          </h2>
          <RevealOnScroll delay={0.15}>
            <p className="text-xl md:text-2xl text-dark-400">
              ILS One is built by i.AM Lab and QSense — ready to be adapted to your needs.
            </p>
          </RevealOnScroll>
        </div>

        {/* Partner logos */}
        <RevealOnScroll delay={0.25}>
          <div className="flex items-center justify-center gap-12 md:gap-20 mb-16 mt-12">
            <a
              href="https://iam-lab.ch"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300"
            >
              <Image
                src="/images/logos/i.AM_Logo_Logo Black.png"
                alt="i.AM Lab"
                width={180}
                height={72}
                className="h-12 md:h-16 w-auto object-contain"
              />
            </a>
            <a
              href="https://qsense.ch"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300"
            >
              <Image
                src="/images/logos/QSense-Logo.png"
                alt="QSense"
                width={180}
                height={72}
                className="h-12 md:h-16 w-auto object-contain"
              />
            </a>
          </div>
        </RevealOnScroll>

        {/* Vision & Mission */}
        <RevealOnScroll delay={0.35}>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl bg-dark-950/50 border border-white/[0.06]">
                <h3 className="text-lg font-semibold text-accent-400 mb-4 uppercase tracking-wider">
                  Vision
                </h3>
                <p className="text-dark-200 leading-relaxed">
                  {content.vision}
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-dark-950/50 border border-white/[0.06]">
                <h3 className="text-lg font-semibold text-accent-400 mb-4 uppercase tracking-wider">
                  Mission
                </h3>
                <p className="text-dark-200 leading-relaxed">
                  {content.mission}
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
