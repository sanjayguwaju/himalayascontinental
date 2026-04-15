import type { Block } from "payload";

export const ProductGrid: Block = {
  slug: "productGrid",
  interfaceName: "ProductGridBlock",
  fields: [
    {
      name: "sectionTitle",
      type: "text",
      label: "Section Title",
      localized: true,
    },
    {
      name: "subtitle",
      type: "text",
      label: "Subtitle",
      localized: true,
    },
    {
      name: "products",
      type: "array",
      label: "Products",
      minRows: 1,
      fields: [
        {
          name: "image",
          type: "upload",
          label: "Product Image",
          relationTo: "media",
          required: true,
        },
        {
          name: "title",
          type: "text",
          label: "Product Title",
          required: true,
          localized: true,
        },
        {
          name: "link",
          type: "text",
          label: "Product Link",
        },
      ],
    },
    {
      name: "columns",
      type: "select",
      label: "Columns",
      defaultValue: "4",
      options: [
        { label: "2 Columns", value: "2" },
        { label: "3 Columns", value: "3" },
        { label: "4 Columns", value: "4" },
      ],
    },
    {
      name: "backgroundColor",
      type: "select",
      label: "Background Color",
      defaultValue: "section",
      options: [
        { label: "White", value: "white" },
        { label: "Light Grey", value: "light" },
        { label: "Section Blue", value: "section" },
      ],
    },
  ],
  labels: {
    plural: "Product Grids",
    singular: "Product Grid",
  },
};
