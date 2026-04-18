import type { Product } from "@/payload-types";
import type { Metadata } from "next/types";

import configPromise from "@payload-config";
import { getPayload } from "payload";
import React from "react";
import { Search } from "@/search/Component";
import PageClient from "./page.client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Search as SearchIcon, FileText, Sparkles, ArrowRight, Hash } from "lucide-react";
import Link from "next/link";
import { Media as MediaComponent } from "@/components/Media";
import { cn } from "@/utilities/ui";

type Args = {
  searchParams: Promise<{
    q: string;
  }>;
};

export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise;
  const payload = await getPayload({ config: configPromise });

  const posts = await payload.find({
    collection: "products",
    depth: 1,
    limit: 12,
    select: {
      name: true,
      slug: true,
      category: true,
      shortDescription: true,
      thumbnail: true,
      updatedAt: true,
    },
    pagination: false,
    ...(query
      ? {
          where: {
            or: [
              { name: { like: query } },
              { shortDescription: { like: query } },
              { brand: { like: query } },
              { slug: { like: query } },
            ],
          },
        }
      : {}),
  });

  const results = posts.docs as unknown as Product[];
  const hasResults = results.length > 0;
  const hasQuery = Boolean(query);

  return (
    <div className="min-h-screen bg-background">
      <PageClient />

      {/* ── Hero Search Section ── */}
      <section className="relative bg-gradient-to-r from-[#0870b8] to-[#0b5f9a] pt-24 pb-20 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_60%)]" />
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/5 rounded-full" />
        <div className="absolute bottom-10 right-20 w-48 h-48 border border-white/10 rounded-full" />

        <div className="container max-w-3xl mx-auto px-4 relative">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/60 text-[13px] mb-8 font-medium tracking-wide">
            <Link href="/" className="hover:text-white transition-colors">
              HOME
            </Link>
            <ArrowRight className="w-3 h-3" />
            <span className="text-white">SEARCH</span>
          </div>

          {/* Title */}
          <div className="mb-10">
            <h1
              className="text-4xl md:text-5xl font-bold text-white tracking-wide mb-4"
              style={{ fontFamily: "'Roboto Condensed', Arial, sans-serif" }}
            >
              What are you looking for?
            </h1>
            <p
              className="text-white/70 text-[16px] md:text-lg"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              Search our complete medical product catalog
            </p>
          </div>

          {/* Search Input */}
          <div className="mb-2">
            <Search />
          </div>

          {/* Query pill */}
          {hasQuery && (
            <div className="mt-8 flex items-center justify-center gap-3 text-white/80">
              <span className="text-sm">Results for</span>
              <Badge
                variant="secondary"
                className="bg-white/20 text-white border border-white/30 hover:bg-white/30 text-sm px-4 py-1.5 rounded-full font-normal"
              >
                <Hash className="w-3.5 h-3.5 mr-1" />
                {query}
              </Badge>
              <span className="text-white/60 text-sm">
                {hasResults
                  ? `${results.length} item${results.length !== 1 ? "s" : ""} found`
                  : "No matches"}
              </span>
            </div>
          )}

          {/* Popular Searches */}
          {!hasQuery && (
            <div className="mt-8 flex flex-wrap justify-center items-center">
              <span className="text-white/50 text-[13px] mr-3 mb-2 md:mb-0 uppercase tracking-wider">
                Popular:
              </span>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  "Ventilator V8800",
                  "Resplus Non-Invasive Ventilator",
                  "Sunfusion Semi I Syringe Pump",
                ].map((term) => (
                  <Link
                    key={term}
                    href={`/search?q=${term}`}
                    className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 px-4 py-1.5 rounded-full transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5 opacity-70" />
                    {term}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Results Section ── */}
      <section className="container max-w-6xl mx-auto px-4 py-16">
        {/* Initial State */}
        {!hasQuery && (
          <Card className="border-dashed border-gray-300 bg-gray-50/50 shadow-none">
            <CardContent className="py-20 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#0870b8]/5 flex items-center justify-center mb-6">
                <SearchIcon className="w-10 h-10 text-[#0870b8]/50" />
              </div>
              <h2
                className="text-2xl font-bold text-gray-800 mb-3"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                Start your catalog search
              </h2>
              <p
                className="text-gray-500 max-w-md mx-auto"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                Enter product names, brands, or categories above to explore our extensive range of
                medical equipment and solutions.
              </p>
            </CardContent>
          </Card>
        )}

        {/* No Results State */}
        {hasQuery && !hasResults && (
          <Card className="border-dashed border-gray-300 bg-gray-50/50 shadow-none">
            <CardContent className="py-20 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-gray-200/50 flex items-center justify-center mb-6">
                <FileText className="w-10 h-10 text-gray-400" />
              </div>
              <h2
                className="text-2xl font-bold text-gray-800 mb-3"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                No results found
              </h2>
              <p
                className="text-gray-500 max-w-md mx-auto mb-8"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                We couldn&apos;t find any products matching &quot;
                <strong className="text-gray-800">{query}</strong>&quot;.
              </p>
              <div className="flex flex-wrap justify-center items-center gap-3">
                <span className="text-[13px] uppercase tracking-wider text-gray-400 font-medium">
                  Try searching for:
                </span>
                {[
                  "Ventilator V8800",
                  "Resplus Non-Invasive Ventilator",
                  "Sunfusion Semi I Syringe Pump",
                ].map((suggestion) => (
                  <Link
                    key={suggestion}
                    href={`/search?q=${suggestion}`}
                    className="text-[14px] text-[#0891B2] hover:text-[#0870b8] font-medium transition-colors hover:underline"
                  >
                    {suggestion}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Grid */}
        {hasQuery && hasResults && (
          <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <h2
                  className="text-2xl font-bold text-gray-800"
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  Search Results
                </h2>
                <Badge
                  variant="secondary"
                  className="text-[13px] bg-[#0870b8]/10 text-[#0870b8] border-none px-3 py-1 font-semibold rounded-full"
                >
                  {results.length} {results.length === 1 ? "Product" : "Products"}
                </Badge>
              </div>
              <Separator className="flex-1 ml-6 bg-gray-200" />
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((product, index) => {
                const { slug, category, shortDescription, name, thumbnail } = product;
                const href = `/products/${slug}`;
                const hasCategories = Boolean(category);
                const isLarge = index === 0 && results.length > 2;

                return (
                  <Link
                    key={index}
                    href={href}
                    className={cn(
                      "group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden",
                      "hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
                      isLarge && "md:col-span-2 lg:col-span-1 lg:row-span-2"
                    )}
                  >
                    {/* Image */}
                    <div
                      className={cn(
                        "relative w-full bg-white overflow-hidden flex items-center justify-center p-6 border-b border-gray-100",
                        isLarge ? "aspect-[16/10]" : "aspect-[16/9]"
                      )}
                    >
                      {thumbnail && typeof thumbnail !== "string" ? (
                        <MediaComponent
                          resource={thumbnail}
                          fill
                          size="(max-width:768px) 100vw, 33vw"
                          className="object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <FileText className="w-12 h-12 text-muted-foreground/30" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Categories */}
                      {hasCategories && typeof category === "object" && category.name && (
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                          <Badge
                            variant="secondary"
                            className="bg-[#0870b8]/90 text-white backdrop-blur-sm text-xs px-2 py-1 border-none shadow-sm"
                          >
                            {category.name}
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-5">
                      {/* Title */}
                      <h3
                        className={cn(
                          "font-bold text-gray-800 group-hover:text-[#0870b8] transition-colors leading-snug mb-3 mt-1",
                          isLarge ? "text-xl" : "text-[16px]"
                        )}
                        style={{ fontFamily: "'Figtree', 'Open Sans', sans-serif" }}
                      >
                        {name || "Untitled Product"}
                      </h3>

                      {/* Description */}
                      {shortDescription && (
                        <p
                          className={cn(
                            "text-gray-500 leading-relaxed flex-1",
                            isLarge ? "text-[15px] line-clamp-3" : "text-[14px] line-clamp-2"
                          )}
                          style={{ fontFamily: "'Open Sans', sans-serif" }}
                        >
                          {shortDescription}
                        </p>
                      )}

                      {/* CTA */}
                      <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-[13px] font-bold text-[#0891B2] group-hover:text-[#067a96] transition-colors uppercase tracking-wider">
                          View details
                        </span>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#0891B2] group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export function generateMetadata(): Metadata {
  return {
    title: `Himalayas Continental | Medical Equipment & Healthcare Solutions | Search`,
    description: `Search results for Himalayas Continental, a leading provider of medical equipment and healthcare solutions.`,
  };
}
