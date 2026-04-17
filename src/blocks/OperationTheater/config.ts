import type { Block } from "payload";
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const OperationTheater: Block = {
  slug: "operationTheater",
  interfaceName: "OperationTheaterBlock",
  fields: [
    {
      name: "sectionTitle",
      type: "text",
      label: "Section Title",
      required: true,
      localized: true,
      defaultValue: "Complete Operation Theater Solutions",
    },
    {
      name: "subtitle",
      type: "text",
      label: "Subtitle",
      localized: true,
      defaultValue: "We provide all necessary equipment for modern operation theaters",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Operation Theater Image",
      required: true,
    },
    {
      name: "description",
      type: "richText",
      label: "Description",
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
      name: "equipmentCategories",
      type: "array",
      label: "Equipment Categories",
      localized: true,
      fields: [
        {
          name: "icon",
          type: "select",
          label: "Icon",
          required: true,
          options: [
            { label: "Surgical Light", value: "surgicalLight" },
            { label: "Monitor", value: "monitor" },
            { label: "Bed/Table", value: "bed" },
            { label: "Anesthesia", value: "anesthesia" },
            { label: "Pendant", value: "pendant" },
            { label: "Ventilator", value: "ventilator" },
            { label: "IV Stand", value: "ivStand" },
            { label: "Scrub Station", value: "scrub" },
          ],
        },
        {
          name: "title",
          type: "text",
          label: "Title",
          required: true,
        },
        {
          name: "description",
          type: "text",
          label: "Short Description",
        },
      ],
    },
    {
      name: "backgroundColor",
      type: "select",
      label: "Background Color",
      defaultValue: "light",
      options: [
        { label: "White", value: "white" },
        { label: "Light Gray", value: "light" },
        { label: "Primary Blue", value: "primary" },
      ],
    },
    {
      name: "ctaText",
      type: "text",
      label: "CTA Button Text",
      localized: true,
      defaultValue: "Explore Our Solutions",
    },
    {
      name: "ctaLink",
      type: "text",
      label: "CTA Link",
      defaultValue: "/products",
    },
  ],
  labels: {
    plural: "Operation Theater Blocks",
    singular: "Operation Theater Block",
  },
};
