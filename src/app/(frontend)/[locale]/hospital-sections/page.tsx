import type { Metadata } from "next";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { cn } from "@/utilities/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import type { Media } from "@/payload-types";

export const metadata: Metadata = {
  title: "Hospital Sections | Himalayas Continental",
  description: "Explore the various departments and sections of Himalayas Continental.",
};

export default async function HospitalSectionsPage() {
  const payload = await getPayload({ config: configPromise });

  const sectionsRes = await payload.find({
    collection: "hospital-sections",
    limit: 100,
    where: {
      isActive: { equals: true },
    },
    sort: "displayOrder",
  });

  const sections = sectionsRes.docs;

  return (
    <div className="container py-16 space-y-12">
      <div className="space-y-4 max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight">Hospital Sections</h1>
        <p className="text-lg text-muted-foreground">
          Discover our specialized departments and medical sections dedicated to providing
          comprehensive healthcare services.
        </p>
      </div>

      {sections.length === 0 ? (
        <div className="text-center py-20 px-4 border rounded-lg bg-muted/30">
          <Building2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold">No Sections Available</h2>
          <p className="text-muted-foreground mt-2">
            Check back later for updates to our hospital departments.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => {
            const iconUrl =
              section.icon && typeof section.icon === "object" ? (section.icon as Media).url : null;
            const iconAlt =
              section.icon && typeof section.icon === "object"
                ? (section.icon as Media).alt || section.title
                : section.title;

            return (
              <Card
                key={section.id}
                className="flex flex-col h-full hover:shadow-md transition-shadow"
              >
                <CardHeader className="flex flex-row items-center gap-4 pb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden relative">
                    {iconUrl ? (
                      <Image
                        src={iconUrl}
                        alt={iconAlt}
                        fill
                        className="object-contain p-2"
                        sizes="48px"
                      />
                    ) : (
                      <Building2 className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                    {section.shortName && (
                      <CardDescription className="opacity-70">{section.shortName}</CardDescription>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground line-clamp-3">
                    {section.excerpt || "No description available."}
                  </p>
                </CardContent>
                <CardFooter>
                  <Link
                    href={`/hospital-sections/${section.slug}`}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "w-full justify-between group"
                    )}
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
