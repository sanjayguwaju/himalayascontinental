import type { Block } from "payload";
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const Company: Block = {
  slug: "company",
  interfaceName: "CompanyBlock",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Company Name",
      required: true,
      localized: true,
      defaultValue: "Himalayas Pashmina Pvt. Ltd.",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Company Image",
      required: true,
    },
    {
      name: "content",
      type: "richText",
      label: "Company Description",
      required: true,
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
    {
      name: "backgroundColor",
      type: "select",
      label: "Background Color",
      defaultValue: "primary",
      options: [
        { label: "Primary (Blue)", value: "primary" },
        { label: "White", value: "white" },
        { label: "Light", value: "light" },
      ],
    },
  ],
  labels: {
    plural: "Company Blocks",
    singular: "Company Block",
  },
};
