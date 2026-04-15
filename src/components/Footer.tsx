"use client";

import React from "react";
import type { Footer as FooterType } from "@/payload-types";
import { Link } from "@/i18n/routing";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Stethoscope,
  Building2,
  Users,
  ExternalLink,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  medical: <Stethoscope size={14} className="shrink-0" />,
  company: <Building2 size={14} className="shrink-0" />,
  team: <Users size={14} className="shrink-0" />,
  link: <ExternalLink size={14} className="shrink-0" />,
};

interface FooterProps {
  data: FooterType;
}

export function Footer({ data }: FooterProps) {
  const aboutUs = data?.aboutUs;
  const quickContact = data?.quickContact;
  const productsSection = data?.productsSection;
  const contactInfo = data?.contactInfo;
  const copyrightText = data?.copyrightText;

  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About Us Column */}
          <div>
            <h1 className="text-lg font-semibold mb-4">{aboutUs?.title || "About Us"}</h1>
            <p className="text-sm text-gray-400 leading-relaxed">{aboutUs?.description || ""}</p>
          </div>

          {/* Quick Contact Column */}
          <div>
            <h1 className="text-lg font-semibold mb-4">{quickContact?.title || "Quick Contact"}</h1>
            <ul className="space-y-3">
              {quickContact?.links?.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.url || "#"}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {iconMap[link.icon || "link"]}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Column */}
          <div>
            <h1 className="text-lg font-semibold mb-4">{productsSection?.title || "Products"}</h1>
            <ul className="space-y-3">
              {productsSection?.links?.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.url || "#"}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h1 className="text-lg font-semibold mb-4">{contactInfo?.title || "Contact Info"}</h1>
            <ul className="space-y-3">
              {contactInfo?.address && (
                <li className="flex items-start gap-3 text-sm text-gray-400">
                  <MapPin size={16} className="shrink-0 mt-0.5" />
                  <span>{contactInfo.address}</span>
                </li>
              )}
              {contactInfo?.phoneNumbers && (
                <li className="flex items-start gap-3 text-sm text-gray-400">
                  <Phone size={16} className="shrink-0 mt-0.5" />
                  <span style={{ direction: "ltr" }}>{contactInfo.phoneNumbers}</span>
                </li>
              )}
              {contactInfo?.email && (
                <li className="flex items-start gap-3 text-sm text-gray-400">
                  <Mail size={16} className="shrink-0 mt-0.5" />
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="hover:text-white transition-colors"
                  >
                    {contactInfo.email}
                  </a>
                </li>
              )}
              {contactInfo?.website && (
                <li className="flex items-start gap-3 text-sm text-gray-400">
                  <Globe size={16} className="shrink-0 mt-0.5" />
                  <a
                    href={contactInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {contactInfo.website.replace(/^https?:\/\//, "")}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        {copyrightText && (
          <div className="mt-10 pt-6 border-t border-gray-700 text-center">
            <p className="text-sm text-gray-400">{copyrightText}</p>
          </div>
        )}
      </div>
    </footer>
  );
}
