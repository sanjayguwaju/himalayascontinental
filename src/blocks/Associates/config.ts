import type { Block } from "payload";

export const Associates: Block = {
  slug: "associates",
  interfaceName: "AssociatesBlock",
  fields: [
    {
      name: "sectionTitle",
      type: "text",
      label: "Section Title",
      defaultValue: "Our Associates",
      localized: true,
    },
    {
      name: "subtitle",
      type: "text",
      label: "Subtitle",
      localized: true,
    },
    {
      name: "nationalSectionTitle",
      type: "text",
      label: "National Section Title",
      defaultValue: "national",
      localized: true,
    },
    {
      name: "nationalAssociates",
      type: "array",
      label: "National Associates",
      minRows: 1,
      fields: [
        {
          name: "logo",
          type: "upload",
          label: "Logo",
          relationTo: "media",
          required: true,
        },
        {
          name: "name",
          type: "text",
          label: "Name",
          required: true,
        },
        {
          name: "link",
          type: "text",
          label: "Link URL",
        },
      ],
    },
    {
      name: "internationalSectionTitle",
      type: "text",
      label: "International Section Title",
      defaultValue: "INTERnational",
      localized: true,
    },
    {
      name: "internationalAssociates",
      type: "array",
      label: "International Associates",
      minRows: 1,
      fields: [
        {
          name: "logo",
          type: "upload",
          label: "Logo",
          relationTo: "media",
          required: true,
        },
        {
          name: "name",
          type: "text",
          label: "Name",
          required: true,
        },
        {
          name: "link",
          type: "text",
          label: "Link URL",
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
  ],
  labels: {
    plural: "Associates",
    singular: "Associates",
  },
};
