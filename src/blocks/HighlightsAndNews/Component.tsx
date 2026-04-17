import React from "react";
import { getPayload } from "payload";
import type { Where } from "payload";
import configPromise from "@payload-config";
import type { HighlightsAndNewsBlock as Props, Post } from "@/payload-types";
import { getTranslations } from "next-intl/server";
import { HighlightsAndNewsClient } from "./HighlightsAndNewsClient";

export const HighlightsAndNewsBlock = async (props: Props) => {
  const {
    highlightsTitle,
    newsTitle,
    highlightsLimit = 6,
    newsLimit = 3,
    filterByCategory,
  } = props;
  const payload = await getPayload({ config: configPromise });
  const t = await getTranslations();

  const categoryId = typeof filterByCategory === "object" ? filterByCategory?.id : filterByCategory;

  const whereClausePosts: Where = {
    _status: { equals: "published" },
  };
  if (categoryId) {
    whereClausePosts.categories = { contains: categoryId };
  }

  // Fetch Latest items from 'posts' for Highlights column
  const postsHighlights = await payload.find({
    collection: "posts",
    limit: highlightsLimit ?? 6,
    sort: "-publishedAt",
    where: whereClausePosts,
    depth: 1,
  });

  const combinedHighlights = postsHighlights.docs.map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    publishedAt: item.publishedAt,
    categories: item.categories,
    heroImage: item.heroImage,
    _collection: "posts",
    isPinned: false,
  }));

  // Fetch Latest items from 'posts' for News column
  const postsNews = await payload.find({
    collection: "posts",
    limit: newsLimit ?? 3,
    sort: "-publishedAt",
    where: whereClausePosts,
    depth: 1,
  });

  const combinedNews = postsNews.docs.map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    publishedAt: item.publishedAt,
    categories: item.categories,
    heroImage: item.heroImage,
    _collection: "posts",
  }));

  return (
    <section className="w-full bg-secondary py-3">
      <div className="container mx-auto px-4">
        <HighlightsAndNewsClient
          highlights={combinedHighlights as Record<string, unknown>[]}
          news={combinedNews as Record<string, unknown>[]}
          highlightsTitle={highlightsTitle || t("highlights")}
          newsTitle={newsTitle || t("latest-news")}
        />
      </div>
    </section>
  );
};
