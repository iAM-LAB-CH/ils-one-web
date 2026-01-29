'use client';

import Image from 'next/image';
import { TextSplitReveal, RevealOnScroll, StaggerReveal } from '@/components/animations';
import type { TeamContent } from '@/lib/types/content';

interface TeamSectionProps {
  content: TeamContent;
}

export function TeamSection({ content }: TeamSectionProps) {
  return (
    <section id="team" className="section-padding bg-dark-900">
      <div className="container-wide">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-50 mb-6">
            <TextSplitReveal splitBy="words" staggerAmount={0.05}>
              {content.headline}
            </TextSplitReveal>
          </h2>
        </div>

        {/* Vision & Mission */}
        <RevealOnScroll delay={0.2}>
          <div className="max-w-4xl mx-auto mb-20">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Vision */}
              <div className="p-8 rounded-2xl bg-dark-950/50 border border-white/[0.06]">
                <h3 className="text-lg font-semibold text-accent-400 mb-4 uppercase tracking-wider">
                  Vision
                </h3>
                <p className="text-dark-200 leading-relaxed">
                  {content.vision}
                </p>
              </div>

              {/* Mission */}
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

        {/* Team grid */}
        <StaggerReveal stagger={0.1} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {content.members.map((member) => (
            <div
              key={member.id}
              className="group text-center"
            >
              {/* Photo */}
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-dark-800">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-dark-800">
                    <span className="text-5xl font-bold text-dark-600">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                )}
                {/* Hover overlay with fun fact */}
                {member.funFact && (
                  <div className="absolute inset-0 bg-dark-950/90 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm text-dark-200 text-center">
                      {member.funFact}
                    </p>
                  </div>
                )}
              </div>

              {/* Name & Title */}
              <h4 className="text-lg font-semibold text-dark-50 mb-1">
                {member.name}
              </h4>
              <p className="text-sm text-dark-400 mb-3">
                {member.title}
              </p>

              {/* Previous companies */}
              {member.previousCompanies && member.previousCompanies.length > 0 && (
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  {member.previousCompanies.map((company, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-dark-500 px-2 py-1 bg-dark-800/50 rounded-full"
                    >
                      {company}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
