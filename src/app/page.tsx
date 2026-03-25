'use client';

import { useState } from 'react';
import {
  HeroSection,
  HighlightsSection,
  FeaturesSection,
  PerformanceSection,
  DesignSection,
  SecuritySection,
  AudienceSection,
  EngagementSection,
  TeamSection,
  SpecsSection,
  FooterSection,
  StickyNavSection,
} from '@/components/sections/product';
import { ContactModal } from '@/components/ui';
import { productContent } from '@/lib/content/product-content';

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
              name: 'Invest One AG',
              legalEntity: 'Swiss Corporation (AG)',
              address: 'Löwenstrasse 29, 8001 Zürich, Switzerland',
              email: 'info@ils-one.com',
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
