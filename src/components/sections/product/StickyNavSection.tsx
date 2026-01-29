'use client';

import { StickyNav } from '@/components/ui';
import type { MainNavigation } from '@/lib/types/content';

interface StickyNavSectionProps {
  navigation: MainNavigation;
  onContactClick?: () => void;
}

export function StickyNavSection({ navigation, onContactClick }: StickyNavSectionProps) {
  return <StickyNav navigation={navigation} onContactClick={onContactClick} />;
}
