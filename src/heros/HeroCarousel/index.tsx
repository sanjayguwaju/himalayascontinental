"use client";

import React, { useCallback, useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";
import type { Page, Media as MediaType } from "@/payload-types";
import { Media } from "@/components/Media";
import { cn } from "@/utilities/ui";
import { Phone } from "lucide-react";
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showStaff = (props as any).showStaff as boolean | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const staffs = (props as any).staffs as any[] | undefined;

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

  const hasStaffs = showStaff && staffs && staffs.length > 0;

  return (
    <section className="relative w-full">
      <div
        className={cn(
          "grid grid-cols-1 items-stretch",
          hasStaffs ? "lg:grid-cols-[1fr_400px]" : "grid-cols-1"
        )}
      >
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

        {/* RIGHT SIDE: Staff Cards */}
        {hasStaffs && (
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col gap-6 bg-muted/30 p-6 lg:p-8"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="flex flex-col items-center"
            >
              <h3 className="font-bold text-primary text-sm uppercase tracking-[0.2em] mb-3 text-center">
                Our Specialists
              </h3>
              <div className="h-1 w-12 bg-primary rounded-full"></div>
            </motion.div>

            <div className="flex flex-col gap-5">
              {staffs?.map((staff: any, index: number) => {
                if (!staff || typeof staff === "string") return null;

                return (
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: 40 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                      },
                    }}
                    whileHover={{ scale: 1.02 }}
                    key={staff.id || index}
                    className="flex flex-row items-center gap-4 bg-card rounded-xl p-4 shadow-sm border border-border hover:shadow-md hover:border-primary/30 transition-all duration-300 group/staff"
                  >
                    {/* Avatar - Circular */}
                    <div className="relative shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-border group-hover/staff:border-primary/50 transition-colors duration-300">
                      {staff.profilePhoto && typeof staff.profilePhoto === "object" ? (
                        <Media
                          fill
                          imgClassName="object-cover object-top"
                          resource={staff.profilePhoto as MediaType}
                        />
                      ) : (
                        <div className="h-full w-full bg-neutral-200 flex items-center justify-center text-3xl font-bold text-neutral-400">
                          {staff.fullName?.charAt(0)}
                        </div>
                      )}
                    </div>

                    {/* Content area */}
                    <div className="flex flex-col flex-1 min-w-0">
                      <h3 className="font-bold text-foreground text-[17px] md:text-[19px] mb-1 leading-tight group-hover/staff:text-primary transition-colors duration-300">
                        {staff.fullName}
                      </h3>
                      <span className="text-[13px] md:text-[14px] font-medium text-primary/70 uppercase tracking-wide mb-3 block">
                        {staff.designation}
                      </span>

                      {staff.phone && (
                        <a
                          href={`tel:${staff.phone}`}
                          className="flex items-center gap-2 text-[14px] md:text-[15px] text-primary font-bold tracking-wide hover:opacity-80 transition-opacity"
                        >
                          <div className="flex items-center justify-center w-7 h-7 bg-primary/10 rounded-full">
                            <Phone className="w-3.5 h-3.5 text-primary fill-current" />
                          </div>
                          <span>{staff.phone}</span>
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
