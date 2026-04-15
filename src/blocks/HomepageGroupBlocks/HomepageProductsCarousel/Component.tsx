"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { type Media, type HomepageProductsCarouselBlock } from "@/payload-types";
import { cn } from "@/utilities/ui";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export const HomepageProductsCarouselBlock: React.FC<HomepageProductsCarouselBlock> = ({
  title,
  categoryText,
  products,
  viewAllLabel = "View All",
  viewAllLink = "/products",
}) => {
  if (!products || products.length === 0) return null;

  const plugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: true })
  );

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container px-4 mx-auto max-w-7xl">
        {/* Main Title Section */}
        {title && (
          <div className="flex flex-col items-center mb-10">
            <h2 className="text-[32px] md:text-[40px] text-gray-900 mb-6 font-normal tracking-wide text-center" style={{ fontFamily: "Arial, sans-serif" }}>
              {title}
            </h2>
            <div className="flex items-center justify-center w-full max-w-[300px]">
              <div className="h-[1px] bg-gray-400 flex-1" />
              <div className="w-2 h-2 bg-gray-900 rounded-full mx-4" />
              <div className="h-[1px] bg-gray-400 flex-1" />
            </div>
          </div>
        )}

        {/* Category Divider line */}
        {categoryText && (
          <div className="flex items-center justify-center w-full mb-8">
            <div className="h-[1px] bg-gray-300 flex-1" />
            <h3 className="px-6 text-sm font-semibold tracking-widest text-gray-600 uppercase whitespace-nowrap">
              {categoryText}
            </h3>
            <div className="h-[1px] bg-gray-300 flex-1" />
          </div>
        )}

        {/* Navy Blue Carousel Container */}
        <div className="w-full relative bg-[#153a5b] rounded-lg px-12 md:px-16 py-8 shadow-md">
          <Carousel
            plugins={[plugin.current]}
            className="w-full relative"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-4 md:-ml-6">
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
                  <CarouselItem key={index} className="pl-4 md:pl-6 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                    <div className="p-1 h-full">
                      {product.linkUrl ? (
                        <Link href={product.linkUrl} className="block w-full h-full">
                          {ProductCard}
                        </Link>
                      ) : (
                        ProductCard
                      )}
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            
            {/* White Arrows overlapping the navy box */}
            <CarouselPrevious className="w-10 h-10 -left-10 md:-left-12 border-none bg-transparent hover:bg-white/10 text-white [&_svg]:!w-6 [&_svg]:!h-6" />
            <CarouselNext className="w-10 h-10 -right-10 md:-right-12 border-none bg-transparent hover:bg-white/10 text-white [&_svg]:!w-6 [&_svg]:!h-6" />
          </Carousel>
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
