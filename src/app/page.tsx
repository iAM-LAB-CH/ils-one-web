import {
  HeroSection,
  HighlightsSection,
  DesignSection,
  SecuritySection,
  FeaturesSection,
  PerformanceSection,
  ComparisonSection,
  SpecsSection,
  PricingSection,
  CTAFooterSection,
  StickyNavSection,
} from '@/components/sections/product';
import { productContent } from '@/lib/content/product-content';

export const metadata = {
  title: 'ILS One – Programmable Reinsurance',
  description: 'On-chain infrastructure for institutional ILS. Automate collateral, settlement, lifecycle management and secondary trading — without changing your legal structure.',
};

export default function Home() {
  return (
    <main className="relative">
      {/* Sticky Navigation */}
      <StickyNavSection items={productContent.navigation} />

      {/* Hero Section */}
      <HeroSection content={productContent.hero} />

      {/* Highlights Gallery */}
      <HighlightsSection content={productContent.highlights} />

      {/* Infrastructure Section (formerly Design) */}
      <DesignSection content={productContent.design} />

      {/* Security Section */}
      <SecuritySection content={productContent.security} />

      {/* Platform Features Deep-Dive */}
      <FeaturesSection content={productContent.features} />

      {/* Performance Section */}
      <PerformanceSection content={productContent.performance} />

      {/* Pricing Comparison */}
      <ComparisonSection content={productContent.comparison} />

      {/* FAQ Section (formerly Specs) */}
      <SpecsSection content={productContent.specs} />

      {/* Pricing CTA Section */}
      <PricingSection content={productContent.pricing} />

      {/* CTA Footer */}
      <CTAFooterSection content={productContent.ctaFooter} />
    </main>
  );
}
