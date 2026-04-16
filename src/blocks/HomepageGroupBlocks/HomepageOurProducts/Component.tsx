import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Media, Product } from "@/payload-types";
import { cn } from "@/utilities/ui";

type HomepageOurProductsBlockProps = {
  title?: string | null;
  subtitle?: string | null;
  relatedProducts?: (string | Product)[] | null;
  columns?: "3" | "4" | "5" | null;
  backgroundColor?: "white" | "lightGray" | "lightBlue" | null;
  showViewAllButton?: boolean | null;
  viewAllButton?: {
    label?: string | null;
    link?: string | null;
  } | null;
  blockType?: "homepageOurProducts";
};

export const HomepageOurProductsBlock: React.FC<HomepageOurProductsBlockProps> = ({
  title,
  subtitle,
  relatedProducts,
  columns = "5",
  backgroundColor = "white",
  showViewAllButton,
  viewAllButton,
}) => {
  const bgClasses = {
    white: "bg-white",
    lightGray: "bg-[#f6f8fa]",
    lightBlue: "bg-[#eaf3fb]",
  };

  const gridClasses = {
    "3": "grid-cols-2 sm:grid-cols-3",
    "4": "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
    "5": "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
  };

  const normalizedProducts = (relatedProducts || [])
      .map((product) => {
        if (typeof product === "string") return null;
        
        const p = product as Product;
        return {
          id: p.id,
          title: (p as any).title || (p as any).name || "Unnamed Product",
          link: `/products/${p.slug}`,
          image: p.thumbnail || (p as any).featuredImage || null,
        };
      })
      .filter(Boolean) as {
      id: string;
      title: string;
      link: string;
      image: string | Media | null;
    }[];

  if (!normalizedProducts || normalizedProducts.length === 0) return null;

  return (
    <section
      className={cn("py-16 px-4 md:px-8", bgClasses[backgroundColor as keyof typeof bgClasses])}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="text-center mb-10">
            {title && (
              <h2
                className="text-[28px] md:text-[32px] font-bold tracking-widest uppercase"
                style={{
                  fontFamily: "'Figtree', 'Open Sans', sans-serif",
                  color: "#1a1a2e",
                  letterSpacing: "0.15em",
                }}
              >
                {title}
              </h2>
            )}

            {/* Decorative divider matching the screenshot */}
            <div className="flex items-center justify-center mt-4 mb-3 gap-0">
              <div className="h-[2px] w-[140px]" style={{ backgroundColor: "#1a1a2e" }} />
              <div
                className="w-[8px] h-[8px] rounded-full mx-2"
                style={{ backgroundColor: "#c0392b" }}
              />
              <div className="h-[2px] w-[140px]" style={{ backgroundColor: "#1a1a2e" }} />
            </div>

            {subtitle && (
              <p
                className="text-[15px] mt-3 max-w-[600px] mx-auto"
                style={{
                  fontFamily: "'Figtree', 'Noto Sans', sans-serif",
                  color: "#555555",
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Product Grid */}
        <div
          className={cn("grid gap-x-6 gap-y-10", gridClasses[columns as keyof typeof gridClasses])}
        >
          {normalizedProducts.map((product, index) => {
            const imageUrl =
              typeof product.image === "object" && product.image !== null
                ? (product.image as Media).url
                : typeof product.image === "string"
                  ? product.image
                  : null;

            const CardContent = () => (
              <div
                className="group cursor-pointer flex flex-col"
                aria-label={`View ${product.title}`}
              >
                {/* Image Container */}
                <div
                  className="relative overflow-hidden mb-4 transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.07)] group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.14)] group-hover:-translate-y-1"
                  style={{
                    borderRadius: "4px",
                    aspectRatio: "1 / 1",
                    backgroundColor: "#f0f4f8",
                  }}
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={product.title}
                      fill
                      className="object-contain p-4 transition-transform duration-400 group-hover:scale-[1.05]"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#c0cdd8"
                        strokeWidth="1.5"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{
                      backgroundColor: "rgba(8, 145, 178, 0.08)",
                    }}
                  />
                </div>

                {/* Product Label - matching screenshot style: red dash + product name */}
                <div className="flex items-start gap-2 mt-1">
                  <span
                    className="flex-shrink-0 mt-[7px]"
                    style={{
                      display: "inline-block",
                      width: "24px",
                      height: "2px",
                      backgroundColor: "#c0392b",
                      borderRadius: "2px",
                      transition: "width 0.3s ease",
                    }}
                  />
                  <span
                    className="text-[13px] leading-snug font-medium transition-colors duration-200 group-hover:text-[#0F365A]"
                    style={{
                      fontFamily: "'Figtree', 'Noto Sans', sans-serif",
                      color: "#2d3748",
                    }}
                  >
                    {product.title}
                  </span>
                </div>
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

        {/* View All Button */}
        {showViewAllButton && viewAllButton?.label && (
          <div className="text-center mt-12">
            <Link
              href={viewAllButton.link || "/products"}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-sm font-medium text-[14px] tracking-wide transition-all duration-200 hover:shadow-md hover:-translate-y-[1px]"
              style={{
                fontFamily: "'Figtree', 'Noto Sans', sans-serif",
                backgroundColor: "#0F365A",
                color: "#ffffff",
                letterSpacing: "0.04em",
              }}
            >
              {viewAllButton.label}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
