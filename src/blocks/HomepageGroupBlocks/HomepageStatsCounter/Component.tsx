"use client";

import React from "react";
import { type HomepageStatsCounterBlock as HomepageStatsCounterBlockType } from "@/payload-types";
import { cn } from "@/utilities/ui";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export const HomepageStatsCounterBlock: React.FC<HomepageStatsCounterBlockType> = ({
  stats,
  backgroundColor = "lightGray",
}) => {
  if (!stats || stats.length === 0) return null;

  const getBgClass = () => {
    switch (backgroundColor) {
      case "white":
        return "bg-white";
      case "navy":
        return "bg-[#153a5b]";
      case "lightGray":
      default:
        return "bg-[#e5e5e5]"; // Matches the specific grey tone in the screenshot
    }
  };

  const isDarkBg = backgroundColor === "navy";

  return (
    <section className={cn("py-12 md:py-16 w-full", getBgClass())}>
      <div className="container px-4 mx-auto max-w-[1200px]">
        {/* We use a Carousel setup so it glides seamlessly on mobile as requested */}
        <Carousel
          opts={{
            align: "start",
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-3 md:-ml-4 flex items-stretch">
            {stats.map((stat, index) => (
              <CarouselItem
                key={index}
                className="pl-3 md:pl-4 basis-4/5 sm:basis-1/2 md:basis-1/4 h-auto"
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
                    style={{ fontFamily: "'Oswald', Impact, sans-serif" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className={cn(
                      "text-[13px] md:text-[14px] font-medium px-2 leading-tight",
                      isDarkBg ? "text-blue-100" : "text-[#333333]"
                    )}
                    style={{ fontFamily: "Arial, sans-serif" }}
                  >
                    {stat.label}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};
