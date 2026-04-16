"use client";

import React, { useState, useRef, useEffect } from "react";
import type { ProductCarouselBlock as ProductCarouselBlockProps, Media } from "@/payload-types";
import { cn } from "@/utilities/ui";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const ProductCarouselBlock: React.FC<ProductCarouselBlockProps> = ({
  sectionTitle,
  subtitle,
  products,
  backgroundColor = "white",
  showViewAllButton,
  viewAllLink,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const bgClasses = {
    white: "bg-white",
    light: "bg-[#f5f7fa]",
    section: "bg-[#eef2f7]",
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const newPosition = direction === "left" 
        ? scrollPosition - scrollAmount 
        : scrollPosition + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      
      setScrollPosition(newPosition);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        setScrollPosition(scrollContainerRef.current.scrollLeft);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  if (!products || products.length === 0) return null;

  return (
    <section className={cn("py-16 px-4 md:px-8", bgClasses[backgroundColor as keyof typeof bgClasses])}>
      <div className="max-w-[1200px] mx-auto">
        {(sectionTitle || subtitle) && (
          <div className="text-center mb-10">
            {sectionTitle && (
              <h2 
                className="text-[28px] md:text-[32px] font-bold mb-2"
                style={{ fontFamily: "var(--font-roboto-condensed), sans-serif", color: "#003087" }}
              >
                {sectionTitle}
              </h2>
            )}
            {subtitle && (
              <p 
                className="text-[16px]"
                style={{ fontFamily: "var(--font-roboto), sans-serif", color: "#555555" }}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white/90 rounded-full shadow-md hover:bg-white transition-all"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" style={{ color: "#003087" }} />
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white/90 rounded-full shadow-md hover:bg-white transition-all"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" style={{ color: "#003087" }} />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-12 py-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((product: { image: string | Media; name: string; link?: string | null | undefined; id?: string | null | undefined; }, index: number) => {
              const imageUrl = typeof product.image === "object" && product.image !== null
                ? (product.image as Media).url
                : null;

              return (
                <div 
                  key={product.id || index} 
                  className="flex-shrink-0 w-[150px] text-center group cursor-pointer"
                >
                  {product.link ? (
                    <Link href={product.link} className="block">
                      <div 
                        className="w-[150px] h-[150px] rounded overflow-hidden mb-3 transition-transform duration-300 group-hover:scale-105"
                        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
                      >
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={product.name}
                            width={150}
                            height={150}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-[#eef2f7] flex items-center justify-center">
                            <span className="text-[#003087] text-xs">No Image</span>
                          </div>
                        )}
                      </div>
                      <h4 
                        className="text-[13px] font-semibold transition-colors duration-300 group-hover:text-[#e8a020]"
                        style={{ fontFamily: "var(--font-roboto), sans-serif", color: "#1a1a2e" }}
                      >
                        {product.name}
                      </h4>
                    </Link>
                  ) : (
                    <>
                      <div 
                        className="w-[150px] h-[150px] rounded overflow-hidden mb-3"
                        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
                      >
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={product.name}
                            width={150}
                            height={150}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-[#eef2f7] flex items-center justify-center">
                            <span className="text-[#003087] text-xs">No Image</span>
                          </div>
                        )}
                      </div>
                      <h4 
                        className="text-[13px] font-semibold"
                        style={{ fontFamily: "var(--font-roboto), sans-serif", color: "#1a1a2e" }}
                      >
                        {product.name}
                      </h4>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {showViewAllButton && viewAllLink && (
          <div className="text-center mt-8">
            <Link
              href={viewAllLink}
              className="inline-block px-7 py-2.5 text-[14px] font-semibold border-2 rounded transition-all duration-300 hover:text-white"
              style={{ 
                fontFamily: "var(--font-roboto), sans-serif",
                borderColor: "#003087",
                color: "#003087",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#003087";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#003087";
              }}
            >
              View All
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
