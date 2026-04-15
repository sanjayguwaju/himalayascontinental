"use client";

import React from "react";
import type { HomepageMapBlock } from "@/payload-types";

export const HomepageMapBlockComponent: React.FC<HomepageMapBlock> = ({
  mapEmbedUrl,
  height = 450,
}) => {
  if (!mapEmbedUrl) return null;

  return (
    <section className="w-full relative bg-gray-100">
      <iframe
        src={mapEmbedUrl}
        width="100%"
        height={height}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Maps Location"
        className="block"
      />
    </section>
  );
};
