import type { CollectionConfig } from "payload";
import { revalidateProduct, revalidateProductDelete } from "./hooks/revalidateProduct";

export const Products: CollectionConfig = {
  slug: "products",
  labels: {
    singular: "Product",
    plural: "Products",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "subCategory", "featured", "inStock", "updatedAt"],
    group: "Products",
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateProduct],
    afterDelete: [revalidateProductDelete],
  },
  fields: [
    // ── BASIC INFO ──────────────────────────────────────────
    {
      name: "name",
      type: "text",
      label: "Product Name",
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
        description: 'Auto-generate from name. e.g. "owgels-oxygen-concentrator-10l"',
      },
    },
    {
      name: "brand",
      type: "text",
      label: "Brand / Manufacturer",
      localized: true,
    },
    {
      name: "sku",
      type: "text",
      label: "SKU / Model Number",
    },

    // ── CATEGORIZATION ──────────────────────────────────────
    {
      name: "category",
      type: "relationship",
      relationTo: "product-categories",
      label: "Product Category",
      required: true,
      admin: {
        description: "Top-level category: Medical Equipments / International Business / Medicines",
      },
    },
    {
      name: "subCategory",
      type: "relationship",
      relationTo: "product-sub-categories",
      label: "Product Sub-Category",
      required: false,
      filterOptions: ({ data }) => {
        if (!data?.category) return false;
        return {
          parentCategory: { equals: data.category },
        };
      },
      admin: {
        description: "Only required if the category has sub-categories (e.g. Medical Equipments)",
        condition: (data) => data?.category !== null,
      },
    },

    // ── IMAGES ──────────────────────────────────────────────
    {
      name: "thumbnail",
      type: "upload",
      relationTo: "media",
      label: "Thumbnail Image",
      required: true,
      admin: {
        description: "Square thumbnail shown in product grid (150x150px ideal)",
      },
    },
    {
      name: "gallery",
      type: "array",
      label: "Product Image Gallery",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "alt",
          type: "text",
          label: "Alt Text",
        },
      ],
    },

    // ── CONTENT ─────────────────────────────────────────────
    {
      name: "shortDescription",
      type: "textarea",
      label: "Short Description",
      localized: true,
      admin: {
        description: "Brief summary shown in listing cards (1–2 sentences)",
      },
    },
    {
      name: "description",
      type: "richText",
      label: "Full Product Description",
      localized: true,
    },
    {
      name: "specifications",
      type: "array",
      label: "Technical Specifications",
      fields: [
        {
          name: "label",
          type: "text",
          label: "Spec Label",
          localized: true,
        },
        {
          name: "value",
          type: "text",
          label: "Spec Value",
          localized: true,
        },
      ],
    },

    // ── FLAGS ────────────────────────────────────────────────
    {
      name: "featured",
      type: "checkbox",
      label: "Featured Product?",
      defaultValue: false,
      admin: {
        description: "Show in homepage product carousel/slider",
      },
    },
    {
      name: "inStock",
      type: "checkbox",
      label: "In Stock?",
      defaultValue: true,
    },
    {
      name: "isNew",
      type: "checkbox",
      label: "New Arrival?",
      defaultValue: false,
    },

    // ── BROCHURE ─────────────────────────────────────────────
    {
      name: "hasBrochure",
      type: "checkbox",
      label: "Has Brochure?",
      defaultValue: false,
    },
    {
      name: "brochure",
      type: "relationship",
      relationTo: "brochures",
      label: "Product Brochure",
      admin: {
        condition: (data) => data?.hasBrochure === true,
        description: "Select a brochure for this product",
      },
    },

    // ── SPECIFICATIONS TABLE ─────────────────────────────────
    {
      name: "hasSpecificationsTable",
      type: "checkbox",
      label: "Has Specifications Table?",
      defaultValue: false,
      admin: {
        description: "Enable to show a detailed specifications table",
      },
    },
    {
      name: "specificationsTable",
      type: "group",
      label: "Specifications Table",
      admin: {
        condition: (data) => data?.hasSpecificationsTable === true,
      },
      fields: [
        {
          name: "tableTitle",
          type: "text",
          label: "Table Title",
          defaultValue: "Technical Specifications",
          localized: true,
        },
        {
          name: "headers",
          type: "array",
          label: "Table Headers",
          minRows: 1,
          fields: [
            {
              name: "header",
              type: "text",
              label: "Header Text",
              required: true,
              localized: true,
            },
          ],
        },
        {
          name: "rows",
          type: "array",
          label: "Table Rows",
          fields: [
            {
              name: "cells",
              type: "array",
              label: "Row Cells",
              fields: [
                {
                  name: "value",
                  type: "text",
                  label: "Cell Value",
                  localized: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  timestamps: true,
};
