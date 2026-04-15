import type { Block } from "payload";

export const ServicePillars: Block = {
  slug: "servicePillars",
  interfaceName: "ServicePillarsBlock",
  fields: [
    {
      name: "sectionTitle",
      type: "text",
      label: "Section Title",
      localized: true,
    },
    {
      name: "pillars",
      type: "array",
      label: "Service Pillars",
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: "title",
          type: "text",
          label: "Title",
          required: true,
          localized: true,
        },
        {
          name: "link",
          type: "text",
          label: "Link URL",
        },
        {
          name: "description",
          type: "textarea",
          label: "Description",
          localized: true,
        },
      ],
    },
    {
      name: "backgroundColor",
      type: "select",
      label: "Background Color",
      defaultValue: "light",
      options: [
        { label: "Light Grey", value: "light" },
        { label: "White", value: "white" },
        { label: "Section Blue", value: "section" },
      ],
    },
  ],
  labels: {
    plural: "Service Pillars",
    singular: "Service Pillar",
  },
};
