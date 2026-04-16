"use client";

import React, { useState, useEffect, useRef } from "react";
import type { StatsCounterBlock as StatsCounterBlockProps } from "@/payload-types";
import { cn } from "@/utilities/ui";

interface StatItemProps {
  numericValue: number;
  suffix?: string;
  label: string;
  inView: boolean;
}

const StatItem: React.FC<StatItemProps> = ({ numericValue, suffix, label, inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    const duration = 2000; // 2 seconds animation
    const startValue = 0;
    const endValue = numericValue;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, numericValue]);

  return (
    <div className="text-center">
      <div 
        className="text-[36px] md:text-[44px] font-bold"
        style={{ fontFamily: "var(--font-roboto-condensed), sans-serif", color: "#ffffff" }}
      >
        {count}{suffix || ""}
      </div>
      <div 
        className="text-[14px] mt-2"
        style={{ 
          fontFamily: "var(--font-roboto), sans-serif", 
          color: "rgba(255,255,255,0.8)",
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const StatsCounterBlock: React.FC<StatsCounterBlockProps> = ({
  sectionTitle,
  subtitle,
  stats,
  backgroundColor = "primary",
  columns = "4",
}) => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const bgClasses = {
    primary: "bg-[#003087]",
    dark: "bg-[#1a2a4a]",
    accent: "bg-[#e8a020]",
  };

  const gridClasses = {
    "2": "grid-cols-1 sm:grid-cols-2",
    "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    "4": "grid-cols-2 lg:grid-cols-4",
    "5": "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
    "6": "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!stats || stats.length === 0) return null;

  return (
    <section 
      ref={sectionRef}
      className={cn("py-16 px-4 md:px-8", bgClasses[backgroundColor as keyof typeof bgClasses])}
    >
      <div className="max-w-[1200px] mx-auto">
        {(sectionTitle || subtitle) && (
          <div className="text-center mb-12">
            {sectionTitle && (
              <h2 
                className="text-[28px] md:text-[32px] font-bold mb-2"
                style={{ fontFamily: "var(--font-roboto-condensed), sans-serif", color: "#ffffff" }}
              >
                {sectionTitle}
              </h2>
            )}
            {subtitle && (
              <p 
                className="text-[16px]"
                style={{ fontFamily: "var(--font-roboto), sans-serif", color: "rgba(255,255,255,0.8)" }}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className={cn("grid gap-8 md:gap-12", gridClasses[columns as keyof typeof gridClasses])}>
          {stats.map((stat: { value: string; numericValue: number; suffix?: string | null | undefined; label: string; id?: string | null | undefined; }, index: number) => (
            <StatItem
              key={stat.id || index}
              numericValue={stat.numericValue}
              suffix={stat.suffix || ""}
              label={stat.label}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
