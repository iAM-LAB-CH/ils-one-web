'use client';

import { StickyNav } from '@/components/ui';
import type { NavItem } from '@/lib/types/content';

interface StickyNavSectionProps {
  items: NavItem[];
}

export function StickyNavSection({ items }: StickyNavSectionProps) {
  return <StickyNav items={items} showProgress={true} />;
}
