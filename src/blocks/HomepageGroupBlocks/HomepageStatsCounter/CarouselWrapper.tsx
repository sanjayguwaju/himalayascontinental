"use client";

import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@/utilities/ui";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { HomepageStatsCounterBlock as HomepageStatsCounterBlockType } from "@/payload-types";

type Props = {
  stats: NonNullable<HomepageStatsCounterBlockType["stats"]>;
  isDarkBg: boolean;
};

export const CarouselWrapper: React.FC<Props> = ({ stats, isDarkBg }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  const shouldShowDots = stats.length > 1;

  return (
    <>
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
          dragFree: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: true,
            stopOnMouseEnter: true,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="-ml-3 md:-ml-4 flex items-stretch">
          {stats.map((stat, index) => (
            <CarouselItem
              key={index}
              className="pl-3 md:pl-4 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 h-auto"
            >
              <div
                className={cn(
                  "flex flex-col items-center justify-center text-center p-6 md:py-8 h-full rounded shadow-sm",
                  isDarkBg ? "bg-[#1f4b73]" : "bg-[#f4f4f4]"
                )}
              >
                <div
                  className={cn(
                    "text-[40px] md:text-[46px] font-bold leading-none mb-3",
                    isDarkBg ? "text-white" : "text-[#10375c]"
                  )}
                  style={{ fontFamily: "var(--font-roboto-condensed), sans-serif" }}
                >
                  {stat.value}
                </div>
                <div
                  className={cn(
                    "text-[13px] md:text-[14px] font-medium px-2 leading-tight",
                    isDarkBg ? "text-blue-100" : "text-[#333333]"
                  )}
                  style={{ fontFamily: "var(--font-roboto), sans-serif" }}
                >
                  {stat.label}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Pagination Dots */}
      {shouldShowDots && (
        <div className="flex justify-center gap-2 mt-6 md:hidden">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-300",
                current === index
                  ? "w-6 bg-[#153a5b]"
                  : isDarkBg
                    ? "bg-white/40"
                    : "bg-[#153a5b]/30"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </>
  );
};
