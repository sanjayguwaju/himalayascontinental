import type { Metadata } from "next";

import { PayloadRedirects } from "@/components/PayloadRedirects";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { draftMode } from "next/headers";
import React, { cache } from "react";
import { TypedLocale } from "payload";
import type { Media } from "@/payload-types";
import { format } from "date-fns";
import { CalendarIcon, Home, ChevronRight } from "lucide-react";
import Link from "next/link";
import { LivePreviewListener } from "@/components/LivePreviewListener";

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const notices = await payload.find({
    collection: "list",
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    where: {
      and: [{ status: { equals: "published" } }, { targetAudience: { not_equals: "staff_only" } }],
    },
    select: {
      slug: true,
    },
  });

  const params = notices.docs
    ?.filter((doc) => doc.slug)
    .map(({ slug }) => {
      return { slug };
    });

  return params;
}

type Args = {
  params: Promise<{
    slug?: string;
    locale: TypedLocale;
  }>;
};

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode();
  const { slug, locale } = await paramsPromise;

  if (!slug) {
    return <PayloadRedirects url="/list" />;
  }

  const decodedSlug = decodeURIComponent(slug);
  const url = "/list/" + decodedSlug;
  const notice = await queryListItemBySlug({
    slug: decodedSlug,
    locale,
  });

  if (!notice) {
    return <PayloadRedirects url={url} />;
  }

  // Determine the PDF URL to show (internal media or external)
  let pdfUrl = "";

  // 1. Check the dedicated main document field first
  if (notice.mainDocument && typeof notice.mainDocument === "object") {
    pdfUrl = (notice.mainDocument as Media).url || "";
  }

  // 2. Fallback to attachments
  if (!pdfUrl && notice.attachments && notice.attachments.length > 0) {
    const attachment = notice.attachments[0];
    if (attachment.externalFileUrl) {
      pdfUrl = attachment.externalFileUrl;
    } else if (attachment.file && typeof attachment.file === "object") {
      pdfUrl = (attachment.file as Media).url || "";
    }
  }

  // 3. Last fallback to notice preview image (if it's a PDF uploaded there)
  if (!pdfUrl && notice.image && typeof notice.image === "object") {
    const img = notice.image as Media;
    if (img.url) {
      pdfUrl = img.url;
    }
  }

  // Append PDF viewer parameters (keep sidebar hidden but allow natural zoom)
  const enhancedPdfUrl = pdfUrl ? `${pdfUrl}#pagemode=none` : "";

  return (
    <article className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      {/* Header bar */}
      <div className="bg-background border-b shadow-sm sticky top-0 z-10">
        <div className="container py-4 flex flex-col gap-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm font-medium text-muted-foreground overflow-hidden whitespace-nowrap">
            <Link
              href="/"
              className="flex items-center gap-1.5 hover:text-primary transition-colors shrink-0"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <ChevronRight className="h-4 w-4 shrink-0 opacity-50" />
            <Link href="/list" className="hover:text-primary transition-colors shrink-0">
              Notices
            </Link>
            <ChevronRight className="h-4 w-4 shrink-0 opacity-50" />
            <span className="text-foreground truncate max-w-[200px] md:max-w-md first-letter:uppercase">
              {notice.title}
            </span>
          </nav>

          <div className="relative flex flex-col md:flex-row items-center justify-center min-h-[40px] gap-4">
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight max-w-3xl text-center first-letter:uppercase">
              {notice.title}
            </h1>

            <div className="md:absolute md:right-0">
              <div className="flex items-center text-muted-foreground bg-slate-50 dark:bg-slate-900 px-2.5 py-1 rounded-md text-xs font-semibold border border-slate-200 dark:border-slate-800 shadow-sm whitespace-nowrap">
                <CalendarIcon className="h-3.5 w-3.5 mr-1.5 text-primary opacity-80" />
                {format(new Date(notice.publishedDate), "PPP")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Native Browser PDF Viewer Container */}
      <div className="flex-1 w-full bg-slate-50 dark:bg-slate-950 border-t py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8">
          {pdfUrl ? (
            <div className="w-full h-[85vh] bg-white dark:bg-slate-900 rounded-xl shadow-xl ring-1 ring-slate-200 dark:ring-slate-800 overflow-hidden">
              <iframe
                src={enhancedPdfUrl}
                className="w-full h-full border-0 block"
                title={notice.title}
              />
            </div>
          ) : (
            <div className="flex min-h-[400px] w-full items-center justify-center text-muted-foreground flex-col gap-4 py-20 bg-muted/20 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800">
              <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center shadow-inner">
                <span className="text-3xl">📄</span>
              </div>
              <p className="text-lg font-medium">No document attached to this item</p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug, locale } = await paramsPromise;

  if (!slug) return { title: "Notices" };

  const decodedSlug = decodeURIComponent(slug);
  const notice = await queryListItemBySlug({
    slug: decodedSlug,
    locale,
  });

  if (!notice) return { title: "Item Not Found" };

  return {
    title: notice.title,
    description: `Public Notice: ${notice.title} published on ${format(new Date(notice.publishedDate), "PPP")}`,
  };
}

const queryListItemBySlug = cache(async ({ slug }: { slug: string; locale: TypedLocale }) => {
  const { isEnabled: draft } = await draftMode();
  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "list",
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
      ...(!draft && {
        and: [
          { status: { equals: "published" } },
          { targetAudience: { not_equals: "staff_only" } },
        ],
      }),
    },
  });

  return result.docs?.[0] || null;
});
