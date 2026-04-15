"use client";

import React from "react";
import type { ProductGridBlock as ProductGridBlockProps, Media } from "@/payload-types";
import { cn } from "@/utilities/ui";
import Image from "next/image";
import Link from "next/link";

export const ProductGridBlock: React.FC<ProductGridBlockProps> = ({
  sectionTitle,
  subtitle,
  products,
  columns = "4",
  backgroundColor = "section",
}) => {
  const bgClasses = {
    white: "bg-white",
    light: "bg-[#f5f7fa]",
    section: "bg-[#eef2f7]",
  };

  const gridClasses = {
    "2": "grid-cols-1 sm:grid-cols-2",
    "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    "4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  if (!products || products.length === 0) return null;

  return (
    <section className={cn("py-16 px-4 md:px-8", bgClasses[backgroundColor as keyof typeof bgClasses])}>
      <div className="max-w-[1200px] mx-auto">
        {(sectionTitle || subtitle) && (
          <div className="text-center mb-10">
            {sectionTitle && (
              <h2 
                className="text-[28px] md:text-[32px] font-bold mb-2"
                style={{ fontFamily: "'Playfair Display', serif", color: "#003087" }}
              >
                {sectionTitle}
              </h2>
            )}
            {subtitle && (
              <p 
                className="text-[16px]"
                style={{ fontFamily: "'Open Sans', sans-serif", color: "#555555" }}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className={cn("grid gap-6", gridClasses[columns as keyof typeof gridClasses])}>
          {products.map((product: { image: string | Media; title: string; link?: string | null | undefined; id?: string | null | undefined; }, index: number) => {
            const imageUrl = typeof product.image === "object" && product.image !== null
              ? (product.image as Media).url
              : null;

            const CardContent = () => (
              <div className="group cursor-pointer">
                <div 
                  className="aspect-square rounded overflow-hidden mb-3 transition-all duration-300 group-hover:shadow-lg"
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
                >
                  <div className="w-full h-full overflow-hidden">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={product.title}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#eef2f7] flex items-center justify-center">
                        <span className="text-[#003087] text-sm">No Image</span>
                      </div>
                    )}
                  </div>
                </div>
                <h4 
                  className="text-[14px] font-semibold transition-colors duration-300 group-hover:text-[#e8a020]"
                  style={{ fontFamily: "'Open Sans', sans-serif", color: "#003087" }}
                >
                  {product.title}
                </h4>
              </div>
            );

            return (
              <div key={product.id || index}>
                {product.link ? (
                  <Link href={product.link} className="block">
                    <CardContent />
                  </Link>
                ) : (
                  <CardContent />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
