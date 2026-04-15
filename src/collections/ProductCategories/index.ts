import type { CollectionConfig } from "payload";
import { revalidateProductCategory, revalidateProductCategoryDelete } from "./hooks/revalidateProductCategory";

export const ProductCategories: CollectionConfig = {
  slug: "product-categories",
  labels: {
    singular: "Product Category",
    plural: "Product Categories",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "hasSubCategories", "order", "updatedAt"],
    group: "Products",
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateProductCategory],
    afterDelete: [revalidateProductCategoryDelete],
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Category Name",
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
        description: "URL-safe identifier. e.g. \"medical-equipments\"",
      },
    },
    {
      name: "hasSubCategories",
      type: "checkbox",
      label: "Has Sub-Categories?",
      defaultValue: false,
      admin: {
        description: "Enable if this category contains sub-categories (e.g. Medical Equipments)",
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Short Description",
      localized: true,
    },
    {
      name: "icon",
      type: "upload",
      relationTo: "media",
      label: "Category Icon / Image",
    },
    {
      name: "order",
      type: "number",
      label: "Display Order",
      admin: {
        description: "Controls the order shown in nav and listings (1 = first)",
      },
      defaultValue: 0,
    },
  ],
  timestamps: true,
};
