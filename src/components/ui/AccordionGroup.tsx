'use client';

import { useState, type ReactNode } from 'react';
import clsx from 'clsx';

interface AccordionGroupProps {
  children: ReactNode;
  allowMultiple?: boolean;
  defaultOpen?: string[];
  className?: string;
}

interface AccordionContextValue {
  openItems: string[];
  toggleItem: (id: string) => void;
}

import { createContext, useContext } from 'react';

export const AccordionContext = createContext<AccordionContextValue | null>(null);

export function useAccordion() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('useAccordion must be used within AccordionGroup');
  }
  return context;
}

export function AccordionGroup({
  children,
  allowMultiple = false,
  defaultOpen = [],
  className = '',
}: AccordionGroupProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (allowMultiple) {
        return [...prev, id];
      }
      return [id];
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={clsx('space-y-3', className)}>{children}</div>
    </AccordionContext.Provider>
  );
}
