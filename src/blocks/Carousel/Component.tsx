"use client";

import React, { useCallback, useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Media } from "@/components/Media";
import { cn } from "@/utilities/ui";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { CarouselBlock as CarouselBlockProps, Media as MediaType } from "@/payload-types";

// ─── Height / aspect helpers ─────────────────────────────────────────────────

const heightClass: Record<string, string> = {
  sm: "h-[300px]",
  md: "h-[500px]",
  lg: "h-[700px]",
  full: "h-screen",
};

const aspectClass: Record<string, string> = {
  "none": "",
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
};

// ─── Slice type ───────────────────────────────────────────────────────────────

type Slide = CarouselBlockProps["slides"][number];

// ─── Component ───────────────────────────────────────────────────────────────

export const CarouselBlockComponent: React.FC<CarouselBlockProps> = (props) => {
  const {
    slides,
    height = "lg",
    aspectRatio = "none",
    loop = true,
    autoplay = true,
    autoplayDelay = 5000,
    showArrows = true,
    showDots = true,
    showOverlay = true,
  } = props;

  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  if (!slides || slides.length === 0) return null;

  const useAspect = aspectRatio !== "none" && aspectRatio !== null;
  const containerClass = useAspect
    ? cn("relative w-full", aspectClass[aspectRatio ?? "none"])
    : cn("relative w-full", heightClass[height ?? "lg"]);

  const plugins = autoplay
    ? [Autoplay({ delay: autoplayDelay ?? 5000, stopOnInteraction: false })]
    : [];

  const DotIndicators = ({ position }: { position: "inside" | "outside" }) => (
    <div
      className={cn(
        "flex justify-center items-center gap-1",
        position === "outside" && "absolute inset-x-0 bottom-6 z-20"
      )}
    >
      {slides.map((_: Slide, i: number) => (
        <button
          key={i}
          onClick={() => api?.scrollTo(i)}
          className={cn(
            "h-[3px] transition-all duration-300 rounded-full",
            selectedIndex === i ? "bg-white w-12" : "bg-white/30 w-8 hover:bg-white/60"
          )}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>
  );

  return (
    <section className="relative w-full overflow-hidden bg-muted/40">
      <Carousel
        setApi={setApi}
        opts={{ loop: loop ?? true }}
        plugins={plugins}
        className="w-full"
      >
        <CarouselContent className="ml-0">
          {slides.map((slide: Slide, index: number) => {
            const image = slide.image as string | MediaType;
            const ctaEnabled = slide.link?.enabled && slide.link?.label && slide.link?.url;

            return (
              <CarouselItem key={slide.id ?? index} className="pl-0 relative">
                <div className={containerClass}>
                  {/* Background image */}
                  {image && typeof image === "object" && (
                    <Media
                      fill
                      imgClassName="object-cover"
                      priority={index === 0}
                      resource={image}
                    />
                  )}

                  {/* Gradient overlays */}
                  <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-black/20 to-transparent pointer-events-none z-10" />
                  <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black/30 to-transparent pointer-events-none z-10" />

                  {/* Text + dots overlay box */}
                  {showOverlay && (slide.title || slide.subtitle || ctaEnabled) && (
                    <div className="absolute inset-x-0 bottom-12 flex justify-center px-6 z-20">
                      <div className="bg-black/45 backdrop-blur-[2px] px-10 py-5 rounded-sm border border-white/10 text-center max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {slide.title && (
                          <h2 className="text-white text-lg md:text-2xl font-semibold tracking-wide mb-2 drop-shadow-md uppercase">
                            {slide.title}
                          </h2>
                        )}
                        {slide.subtitle && (
                          <p className="text-white/80 text-sm md:text-base mb-3">
                            {slide.subtitle}
                          </p>
                        )}
                        {ctaEnabled && (
                          <a
                            href={slide.link!.url!}
                            className="inline-block mt-1 px-6 py-2 text-sm font-semibold text-white border border-white/60 rounded hover:bg-white hover:text-black transition-colors duration-200"
                          >
                            {slide.link!.label}
                          </a>
                        )}

                        {/* Dots inside overlay */}
                        {showDots && slides.length > 1 && (
                          <div className="mt-3">
                            <DotIndicators position="inside" />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Dots outside overlay (when overlay is hidden) */}
                  {showDots && !showOverlay && slides.length > 1 && (
                    <DotIndicators position="outside" />
                  )}
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Navigation arrows */}
        {showArrows && (
          <div className="hidden md:block">
            <CarouselPrevious className="left-4 h-12 w-12 bg-black/20 hover:bg-black/40 text-white border-none backdrop-blur-sm transition-all" />
            <CarouselNext className="right-4 h-12 w-12 bg-black/20 hover:bg-black/40 text-white border-none backdrop-blur-sm transition-all" />
          </div>
        )}
      </Carousel>
    </section>
  );
};
