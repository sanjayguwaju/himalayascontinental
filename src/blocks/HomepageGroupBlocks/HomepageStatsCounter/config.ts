import type { Block } from "payload";

export const HomepageStatsCounter: Block = {
  slug: "homepageStatsCounter",
  interfaceName: "HomepageStatsCounterBlock",
  fields: [
    {
      name: "stats",
      type: "array",
      label: "Statistics Cards",
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: "value",
          type: "text",
          label: "Statistic Value",
          required: true,
          admin: {
            description: "e.g., '12', '150+', '198,135'",
          },
        },
        {
          name: "label",
          type: "text",
          label: "Statistic Label",
          required: true,
          localized: true,
          admin: {
            description: "e.g., 'Year\\'s Experience'",
          },
        },
      ],
      defaultValue: [
        { value: "12", label: "Year's Experience" },
        { value: "150+", label: "Medical Equipment Introduced" },
        { value: "198,135", label: "Happy Clients" },
        { value: "187", label: "Sub Dealers" },
      ],
    },
    {
      name: "backgroundColor",
      type: "select",
      label: "Background Color",
      defaultValue: "lightGray",
      options: [
        { label: "Light Gray", value: "lightGray" },
        { label: "White", value: "white" },
        { label: "Navy Blue", value: "navy" },
      ],
    },
  ],
  labels: {
    plural: "Homepage Stats Counters",
    singular: "Homepage Stats Counter",
  },
};
