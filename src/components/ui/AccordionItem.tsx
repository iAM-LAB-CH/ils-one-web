'use client';

import { useRef, useEffect, useState, type ReactNode } from 'react';
import clsx from 'clsx';
import { useAccordion } from './AccordionGroup';

interface AccordionItemProps {
  id: string;
  title: string;
  icon?: string;
  children: ReactNode;
  className?: string;
}

export function AccordionItem({
  id,
  title,
  icon,
  children,
  className = '',
}: AccordionItemProps) {
  const { openItems, toggleItem } = useAccordion();
  const isOpen = openItems.includes(id);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  return (
    <div
      className={clsx(
        'rounded-xl border transition-colors duration-300',
        isOpen
          ? 'bg-dark-800/50 border-dark-700'
          : 'bg-dark-900/30 border-dark-800 hover:border-dark-700',
        className
      )}
    >
      <button
        onClick={() => toggleItem(id)}
        aria-expanded={isOpen}
        aria-controls={`content-${id}`}
        className="flex items-center justify-between w-full p-5 text-left"
      >
        <div className="flex items-center gap-3">
          {icon && (
            <span className="text-xl flex-shrink-0" aria-hidden="true">
              {icon}
            </span>
          )}
          <span className="text-lg font-medium text-dark-100">{title}</span>
        </div>
        <span
          className={clsx(
            'text-dark-400 transition-transform duration-300 text-xl',
            isOpen && 'rotate-180'
          )}
        >
          ↓
        </span>
      </button>

      <div
        id={`content-${id}`}
        role="region"
        aria-labelledby={id}
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{
          height: isOpen ? height : 0,
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div ref={contentRef} className="px-5 pb-5">
          {children}
        </div>
      </div>
    </div>
  );
}
