import type { Metadata } from "next/types";

import { Pagination } from "@/components/Pagination";
import configPromise from "@payload-config";
import { getPayload, TypedLocale } from "payload";
import React from "react";
import PageClient from "./page.client";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  CalendarDays,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  Hash,
  Clock,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { Media } from "@/components/Media";
import type { Post } from "@/payload-types";
import { cn } from "@/utilities/ui";

export const dynamic = "force-dynamic";

type Args = {
  params: Promise<{
    locale: TypedLocale;
  }>;
};

type PostDoc = Pick<Post, "slug" | "categories" | "meta" | "title" | "publishedAt">;

export default async function Page({ params }: Args) {
  const { locale } = await params;
  const payload = await getPayload({ config: configPromise });

  const posts = await payload.find({
    collection: "posts",
    depth: 1,
    limit: 12,
    overrideAccess: false,
    locale,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      publishedAt: true,
    },
  });

  const docs = posts.docs as unknown as PostDoc[];
  const [featured, ...rest] = docs;

  return (
    <div className="min-h-screen bg-background">
      <PageClient />

      {/* ── Elegant Hero ── */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-accent pt-24 pb-16 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute top-8 left-8 w-24 h-24 border border-white/10 rounded-full" />
        <div className="absolute bottom-8 right-16 w-32 h-32 border border-white/5 rounded-full" />

        <div className="container max-w-5xl mx-auto px-4 relative">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Posts</span>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-white/80 text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Stories & Updates</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Latest from Himalayas Continental
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-xl">
              Discover news, insights, and stories about our mission to create positive change in
              Nepal.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-8 flex items-center gap-6 text-white/60">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">{posts.totalDocs} articles</span>
            </div>
            <Separator orientation="vertical" className="h-4 bg-white/20" />
            <span className="text-sm">Updated regularly</span>
          </div>
        </div>
      </section>

      {/* ── Content Section ── */}
      <section className="container max-w-6xl mx-auto px-4 py-16">
        {/* Empty State */}
        {docs.length === 0 && (
          <Card className="border-dashed max-w-md mx-auto">
            <CardContent className="py-16 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-muted flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-lg font-semibold text-foreground mb-2">No posts yet</h2>
              <p className="text-muted-foreground text-sm">
                Check back soon for the latest updates and stories.
              </p>
            </CardContent>
          </Card>
        )}

        {docs.length > 0 && (
          <div className="space-y-12">
            {/* ── Featured Post ── */}
            {featured && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Badge
                    variant="default"
                    className="bg-primary text-white text-xs uppercase tracking-wider"
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                  <Separator className="flex-1" />
                </div>

                <Link
                  href={`/posts/${featured.slug}`}
                  className="group block rounded-3xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="grid md:grid-cols-2">
                    {/* Image Side */}
                    <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[400px] bg-muted overflow-hidden">
                      {featured.meta?.image && typeof featured.meta.image !== "string" ? (
                        <Media
                          resource={featured.meta.image}
                          size="(max-width:768px) 100vw, 50vw"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <FileText className="w-16 h-16 text-muted-foreground/30" />
                        </div>
                      )}
                      {/* Category overlay */}
                      {Array.isArray(featured.categories) && featured.categories.length > 0 && (
                        <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                          {(featured.categories as { title?: string }[])
                            .slice(0, 2)
                            .map((cat, i) =>
                              typeof cat === "object" && cat.title ? (
                                <Badge
                                  key={i}
                                  variant="secondary"
                                  className="bg-background/90 text-foreground backdrop-blur-sm text-xs px-3 py-1"
                                >
                                  <Hash className="w-3 h-3 mr-1" />
                                  {cat.title}
                                </Badge>
                              ) : null
                            )}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Content Side */}
                    <div className="flex flex-col justify-center p-8 md:p-10 gap-4">
                      {featured.publishedAt && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CalendarDays className="w-4 h-4" />
                          <time dateTime={featured.publishedAt}>
                            {new Date(featured.publishedAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </time>
                        </div>
                      )}
                      <h2 className="text-2xl md:text-3xl font-bold text-card-foreground group-hover:text-primary transition-colors leading-tight">
                        {featured.title || "Untitled"}
                      </h2>
                      {featured.meta?.description && (
                        <p className="text-muted-foreground leading-relaxed line-clamp-3">
                          {featured.meta.description}
                        </p>
                      )}
                      <div className="pt-4 flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                        Read full article
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* ── Posts Grid ── */}
            {rest.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <h2 className="text-lg font-semibold text-foreground">More Articles</h2>
                  <Separator className="flex-1" />
                  <span className="text-sm text-muted-foreground">{rest.length} posts</span>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((post, index) => {
                    const { slug, categories, meta, title, publishedAt } = post;
                    const href = `/posts/${slug}`;
                    const hasCategories = Array.isArray(categories) && categories.length > 0;
                    const isLarge = index === 0 || index === 1;

                    return (
                      <Link
                        key={index}
                        href={href}
                        className={cn(
                          "group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden",
                          "hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
                          isLarge && "md:col-span-1"
                        )}
                      >
                        {/* Image */}
                        <div className="relative aspect-[16/10] w-full bg-muted overflow-hidden">
                          {meta?.image && typeof meta.image !== "string" ? (
                            <Media
                              resource={meta.image}
                              size="(max-width:768px) 100vw, 33vw"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <FileText className="w-10 h-10 text-muted-foreground/30" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {/* Categories */}
                          {hasCategories && (
                            <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                              {(categories as { title?: string }[]).slice(0, 2).map((cat, i) =>
                                typeof cat === "object" && cat.title ? (
                                  <Badge
                                    key={i}
                                    variant="secondary"
                                    className="bg-background/90 text-foreground backdrop-blur-sm text-[10px] px-2 py-0.5"
                                  >
                                    {cat.title}
                                  </Badge>
                                ) : null
                              )}
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex flex-col flex-1 p-5">
                          {/* Date */}
                          {publishedAt && (
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                              <Clock className="w-3.5 h-3.5" />
                              <time dateTime={publishedAt}>
                                {new Date(publishedAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </time>
                            </div>
                          )}

                          {/* Title */}
                          <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2 leading-snug">
                            {title || "Untitled"}
                          </h3>

                          {/* Description */}
                          {meta?.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1">
                              {meta.description}
                            </p>
                          )}

                          {/* CTA */}
                          <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                            <span className="text-xs font-medium text-primary">Read article</span>
                            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Pagination ── */}
            {posts.totalPages > 1 && posts.page && (
              <div className="pt-8">
                <Pagination page={posts.page} totalPages={posts.totalPages} />
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export function generateMetadata(): Metadata {
  return {
    title: `Himalayas Continental | Medical Equipment & Healthcare Solutions | Posts`,
    description: `Explore the latest posts from Himalayas Continental, a leading provider of medical equipment and healthcare solutions.`,
  };
}
