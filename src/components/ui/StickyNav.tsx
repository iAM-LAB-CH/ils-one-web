'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { useActiveSection } from '@/lib/hooks/useScrollProgress';
import type { NavItem } from '@/lib/types/content';

interface StickyNavProps {
  items: NavItem[];
  className?: string;
  showProgress?: boolean;
}

export function StickyNav({
  items,
  className = '',
  showProgress = false,
}: StickyNavProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const activeSection = useActiveSection(items.map((item) => item.id));

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past hero
      const heroHeight = window.innerHeight * 0.5;
      setIsVisible(window.scrollY > heroHeight);

      // Calculate overall scroll progress
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / scrollHeight;
      setScrollProgress(Math.min(1, Math.max(0, progress)));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isVisible
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0 pointer-events-none',
        className
      )}
    >
      {/* Progress bar - subtle */}
      {showProgress && (
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/[0.06]">
          <div
            className="h-full bg-dark-400 transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      )}

      {/* Nav container - Apple style frosted glass */}
      <div className="bg-dark-950/80 backdrop-blur-xl backdrop-saturate-150 border-b border-white/[0.06]">
        <div className="container-wide">
          <div className="flex items-center justify-center h-12 overflow-x-auto hide-scrollbar">
            <div className="flex items-center gap-0">
              {items.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={clsx(
                    'relative px-5 py-3 text-xs font-normal tracking-[0.01em] transition-colors duration-200 whitespace-nowrap',
                    activeSection === item.id
                      ? 'text-dark-50'
                      : 'text-dark-500 hover:text-dark-300'
                  )}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent-500 rounded-full" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
