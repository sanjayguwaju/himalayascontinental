"use client";

import React from "react";
import type { HomepageProductCategoriesBlock as HomepageProductCategoriesBlockProps } from "@/payload-types";
import { cn } from "@/utilities/ui";
import { Media } from "@/components/Media";

export const HomepageProductCategoriesBlock: React.FC<HomepageProductCategoriesBlockProps> = ({
  title,
  subtitle,
  categories,
  backgroundColor = "lightBlue",
  cardStyle = "rounded",
  showViewAllButton,
  viewAllButton,
}) => {
  const bgColorClasses = {
    lightBlue: "bg-[#d4e6f1]",
    white: "bg-white",
    darkBlue: "bg-[#0F365A]",
  };

  const textColorClasses = {
    lightBlue: "text-[#0F365A]",
    white: "text-[#0F365A]",
    darkBlue: "text-white",
  };

  const cardBgClasses = {
    lightBlue: "bg-white",
    white: "bg-[#d4e6f1]",
    darkBlue: "bg-white",
  };

  const cardTextClasses = {
    lightBlue: "text-[#0F365A]",
    white: "text-[#0F365A]",
    darkBlue: "text-[#0F365A]",
  };

  return (
    <section className={cn("py-16 px-4 md:px-8", bgColorClasses[backgroundColor as keyof typeof bgColorClasses])}>
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2
                className={cn(
                  "text-[32px] md:text-[36px] font-bold mb-4",
                  textColorClasses[backgroundColor as keyof typeof textColorClasses]
                )}
                style={{ fontFamily: "var(--font-roboto-condensed), sans-serif" }}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={cn(
                  "text-[16px] max-w-[600px] mx-auto",
                  textColorClasses[backgroundColor as keyof typeof textColorClasses]
                )}
                style={{ fontFamily: "var(--font-roboto), sans-serif", opacity: 0.8 }}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Category Cards Grid */}
        {categories && categories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {categories.map((category, index) => (
              <a
                key={index}
                href={category.link || "#"}
                className={cn(
                  "flex flex-col items-center justify-center p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
                  cardBgClasses[backgroundColor as keyof typeof cardBgClasses],
                  cardStyle === "rounded" ? "rounded-lg" : ""
                )}
              >
                {/* Icon Container */}
                {category.icon && (
                  <div className="w-[100px] h-[100px] rounded-full bg-[#0F365A] flex items-center justify-center mb-5 overflow-hidden shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <Media
                      resource={category.icon}
                      className="w-[64px] h-[64px] object-contain brightness-0 invert"
                    />
                  </div>
                )}

                {/* Title */}
                {category.title && (
                  <h3
                    className={cn(
                      "text-[18px] font-semibold text-center",
                      cardTextClasses[backgroundColor as keyof typeof cardTextClasses]
                    )}
                    style={{ fontFamily: "var(--font-roboto), sans-serif" }}
                  >
                    {category.title}
                  </h3>
                )}

                {/* Description */}
                {category.description && (
                  <p
                    className={cn(
                      "text-[14px] text-center mt-2",
                      cardTextClasses[backgroundColor as keyof typeof cardTextClasses]
                    )}
                    style={{ fontFamily: "var(--font-roboto), sans-serif", opacity: 0.7 }}
                  >
                    {category.description}
                  </p>
                )}
              </a>
            ))}
          </div>
        )}

        {/* View All Button */}
        {showViewAllButton && viewAllButton?.label && (
          <div className="text-center mt-12">
            <a
              href={viewAllButton.link || "/products"}
              className={cn(
                "inline-block px-8 py-3 rounded transition-colors",
                backgroundColor === "darkBlue"
                  ? "bg-white text-[#0F365A] hover:bg-gray-100"
                  : "bg-[#1DA1F2] text-white hover:bg-[#1a91da]"
              )}
              style={{ fontFamily: "var(--font-roboto), sans-serif" }}
            >
              {viewAllButton.label}
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
