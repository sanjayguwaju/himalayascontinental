import type { Block } from "payload";

export const OurCompanies: Block = {
  slug: "ourCompanies",
  interfaceName: "OurCompaniesBlock",
  fields: [
    {
      name: "sectionTitle",
      type: "text",
      label: "Section Title",
      defaultValue: "Our Companies",
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
      name: "companies",
      type: "array",
      label: "Companies",
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: "logo",
          type: "upload",
          label: "Company Logo",
          relationTo: "media",
          required: true,
        },
        {
          name: "name",
          type: "text",
          label: "Company Name",
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
          name: "link",
          type: "text",
          label: "Read More Link",
        },
      ],
    },
    {
      name: "columns",
      type: "select",
      label: "Columns",
      defaultValue: "3",
      options: [
        { label: "2 Columns", value: "2" },
        { label: "3 Columns", value: "3" },
        { label: "4 Columns", value: "4" },
      ],
    },
  ],
  labels: {
    plural: "Our Companies",
    singular: "Our Company",
  },
};
