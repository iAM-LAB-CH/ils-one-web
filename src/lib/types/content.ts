// Product Card for Hero
export interface ProductCardContent {
  id: string;
  ticker: string;
  price: string;
  title: string;
  description: string;
  redemptionDays: number;
  expectedProfit: string;
  image: string;
  accentColor: string;
  rotation: number;
  translateY: number;
}

// Trust Banner
export interface TrustInstitution {
  name: string;
  logo?: string; // Path to logo SVG/PNG
}

export interface TrustBannerContent {
  headline: string;
  subheadline?: string;
  institutions: TrustInstitution[];
}

// Hero Section
export interface HeroContent {
  badge?: string;
  headline: string;
  subheadline?: string;
  description?: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  deviceImage?: string;
  backgroundImage?: string;
  productCards?: ProductCardContent[];
  trustBanner?: TrustBannerContent;
}

// Navigation
export interface NavItem {
  id: string;
  label: string;
  href: string;
}

// New navigation with dropdowns (Ondo-style)
export interface NavDropdownItem {
  id: string;
  label: string;
  href: string;
  description?: string;
}

export interface NavCategory {
  id: string;
  label: string;
  items?: NavDropdownItem[];
  href?: string; // Direct link if no dropdown
  action?: 'modal'; // Special action like opening a modal
}

export interface MainNavigation {
  logo: {
    text: string;
    href: string;
  };
  categories: NavCategory[];
  cta: {
    text: string;
    href: string;
  };
}

// Feature Highlight
export interface FeatureHighlight {
  id: string;
  icon: string;
  title: string;
  description: string;
  image: string;
  badge?: string;
  stats?: {
    value: string;
    label: string;
  };
}

export interface HighlightsTab {
  id: string;
  label: string;
  icon: string;
  lottieUrl?: string; // Path to Lottie JSON file (e.g., /animations/highlights/multi-sig.json)
  videoUrl?: string; // Path to video file (e.g., /animations/highlights/multi-sig.mp4) - preferred over lottie
  features: FeatureHighlight[];
}

export interface HighlightsContent {
  headline: string;
  subheadline?: string;
  tabs: HighlightsTab[];
}

// Product Viewer (Apple-style)
export interface ProductViewerFeature {
  id: string;
  icon?: string;
  title: string;
  description: string;
  hotspot: {
    x: number; // percentage 0-100
    y: number; // percentage 0-100
    position: 'left' | 'right';
  };
}

export interface ProductViewerContent {
  headline: string;
  subheadline?: string;
  deviceImage: string;
  deviceAlt?: string;
  features: ProductViewerFeature[];
}

// Design Section
export interface DesignFeature {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface DesignContent {
  headline: string;
  subheadline: string;
  description: string;
  features: DesignFeature[];
}

// Security Section
export interface SecurityCredential {
  id: string;
  icon: string;
  title: string;
  description: string;
  badge?: string;
  link?: { text: string; href: string };
}

export interface SecurityContent {
  headline: string;
  subheadline?: string;
  description?: string;
  credentials: SecurityCredential[];
}

// Features Deep-Dive
export interface DeepDiveFeature {
  id: string;
  badge?: string;
  headline: string;
  subheadline: string;
  description: string;
  image: string;
  imageAlt: string;
  highlights?: string[];
  alignment: 'left' | 'right';
}

export interface FeaturesContent {
  headline: string;
  subheadline?: string;
  features: DeepDiveFeature[];
}

// Performance Section
export interface PerformanceStat {
  id: string;
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
}

export interface ComparisonBar {
  label: string;
  ourValue: number;
  ourDisplay?: string;
  competitorValue: number;
  competitorDisplay?: string;
  unit: string;
}

export interface PerformanceContent {
  headline: string;
  subheadline: string;
  engineName: string;
  engineDescription: string;
  stats: PerformanceStat[];
  comparisons: ComparisonBar[];
}

// Video Showcase
export interface VideoContent {
  headline: string;
  subheadline: string;
  description: string;
  videoUrl: string;
  posterImage: string;
  features?: string[];
}

// Comparison Table
export interface PricingTier {
  id: string;
  name: string;
  price: string;
  period?: string;
  description: string;
  features: {
    name: string;
    included: boolean | string;
  }[];
  cta: {
    text: string;
    href: string;
  };
  highlighted?: boolean;
  badge?: string;
}

export interface ComparisonContent {
  headline: string;
  subheadline?: string;
  tiers: PricingTier[];
  featureCategories?: {
    name: string;
    features: string[];
  }[];
}

// Specs Accordion
export interface SpecItem {
  label: string;
  value: string;
}

export interface SpecCategory {
  id: string;
  title: string;
  icon?: string;
  specs: SpecItem[];
}

export interface SpecsContent {
  headline: string;
  subheadline?: string;
  categories: SpecCategory[];
}

// CTA Footer
export interface CTAFooterContent {
  headline: string;
  subheadline: string;
  cta: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  backgroundImage?: string;
}

// Audience Section (Who Is It For)
export interface AudienceCard {
  id: string;
  title: string;
  painPoint: string;
  valueProposition: string;
  icon?: string;
}

export interface AudienceContent {
  headline: string;
  subheadline?: string;
  cards: AudienceCard[];
}

// Team Section
export interface TeamMember {
  id: string;
  name: string;
  title: string;
  image: string;
  previousCompanies?: string[];
  funFact?: string;
}

export interface TeamContent {
  headline: string;
  vision: string;
  mission: string;
  members: TeamMember[];
}

// Footer Content
export interface FooterContent {
  company: {
    name: string;
    legalEntity: string;
    registryInfo?: string;
    address: string;
    email: string;
    phone?: string;
  };
  links: {
    impressum: string;
    privacy: string;
    legal?: string;
  };
  social?: {
    linkedin?: string;
  };
}

// Complete Product Page Content
export interface ProductPageContent {
  hero: HeroContent;
  navigation: NavItem[];
  mainNavigation: MainNavigation;
  highlights: HighlightsContent;
  productViewer?: ProductViewerContent;
  design: DesignContent;
  security: SecurityContent;
  features: FeaturesContent;
  performance: PerformanceContent;
  video?: VideoContent;
  comparison: ComparisonContent;
  specs: SpecsContent;
  ctaFooter: CTAFooterContent;
  audience?: AudienceContent;
  team?: TeamContent;
  footer?: FooterContent;
}
