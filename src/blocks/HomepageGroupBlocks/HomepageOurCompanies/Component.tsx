"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { type Media, type HomepageOurCompaniesBlock as HomepageOurCompaniesBlockType } from "@/payload-types";
import { cn } from "@/utilities/ui";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const HomepageOurCompaniesBlock: React.FC<HomepageOurCompaniesBlockType> = ({
  title,
  companies,
  backgroundColor = "navy",
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "start", loop: true },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!companies || companies.length === 0) return null;

  const getBgClass = () => {
    switch (backgroundColor) {
      case "white":
        return "bg-white";
      case "lightGray":
        return "bg-gray-50";
      case "navy":
      default:
        return "bg-[#153a5b]";
    }
  };

  const isDarkBg = backgroundColor === "navy";

  return (
    <section className={cn("py-16 md:py-24", getBgClass())}>
      <div className="container px-4 mx-auto max-w-6xl">
        {/* Title Section */}
        {title && (
          <div className="flex flex-col items-center mb-16">
            <h2 
              className={cn(
                "text-[32px] md:text-[40px] mb-6 font-normal tracking-wide text-center",
                isDarkBg ? "text-white" : "text-gray-900"
              )} 
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              {title}
            </h2>
            <div className="flex items-center justify-center w-full max-w-[300px]">
              <div className={cn("h-[1px] flex-1", isDarkBg ? "bg-gray-400/50" : "bg-gray-400")} />
              <div className={cn("w-2 h-2 rounded-full mx-4", isDarkBg ? "bg-white" : "bg-gray-900")} />
              <div className={cn("h-[1px] flex-1", isDarkBg ? "bg-gray-400/50" : "bg-gray-400")} />
            </div>
          </div>
        )}

        {/* Carousel Section */}
        <div className="px-4 md:px-12 relative group">
          <div className="overflow-hidden w-full" ref={emblaRef}>
            <div className="flex -ml-4 md:-ml-6">
              {companies.map((company, index) => {
                const logoUrl =
                  typeof company.logo === "object" && company.logo !== null
                    ? (company.logo as Media).url
                    : null;
                const logoAlt =
                  typeof company.logo === "object" && company.logo !== null
                    ? (company.logo as Media).alt || company.name
                    : company.name;

                return (
                  <div key={index} className="flex-none min-w-0 pl-4 md:pl-6 w-full md:w-1/2 lg:w-1/3">
                    <div className="p-1 h-full">
                      <div className="bg-white rounded-xl shadow-lg p-8 h-full flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        {/* Logo */}
                        <div className="relative w-full h-[80px] mb-8 flex items-center justify-center">
                          {logoUrl ? (
                            <Image
                              src={logoUrl}
                              alt={logoAlt}
                              fill
                              className="object-contain"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                          ) : (
                            <div className="text-gray-400 text-sm">No logo provided</div>
                          )}
                        </div>

                        {/* Company Name */}
                        <h3 className="text-[18px] md:text-[20px] font-medium text-[#2e91db] mb-4 min-h-[56px] flex items-center justify-center" style={{ fontFamily: "Arial, sans-serif" }}>
                          {company.name}
                        </h3>

                        {/* Description */}
                        <p className="text-[14px] text-gray-500 leading-relaxed mb-8 flex-grow" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                          {company.description}
                        </p>

                        {/* Read More Button */}
                        <div className="mt-auto">
                          {company.linkUrl ? (
                            <Link
                              href={company.linkUrl}
                              className="inline-flex items-center justify-center bg-[#2e91db] hover:bg-[#247ab8] text-white px-6 py-2.5 rounded text-[14px] font-medium transition-colors"
                            >
                              {company.linkLabel || "Read More"}
                            </Link>
                          ) : (
                            <button
                              type="button"
                              className="inline-flex items-center justify-center bg-[#2e91db] hover:bg-[#247ab8] text-white px-6 py-2.5 rounded text-[14px] font-medium transition-colors cursor-pointer"
                            >
                              {company.linkLabel || "Read More"}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
            
          {/* Navigation arrows for desktop */}
          <div className="hidden md:block">
            <button
              type="button"
              onClick={scrollPrev}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full -left-4 md:-left-8 border-none transition-colors",
                isDarkBg ? "bg-white/10 text-white hover:bg-white/20" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              )}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full -right-4 md:-right-8 border-none transition-colors",
                isDarkBg ? "bg-white/10 text-white hover:bg-white/20" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              )}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
