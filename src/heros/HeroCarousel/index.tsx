"use client";

import React, { useCallback, useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import type { Page, Media as MediaType } from "@/payload-types";
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

type HeroCarouselProps = NonNullable<Page["hero"]>;

export const HeroCarousel: React.FC<HeroCarouselProps> = (props) => {
  const slides = (props as Record<string, unknown>).slides as {
    image: string | MediaType;
    title?: string | null;
    description?: string | null;
    id?: string | null;
  }[];

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
  }, [api, onSelect]);

  if (!slides || slides.length === 0) return null;

  return (
    <section className="relative w-full">
      <div className="grid grid-cols-1 items-stretch">
        {/* Main Hero Slider - Full Width, No Rounded Corners */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full relative group overflow-hidden"
        >
          <Carousel
            setApi={setApi}
            opts={{
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: false,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="ml-0">
              {slides.map((slide, index: number) => (
                <CarouselItem key={index} className="pl-0 relative">
                  <div
                    className={cn(
                      "relative w-full overflow-hidden",
                      "aspect-auto md:aspect-video lg:aspect-[21/9] min-h-[300px] md:min-h-[500px] lg:min-h-[600px]"
                    )}
                  >
                    {slide.image && typeof slide.image === "object" && (
                      <div
                        className={cn(
                          "absolute inset-0 transition-transform duration-6000 ease-out",
                          selectedIndex === index ? "scale-105" : "scale-100"
                        )}
                      >
                        <Media
                          fill
                          imgClassName="object-contain md:object-cover"
                          priority={index === 0}
                          resource={slide.image}
                        />
                      </div>
                    )}

                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-10" />

                    {/* Text content - positioned at bottom left */}
                    {(slide.title || slide.description) && (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                        className="absolute inset-x-0 bottom-0 z-20 p-6 md:p-10 lg:p-16"
                      >
                        <div className="max-w-4xl">
                          {slide.title && (
                            <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-bold leading-tight drop-shadow-lg mb-3">
                              {slide.title}
                            </h2>
                          )}
                          {slide.description && (
                            <p className="text-white/90 text-sm md:text-base lg:text-lg leading-relaxed drop-shadow-md max-w-2xl">
                              {slide.description}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Arrows - Always visible */}
            <div className="hidden md:block">
              <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-white/90 hover:bg-white text-foreground border-none shadow-lg transition-all duration-200" />
              <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-white/90 hover:bg-white text-foreground border-none shadow-lg transition-all duration-200" />
            </div>

            {/* Slide Indicators - Bottom Center */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => api?.scrollTo(i)}
                  className={cn(
                    "h-1.5 transition-all duration-300 rounded-full",
                    selectedIndex === i ? "bg-white w-8" : "bg-white/50 w-3 hover:bg-white/80"
                  )}
                />
              ))}
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};
