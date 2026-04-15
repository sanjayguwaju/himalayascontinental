"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Header as HeaderType, Media } from "@/payload-types";
import { getMediaUrl } from "@/utilities/getMediaUrl";
import { LanguageDropdown } from "./LanguageDropdown";

interface HeaderProps {
  data: HeaderType;
}

export function Header({ data }: HeaderProps) {
  const logo = data.logo && typeof data.logo === "object" ? (data.logo as Media) : null;
  const logoHeight = data.logoHeight || 64;

  const logoUrl = logo ? getMediaUrl(logo.url) : null;

  return (
    <header className="w-full bg-white border-b border-border">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Left: Logo */}
          <Link href="/" aria-label="Go to homepage" className="flex items-center gap-3">
            <div
              className="relative"
              style={{
                height: `${logoHeight}px`,
                width: "auto",
                aspectRatio: logo ? undefined : "1/1",
              }}
            >
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={logo?.alt || "Logo"}
                  height={logoHeight}
                  width={logoHeight * 3}
                  className="object-contain h-full w-auto"
                  priority
                />
              ) : (
                <div
                  className="bg-gray-100 rounded flex items-center justify-center"
                  style={{ height: `${logoHeight}px`, width: `${logoHeight}px` }}
                >
                  <span className="text-xs text-gray-400">Logo</span>
                </div>
              )}
            </div>
          </Link>

          {/* Right: Contact Us + Language */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact-us"
              className="text-sm md:text-base font-medium text-foreground hover:text-primary transition-colors"
            >
              Contact Us
            </Link>
            <LanguageDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}
