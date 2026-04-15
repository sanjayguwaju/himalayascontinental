"use client";

import React from "react";
import type { ServicePillarsBlock as ServicePillarsBlockProps } from "@/payload-types";
import { cn } from "@/utilities/ui";
import Link from "next/link";

export const ServicePillarsBlock: React.FC<ServicePillarsBlockProps> = ({
  sectionTitle,
  pillars,
  backgroundColor = "light",
}) => {
  const bgClasses = {
    light: "bg-[#f5f7fa]",
    white: "bg-white",
    section: "bg-[#eef2f7]",
  };

  if (!pillars || pillars.length === 0) return null;

  return (
    <section className={cn("py-16 px-4 md:px-8", bgClasses[backgroundColor as keyof typeof bgClasses])}>
      <div className="max-w-[1200px] mx-auto">
        {sectionTitle && (
          <h2 
            className="text-[30px] md:text-[34px] font-bold text-center mb-12"
            style={{ fontFamily: "'Playfair Display', serif", color: "#003087" }}
          >
            {sectionTitle}
          </h2>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {pillars.map((pillar, index) => (
            <div key={index} className="text-center">
              {pillar.link ? (
                <Link 
                  href={pillar.link}
                  className="group block"
                >
                  <h3 
                    className="text-[24px] md:text-[28px] font-normal transition-colors duration-300 group-hover:text-[#e8a020] group-hover:underline"
                    style={{ fontFamily: "'Playfair Display', serif", color: "#003087" }}
                  >
                    {pillar.title}
                  </h3>
                </Link>
              ) : (
                <h3 
                  className="text-[24px] md:text-[28px] font-normal"
                  style={{ fontFamily: "'Playfair Display', serif", color: "#003087" }}
                >
                  {pillar.title}
                </h3>
              )}
              
              {pillar.description && (
                <p 
                  className="mt-3 text-[15px] leading-[1.6]"
                  style={{ fontFamily: "'Open Sans', sans-serif", color: "#555555" }}
                >
                  {pillar.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
