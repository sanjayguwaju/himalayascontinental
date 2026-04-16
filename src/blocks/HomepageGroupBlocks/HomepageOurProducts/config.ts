import type { Block } from "payload";

export const HomepageOurProducts: Block = {
  slug: "homepageOurProducts",
  interfaceName: "HomepageOurProductsBlock",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Section Title",
      defaultValue: "OUR PRODUCTS",
      localized: true,
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Section Subtitle",
      localized: true,
    },
    {
      name: "productSource",
      type: "radio",
      label: "Product Source",
      defaultValue: "manual",
      options: [
        { label: "Manual Entry", value: "manual" },
        { label: "From Products Collection", value: "collection" },
      ],
    },
    {
      name: "relatedProducts",
      type: "relationship",
      relationTo: "products",
      label: "Select Products",
      hasMany: true,
      maxDepth: 2,
      admin: {
        condition: (data) => data?.productSource === "collection",
        description: "Select products from the Products collection",
      },
    },
    {
      name: "products",
      type: "array",
      label: "Manual Products",
      minRows: 1,
      maxRows: 20,
      admin: {
        condition: (data) => data?.productSource === "manual",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: "Product Image",
          required: true,
        },
        {
          name: "title",
          type: "text",
          label: "Product Name",
          required: true,
          localized: true,
        },
        {
          name: "link",
          type: "text",
          label: "Product Link",
          defaultValue: "/products",
        },
      ],
    },
    {
      name: "columns",
      type: "select",
      label: "Columns Per Row",
      defaultValue: "5",
      options: [
        { label: "3 Columns", value: "3" },
        { label: "4 Columns", value: "4" },
        { label: "5 Columns", value: "5" },
      ],
    },
    {
      name: "backgroundColor",
      type: "select",
      label: "Background Color",
      defaultValue: "white",
      options: [
        { label: "White", value: "white" },
        { label: "Light Gray", value: "lightGray" },
        { label: "Light Blue", value: "lightBlue" },
      ],
    },
    {
      name: "showViewAllButton",
      type: "checkbox",
      label: "Show View All Button",
      defaultValue: false,
    },
    {
      name: "viewAllButton",
      type: "group",
      label: "View All Button",
      admin: {
        condition: (data) => data?.showViewAllButton === true,
      },
      fields: [
        {
          name: "label",
          type: "text",
          label: "Button Label",
          defaultValue: "View All Products",
          localized: true,
        },
        {
          name: "link",
          type: "text",
          label: "Button Link",
          defaultValue: "/products",
        },
      ],
    },
  ],
  labels: {
    plural: "Homepage Our Products",
    singular: "Homepage Our Products",
  },
};
