import type { Block } from "payload";
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const CompanyProfile: Block = {
  slug: "companyProfile",
  interfaceName: "CompanyProfileBlock",
  fields: [
    {
      name: "sectionTitle",
      type: "text",
      label: "Section Title",
      defaultValue: "Company Profile",
      localized: true,
    },
    {
      name: "introText",
      type: "textarea",
      label: "Introduction Text",
      localized: true,
    },
    {
      name: "tabs",
      type: "array",
      label: "Tabs",
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: "tabLabel",
          type: "text",
          label: "Tab Label",
          required: true,
          localized: true,
        },
        {
          name: "content",
          type: "richText",
          label: "Tab Content",
          localized: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ];
            },
          }),
        },
      ],
    },
    {
      name: "backgroundColor",
      type: "select",
      label: "Background Color",
      defaultValue: "primary",
      options: [
        { label: "Primary (Blue)", value: "primary" },
        { label: "White", value: "white" },
        { label: "Gray", value: "gray" },
      ],
    },
  ],
  labels: {
    plural: "Company Profile Blocks",
    singular: "Company Profile Block",
  },
};
