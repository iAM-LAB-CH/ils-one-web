'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  HeroSection,
  StickyNavSection,
} from '@/components/sections/product';
import { productContent } from '@/lib/content/product-content';

const AudienceSection = dynamic(() => import('@/components/sections/product/AudienceSection').then(m => ({ default: m.AudienceSection })));
const HighlightsSection = dynamic(() => import('@/components/sections/product/HighlightsSection').then(m => ({ default: m.HighlightsSection })));
const FeaturesSection = dynamic(() => import('@/components/sections/product/FeaturesSection').then(m => ({ default: m.FeaturesSection })));
const PerformanceSection = dynamic(() => import('@/components/sections/product/PerformanceSection').then(m => ({ default: m.PerformanceSection })));
const DesignSection = dynamic(() => import('@/components/sections/product/DesignSection').then(m => ({ default: m.DesignSection })));
const SecuritySection = dynamic(() => import('@/components/sections/product/SecuritySection').then(m => ({ default: m.SecuritySection })));
const EngagementSection = dynamic(() => import('@/components/sections/product/EngagementSection').then(m => ({ default: m.EngagementSection })));
const TeamSection = dynamic(() => import('@/components/sections/product/TeamSection').then(m => ({ default: m.TeamSection })));
const SpecsSection = dynamic(() => import('@/components/sections/product/SpecsSection').then(m => ({ default: m.SpecsSection })));
const FooterSection = dynamic(() => import('@/components/sections/product/FooterSection').then(m => ({ default: m.FooterSection })));
const ContactModal = dynamic(() => import('@/components/ui/ContactModal').then(m => ({ default: m.ContactModal })), { ssr: false });

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleContactClick = () => {
    setIsContactModalOpen(true);
  };

  return (
    <main className="relative">
      {/* Sticky Navigation */}
      <StickyNavSection 
        navigation={productContent.mainNavigation} 
        onContactClick={handleContactClick}
      />

      {/* 1. Hero Section */}
      <HeroSection content={productContent.hero} onContactClick={handleContactClick} />

      {/* 2. Who Is It For */}
      {productContent.audience && (
        <AudienceSection content={productContent.audience} />
      )}

      {/* 3. Highlights Gallery */}
      <HighlightsSection content={productContent.highlights} />

      {/* 4. Platform Features Deep-Dive */}
      <FeaturesSection content={productContent.features} />

      {/* 5. Product in Numbers (Performance) */}
      <PerformanceSection content={productContent.performance} />

      {/* 6. Infrastructure Section */}
      <DesignSection content={productContent.design} />

      {/* 7. Security Section */}
      <SecuritySection content={productContent.security} />

      {/* 8. Get Started / Engagement */}
      <EngagementSection onContactClick={handleContactClick} />

      {/* 10. Team / Vision / Mission */}
      {productContent.team && (
        <TeamSection content={productContent.team} />
      )}

      {/* 10. FAQ Section */}
      <SpecsSection content={productContent.specs} />

      {/* 11. CTA + Footer */}
      {productContent.footer ? (
        <FooterSection 
          ctaContent={productContent.ctaFooter} 
          footerContent={productContent.footer}
          onContactClick={handleContactClick}
        />
      ) : (
        <FooterSection 
          ctaContent={productContent.ctaFooter} 
          footerContent={{
            company: {
              name: 'i.AM Innovation Lab AG',
              legalEntity: 'Swiss Corporation (AG)',
              address: 'Löwenstrasse 29, 8001 Zürich, Switzerland',
              email: 'info@iam-lab.ch',
            },
            links: {
              impressum: '/impressum',
              privacy: '/privacy',
            },
          }}
          onContactClick={handleContactClick}
        />
      )}

      {/* Contact Modal with Google Calendar Scheduler */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title="Schedule a Walkthrough"
      />
    </main>
  );
}
