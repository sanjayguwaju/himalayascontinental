import type { Block } from "payload";

export const HomepageProductCategories: Block = {
  slug: "homepageProductCategories",
  interfaceName: "HomepageProductCategoriesBlock",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Section Title",
      defaultValue: "Our Products",
      localized: true,
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Section Subtitle",
      localized: true,
    },
    {
      name: "categories",
      type: "array",
      label: "Product Categories",
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: "icon",
          type: "upload",
          relationTo: "media",
          label: "Category Icon",
          required: true,
        },
        {
          name: "title",
          type: "text",
          label: "Category Title",
          required: true,
          localized: true,
        },
        {
          name: "description",
          type: "textarea",
          label: "Category Description",
          localized: true,
        },
        {
          name: "link",
          type: "text",
          label: "Category Link",
          defaultValue: "/products",
        },
      ],
    },
    {
      name: "backgroundColor",
      type: "select",
      label: "Background Color",
      defaultValue: "lightBlue",
      options: [
        { label: "Light Blue", value: "lightBlue" },
        { label: "White", value: "white" },
        { label: "Dark Blue", value: "darkBlue" },
      ],
    },
    {
      name: "cardStyle",
      type: "select",
      label: "Card Style",
      defaultValue: "rounded",
      options: [
        { label: "Rounded", value: "rounded" },
        { label: "Square", value: "square" },
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
    plural: "Homepage Product Categories",
    singular: "Homepage Product Categories",
  },
};
