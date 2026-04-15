import React from "react";
import type { CarouselBlock as CarouselBlockProps } from "@/payload-types";
import { HeroCarousel } from "@/heros/HeroCarousel";

export const HeroCarouselBlock: React.FC<CarouselBlockProps> = (props) => {
  return <HeroCarousel {...(props as unknown as React.ComponentProps<typeof HeroCarousel>)} type="heroCarousel" />;
};
