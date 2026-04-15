"use client";

import React from "react";
import type { AssociatesBlock as AssociatesBlockProps, Media } from "@/payload-types";
import { cn } from "@/utilities/ui";
import Image from "next/image";
import Link from "next/link";

interface LogoGridProps {
  logos: Array<{
    logo: string | Media;
    name: string;
    link?: string | null;
    id?: string | null;
  }>;
}

const LogoGrid: React.FC<LogoGridProps> = ({ logos }) => {
  if (!logos || logos.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-center gap-6 md:gap-8">
      {logos.map((item: { logo: string | Media; name: string; link?: string | null | undefined; id?: string | null | undefined; }, index: number) => {
        const logoUrl = typeof item.logo === "object" && item.logo !== null
          ? (item.logo as Media).url
          : null;

        const LogoContent = () => (
          <div 
            className="h-[60px] w-auto grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer opacity-70 hover:opacity-100"
          >
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={item.name}
                width={120}
                height={60}
                className="h-full w-auto object-contain"
              />
            ) : (
              <div className="h-full w-[120px] bg-gray-200 flex items-center justify-center">
                <span className="text-xs text-gray-500">{item.name}</span>
              </div>
            )}
          </div>
        );

        return (
          <div key={item.id || index}>
            {item.link ? (
              <Link href={item.link} className="block">
                <LogoContent />
              </Link>
            ) : (
              <LogoContent />
            )}
          </div>
        );
      })}
    </div>
  );
};

export const AssociatesBlock: React.FC<AssociatesBlockProps> = ({
  sectionTitle,
  subtitle,
  nationalSectionTitle,
  nationalAssociates,
  internationalSectionTitle,
  internationalAssociates,
  backgroundColor = "white",
}) => {
  const bgClasses = {
    white: "bg-white",
    light: "bg-[#f5f7fa]",
    section: "bg-[#eef2f7]",
  };

  const hasNational = nationalAssociates && nationalAssociates.length > 0;
  const hasInternational = internationalAssociates && internationalAssociates.length > 0;

  if (!hasNational && !hasInternational) return null;

  return (
    <section className={cn("py-10 px-4 md:px-8", bgClasses[backgroundColor as keyof typeof bgClasses])}>
      <div className="max-w-[1200px] mx-auto">
        {(sectionTitle || subtitle) && (
          <div className="text-center mb-10">
            {sectionTitle && (
              <h2 
                className="text-[28px] md:text-[32px] font-bold mb-2"
                style={{ fontFamily: "'Playfair Display', serif", color: "#003087" }}
              >
                {sectionTitle}
              </h2>
            )}
            {subtitle && (
              <p 
                className="text-[16px]"
                style={{ fontFamily: "'Open Sans', sans-serif", color: "#555555" }}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        {hasNational && (
          <div className="mb-10">
            {nationalSectionTitle && (
              <h3 
                className="text-[14px] uppercase tracking-[2px] text-center mb-6"
                style={{ fontFamily: "'Open Sans', sans-serif", color: "#555555" }}
              >
                {nationalSectionTitle}
              </h3>
            )}
            <LogoGrid logos={nationalAssociates} />
          </div>
        )}

        {hasInternational && (
          <div>
            {internationalSectionTitle && (
              <h3 
                className="text-[14px] uppercase tracking-[2px] text-center mb-6"
                style={{ fontFamily: "'Open Sans', sans-serif", color: "#555555" }}
              >
                {internationalSectionTitle}
              </h3>
            )}
            <LogoGrid logos={internationalAssociates} />
          </div>
        )}
      </div>
    </section>
  );
};
