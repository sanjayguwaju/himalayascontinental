import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import React from "react";
import { SuchiDartaClient } from "./SuchiDartaClient";

export const metadata: Metadata = {
  title: "Suchi Darta Registration | Himalayas Continental",
  description: "Apply for Vendor/Supplier Registration — Himalayas Continental",
};

export default async function Page() {
  const t = await getTranslations("suchi-darta");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col pt-8 pb-16">
      <div className="container max-w-4xl mx-auto">
        <div className="mb-8 text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
            {t("page-title")}
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">{t("page-subtitle")}</p>
        </div>
        <div className="bg-card w-full shadow-sm border rounded-xl p-6 md:p-8">
          <SuchiDartaClient />
        </div>
      </div>
    </div>
  );
}
