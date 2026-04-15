"use client";

import React from "react";
import type { OurCompaniesBlock as OurCompaniesBlockProps, Media } from "@/payload-types";
import { cn } from "@/utilities/ui";
import Image from "next/image";
import Link from "next/link";

export const OurCompaniesBlock: React.FC<OurCompaniesBlockProps> = ({
  sectionTitle,
  subtitle,
  companies,
  columns = "3",
}) => {
  const gridClasses = {
    "2": "grid-cols-1 sm:grid-cols-2",
    "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    "4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  if (!companies || companies.length === 0) return null;

  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-[1200px] mx-auto">
        {(sectionTitle || subtitle) && (
          <div className="text-center mb-12">
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

        <div className={cn("grid gap-6", gridClasses[columns as keyof typeof gridClasses])}>
          {companies.map((company: { logo: string | Media; name: string; description?: string | null | undefined; link?: string | null | undefined; id?: string | null | undefined; }, index: number) => {
            const logoUrl = typeof company.logo === "object" && company.logo !== null
              ? (company.logo as Media).url
              : null;

            return (
              <div 
                key={company.id || index}
                className="p-6 rounded transition-all duration-300 hover:shadow-lg"
                style={{ 
                  border: "1px solid #dce3ec",
                  borderRadius: "4px",
                }}
              >
                {logoUrl && (
                  <div className="mb-4 h-[100px] flex items-center justify-center">
                    <Image
                      src={logoUrl}
                      alt={company.name}
                      width={200}
                      height={100}
                      className="max-w-[200px] w-auto h-auto max-h-[100px] object-contain"
                    />
                  </div>
                )}
                
                <h3 
                  className="text-[20px] md:text-[22px] font-normal mb-3"
                  style={{ fontFamily: "'Playfair Display', serif", color: "#003087" }}
                >
                  {company.name}
                </h3>
                
                {company.description && (
                  <p 
                    className="text-[14px] mb-4 leading-[1.6]"
                    style={{ fontFamily: "'Open Sans', sans-serif", color: "#555555" }}
                  >
                    {company.description}
                  </p>
                )}
                
                {company.link && (
                  <Link
                    href={company.link}
                    className="text-[13px] transition-colors duration-300 hover:underline"
                    style={{ 
                      fontFamily: "'Open Sans', sans-serif", 
                      color: "#003087",
                    }}
                  >
                    Read More
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
