"use client";

import React, { useState, useId } from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export type TabsVariant = "pills" | "underline" | "cards";

export interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  variant?: TabsVariant;
  className?: string;
}

export function Tabs({
  tabs,
  defaultTab,
  activeTab,
  onTabChange,
  variant = "pills",
  className,
}: TabsProps) {
  const [internalActive, setInternalActive] = useState(
    defaultTab || tabs[0]?.id || ""
  );
  const currentTab = activeTab ?? internalActive;
  const baseId = useId();

  const handleSelect = (id: string) => {
    if (activeTab === undefined) {
      setInternalActive(id);
    }
    onTabChange?.(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = (index + 1) % tabs.length;
      handleSelect(tabs[nextIndex].id);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = (index - 1 + tabs.length) % tabs.length;
      handleSelect(tabs[prevIndex].id);
    }
  };

  const currentTabItem = tabs.find((t) => t.id === currentTab);

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Tab List */}
      <div
        role="tablist"
        aria-orientation="horizontal"
        className={cn(
          "flex items-center gap-2 overflow-x-auto pb-1",
          variant === "underline" && "border-b-2 border-brand-ink gap-4 pb-0"
        )}
      >
        {tabs.map((tab, idx) => {
          const isActive = tab.id === currentTab;
          const tabId = `${baseId}-tab-${tab.id}`;
          const panelId = `${baseId}-panel-${tab.id}`;

          let variantClasses = "";
          if (variant === "pills") {
            variantClasses = isActive
              ? "bg-brand-pink text-brand-ink shadow-neo translate-x-[-1px] translate-y-[-1px] border-2 border-brand-ink"
              : "bg-brand-white text-brand-ink shadow-neo-sm hover:bg-brand-yellow border-2 border-brand-ink";
          } else if (variant === "underline") {
            variantClasses = isActive
              ? "border-b-4 border-brand-pink text-brand-ink bg-transparent pb-2 font-black"
              : "border-b-4 border-transparent text-neutral-600 hover:text-brand-ink bg-transparent pb-2";
          } else if (variant === "cards") {
            variantClasses = isActive
              ? "bg-brand-yellow text-brand-ink border-2 border-b-0 border-brand-ink -mb-[2px] z-10"
              : "bg-neutral-100 text-neutral-600 border-2 border-brand-ink hover:bg-white";
          }

          return (
            <button
              key={tab.id}
              role="tab"
              id={tabId}
              type="button"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              disabled={tab.disabled}
              onClick={() => handleSelect(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={cn(
                "px-4 py-2 font-display text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer outline-none rounded-[2px]",
                variantClasses,
                tab.disabled && "opacity-40 cursor-not-allowed"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Panel */}
      {currentTabItem && (
        <div
          role="tabpanel"
          id={`${baseId}-panel-${currentTabItem.id}`}
          aria-labelledby={`${baseId}-tab-${currentTabItem.id}`}
          tabIndex={0}
          className="p-5 bg-brand-white border-2 border-brand-ink shadow-neo rounded-[2px] font-body text-sm outline-none focus-visible:outline-2"
        >
          {currentTabItem.content}
        </div>
      )}
    </div>
  );
}
