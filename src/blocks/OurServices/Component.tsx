"use client";

import React from "react";
import type { OurServicesBlock as OurServicesBlockProps } from "@/payload-types";
import {
  Stethoscope,
  Baby,
  Pill,
  GraduationCap,
  Accessibility,
  Contact,
  FlaskConical,
  User,
  HeartPulse,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// ─── Icon Map ─────────────────
const iconMap: Record<string, React.ElementType> = {
  opd: Stethoscope,
  ecg: HeartPulse,
  immunization: HeartPulse,
  lab: FlaskConical,
  education: GraduationCap,
  insurance: Contact,
  physiotherapy: Accessibility,
  motherhood: Baby,
  neonatal: User,
  pill: Pill,
};

const getIcon = (title: string, iconSlug?: string | null) => {
  const t = title.toLowerCase();
  if (t.includes("opd")) return Stethoscope;
  if (t.includes("ecg") || t.includes("immunization")) return HeartPulse;
  if (t.includes("lab")) return FlaskConical;
  if (t.includes("education")) return GraduationCap;
  if (t.includes("insurance")) return Contact;
  if (t.includes("physio")) return Accessibility;
  if (t.includes("motherhood")) return Baby;
  if (t.includes("neonatal")) return User;
  if (iconSlug && iconMap[iconSlug]) return iconMap[iconSlug];
  return Pill;
};

// ─── Service Card ─────────────────
type ServiceItem = NonNullable<OurServicesBlockProps["services"]>[0];

const ServiceCard: React.FC<{
  service: ServiceItem;
  index: number;
}> = ({ service, index }) => {
  const Icon = getIcon(service.title, service.icon as string);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Link href={`/our-services/${service.id}`} className="block h-full group">
        <div className="h-full bg-background rounded-2xl shadow-sm border border-border group-hover:border-primary/20 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-inner">
            <Icon className="w-8 h-8 text-primary" strokeWidth={2} />
          </div>

          <h3 className="text-[15px] md:text-[16px] font-bold text-foreground leading-[1.3] group-hover:text-primary transition-colors">
            {service.title}
          </h3>

          <div className="mt-3 w-8 h-[2px] bg-primary/20 group-hover:w-12 group-hover:bg-primary transition-all duration-300 rounded-full" />
        </div>
      </Link>
    </motion.div>
  );
};

// ─── Main Block ─────────────────
export const OurServicesBlock: React.FC<OurServicesBlockProps> = ({
  title,
  subtitle,
  services,
  isVisibleOnHomepage,
}) => {
  if (!services?.length) return null;

  const displayedServices = isVisibleOnHomepage ? services.slice(0, 8) : services;

  return (
    <section className="w-full bg-secondary py-16">
      <div className="container px-0">
        <div className="mb-10 text-center">
          {title && (
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-accent rounded-full shrink-0 shadow-[0_4px_12px_rgba(225,29,72,0.2)]"></span>
              {title}
            </h2>
          )}

          {subtitle && (
            <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto italic font-medium">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {displayedServices.map((service, index) => (
            <ServiceCard key={service.id ?? index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
