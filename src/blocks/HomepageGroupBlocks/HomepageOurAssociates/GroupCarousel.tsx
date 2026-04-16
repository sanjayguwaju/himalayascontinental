"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type {
  Media,
  HomepageOurAssociatesBlock as HomepageOurAssociatesBlockType,
} from "@/payload-types";
import { cn } from "@/utilities/ui";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export const GroupCarousel = ({
  group,
}: {
  group: NonNullable<HomepageOurAssociatesBlockType["groups"]>[0];
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const plugin = React.useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="flex flex-col w-full h-full">
      <h3
        className="text-[#88b1cc] text-[15px] font-semibold tracking-wider text-center mb-6 uppercase"
        style={{ fontFamily: "var(--font-roboto), sans-serif" }}
      >
        {group.groupTitle}
      </h3>

      <div className="border border-[#345c81] rounded-2xl p-6 h-full flex flex-col relative overflow-hidden">
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          className="w-full grow mb-6"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {group.associates?.map((associate, idx) => {
              const imageUrl =
                typeof associate.logo === "object" && associate.logo !== null
                  ? (associate.logo as Media).url
                  : null;
              const imageAlt =
                typeof associate.logo === "object" && associate.logo !== null
                  ? (associate.logo as Media).alt || "Associate Logo"
                  : "Associate Logo";

              const LogoCard = (
                <div className="bg-white rounded-lg w-full h-[70px] md:h-[80px] flex items-center justify-center p-3 shadow-sm hover:shadow-md transition-shadow">
                  {imageUrl ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={imageUrl}
                        alt={imageAlt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 33vw, 20vw"
                      />
                    </div>
                  ) : (
                    <div className="text-gray-400 text-xs text-center">No logo</div>
                  )}
                </div>
              );

              return (
                <CarouselItem key={idx} className="pl-4 basis-1/3 md:basis-1/4">
                  {associate.linkUrl ? (
                    <Link
                      href={associate.linkUrl}
                      className="block hover:opacity-90 transition-opacity"
                    >
                      {LogoCard}
                    </Link>
                  ) : (
                    LogoCard
                  )}
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>

        {/* Pagination Dots */}
        {count > 0 && (
          <div className="flex justify-center gap-3 mt-auto">
            {Array.from({ length: count }).map((_, i) => (
               <button
                key={i}
                className={cn(
                  "w-[6px] h-[6px] rounded-full transition-colors p-0 m-0",
                  i === current ? "bg-white" : "bg-white/30 hover:bg-white/50"
                )}
                onClick={() => api?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
