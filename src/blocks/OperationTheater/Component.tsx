"use client";

import React from "react";
import type { Media, OperationTheaterBlock as OperationTheaterBlockProps } from "@/payload-types";
import { cn } from "@/utilities/ui";
import { Media as MediaComponent } from "@/components/Media";
import RichText from "@/components/RichText";
import { Link } from "@/i18n/routing";
import {
  Sun,
  Monitor,
  Bed,
  Wind,
  Activity,
  Droplets,
  Stethoscope,
  Hand,
  ArrowRight,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  surgicalLight: <Sun className="h-6 w-6" />,
  monitor: <Monitor className="h-6 w-6" />,
  bed: <Bed className="h-6 w-6" />,
  anesthesia: <Wind className="h-6 w-6" />,
  pendant: <Activity className="h-6 w-6" />,
  ventilator: <Activity className="h-6 w-6" />,
  ivStand: <Droplets className="h-6 w-6" />,
  scrub: <Hand className="h-6 w-6" />,
};

export const OperationTheaterBlock: React.FC<OperationTheaterBlockProps> = ({
  sectionTitle,
  subtitle,
  image,
  description,
  equipmentCategories,
  backgroundColor = "light",
  ctaText,
  ctaLink,
}) => {
  const bgColorMap: Record<string, string> = {
    primary: "bg-[#0870b8]",
    white: "bg-white",
    light: "bg-gray-50",
  };

  const safeBgColor = backgroundColor ?? "light";
  const textColorClass = safeBgColor === "primary" ? "text-white" : "text-gray-900";
  const subtitleColorClass = safeBgColor === "primary" ? "text-blue-100" : "text-gray-600";

  return (
    <section className={cn("py-16 md:py-24", bgColorMap[safeBgColor])}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          {sectionTitle && (
            <h2 className={cn("text-3xl md:text-4xl font-bold mb-4", textColorClass)}>
              {sectionTitle}
            </h2>
          )}
          {subtitle && (
            <p className={cn("text-lg md:text-xl max-w-3xl mx-auto", subtitleColorClass)}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative">
            {image && (
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <MediaComponent
                  resource={image as Media}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            )}
            {/* Decorative overlay */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#0870b8] rounded-lg -z-10 opacity-20" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#0870b8] rounded-lg -z-10 opacity-10" />
          </div>

          {/* Content Section */}
          <div>
            {/* Description */}
            {description && (
              <div className={cn("mb-8", textColorClass)}>
                <RichText
                  data={description}
                  className="prose prose-lg max-w-none prose-headings:text-current prose-p:text-current"
                  enableGutter={false}
                />
              </div>
            )}

            {/* Equipment Categories Grid */}
            {equipmentCategories && equipmentCategories.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {equipmentCategories.map(
                  (
                    item: { icon: string; title: string; description?: string | null },
                    index: number
                  ) => (
                    <div
                      key={index}
                      className={cn(
                        "flex items-start gap-3 p-4 rounded-lg transition-all duration-300",
                        safeBgColor === "primary"
                          ? "bg-white/10 hover:bg-white/20"
                          : "bg-white hover:shadow-md"
                      )}
                    >
                      <div
                        className={cn(
                          "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center",
                          safeBgColor === "primary"
                            ? "bg-white/20 text-white"
                            : "bg-[#0870b8]/10 text-[#0870b8]"
                        )}
                      >
                        {iconMap[item.icon] || <Stethoscope className="h-6 w-6" />}
                      </div>
                      <div>
                        <h4 className={cn("font-semibold text-sm", textColorClass)}>
                          {item.title}
                        </h4>
                        {item.description && (
                          <p className={cn("text-xs mt-1", subtitleColorClass)}>
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

            {/* CTA Button */}
            {ctaText && ctaLink && (
              <div className="mt-8">
                <Link
                  href={ctaLink}
                  className={cn(
                    "inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300",
                    safeBgColor === "primary"
                      ? "bg-white text-[#0870b8] hover:bg-blue-50"
                      : "bg-[#0870b8] text-white hover:bg-[#065a94]"
                  )}
                >
                  {ctaText}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
