import type { Metadata } from "next";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Building2, Clock, MapPin, Phone, Users, ShieldPlus, ChevronRight } from "lucide-react";
import RichText from "@/components/RichText";
import { Badge } from "@/components/ui/badge";
import { StaffCard } from "@/components/StaffCard";
import type { Media, Staff } from "@/payload-types";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const sections = await payload.find({
    collection: "hospital-sections",
    limit: 1000,
    select: { slug: true },
  });

  return sections.docs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const payload = await getPayload({ config: configPromise });
  const section = await payload.find({
    collection: "hospital-sections",
    where: { slug: { equals: slug } },
    limit: 1,
  });

  const matchedDoc = section.docs[0];
  if (!matchedDoc) return { title: "Section Not Found" };

  return {
    title: `${matchedDoc.title} | Himalayas Continental`,
    description:
      matchedDoc.excerpt || `Information about ${matchedDoc.title} at Himalayas Continental.`,
  };
}

export default async function HospitalSectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const payload = await getPayload({ config: configPromise });

  // Fetch section data with staffs fully populated
  const response = await payload.find({
    collection: "hospital-sections",
    where: { slug: { equals: decodedSlug } },
    depth: 1,
    limit: 1,
  });

  const section = response.docs[0];

  if (!section) {
    return notFound();
  }

  const coverImageUrl =
    section.coverImage && typeof section.coverImage === "object"
      ? (section.coverImage as Media).url
      : null;
  const coverImageAlt =
    section.coverImage && typeof section.coverImage === "object"
      ? (section.coverImage as Media).alt || section.title
      : section.title;

  const headStaff =
    section.sectionHead && typeof section.sectionHead === "object"
      ? (section.sectionHead as Staff)
      : null;

  const assignedStaffs = (section.staffs || [])
    .map((s) => (typeof s === "object" ? (s as Staff) : null))
    .filter((s): s is Staff => s !== null);

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <div className="bg-muted/30 border-b relative overflow-hidden">
        {coverImageUrl && (
          <div className="absolute inset-0 opacity-10">
            <Image src={coverImageUrl} alt={coverImageAlt} fill className="object-cover" priority />
          </div>
        )}
        <div className="container relative py-12 lg:py-16">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/hospital-sections">Hospital Sections</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{section.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-3 text-primary">
              <Building2 className="w-8 h-8" />
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{section.title}</h1>
            </div>
            {section.shortName && (
              <p className="text-xl font-medium text-muted-foreground">{section.shortName}</p>
            )}
            {section.excerpt && (
              <p className="text-lg text-muted-foreground leading-relaxed pt-2">
                {section.excerpt}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {section.description &&
            typeof section.description === "object" &&
            Object.keys(section.description).length > 0 ? (
              <div className="prose prose-slate max-w-none dark:prose-invert">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <ShieldPlus className="w-6 h-6 text-primary" />
                  About the Section
                </h2>
                <RichText data={section.description} enableGutter={false} />
              </div>
            ) : null}

            {/* Services List */}
            {section.services && section.services.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold border-b pb-2">Key Services Provided</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {section.services.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-xl bg-card border hover:border-primary/50 transition-colors"
                    >
                      <div className="mt-0.5 bg-primary/10 p-1 rounded-full text-primary shrink-0">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-card-foreground leading-snug">
                        {service.service}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Staff Directory Section */}
            {(headStaff || assignedStaffs.length > 0) && (
              <div className="space-y-8 pt-8 border-t">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">Section Team</h2>
                </div>

                {headStaff && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      Section Head
                    </h3>
                    <div className="max-w-sm">
                      <StaffCard staff={headStaff} />
                    </div>
                  </div>
                )}

                {assignedStaffs.length > 0 && (
                  <div className="space-y-4">
                    {headStaff && (
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider pt-4">
                        Assigned Medical Staff
                      </h3>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {assignedStaffs.map((staff) => (
                        <StaffCard key={staff.id} staff={staff} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar Info Panel */}
          <div className="space-y-6">
            <div className="bg-muted/40 rounded-2xl p-6 border sticky top-24 space-y-8">
              <h3 className="font-semibold text-xl mb-6">Quick Details</h3>

              <div className="space-y-6">
                {section.operatingHours && (
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">Operating Hours</p>
                      <p className="text-muted-foreground text-sm mt-1 leading-snug">
                        {section.operatingHours}
                      </p>
                    </div>
                  </div>
                )}

                {section.locationInHospital && (
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground text-sm mt-1 leading-snug">
                        {section.locationInHospital}
                      </p>
                    </div>
                  </div>
                )}

                {section.contactPhone && (
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">Contact Phone</p>
                      <a
                        href={`tel:${section.contactPhone}`}
                        className="text-primary hover:underline text-sm mt-1 leading-snug block"
                      >
                        {section.contactPhone}
                      </a>
                    </div>
                  </div>
                )}

                {(section.totalBeds || section.totalStaffCount || section.establishedYear) && (
                  <div className="pt-6 border-t mt-6 space-y-3">
                    {section.totalBeds && (
                      <div className="flex justify-between items-center py-2 border-b border-border/50">
                        <span className="text-muted-foreground">Total Capacity</span>
                        <Badge variant="secondary" className="font-medium">
                          {section.totalBeds} Beds
                        </Badge>
                      </div>
                    )}
                    {section.totalStaffCount && (
                      <div className="flex justify-between items-center py-2 border-b border-border/50">
                        <span className="text-muted-foreground">Team Size</span>
                        <Badge variant="secondary" className="font-medium">
                          {section.totalStaffCount} Members
                        </Badge>
                      </div>
                    )}
                    {section.establishedYear && (
                      <div className="flex justify-between items-center py-2">
                        <span className="text-muted-foreground">Established</span>
                        <span className="font-medium">{section.establishedYear}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
