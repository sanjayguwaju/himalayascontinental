"use client";

import React from "react";
import type { WelcomeSectionBlock as WelcomeSectionBlockProps } from "@/payload-types";
import { cn } from "@/utilities/ui";

export const WelcomeSectionBlock: React.FC<WelcomeSectionBlockProps> = ({
  preHeading,
  heading,
  tagline,
  content,
  alignment = "center",
}) => {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className={cn("max-w-[800px] mx-auto", alignmentClasses[alignment as keyof typeof alignmentClasses])}>
        {preHeading && (
          <h3 
            className="text-[28px] font-normal mb-2"
            style={{ fontFamily: "var(--font-roboto-condensed), sans-serif", color: "#003087" }}
          >
            {preHeading}
          </h3>
        )}
        
        {heading && (
          <h2 
            className="text-[32px] md:text-[36px] font-bold mb-4"
            style={{ fontFamily: "var(--font-roboto-condensed), sans-serif", color: "#003087" }}
          >
            {heading}
          </h2>
        )}
        
        {tagline && (
          <p 
            className="text-[15px] font-semibold mb-6"
            style={{ fontFamily: "var(--font-roboto), sans-serif", color: "#003087" }}
          >
            {tagline}
          </p>
        )}
        
        {content && (
          <div 
            className="text-[15px] leading-[1.7]"
            style={{ 
              fontFamily: "var(--font-roboto), sans-serif", 
              color: "#555555",
            }}
            dangerouslySetInnerHTML={{ 
              __html: typeof content === 'string' ? content : JSON.stringify(content) 
            }}
          />
        )}
      </div>
    </section>
  );
};
