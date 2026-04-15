"use client";

import React, { useState } from "react";
import { Search, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { format } from "date-fns";
import RichText from "@/components/RichText";
import type { SuchiDarta } from "@/payload-types";

import { useTranslations } from "next-intl";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const SuchiDartaTrackClient: React.FC = () => {
  const t = useTranslations("suchi-darta.track");
  const [trackingCode, setTrackingCode] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<SuchiDarta | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCode.trim()) {
      toast.error(t("error.enterCode"));
      return;
    }

    setIsSearching(true);
    setResult(null);

    try {
      const res = await fetch(`/api/track?code=${encodeURIComponent(trackingCode.trim())}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || t("error.fetchFailed"));
      }

      setResult(data.data);
      toast.success(t("success.retrieved"));
    } catch (error: unknown) {
      toast.error((error as Error).message);
    } finally {
      setIsSearching(false);
    }
  };

  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "approved":
        return (
          <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400 font-semibold rounded-full text-sm">
            {t("status.approved")}
          </span>
        );
      case "rejected":
        return (
          <span className="px-3 py-1 bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400 font-semibold rounded-full text-sm">
            {t("status.rejected")}
          </span>
        );
      case "under_review":
        return (
          <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400 font-semibold rounded-full text-sm">
            {t("status.underReview")}
          </span>
        );
      case "more_info_required":
        return (
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400 font-semibold rounded-full text-sm">
            {t("status.moreInfoRequired")}
          </span>
        );
      case "pending":
      default:
        return (
          <span className="px-3 py-1 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 font-semibold rounded-full text-sm">
            {t("status.pending")}
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <Link
        href="/suchi-darta"
        className="inline-flex items-center text-sm font-medium text-primary hover:underline"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> {t("backToRegistration")}
      </Link>

      <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-lg mx-auto">
        <Input
          placeholder={t("placeholder.enterCode")}
          value={trackingCode}
          onChange={(e) => setTrackingCode(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={isSearching} className="gap-2">
          {isSearching ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
          {t("trackStatus")}
        </Button>
      </form>

      {result && (
        <div className="mt-8 border border-border rounded-xl overflow-hidden bg-card animate-in slide-in-from-bottom-4 shadow-sm">
          <div className="bg-primary/5 border-b p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
                {t("trackingCode")}
              </p>
              <h3 className="text-2xl font-bold font-mono">{result.trackingCode}</h3>
            </div>
            <div className="flex flex-col md:items-end gap-2">
              <StatusBadge status={result.approvalStatus || "pending"} />
              <p className="text-xs text-muted-foreground">
                {t("submittedOn")}:{" "}
                {result.submittedDate
                  ? format(new Date(result.submittedDate as string), "MMM dd, yyyy")
                  : "N/A"}
              </p>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t("applicantName")}</p>
                <p className="font-semibold text-lg">{result.applicantName}</p>
              </div>
              {result.reviewedDate && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t("lastReviewDate")}</p>
                  <p className="font-medium">
                    {result.reviewedDate
                      ? format(
                          new Date(result.reviewedDate as string),
                          "MMMM dd, yyyy 'at' hh:mm a"
                        )
                      : ""}
                  </p>
                </div>
              )}
            </div>

            {/* If there are Remarks left by the Admin */}
            {result.remarks && (
              <div className="bg-muted/50 p-4 rounded-lg border border-border">
                <h4 className="font-semibold text-primary mb-2">{t("remarksFromAdmin")}</h4>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <RichText data={result.remarks} enableGutter={false} />
                </div>
              </div>
            )}

            {/* If Additional Info Requested */}
            {result.approvalStatus === "more_info_required" && result.additionalInfoRequested && (
              <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-500 mb-2">
                  {t("informationRequested")}
                </h4>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <RichText data={result.additionalInfoRequested} enableGutter={false} />
                </div>
              </div>
            )}

            {/* If Approved with Certificate Data */}
            {result.approvalStatus === "approved" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/50 p-4 rounded-lg border">
                <div>
                  <p className="text-sm text-green-700 dark:text-green-500/80 mb-1 font-semibold">
                    {t("certificateNumber")}
                  </p>
                  <p className="font-mono text-lg font-bold text-green-800 dark:text-green-400">
                    {result.approvalCertificateNumber || "N/A"}
                  </p>
                </div>
                {result.approvalValidUntil && (
                  <div>
                    <p className="text-sm text-green-700 dark:text-green-500/80 mb-1 font-semibold">
                      {t("validUntil")}
                    </p>
                    <p className="font-medium text-green-800 dark:text-green-400">
                      {result.approvalValidUntil
                        ? format(new Date(result.approvalValidUntil as string), "MMMM dd, yyyy")
                        : ""}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* If Rejected */}
            {result.approvalStatus === "rejected" && result.rejectionReason && (
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 dark:text-red-500 mb-1">
                  {t("reasonForRejection")}
                </h4>
                <p className="text-red-700 dark:text-red-400 capitalize">
                  {result.rejectionReason.replace(/_/g, " ")}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
