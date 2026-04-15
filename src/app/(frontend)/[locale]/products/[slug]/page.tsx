import type { Metadata } from "next";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import type { TypedLocale } from "payload";
import React, { cache } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
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
import { Button } from "@/components/ui/button";
import { 
  Package, 
  FileText, 
  Download, 
  Check, 
  ArrowLeft,
  Star,
  Sparkles
} from "lucide-react";
import { PayloadRedirects } from "@/components/PayloadRedirects";
import { LivePreviewListener } from "@/components/LivePreviewListener";
import RichText from "@/components/RichText";
import type { Media, Brochure, Product, ProductCategory, ProductSubCategory } from "@/payload-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const dynamic = "force-static";
export const revalidate = 600;

type Args = {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
};

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const products = await payload.find({
    collection: "products",
    limit: 1000,
    select: {
      slug: true,
    },
  });

  return products.docs
    .filter((doc) => doc.slug)
    .map(({ slug }) => ({ slug }));
}

export default async function ProductPage({ params }: Args) {
  const { isEnabled: draft } = await draftMode();
  const { slug, locale } = await params;

  const product = await queryProductBySlug({
    slug,
    locale: locale as TypedLocale,
  });

  if (!product) {
    notFound();
  }

  const thumbnailUrl = product.thumbnail && typeof product.thumbnail === "object" 
    ? (product.thumbnail as Media).url 
    : null;

  const category = product.category && typeof product.category === "object" 
    ? product.category as ProductCategory 
    : null;

  const subCategory = product.subCategory && typeof product.subCategory === "object" 
    ? product.subCategory as ProductSubCategory 
    : null;

  const brochureFile = product.brochure && typeof product.brochure === "object" 
    ? product.brochure as Brochure 
    : null;

  const galleryImages = product.gallery?.map((item) => 
    item.image && typeof item.image === "object" ? (item.image as Media) : null
  ).filter(Boolean) as Media[];

  const hasTable = product.hasSpecificationsTable && product.specificationsTable;
  const tableData = hasTable ? product.specificationsTable : null;

  return (
    <article className="pb-24 min-h-screen">
      <div className="bg-muted/30 border-b py-8">
        <div className="container">
          <Breadcrumb>
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
              {category && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href={`/products/category/${category.slug}`}>{category.name}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
              {subCategory && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href={`/products/category/${category?.slug}/subcategory/${subCategory.slug}`}>
                        {subCategory.name}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="max-w-[200px] truncate">
                  {product.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {draft && <LivePreviewListener />}
      <PayloadRedirects disableNotFound url={`/products/${slug}`} />

      <div className="container py-12">
        <Link 
          href={subCategory ? `/products/category/${category?.slug}/subcategory/${subCategory.slug}` : category ? `/products/category/${category.slug}` : "/products"}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to {subCategory?.name || category?.name || "Products"}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div className="space-y-6">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted border shadow-lg">
              {thumbnailUrl ? (
                <Image
                  src={thumbnailUrl}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-24 h-24 text-muted-foreground/30" />
                </div>
              )}

              {/* Badges overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.featured && (
                  <Badge className="bg-primary text-white flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Featured
                  </Badge>
                )}
                {product.isNew && (
                  <Badge className="bg-green-500 text-white flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    New Arrival
                  </Badge>
                )}
                {!product.inStock && (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>
            </div>

            {/* Gallery */}
            {galleryImages.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                {galleryImages.map((image, index) => (
                  <div 
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden bg-muted border cursor-pointer hover:border-primary transition-colors"
                  >
                    <Image
                      src={image.url || ""}
                      alt={image.alt || `${product.name} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {category && (
                  <Badge variant="secondary">{category.name}</Badge>
                )}
                {subCategory && (
                  <Badge variant="outline">{subCategory.name}</Badge>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                {product.name}
              </h1>

              {product.brand && (
                <p className="text-lg text-muted-foreground">
                  Brand: <span className="font-medium text-foreground">{product.brand}</span>
                </p>
              )}

              {product.sku && (
                <p className="text-sm text-muted-foreground">
                  SKU: <span className="font-mono">{product.sku}</span>
                </p>
              )}

              <div className="flex items-center gap-4">
                {product.inStock ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="w-5 h-5" />
                    <span className="font-medium">In Stock</span>
                  </div>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>
            </div>

            <Separator />

            {/* Short Description */}
            {product.shortDescription && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Overview</h2>
                <p className="text-muted-foreground">{product.shortDescription}</p>
              </div>
            )}

            {/* Quick Specs */}
            {product.specifications && product.specifications.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-3">Key Specifications</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.specifications.slice(0, 4).map((spec, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-sm text-muted-foreground">{spec.label}</span>
                        <p className="font-medium">{spec.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Brochure Download */}
            {product.hasBrochure && brochureFile && (
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Product Brochure</p>
                        <p className="text-sm text-muted-foreground">
                          Download detailed specifications
                        </p>
                      </div>
                    </div>
                    <Button asChild variant="default" size="sm">
                      <a 
                        href={brochureFile.url || "#"} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        download
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Full Description */}
        {product.description && (
          <div className="mt-16">
            <Separator className="mb-8" />
            <h2 className="text-2xl font-bold mb-6">Product Description</h2>
            <div className="prose dark:prose-invert max-w-none">
              <RichText data={product.description} enableGutter={false} />
            </div>
          </div>
        )}

        {/* Specifications Table */}
        {hasTable && tableData && (
          <div className="mt-16">
            <Separator className="mb-8" />
            <h2 className="text-2xl font-bold mb-6">
              {tableData.tableTitle || "Technical Specifications"}
            </h2>
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    {tableData.headers?.map((header, index) => (
                      <TableHead key={index} className="font-semibold">
                        {header.header}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData.rows?.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {row.cells?.map((cell, cellIndex) => (
                        <TableCell key={cellIndex}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {/* All Specifications List */}
        {product.specifications && product.specifications.length > 4 && (
          <div className="mt-16">
            <Separator className="mb-8" />
            <h2 className="text-2xl font-bold mb-6">All Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.specifications.map((spec, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 p-4 rounded-lg border bg-card"
                >
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">{spec.label}</p>
                    <p className="font-medium">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

const queryProductBySlug = cache(async ({ slug, locale }: { slug: string; locale: TypedLocale }) => {
  const { isEnabled: draft } = await draftMode();
  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "products",
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    locale,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return result.docs?.[0] as Product | undefined;
});

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug, locale } = await params;
  const product = await queryProductBySlug({
    slug,
    locale: locale as TypedLocale,
  });

  if (!product) {
    return {
      title: "Product Not Found | Himalayas Continental",
    };
  }

  return {
    title: `${product.name} | Himalayas Continental`,
    description: product.shortDescription || `Explore ${product.name} - Medical Equipment from Himalayas Continental.`,
  };
}
