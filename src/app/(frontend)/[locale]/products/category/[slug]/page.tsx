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
import { FolderOpen, ChevronRight, Package } from "lucide-react";
import type { Media, ProductCategory, ProductSubCategory } from "@/payload-types";

export const dynamic = "force-dynamic";

type Args = {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
};

export default async function CategoryPage({ params }: Args) {
  const { slug, locale } = await params;
  const payload = await getPayload({ config: configPromise });

  const categoryResult = await payload.find({
    collection: "product-categories",
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 1,
    limit: 1,
    locale: locale as TypedLocale,
  });

  const category = categoryResult.docs[0] as ProductCategory | undefined;

  if (!category) {
    notFound();
  }

  // If category has no sub-categories, show products directly
  if (!category.hasSubCategories) {
    const productsResult = await payload.find({
      collection: "products",
      where: {
        category: {
          equals: category.id,
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
                  <BreadcrumbPage>{category.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                {category.name}
              </h1>
              <div className="flex justify-center">
                <Separator className="w-24 h-1.5 bg-primary rounded-full" />
              </div>
              {category.description && (
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  {category.description}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="container">
          <ProductGrid products={productsResult.docs} locale={locale} />
        </div>
      </div>
    );
  }

  // Category has sub-categories - show them
  const subCategoriesResult = await payload.find({
    collection: "product-sub-categories",
    where: {
      parentCategory: {
        equals: category.id,
      },
    },
    depth: 1,
    limit: 100,
    sort: "order",
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
                <BreadcrumbPage>{category.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{category.name}</h1>
            <div className="flex justify-center">
              <Separator className="w-24 h-1.5 bg-primary rounded-full" />
            </div>
            {category.description && (
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {category.description}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subCategoriesResult.docs.map((subCategory) => {
            const typedSubCategory = subCategory as ProductSubCategory;
            const imageUrl =
              typedSubCategory.image && typeof typedSubCategory.image === "object"
                ? (typedSubCategory.image as Media).url
                : null;

            return (
              <Link
                key={typedSubCategory.id}
                href={`/products/category/${category.slug}/subcategory/${typedSubCategory.slug}`}
                className="group block"
              >
                <Card className="overflow-hidden border-2 border-transparent transition-all duration-500 group-hover:border-primary/20 group-hover:shadow-2xl bg-card rounded-2xl h-full">
                  <CardContent className="p-0">
                    <div className="relative h-48 bg-gradient-to-br from-primary/5 to-primary/10 overflow-hidden">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={typedSubCategory.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <FolderOpen className="w-20 h-20 text-primary/30" />
                        </div>
                      )}

                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold group-hover:text-primary transition-colors">
                          {typedSubCategory.name}
                        </h2>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>

                      {typedSubCategory.description && (
                        <p className="text-muted-foreground text-sm mt-3 line-clamp-2">
                          {typedSubCategory.description}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {subCategoriesResult.docs.length === 0 && (
          <div className="text-center py-32 bg-muted/20 rounded-3xl border-2 border-dashed border-muted max-w-3xl mx-auto mt-12">
            <FolderOpen className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-muted-foreground">No Sub-Categories Yet</h3>
            <p className="text-muted-foreground/70 mt-2">
              This category doesn&apos;t have any sub-categories yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Product Grid Component for categories without sub-categories
function ProductGrid({ products, locale }: { products: any[]; locale: string }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-32 bg-muted/20 rounded-3xl border-2 border-dashed border-muted max-w-3xl mx-auto">
        <Package className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-muted-foreground">No Products Yet</h3>
        <p className="text-muted-foreground/70 mt-2">
          This category doesn&apos;t have any products yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => {
        const thumbnailUrl =
          product.thumbnail && typeof product.thumbnail === "object"
            ? (product.thumbnail as Media).url
            : null;

        return (
          <Link key={product.id} href={`/products/${product.slug}`} className="group block">
            <Card className="overflow-hidden border-2 border-transparent transition-all duration-500 group-hover:border-primary/20 group-hover:shadow-xl bg-card rounded-xl h-full">
              <CardContent className="p-0">
                <div className="relative aspect-square bg-muted">
                  {thumbnailUrl ? (
                    <Image
                      src={thumbnailUrl}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-12 h-12 text-muted-foreground/30" />
                    </div>
                  )}

                  {product.featured && (
                    <Badge className="absolute top-3 left-3 bg-primary text-white">Featured</Badge>
                  )}

                  {product.isNew && (
                    <Badge className="absolute top-3 right-3 bg-green-500 text-white">New</Badge>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-1">
                    {product.name}
                  </h3>

                  {product.brand && (
                    <p className="text-sm text-muted-foreground">{product.brand}</p>
                  )}

                  {product.shortDescription && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {product.shortDescription}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug, locale } = await params;
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

  return {
    title: category
      ? `${category.name} | Himalayas Continental`
      : "Category | Himalayas Continental",
    description: category?.description || "Explore our product categories.",
  };
}
