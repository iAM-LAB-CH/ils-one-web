'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import type { MainNavigation, NavCategory } from '@/lib/types/content';

interface StickyNavProps {
  navigation: MainNavigation;
  className?: string;
  onContactClick?: () => void;
}

// Dropdown component for navigation categories (desktop) - hover triggered
function NavDropdown({ 
  category, 
  onContactClick,
}: { 
  category: NavCategory; 
  onContactClick?: () => void;
}) {
  // If it's a direct link without dropdown items
  if (category.href && !category.items) {
    if (category.action === 'modal') {
      return (
        <button
          onClick={onContactClick}
          className="px-4 py-2 text-sm font-medium text-dark-300 hover:text-dark-50 transition-colors duration-200"
        >
          {category.label}
        </button>
      );
    }
    return (
      <Link
        href={category.href}
        className="px-4 py-2 text-sm font-medium text-dark-300 hover:text-dark-50 transition-colors duration-200"
      >
        {category.label}
      </Link>
    );
  }

  return (
    <div className="relative group">
      <button
        className="px-4 py-2 text-sm font-medium text-dark-300 hover:text-dark-50 transition-colors duration-200"
      >
        {category.label}
      </button>

      {/* Dropdown menu - hover triggered */}
      <div
        className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 ease-out"
      >
        <div className="bg-dark-900/95 backdrop-blur-xl border border-white/[0.08] rounded-xl shadow-2xl shadow-black/50 min-w-[220px] py-2">
          {category.items?.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="block px-4 py-2.5 text-sm text-dark-300 hover:text-dark-50 hover:bg-white/[0.04] transition-colors duration-150"
            >
              <span className="font-medium">{item.label}</span>
              {item.description && (
                <span className="block text-xs text-dark-500 mt-0.5">{item.description}</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// Mobile menu item component
function MobileNavItem({
  category,
  onContactClick,
  onClose,
}: {
  category: NavCategory;
  onContactClick?: () => void;
  onClose: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Direct link or modal action
  if (category.href && !category.items) {
    if (category.action === 'modal') {
      return (
        <button
          onClick={() => {
            onContactClick?.();
            onClose();
          }}
          className="w-full text-left px-4 py-3 text-base font-medium text-dark-200 hover:text-dark-50 hover:bg-white/[0.04] transition-colors"
        >
          {category.label}
        </button>
      );
    }
    return (
      <Link
        href={category.href}
        onClick={onClose}
        className="block px-4 py-3 text-base font-medium text-dark-200 hover:text-dark-50 hover:bg-white/[0.04] transition-colors"
      >
        {category.label}
      </Link>
    );
  }

  // Expandable category with items
  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-dark-200 hover:text-dark-50 hover:bg-white/[0.04] transition-colors"
      >
        {category.label}
        <svg
          className={clsx(
            'w-4 h-4 transition-transform duration-200',
            isExpanded && 'rotate-180'
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {/* Expanded items */}
      <div
        className={clsx(
          'overflow-hidden transition-all duration-300',
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="pl-4 py-1 space-y-1">
          {category.items?.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={onClose}
              className="block px-4 py-2.5 text-sm text-dark-400 hover:text-dark-50 hover:bg-white/[0.04] rounded-lg transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StickyNav({
  navigation,
  className = '',
  onContactClick,
}: StickyNavProps) {
  const [navState, setNavState] = useState<'hero' | 'hidden' | 'floating'>('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroThreshold = window.innerHeight * 0.4; // 40% of viewport
      const showFloatingThreshold = window.innerHeight * 0.5; // 50% of viewport
      
      if (currentScrollY < 50) {
        // At top - show hero nav (full width, transparent)
        setNavState('hero');
      } else if (currentScrollY < heroThreshold) {
        // Scrolling through hero - hide nav
        setNavState('hidden');
      } else if (currentScrollY >= showFloatingThreshold) {
        // Past hero - show floating pill nav
        setNavState('floating');
      }
      
      lastScrollY.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          navState === 'hidden' && !isMobileMenuOpen
            ? '-translate-y-full opacity-0 pointer-events-none'
            : 'translate-y-0 opacity-100',
          className
        )}
      >
        {/* Nav container - transforms from full-width to floating pill */}
        <div 
          className={clsx(
            'transition-all duration-500 ease-out',
            navState === 'floating' || isMobileMenuOpen
              ? 'px-4 sm:px-6 lg:px-8 pt-4'
              : 'px-4 sm:px-6 lg:px-8 xl:px-16 pt-4'
          )}
        >
          <div
            className={clsx(
              'mx-auto transition-all duration-500 ease-out',
              navState === 'floating' || isMobileMenuOpen
                ? 'max-w-6xl rounded-full bg-dark-950/80 backdrop-blur-xl backdrop-saturate-150 border border-white/[0.08] shadow-lg shadow-black/20'
                : 'max-w-[1728px] rounded-none bg-transparent border border-transparent'
            )}
          >
            <div className="flex items-center justify-between h-14 px-4 sm:px-6">
            {/* Logo */}
            <Link
              href={navigation.logo.href}
              className="flex items-center hover:opacity-80 transition-opacity duration-200"
            >
              <img 
                src="/images/logos/ILSOne-Logo.svg" 
                alt="ILS One"
                className="h-4 w-auto"
              />
            </Link>

              {/* Center Navigation - Desktop */}
              <div className="hidden md:flex items-center gap-1">
                {navigation.categories.map((category) => (
                  <NavDropdown
                    key={category.id}
                    category={category}
                    onContactClick={onContactClick}
                  />
                ))}
              </div>

              {/* Right side buttons */}
              <div className="flex items-center gap-2">
                {/* CTA Button - Desktop */}
                <Link
                  href={navigation.cta.href}
                  className="hidden sm:inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-dark-950 bg-dark-50 hover:bg-white rounded-full transition-colors duration-200"
                >
                  {navigation.cta.text}
                </Link>

                {/* Mobile menu button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 text-dark-300 hover:text-dark-50 transition-colors"
                  aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                >
                  {isMobileMenuOpen ? (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={clsx(
          'fixed inset-0 z-40 bg-dark-950/80 backdrop-blur-sm transition-opacity duration-300 md:hidden',
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile menu panel */}
      <div
        className={clsx(
          'fixed top-[72px] left-4 right-4 z-50 md:hidden transition-all duration-300',
          isMobileMenuOpen
            ? 'opacity-100 visible translate-y-0'
            : 'opacity-0 invisible -translate-y-4 pointer-events-none'
        )}
      >
        <div className="bg-dark-900/95 backdrop-blur-xl border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
          {/* Navigation items */}
          <div className="py-2">
            {navigation.categories.map((category) => (
              <MobileNavItem
                key={category.id}
                category={category}
                onContactClick={onContactClick}
                onClose={() => setIsMobileMenuOpen(false)}
              />
            ))}
          </div>

          {/* CTA Button */}
          <div className="p-4 border-t border-white/[0.08]">
            <Link
              href={navigation.cta.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center px-5 py-3 text-sm font-medium text-dark-950 bg-dark-50 hover:bg-white rounded-full transition-colors duration-200"
            >
              {navigation.cta.text}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

// Keep backward compatibility with old NavItem interface
export { StickyNav as default };
