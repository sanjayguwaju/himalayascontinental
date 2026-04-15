"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";
import { format, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";
import Link from "next/link";
import { NepaliDateInput } from "@/components/ui/NepaliDateInput";
import { formatBSDate } from "@/lib/bs-date";
import type { Category, List as ListType, Media } from "@/payload-types";

type Props = {
  categories: Category[];
  notices: ListType[];
  pagination: {
    totalDocs: number;
    totalPages: number;
    page: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};

export const ListClient: React.FC<Props> = ({ categories, notices, pagination }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = (params.locale as "en" | "ne") || "en";

  const initialCategory = searchParams.get("category") || "all";
  // Find the actual ID if a slug was provided
  const resolvedCategory =
    categories.find((cat) => cat.slug === initialCategory || cat.id === initialCategory)?.id ||
    initialCategory;

  const [title, setTitle] = useState(searchParams.get("title") || "");
  const [category, setCategory] = useState(resolvedCategory);

  const fromDateParam = searchParams.get("fromDate");
  const toDateParam = searchParams.get("toDate");

  const [fromDate, setFromDate] = useState<Date | undefined>(
    fromDateParam ? new Date(fromDateParam) : undefined
  );
  const [toDate, setToDate] = useState<Date | undefined>(
    toDateParam ? new Date(toDateParam) : undefined
  );

  useEffect(() => {
    setTitle(searchParams.get("title") || "");
    const rawCat = searchParams.get("category");
    const resolved =
      categories.find((cat) => cat.slug === rawCat || cat.id === rawCat)?.id || rawCat || "all";
    setCategory(resolved);
    const dFrom = searchParams.get("fromDate");
    const dTo = searchParams.get("toDate");
    setFromDate(dFrom ? new Date(dFrom) : undefined);
    setToDate(dTo ? new Date(dTo) : undefined);
  }, [searchParams, categories]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (title) params.set("title", title);
    if (category && category !== "all") params.set("category", category);
    if (fromDate) params.set("fromDate", fromDate.toISOString());
    if (toDate) params.set("toDate", toDate.toISOString());
    params.set("page", "1"); // Reset to page 1 on new search
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const getPreviewMedia = (notice: ListType | null): Media | null => {
    if (!notice) return null;

    // 1. Prioritize the new main document field
    if (notice.mainDocument && typeof notice.mainDocument === "object") {
      return notice.mainDocument as Media;
    }

    // 2. Check traditional image
    if (notice.image && typeof notice.image === "object") {
      return notice.image as Media;
    }

    // 3. Fallback to attachments array
    if (notice.attachments && notice.attachments.length > 0) {
      const firstAttachment = notice.attachments[0]?.file;
      if (firstAttachment && typeof firstAttachment === "object") {
        return firstAttachment as Media;
      }
    }
    return null;
  };

  const applyPreset = (preset: string) => {
    const today = new Date();
    let newFromDate: Date | undefined;
    let newToDate: Date | undefined = today;

    switch (preset) {
      case "this-week":
        newFromDate = startOfWeek(today, { weekStartsOn: 0 });
        newToDate = endOfWeek(today, { weekStartsOn: 0 });
        break;
      case "this-month":
        newFromDate = startOfMonth(today);
        newToDate = endOfMonth(today);
        break;
      case "last-30":
        newFromDate = subDays(today, 30);
        newToDate = today;
        break;
    }

    if (newFromDate) {
      setFromDate(newFromDate);
      setToDate(newToDate);

      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("fromDate", newFromDate.toISOString());
      if (newToDate) newParams.set("toDate", newToDate.toISOString());
      newParams.set("page", "1");
      router.push(`${pathname}?${newParams.toString()}`);
    }
  };

  const handleReset = () => {
    setTitle("");
    setCategory("all");
    setFromDate(undefined);
    setToDate(undefined);
    router.push(pathname);
  };

  const selectedCategoryDoc = categories.find(
    (cat) => cat.id === category || cat.slug === category
  );
  const displayTitle = selectedCategoryDoc ? selectedCategoryDoc.title : "Notices";

  return (
    <div className="container py-12 max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight inline-block pb-2 border-b-4 border-primary capitalize">
          {displayTitle}
        </h1>
        <p className="text-muted-foreground mt-2">
          Showing {notices.length} of {pagination.totalDocs} items
        </p>
      </div>

      <div className="bg-muted/30 p-6 rounded-lg mb-8 border border-border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Category:</label>
            <Select value={category || "all"} onValueChange={setCategory}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <NepaliDateInput
              label={currentLocale === "ne" ? "मिति देखि" : "From Date"}
              labelNe="मिति देखि"
              name="fromDate"
              value={fromDate ? fromDate.toISOString().split("T")[0] : ""}
              onChange={(iso) => setFromDate(iso ? new Date(iso) : undefined)}
              locale={currentLocale}
            />
          </div>

          <div className="space-y-2">
            <NepaliDateInput
              label={currentLocale === "ne" ? "मिति सम्म" : "To Date"}
              labelNe="मिति सम्म"
              name="toDate"
              value={toDate ? toDate.toISOString().split("T")[0] : ""}
              onChange={(iso) => setToDate(iso ? new Date(iso) : undefined)}
              locale={currentLocale}
              minDate={fromDate ? fromDate.toISOString().split("T")[0] : undefined}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 mt-2">
          <div className="flex gap-2">
            <span className="text-sm font-medium text-muted-foreground mr-2 mt-2">
              Quick Ranges:
            </span>
            <Button variant="outline" size="sm" onClick={() => applyPreset("this-week")}>
              This Week
            </Button>
            <Button variant="outline" size="sm" onClick={() => applyPreset("this-month")}>
              This Month
            </Button>
            <Button variant="outline" size="sm" onClick={() => applyPreset("last-30")}>
              Last 30 Days
            </Button>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSearch} className="bg-green-600 hover:bg-green-700 text-white">
            Search
          </Button>
          <Button onClick={handleReset} variant="destructive">
            Reset
          </Button>
        </div>
      </div>

      <div className="border rounded-lg bg-card shadow-sm divide-y">
        {notices.length > 0 ? (
          notices.map((notice) => {
            const media = getPreviewMedia(notice);
            return (
              <div
                key={notice.id}
                className="p-4 flex items-start gap-4 hover:bg-muted/20 transition-colors"
              >
                <div className="mt-1 shrink-0">
                  {media?.url ? (
                    <Link
                      href={`/list/${notice.slug}`}
                      title="Open Document"
                      className="border border-red-500 rounded p-2 text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center cursor-pointer select-none"
                    >
                      <Download className="h-6 w-6 pointer-events-none" />
                    </Link>
                  ) : (
                    <Link
                      href={`/list/${notice.slug}`}
                      title="View Details"
                      className="border border-red-500 rounded p-2 text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center cursor-pointer select-none"
                    >
                      <Download className="h-6 w-6" />
                    </Link>
                  )}
                </div>
                <div>
                  {media?.url ? (
                    <Link
                      href={`/list/${notice.slug}`}
                      className="text-lg font-medium hover:underline hover:text-primary transition-colors block text-left first-letter:uppercase"
                    >
                      {notice.title}
                    </Link>
                  ) : (
                    <Link
                      href={`/list/${notice.slug}`}
                      className="text-lg font-medium hover:underline hover:text-primary transition-colors block text-left first-letter:uppercase"
                    >
                      {notice.title}
                    </Link>
                  )}
                  <p className="text-sm text-primary mt-1">
                    {currentLocale === "ne" ? "प्रकाशित मिति" : "Published Date"}:{" "}
                    {formatBSDate(notice.publishedDate, currentLocale, "full")}{" "}
                    <span className="text-muted-foreground ml-2 text-xs">
                      (AD: {format(new Date(notice.publishedDate), "yyyy-MM-dd")})
                    </span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            No items found matching your search.
          </div>
        )}
      </div>

      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={!pagination.hasPrevPage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm border px-4 py-2 rounded-md bg-muted/30">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={!pagination.hasNextPage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
