import { cn } from "@/utilities/ui";
import { Roboto, Roboto_Condensed } from "next/font/google";
import { Mukta } from "next/font/google";
import { Toaster } from "react-hot-toast";
import React from "react";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto-condensed",
});

const mukta = Mukta({
  subsets: ["latin", "devanagari"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-mukta",
});
import { TypedLocale } from "payload";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { OrganizationJsonLd } from "next-seo";
import { Metadata } from "next";

import { Providers } from "@/providers";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import localization from "@/i18n/localization";
import { getCachedGlobal } from "@/utilities/getGlobals";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { Navigation, Footer as FooterType, Header as HeaderType } from "@/payload-types";
import { ScrollToTop } from "@/components/ScrollToTop";
import { InitTheme } from "@/providers/Theme/InitTheme";

import "../globals.css";

type Args = {
  children: React.ReactNode;
  params: Promise<{
    locale: TypedLocale;
  }>;
};

export const metadata: Metadata = {
  title: "Homepage | Himalayas Continental - Medical Equipment & Healthcare Solutions",
  description:
    "Welcome to Himalayas Continental. We provide quality medical equipment and healthcare solutions in Nepal.",
};

export default async function RootLayout({ children, params }: Args) {
  const { locale } = await params;
  const currentLocale = localization.locales.find((loc) => loc.code === locale);
  const direction = currentLocale?.rtl ? "rtl" : "ltr";

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages();

  const [headerData, navData, footerData] = await Promise.all([
    getCachedGlobal("header", 1, locale)() as Promise<HeaderType>,
    getCachedGlobal("navigation", 1, locale)() as Promise<Navigation>,
    getCachedGlobal("footer", 1, locale)() as Promise<FooterType>,
  ]);

  return (
    <html
      className={cn(roboto.variable, robotoCondensed.variable, mukta.variable)}
      lang={locale}
      dir={direction}
      suppressHydrationWarning
    >
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <InitTheme />
      </head>
      <body className={cn(locale === "ne" ? "font-nepali" : "font-roboto", "antialiased")}>
        <Toaster />
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <NuqsAdapter>
              <Header data={headerData} />
              <Navbar data={navData} />
              <ScrollToTop />
              {children}
              <Footer data={footerData} />
            </NuqsAdapter>
          </NextIntlClientProvider>
        </Providers>
        <OrganizationJsonLd
          type="Organization"
          logo={`${process.env.NEXT_PUBLIC_SITE_URL}${process.env.NEXT_PUBLIC_LOGO_URL}`}
          name={process.env.NEXT_PUBLIC_COMPANY_NAME || ""}
          url={process.env.NEXT_PUBLIC_SITE_URL || ""}
          contactPoint={[
            {
              telephone: process.env.NEXT_PUBLIC_PHONE_NUMBER || "",
              contactType: "customer service",
            },
          ]}
          sameAs={[
            process.env.NEXT_PUBLIC_SOCIAL_X || "",
            process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || "",
          ].filter(Boolean)}
        />
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
