import type { Metadata } from "next";

import configPromise from "@payload-config";
import { getPayload } from "payload";
import React from "react";
import { ListClient } from "./ListClient";
import type { Category, List as ListType } from "@/payload-types";

type Args = {
  searchParams: Promise<{
    title?: string;
    category?: string;
    fromDate?: string;
    toDate?: string;
    page?: string;
  }>;
};

export const metadata: Metadata = {
  title: "List | Himalayas Continental",
  description: "View all public documents and notices from Himalayas Continental.",
};

export default async function Page({ searchParams: rawSearchParams }: Args) {
  const searchParams = await rawSearchParams;
  const payload = await getPayload({ config: configPromise });

  const categoriesRes = await payload.find({
    collection: "categories",
    limit: 100,
  });

  const categories = categoriesRes.docs as Category[];

  // Build the nested 'where' query dynamically
  const where: import("payload").Where = {
    and: [{ status: { equals: "published" } }, { targetAudience: { not_equals: "staff_only" } }],
  };

  if (searchParams.title) {
    where.title = {
      contains: searchParams.title,
    };
  }

  if (searchParams.category && searchParams.category !== "all") {
    // Check if the provided category is a slug or an ID
    const foundCategory = categories.find(
      (cat) => cat.slug === searchParams.category || cat.id === searchParams.category
    );
    if (foundCategory) {
      where.category = {
        equals: foundCategory.id,
      };
    }
  }

  if (searchParams.fromDate || searchParams.toDate) {
    where.publishedDate = {};
    if (searchParams.fromDate) {
      where.publishedDate.greater_than_equal = new Date(searchParams.fromDate).toISOString();
    }
    if (searchParams.toDate) {
      where.publishedDate.less_than_equal = new Date(searchParams.toDate).toISOString();
    }
  }

  const pageParam = parseInt(searchParams.page || "1", 10);

  const noticesRes = await payload.find({
    collection: "list",
    where,
    limit: 10,
    page: pageParam,
    sort: "-publishedDate",
  });

  const notices = noticesRes.docs as ListType[];

  return (
    <ListClient
      categories={categories}
      notices={notices}
      pagination={{
        totalDocs: noticesRes.totalDocs,
        totalPages: noticesRes.totalPages,
        page: noticesRes.page || 1,
        hasNextPage: noticesRes.hasNextPage,
        hasPrevPage: noticesRes.hasPrevPage,
      }}
    />
  );
}
