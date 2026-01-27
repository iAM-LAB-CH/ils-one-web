'use client';

import { useState, type ReactNode } from 'react';
import clsx from 'clsx';

interface Tab {
  id: string;
  label: string;
  icon?: string;
  content?: ReactNode;
}

interface TabNavProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
  variant?: 'pills' | 'underline' | 'cards';
}

export function TabNav({
  tabs,
  defaultTab,
  onChange,
  className = '',
  variant = 'pills',
}: TabNavProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  return (
    <div className={className}>
      {/* Tab buttons */}
      <div
        role="tablist"
        className={clsx('flex', {
          'gap-1 p-1 bg-dark-900/80 rounded-full backdrop-blur-xl border border-white/[0.06] overflow-x-auto scrollbar-hide': variant === 'pills',
          'gap-8 border-b border-dark-800/50': variant === 'underline',
          'gap-3 flex-wrap': variant === 'cards',
        })}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => handleTabChange(tab.id)}
            className={clsx(
              'relative flex items-center gap-2 transition-all duration-200',
              {
                // Pills variant - Apple style
                'px-6 py-3 rounded-full text-[0.9375rem] tracking-[-0.01em]': variant === 'pills',
                'bg-dark-50 text-dark-950 font-semibold':
                  variant === 'pills' && activeTab === tab.id,
                'text-dark-400 hover:text-dark-200':
                  variant === 'pills' && activeTab !== tab.id,

                // Underline variant
                'px-1 py-4 text-[1.0625rem] -mb-px border-b-2 tracking-[-0.01em]': variant === 'underline',
                'border-dark-50 text-dark-50 font-semibold':
                  variant === 'underline' && activeTab === tab.id,
                'border-transparent text-dark-500 hover:text-dark-300':
                  variant === 'underline' && activeTab !== tab.id,

                // Cards variant
                'px-6 py-4 rounded-2xl text-[0.9375rem] border tracking-[-0.01em]': variant === 'cards',
                'bg-dark-800 border-white/[0.1] text-dark-100 font-semibold':
                  variant === 'cards' && activeTab === tab.id,
                'bg-transparent border-white/[0.04] text-dark-500 hover:border-white/[0.08] hover:text-dark-300':
                  variant === 'cards' && activeTab !== tab.id,
              }
            )}
          >
            {tab.icon && <span className="text-base opacity-80">{tab.icon}</span>}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab panels */}
      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={tab.id}
          hidden={activeTab !== tab.id}
          className={clsx(
            'focus:outline-none',
            activeTab === tab.id ? 'animate-fadeIn' : ''
          )}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
