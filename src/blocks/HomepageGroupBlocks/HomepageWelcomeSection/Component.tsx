"use client";

import React from "react";
import type { HomepageWelcomeSectionBlock as HomepageWelcomeSectionBlockProps } from "@/payload-types";
import { cn } from "@/utilities/ui";
import { Media } from "@/components/Media";

export const HomepageWelcomeSectionBlock: React.FC<HomepageWelcomeSectionBlockProps> = ({
  preHeading,
  heading,
  tagline,
  description,
  backgroundImage,
  showDivider = true,
  alignment = "center",
  ctaButton,
}) => {
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <section className="relative py-16 px-4 md:px-8">
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Media resource={backgroundImage} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-white/90" />
        </div>
      )}

      {/* Content */}
      <div
        className={cn(
          "relative z-10 max-w-[900px] mx-auto flex flex-col",
          alignmentClasses[alignment as keyof typeof alignmentClasses]
        )}
      >
        {preHeading && (
          <h3
            className="text-[28px] font-normal mb-2"
            style={{ fontFamily: "'Playfair Display', serif", color: "#000000" }}
          >
            {preHeading}
          </h3>
        )}

        {heading && (
          <h2
            className="text-[32px] md:text-[42px] font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: "#1DA1F2" }}
          >
            {heading}
          </h2>
        )}

        {/* Divider */}
        {showDivider && (
          <div className="flex items-center gap-4 my-4">
            <div className="h-[2px] w-[150px] bg-[#1DA1F2]" />
            <div className="w-2 h-2 rounded-full bg-[#1DA1F2]" />
            <div className="h-[2px] w-[150px] bg-[#1DA1F2]" />
          </div>
        )}

        {tagline && (
          <p
            className="text-[15px] font-semibold mb-6"
            style={{ fontFamily: "'Open Sans', sans-serif", color: "#000000" }}
          >
            {tagline}
          </p>
        )}

        {description && (
          <div
            className="text-[15px] leading-[1.7] max-w-[700px]"
            style={{
              fontFamily: "'Open Sans', sans-serif",
              color: "#555555",
            }}
            dangerouslySetInnerHTML={{
              __html: typeof description === "string" ? description : JSON.stringify(description),
            }}
          />
        )}

        {/* CTA Button */}
        {ctaButton?.show && ctaButton.label && (
          <a
            href={ctaButton.link || "#"}
            className="mt-8 px-6 py-3 bg-[#1DA1F2] text-white rounded hover:bg-[#1a91da] transition-colors"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            {ctaButton.label}
          </a>
        )}
      </div>
    </section>
  );
};
