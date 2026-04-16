import React from "react";
import { type HomepageStatsCounterBlock as HomepageStatsCounterBlockType } from "@/payload-types";
import { cn } from "@/utilities/ui";
import { CarouselWrapper } from "./CarouselWrapper";

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
        return "bg-[#e5e5e5]";
    }
  };

  const isDarkBg = backgroundColor === "navy";

  return (
    <section className={cn("py-10 md:py-16 w-full", getBgClass())}>
      <div className="container px-4 mx-auto max-w-[1200px]">
        <CarouselWrapper stats={stats} isDarkBg={isDarkBg} />
      </div>
    </section>
  );
};
