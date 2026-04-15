import type { CollectionConfig } from "payload";

export const Brochures: CollectionConfig = {
  slug: "brochures",
  labels: {
    singular: "Brochure",
    plural: "Brochures",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
    group: "Products",
  },
  access: {
    read: () => true,
  },
  upload: {
    mimeTypes: ["application/pdf"],
    adminThumbnail: () => "/icons/pdf.svg",
  },
  fields: [
    {
      name: "slug",
      type: "text",
      label: "Slug",
      required: true,
      unique: true,
      admin: {
        description: "URL-safe identifier. e.g. \"owgels-oxygen-concentrator-brochure\"",
      },
    },
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true,
      localized: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      localized: true,
    },
    {
      name: "alt",
      type: "text",
      label: "Alt Text",
      localized: true,
      admin: {
        description: "Alternative text for accessibility (e.g. \"Download OWGELS Oxygen Concentrator Brochure PDF\")",
      },
    },
  ],
  timestamps: true,
};
