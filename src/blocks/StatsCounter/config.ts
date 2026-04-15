import type { Block } from "payload";

export const StatsCounter: Block = {
  slug: "statsCounter",
  interfaceName: "StatsCounterBlock",
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
      name: "stats",
      type: "array",
      label: "Statistics",
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: "value",
          type: "text",
          label: "Value",
          required: true,
          admin: {
            description: "e.g. 17, 100+, 500, 50",
          },
        },
        {
          name: "numericValue",
          type: "number",
          label: "Numeric Value (for animation)",
          required: true,
          admin: {
            description: "The number to count up to (e.g. 17, 100, 500, 50)",
          },
        },
        {
          name: "suffix",
          type: "text",
          label: "Suffix",
          admin: {
            description: "e.g. +, %, years",
          },
        },
        {
          name: "label",
          type: "text",
          label: "Label",
          required: true,
          localized: true,
          admin: {
            description: "e.g. Years Experience, Medical Equipment Introduced",
          },
        },
      ],
    },
    {
      name: "backgroundColor",
      type: "select",
      label: "Background Color",
      defaultValue: "primary",
      options: [
        { label: "Primary Navy", value: "primary" },
        { label: "Dark Navy", value: "dark" },
        { label: "Accent Gold", value: "accent" },
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
        { label: "5 Columns", value: "5" },
        { label: "6 Columns", value: "6" },
      ],
    },
  ],
  labels: {
    plural: "Stats Counters",
    singular: "Stats Counter",
  },
};
