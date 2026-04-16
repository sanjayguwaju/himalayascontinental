import React from "react";
import type {
  HomepageOurAssociatesBlock as HomepageOurAssociatesBlockType,
} from "@/payload-types";
import { cn } from "@/utilities/ui";
import { GroupCarousel } from "./GroupCarousel";

export const HomepageOurAssociatesBlock: React.FC<HomepageOurAssociatesBlockType> = ({
  title,
  groups,
  backgroundColor = "navy",
}) => {
  if (!groups || groups.length === 0) return null;

  const getBgClass = () => {
    switch (backgroundColor) {
      case "white":
        return "bg-white";
      case "lightGray":
        return "bg-gray-50";
      case "navy":
      default:
        return "bg-[#153a5b]";
    }
  };

  const isDarkBg = backgroundColor === "navy";

  return (
    <section className={cn("py-16 md:py-24", getBgClass())}>
      <div className="container px-4 mx-auto max-w-[1400px]">
        {/* Title Section */}
        {title && (
          <div className="flex flex-col items-center mb-16">
            <h2
              className={cn(
                "text-[32px] md:text-[40px] mb-6 font-normal tracking-wide text-center",
                isDarkBg ? "text-white" : "text-gray-900"
              )}
              style={{ fontFamily: "var(--font-roboto), sans-serif" }}
            >
              {title}
            </h2>
            <div className="flex items-center justify-center w-full max-w-[300px]">
              <div className={cn("h-px flex-1", isDarkBg ? "bg-white/40" : "bg-gray-400")} />
              <div
                className={cn("w-2 h-2 rounded-full mx-4", isDarkBg ? "bg-white" : "bg-gray-900")}
              />
              <div className={cn("h-px flex-1", isDarkBg ? "bg-white/40" : "bg-gray-400")} />
            </div>
          </div>
        )}

        {/* Groups Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {groups.map((group, index) => (
            <GroupCarousel key={index} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
};
