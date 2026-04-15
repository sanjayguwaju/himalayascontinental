import type { CollectionConfig } from "payload";

export const ProductSubCategories: CollectionConfig = {
  slug: "product-sub-categories",
  labels: {
    singular: "Product Sub-Category",
    plural: "Product Sub-Categories",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "parentCategory", "slug", "order", "updatedAt"],
    group: "Products",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Sub-Category Name",
      required: true,
      localized: true,
    },
    {
      name: "slug",
      type: "text",
      label: "Slug",
      required: true,
      unique: true,
      admin: {
        description: "e.g. \"critical-care-equipment\"",
      },
    },
    {
      name: "parentCategory",
      type: "relationship",
      relationTo: "product-categories",
      label: "Parent Category",
      required: true,
      filterOptions: {
        hasSubCategories: { equals: true },
      },
      admin: {
        description: "Which top-level category does this belong to?",
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Short Description",
      localized: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Sub-Category Image",
    },
    {
      name: "order",
      type: "number",
      label: "Display Order",
      defaultValue: 0,
      admin: {
        description: "Controls order within the parent category listing",
      },
    },
  ],
  timestamps: true,
};
