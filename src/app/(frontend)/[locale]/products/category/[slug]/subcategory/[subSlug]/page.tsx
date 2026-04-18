import type { Metadata } from "next";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import type { TypedLocale } from "payload";
import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";
import type { Media, ProductCategory, ProductSubCategory, Product } from "@/payload-types";

export const dynamic = "force-dynamic";

type Args = {
  params: Promise<{
    slug: string;
    subSlug: string;
    locale: string;
  }>;
};

export default async function SubCategoryPage({ params }: Args) {
  const { slug, subSlug, locale } = await params;
  const payload = await getPayload({ config: configPromise });

  // First get the category
  const categoryResult = await payload.find({
    collection: "product-categories",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    locale: locale as TypedLocale,
  });

  const category = categoryResult.docs[0] as ProductCategory | undefined;
  if (!category) {
    notFound();
  }

  // Then get the sub-category
  const subCategoryResult = await payload.find({
    collection: "product-sub-categories",
    where: {
      slug: {
        equals: subSlug,
      },
      parentCategory: {
        equals: category.id,
      },
    },
    depth: 1,
    limit: 1,
    locale: locale as TypedLocale,
  });

  const subCategory = subCategoryResult.docs[0] as ProductSubCategory | undefined;
  if (!subCategory) {
    notFound();
  }

  // Get products in this sub-category
  const productsResult = await payload.find({
    collection: "products",
    where: {
      category: {
        equals: category.id,
      },
      subCategory: {
        equals: subCategory.id,
      },
    },
    depth: 1,
    limit: 100,
    sort: "name",
    locale: locale as TypedLocale,
  });

  return (
    <div className="pb-24 min-h-screen">
      <div className="bg-muted/30 border-b py-12 mb-12">
        <div className="container">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/products">Products</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/products/category/${category.slug}`}>{category.name}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{subCategory.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              {subCategory.name}
            </h1>
            <div className="flex justify-center">
              <Separator className="w-24 h-1.5 bg-primary rounded-full" />
            </div>
            {subCategory.description && (
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {subCategory.description}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="container">
        {productsResult.docs.length === 0 ? (
          <div className="text-center py-32 bg-muted/20 rounded-3xl border-2 border-dashed border-muted max-w-3xl mx-auto">
            <Package className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-muted-foreground">No Products Yet</h3>
            <p className="text-muted-foreground/70 mt-2">
              This sub-category doesn&apos;t have any products yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productsResult.docs.map((product) => {
              const typedProduct = product as Product;
              const thumbnailUrl =
                typedProduct.thumbnail && typeof typedProduct.thumbnail === "object"
                  ? (typedProduct.thumbnail as Media).url
                  : null;

              return (
                <Link
                  key={typedProduct.id}
                  href={`/products/${typedProduct.slug}`}
                  className="group block"
                >
                  <Card className="overflow-hidden border-2 border-transparent transition-all duration-500 group-hover:border-primary/20 group-hover:shadow-xl bg-card rounded-xl h-full">
                    <CardContent className="p-0">
                      <div className="relative aspect-square bg-muted">
                        {thumbnailUrl ? (
                          <Image
                            src={thumbnailUrl}
                            alt={typedProduct.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-12 h-12 text-muted-foreground/30" />
                          </div>
                        )}

                        {typedProduct.featured && (
                          <Badge className="absolute top-3 left-3 bg-primary text-white">
                            Featured
                          </Badge>
                        )}

                        {typedProduct.isNewArrival && (
                          <Badge className="absolute top-3 right-3 bg-green-500 text-white">
                            New
                          </Badge>
                        )}
                      </div>

                      <div className="p-4">
                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-1">
                          {typedProduct.name}
                        </h3>

                        {typedProduct.brand && (
                          <p className="text-sm text-muted-foreground">{typedProduct.brand}</p>
                        )}

                        {typedProduct.shortDescription && (
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                            {typedProduct.shortDescription}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug, subSlug, locale } = await params;
  const payload = await getPayload({ config: configPromise });

  const categoryResult = await payload.find({
    collection: "product-categories",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    locale: locale as TypedLocale,
  });

  const category = categoryResult.docs[0] as ProductCategory | undefined;

  const subCategoryResult = await payload.find({
    collection: "product-sub-categories",
    where: {
      slug: {
        equals: subSlug,
      },
    },
    limit: 1,
    locale: locale as TypedLocale,
  });

  const subCategory = subCategoryResult.docs[0] as ProductSubCategory | undefined;

  return {
    title: subCategory
      ? `${subCategory.name} | ${category?.name || ""} | Himalayas Continental`
      : "Sub-Category | Himalayas Continental",
    description: subCategory?.description || "Explore our product sub-categories.",
  };
}
