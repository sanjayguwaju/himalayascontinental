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
                  "h-full flex flex-col items-center justify-center p-6 text-center bg-white rounded-xl shadow-sm border border-gray-100/50 transition-all duration-300",
                  hasLink && "hover:shadow-lg hover:-translate-y-1 cursor-pointer",
                  !hasLink && "hover:shadow-md"
                )}
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                {logoUrl ? (
                  <div className="relative w-full aspect-4/3 mb-4">
                    <Image
                      src={logoUrl}
                      alt={distributor.name}
                      fill
                      className="object-contain p-2 filter grayscale hover:grayscale-0 transition-all duration-300"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4 text-[#0870b8]">
                    <Building2 className="w-8 h-8 opacity-80" />
                  </div>
                )}
                <h3 className="text-[14px] font-bold text-gray-800 leading-snug line-clamp-3">
                  {distributor.name}
                </h3>
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
