"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type {
  Media,
  HomepageAuthorizedDistributorsBlock as HomepageAuthorizedDistributorsBlockType,
} from "@/payload-types";
import { cn } from "@/utilities/ui";
import { Building2 } from "lucide-react";

export const HomepageAuthorizedDistributorsBlock: React.FC<
  HomepageAuthorizedDistributorsBlockType
> = ({ title, subtitle, distributors, backgroundColor = "lightGray" }) => {
  if (!distributors || distributors.length === 0) return null;

  const getBgClass = () => {
    switch (backgroundColor) {
      case "white":
        return "bg-white";
      case "primary":
        return "bg-[#0870b8]";
      case "lightGray":
      default:
        return "bg-gray-50";
    }
  };

  const isPrimary = backgroundColor === "primary";

  return (
    <section className={cn("py-16 md:py-20", getBgClass())}>
      <div className="container">
        {/* Header Section */}
        <div className="text-center max-w-[800px] mx-auto mb-12">
          {title && (
            <h2
              className={cn(
                "text-[28px] md:text-[34px] font-bold mb-4 uppercase tracking-wide",
                isPrimary ? "text-white" : "text-gray-900"
              )}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p
              className={cn(
                "text-[15px] md:text-[16px] leading-relaxed",
                isPrimary ? "text-white/85" : "text-gray-600"
              )}
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Distributors Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {distributors.map((distributor, index) => {
            const logoUrl =
              typeof distributor.logo === "object" && distributor.logo !== null
                ? (distributor.logo as Media).url
                : null;

            const hasLink = Boolean(distributor.link);

            const CardContent = (
              <div
                className={cn(
                  "group h-full flex flex-col items-center p-4 md:p-6 text-center bg-white rounded-xl shadow-sm border border-gray-100/50 transition-all duration-300",
                  hasLink && "hover:shadow-lg hover:-translate-y-1 cursor-pointer",
                  !hasLink && "hover:shadow-md"
                )}
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                {logoUrl ? (
                  <div className="relative w-full aspect-4/3 mb-4 shrink-0">
                    <Image
                      src={logoUrl}
                      alt={distributor.name}
                      fill
                      className="object-contain p-1 md:p-3 filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4 text-[#0870b8] shrink-0">
                    <Building2 className="w-8 h-8 opacity-80" />
                  </div>
                )}
                
                <div className="flex flex-col flex-1 w-full items-center">
                  <h3 className="text-[14px] md:text-[15px] font-bold text-gray-800 leading-relaxed line-clamp-3 mb-2 w-full px-1">
                    {distributor.name}
                  </h3>
                  
                  {/* Dedicated space for the button ensures perfect vertical alignment even if a card lacks a link */}
                  <div className="mt-auto pt-2 h-[28px] flex items-center justify-center w-full">
                    {hasLink && (
                      <span className="inline-flex items-center text-[13px] font-semibold text-[#0870b8] group-hover:text-[#065b96] transition-colors">
                        Visit Website
                        <svg className="w-3.5 h-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );

            return (
              <div key={distributor.id || index} className="h-full">
                {hasLink ? (
                  <Link
                    href={distributor.link!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    {CardContent}
                  </Link>
                ) : (
                  CardContent
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
