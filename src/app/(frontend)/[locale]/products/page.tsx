import type { Metadata } from "next";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import type { TypedLocale } from "payload";
import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
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
import { Package, ChevronRight } from "lucide-react";
import type { Media, ProductCategory } from "@/payload-types";

export const dynamic = "force-static";
export const revalidate = 600;

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const payload = await getPayload({ config: configPromise });

  const categories = await payload.find({
    collection: "product-categories",
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
                <BreadcrumbPage>Products</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight uppercase">
              Our Products
            </h1>
            <div className="flex justify-center">
              <Separator className="w-24 h-1.5 bg-primary rounded-full" />
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our wide range of medical equipment and healthcare solutions.
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.docs.map((category) => {
            const typedCategory = category as ProductCategory;
            const iconUrl = typedCategory.icon && typeof typedCategory.icon === "object" 
              ? (typedCategory.icon as Media).url 
              : null;

            return (
              <Link 
                key={typedCategory.id} 
                href={`/products/category/${typedCategory.slug}`} 
                className="group block"
              >
                <Card className="overflow-hidden border-2 border-transparent transition-all duration-500 group-hover:border-primary/20 group-hover:shadow-2xl bg-card rounded-2xl h-full">
                  <CardContent className="p-0">
                    <div className="relative h-48 bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
                      {iconUrl ? (
                        <Image
                          src={iconUrl}
                          alt={typedCategory.name}
                          width={120}
                          height={120}
                          className="object-contain transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <Package className="w-20 h-20 text-primary/30" />
                      )}
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-xl font-bold group-hover:text-primary transition-colors">
                          {typedCategory.name}
                        </h2>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      
                      {typedCategory.description && (
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                          {typedCategory.description}
                        </p>
                      )}

                      {typedCategory.hasSubCategories && (
                        <Badge variant="secondary" className="text-xs">
                          Has Sub-categories
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {categories.docs.length === 0 && (
          <div className="text-center py-32 bg-muted/20 rounded-3xl border-2 border-dashed border-muted max-w-3xl mx-auto mt-12">
            <Package className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-muted-foreground">No Categories Yet</h3>
            <p className="text-muted-foreground/70 mt-2">
              Check back soon for our product categories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function generateMetadata(): Metadata {
  return {
    title: "Products | Himalayas Continental",
    description: "Explore our wide range of medical equipment and healthcare solutions.",
  };
}
