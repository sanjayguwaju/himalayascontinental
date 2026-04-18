"use client";

import React, { useState } from "react";
import RichText from "@/components/RichText";
import { cn } from "@/utilities/ui";
import type { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";

interface Tab {
  tabLabel?: string | null;
  content?: DefaultTypedEditorState | null;
}

interface CompanyProfileBlockProps {
  sectionTitle?: string | null;
  introText?: string | null;
  tabs?: Tab[] | null;
  backgroundColor?: "primary" | "white" | "light" | null;
  disableInnerContainer?: boolean;
}

export const CompanyProfileBlock: React.FC<CompanyProfileBlockProps> = ({
  sectionTitle,
  introText,
  tabs,
  backgroundColor,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const bgColorMap: Record<string, string> = {
    primary: "bg-[#0870b8]",
    white: "bg-white",
    light: "bg-[#f5f7fa]",
  };

  const bgColorClass = bgColorMap[backgroundColor ?? "primary"] ?? bgColorMap["primary"];
  const textColorClass = backgroundColor === "primary" ? "text-white" : "text-gray-900";

  return (
    <section className={cn("py-12 md:py-16", bgColorClass)}>
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className={cn("text-2xl md:text-3xl font-bold mb-4", textColorClass)}>
          {sectionTitle || "Company Profile"}
        </h2>

        {/* Introduction Text */}
        {introText && (
          <p className={cn("mb-8 max-w-4xl", textColorClass, "opacity-90")}>{introText}</p>
        )}

        {/* Tabs Container */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex flex-wrap border-b border-gray-200">
            {tabs?.map((tab: Tab, index: number) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={cn(
                  "px-6 py-4 text-sm font-medium transition-colors relative",
                  activeTab === index
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-600 hover:text-primary hover:bg-gray-50"
                )}
              >
                {tab.tabLabel}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8">
            {tabs?.map((tab: Tab, index: number) => (
              <div key={index} className={cn(activeTab === index ? "block" : "hidden")}>
                {tab.content && (
                  <RichText data={tab.content} className="prose prose-lg max-w-none" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
