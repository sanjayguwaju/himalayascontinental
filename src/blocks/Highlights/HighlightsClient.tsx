"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export interface HighlightItem {
  id: string | number;
  title: string;
  url: string;
  isPinned?: boolean;
  categoryName?: string;
}

interface HighlightsClientProps {
  items: HighlightItem[];
  label?: string;
}

export const HighlightsClient: React.FC<HighlightsClientProps> = ({ items, label }) => {
  const t = useTranslations();
  if (!items || items.length === 0) return null;

  const displayLabel = label || t("highlights");

  const marqueeItems = [...items, ...items, ...items];

  return (
    <div className="relative flex items-center h-10 w-full overflow-hidden bg-muted border-y border-border shadow-sm">
      {/* Label Section */}
      <div className="flex items-center px-6 h-full bg-primary shrink-0">
        <span className="text-primary-foreground font-bold text-[16px] whitespace-nowrap">
          {displayLabel}
        </span>
      </div>

      {/* Scrolling Content */}
      <div className="flex-1 overflow-hidden h-full flex items-center">
        <motion.div
          className="flex whitespace-nowrap items-center gap-12 hover:paused"
          animate={{
            x: ["0%", "-33.33%"],
          }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 40,
          }}
        >
          {marqueeItems.map((item, index) => (
            <React.Fragment key={`${item.id}-${index}`}>
              <Link
                href={item.url}
                className="text-foreground hover:text-primary font-medium text-[14px] flex items-center gap-3 transition-colors hover:underline underline-offset-4"
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.isPinned ? "bg-accent" : "bg-primary/40"}`}
                />
                {item.categoryName && (
                  <span className="text-[10px] uppercase font-bold text-primary/60 border border-primary/20 px-1.5 py-0.5 rounded bg-background">
                    {item.categoryName}
                  </span>
                )}
                {item.isPinned && <span className="text-accent font-bold">[!]</span>}
                {item.title}
              </Link>
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* Subtle fade overlay */}
      <div className="absolute top-0 right-0 bottom-0 w-12 bg-linear-to-l from-muted to-transparent pointer-events-none" />
    </div>
  );
};
