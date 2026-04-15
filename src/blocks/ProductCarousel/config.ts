import type { Block } from "payload";

export const ProductCarousel: Block = {
  slug: "productCarousel",
  interfaceName: "ProductCarouselBlock",
  fields: [
    {
      name: "sectionTitle",
      type: "text",
      label: "Section Title",
      defaultValue: "OUR PRODUCTS",
      required: true,
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
          name: "name",
          type: "text",
          label: "Product Name",
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
      name: "backgroundColor",
      type: "select",
      label: "Background Color",
      defaultValue: "white",
      options: [
        { label: "White", value: "white" },
        { label: "Light Grey", value: "light" },
        { label: "Section Blue", value: "section" },
      ],
    },
    {
      name: "showViewAllButton",
      type: "checkbox",
      label: "Show View All Button",
      defaultValue: false,
    },
    {
      name: "viewAllLink",
      type: "text",
      label: "View All Link",
      admin: {
        condition: (data, siblingData) => siblingData?.showViewAllButton,
      },
    },
  ],
  labels: {
    plural: "Product Carousels",
    singular: "Product Carousel",
  },
};
