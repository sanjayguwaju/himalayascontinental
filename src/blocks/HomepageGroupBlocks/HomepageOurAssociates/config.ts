import type { Block } from "payload";

export const HomepageOurAssociates: Block = {
  slug: "homepageOurAssociates",
  interfaceName: "HomepageOurAssociatesBlock",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Section Title",
      defaultValue: "Our Associates",
      required: true,
      localized: true,
    },
    {
      name: "groups",
      type: "array",
      label: "Associate Groups",
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: "groupTitle",
          type: "text",
          label: "Group Title",
          required: true,
          admin: {
            description: "e.g., NATIONAL, INTERNATIONAL",
          },
        },
        {
          name: "associates",
          type: "array",
          label: "Associate Logos",
          minRows: 1,
          fields: [
            {
              name: "logo",
              type: "upload",
              relationTo: "media",
              label: "Logo Image",
              required: true,
            },
            {
              name: "linkUrl",
              type: "text",
              label: "Website Link (Optional)",
            },
          ],
        },
      ],
      defaultValue: [
        {
          groupTitle: "NATIONAL",
          associates: [
            // We provide default empty objects so the UI can render mock blocks if needed
            {}, {}, {}, {}
          ],
        },
        {
          groupTitle: "INTERNATIONAL",
          associates: [
            {}, {}, {}, {}
          ],
        },
      ],
    },
    {
      name: "backgroundColor",
      type: "select",
      label: "Background Color",
      defaultValue: "navy",
      options: [
        { label: "Navy Blue", value: "navy" },
        { label: "White", value: "white" },
        { label: "Light Gray", value: "lightGray" },
      ],
    },
  ],
  labels: {
    plural: "Homepage Our Associates",
    singular: "Homepage Our Associate",
  },
};
