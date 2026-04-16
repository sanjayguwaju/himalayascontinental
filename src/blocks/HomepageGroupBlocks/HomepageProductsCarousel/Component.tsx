"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  type Media,
  type HomepageProductsCarouselBlock as HomepageProductsCarouselBlockType,
} from "@/payload-types";
import { cn } from "@/utilities/ui";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const HomepageProductsCarouselBlock: React.FC<HomepageProductsCarouselBlockType> = ({
  title,
  categoryText,
  products,
  viewAllLabel = "View All",
  viewAllLink = "/products",
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true }, [
    Autoplay({ delay: 3500, stopOnInteraction: true }),
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!products || products.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container px-4 mx-auto max-w-7xl">
        {/* Main Title Section */}
        {title && (
          <div className="flex flex-col items-center mb-10">
            <h2
              className="text-[32px] md:text-[40px] text-gray-900 mb-6 font-normal tracking-wide text-center"
              style={{ fontFamily: "var(--font-roboto), sans-serif" }}
            >
              {title}
            </h2>
            <div className="flex items-center justify-center w-full max-w-[300px]">
              <div className="h-px bg-gray-400 flex-1" />
              <div className="w-2 h-2 bg-gray-900 rounded-full mx-4" />
              <div className="h-px bg-gray-400 flex-1" />
            </div>
          </div>
        )}

        {/* Category Divider line */}
        {categoryText && (
          <div className="flex items-center justify-center w-full mb-8">
            <div className="h-px bg-gray-300 flex-1" />
            <h3 className="px-6 text-sm font-semibold tracking-widest text-gray-600 uppercase whitespace-nowrap">
              {categoryText}
            </h3>
            <div className="h-px bg-gray-300 flex-1" />
          </div>
        )}

        {/* Navy Blue Carousel Container */}
        <div className="w-full relative bg-[#153a5b] rounded-lg px-12 md:px-16 py-8 shadow-md">
          <div className="overflow-hidden w-full relative" ref={emblaRef}>
            <div className="flex -ml-4 md:-ml-6">
              {products.map((product, index) => {
                const imageUrl =
                  typeof product.image === "object" && product.image !== null
                    ? (product.image as Media).url
                    : null;
                const imageAlt =
                  typeof product.image === "object" && product.image !== null
                    ? (product.image as Media).alt || "Product"
                    : "Product";

                const ProductCard = (
                  <div className="bg-white rounded-2xl w-full aspect-square flex items-center justify-center p-4 transition-transform hover:scale-105 duration-300 shadow-sm">
                    {imageUrl && (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                          src={imageUrl}
                          alt={imageAlt}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </div>
                    )}
                  </div>
                );

                return (
                  <div
                    key={index}
                    className="flex-none min-w-0 pl-4 md:pl-6 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                  >
                    <div className="p-1 h-full">
                      {product.linkUrl ? (
                        <Link href={product.linkUrl} className="block w-full h-full">
                          {ProductCard}
                        </Link>
                      ) : (
                        ProductCard
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* White Arrows overlapping the navy box */}
          <button
            type="button"
            onClick={scrollPrev}
            className="absolute top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full -left-5 md:-left-5 border-none bg-transparent hover:bg-white/10 text-white transition-colors [&_svg]:w-6 [&_svg]:h-6"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="absolute top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full -right-5 md:-right-5 border-none bg-transparent hover:bg-white/10 text-white transition-colors [&_svg]:w-6 [&_svg]:h-6"
          >
            <ChevronRight />
          </button>
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-10">
          {viewAllLink ? (
            <Link
              href={viewAllLink}
              className="px-8 py-3 bg-[#153a5b] text-white text-sm font-medium hover:bg-[#0f2942] transition-colors rounded shadow-sm"
            >
              {viewAllLabel}
            </Link>
          ) : (
            <button className="px-8 py-3 bg-[#153a5b] text-white text-sm font-medium hover:bg-[#0f2942] transition-colors rounded shadow-sm">
              {viewAllLabel}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
