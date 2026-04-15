import React from "react";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export default async function NotFound() {
  const t = await getTranslations();

  return (
    <div className="container py-28">
      <div className="prose max-w-none">
        <h1>404</h1>
        <p className="mb-4">{t("page-not-found")}</p>
      </div>
      <Button asChild variant="default">
        <Link href="/">{t("go-home")}</Link>
      </Button>
    </div>
  );
}
