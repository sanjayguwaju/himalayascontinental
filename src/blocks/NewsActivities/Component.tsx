import React from "react";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import type {
  NewsActivitiesBlock as NewsActivitiesBlockProps,
  Post,
  Category,
} from "@/payload-types";
import { NewsTabs } from "./NewsTabs";
import { getTranslations } from "next-intl/server";

type Props = NewsActivitiesBlockProps;

export const NewsActivitiesBlock: React.FC<Props> = async ({
  isVisibleOnHomepage = true,
  sectionTitle: _sectionTitle,
  limit,
  viewAllLabel,
  filterByCategory,
}) => {
  if (!isVisibleOnHomepage) return null;

  const payload = await getPayload({ config: configPromise });

  // 1. Fetch categories
  const categoryResult = await payload.find({
    collection: "categories",
    limit: 10,
    sort: "title",
  });

  const categories = categoryResult.docs as Category[];
  if (!categories.length) return null;

  // 2. Fetch latest posts per category
  const fetchLimit = limit ?? 6;
  const groupedItems: Record<string, Post[]> = {};

  for (const cat of categories) {
    const res = await payload.find({
      collection: "posts",
      limit: fetchLimit,
      sort: "-publishedAt",
      where: {
        and: [{ _status: { equals: "published" } }, { categories: { contains: cat.id } }],
      },
      depth: 1,
    });

    groupedItems[cat.id] = res.docs as Post[];
  }

  // Translations (global/default locale)
  const t = await getTranslations();

  const viewAllText = viewAllLabel ?? t("news-activities-view-all");
  const sectionTitle = _sectionTitle ?? t("news-activities-title");

  return (
    <section className="w-full bg-secondary py-16">
      <div className="container px-0">
        <div className="mb-10 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 flex items-center gap-3">
            <span className="w-1.5 h-8 bg-accent rounded-full shrink-0 shadow-[0_4px_12px_rgba(225,29,72,0.2)]"></span>
            {sectionTitle}
          </h2>
        </div>
        <NewsTabs categories={categories} groupedItems={groupedItems} viewAllText={viewAllText} />
      </div>
    </section>
  );
};
