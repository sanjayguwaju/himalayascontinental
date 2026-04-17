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
    mimeTypes: [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    adminThumbnail: ({ doc }): string => {
      const mimeType = doc.mimeType as string;
      if (mimeType?.startsWith("image/")) return doc.url as string;
      if (mimeType === "application/pdf") return "/icons/pdf.svg";
      if (mimeType?.includes("word")) return "/icons/doc.svg";
      return "/icons/file.svg";
    },
  },
  fields: [
    {
      name: "slug",
      type: "text",
      label: "Slug",
      required: true,
      unique: true,
      admin: {
        description: 'URL-safe identifier. e.g. "owgels-oxygen-concentrator-brochure"',
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
        description:
          'Alternative text for accessibility (e.g. "Download OWGELS Oxygen Concentrator Brochure PDF")',
      },
    },
  ],
  timestamps: true,
};
