"use client";

import React from "react";
import type { Media, CompanyBlock as CompanyBlockProps } from "@/payload-types";
import RichText from "@/components/RichText";
import { cn } from "@/utilities/ui";
import { Media as MediaComponent } from "@/components/Media";

export const CompanyBlock: React.FC<CompanyBlockProps> = ({
  title,
  image,
  content,
  backgroundColor,
}) => {
  const bgColorClass =
    backgroundColor === "white"
      ? "bg-white"
      : backgroundColor === "gray"
        ? "bg-gray-100"
        : "bg-primary";

  const textColorClass = backgroundColor === "primary" ? "text-white" : "text-foreground";

  return (
    <section className={cn("py-12 md:py-16", bgColorClass)}>
      <div className="container mx-auto px-4">
        {/* Section Title */}
        {title && (
          <h2 className={cn("text-2xl md:text-3xl font-bold mb-4", textColorClass)}>
            {title}
          </h2>
        )}

        {/* White Card Container */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Image - Centered */}
          {image && (
            <div className="w-full flex justify-center items-center bg-gray-50">
              <MediaComponent
                resource={image as Media}
                className="max-w-full h-auto object-contain"
                priority
              />
            </div>
          )}

          {/* Content */}
          {content && (
            <div className="p-6 md:p-8">
              <RichText
                data={content}
                className="prose prose-slate prose-lg max-w-none dark:prose-invert text-foreground"
                enableGutter={false}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
