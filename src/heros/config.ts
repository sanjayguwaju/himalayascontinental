import type { Field } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

import { linkGroup } from "@/fields/linkGroup";

export const hero: Field = {
  name: "hero",
  type: "group",
  fields: [
    {
      name: "type",
      type: "select",
      defaultValue: "lowImpact",
      label: "Type",
      options: [
        { label: "None", value: "none" },
        { label: "High Impact", value: "highImpact" },
        { label: "Medium Impact", value: "mediumImpact" },
        { label: "Low Impact", value: "lowImpact" },
        { label: "Hero Carousel", value: "heroCarousel" },
        { label: "Mission Hero", value: "missionHero" },
        { label: "Stats Hero", value: "statsHero" },
        { label: "Split Hero", value: "splitHero" },
        { label: "Video Hero", value: "videoHero" },
        { label: "Donate Hero", value: "donateHero" },
        { label: "Story Hero", value: "storyHero" },
        { label: "Minimal Hero", value: "minimalHero" },
      ],
      required: true,
    },
    {
      name: "showStaff",
      type: "checkbox",
      label: "Show Staff List",
      admin: {
        condition: (_, { type } = {}) => type === "heroCarousel",
      },
    },
    {
      name: "staffLayout",
      type: "select",
      defaultValue: "left",
      label: "Staff List Layout",
      options: [
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
      ],
      admin: {
        condition: (_, siblingData = {}) =>
          siblingData.type === "heroCarousel" && siblingData.showStaff === true,
      },
    },
    {
      name: "staffs",
      type: "relationship",
      relationTo: "staffs",
      hasMany: true,
      maxRows: 3,
      admin: {
        condition: (_, siblingData = {}) =>
          siblingData.type === "heroCarousel" && siblingData.showStaff === true,
      },
    },
    {
      name: "slides",
      type: "array",
      admin: {
        condition: (_, { type } = {}) => type === "heroCarousel",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "title",
          type: "text",
          localized: true,
        },
        {
          name: "description",
          type: "textarea",
          localized: true,
          admin: {
            description: "Optional description text displayed below the title",
          },
        },
      ],
    },
    {
      name: "richText",
      type: "richText",
      admin: {
        condition: (_, { type } = {}) => type !== "heroCarousel",
      },
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        admin: {
          condition: (_, { type } = {}) => type !== "heroCarousel",
        },
        maxRows: 2,
      },
    }),
    {
      name: "media",
      type: "upload",
      admin: {
        condition: (_, { type } = {}) =>
          [
            "highImpact",
            "mediumImpact",
            "missionHero",
            "statsHero",
            "splitHero",
            "donateHero",
            "storyHero",
          ].includes(type),
      },
      relationTo: "media",
    },
    // Split Hero Layout Option
    {
      name: "splitLayout",
      type: "select",
      defaultValue: "left",
      label: "Split Layout",
      options: [
        { label: "Content Left / Image Right", value: "left" },
        { label: "Image Left / Content Right", value: "right" },
      ],
      admin: {
        condition: (_, { type } = {}) => type === "splitHero",
      },
    },
    // Video Hero Fields
    {
      name: "videoUrl",
      type: "text",
      label: "Video URL",
      admin: {
        description: "Direct URL to MP4 video file",
        condition: (_, { type } = {}) => type === "videoHero",
      },
    },
    {
      name: "videoPoster",
      type: "upload",
      label: "Video Poster Image",
      relationTo: "media",
      admin: {
        condition: (_, { type } = {}) => type === "videoHero",
      },
    },
    // Stats Hero - Show Stats Toggle
    {
      name: "showStats",
      type: "checkbox",
      defaultValue: true,
      label: "Show Impact Statistics",
      admin: {
        condition: (_, { type } = {}) => type === "statsHero",
      },
    },
    // Stats Items
    {
      name: "stats",
      type: "array",
      label: "Statistics",
      admin: {
        condition: (_, { type } = {}) => type === "statsHero",
      },
      fields: [
        {
          name: "value",
          type: "text",
          label: "Value",
          required: true,
          admin: { description: "e.g. 50, 100, 1M" },
        },
        {
          name: "suffix",
          type: "text",
          label: "Suffix",
          admin: { description: "e.g. +, K, %" },
        },
        {
          name: "label",
          type: "text",
          label: "Label",
          required: true,
          localized: true,
        },
      ],
    },
    // Story Hero Fields
    {
      name: "storyQuote",
      type: "textarea",
      label: "Story Quote",
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === "storyHero",
      },
    },
    {
      name: "storyAuthor",
      type: "text",
      label: "Story Author Name",
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === "storyHero",
      },
    },
    {
      name: "storyAuthorTitle",
      type: "text",
      label: "Story Author Title",
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === "storyHero",
      },
    },
    {
      name: "storyAuthorImage",
      type: "upload",
      label: "Story Author Image",
      relationTo: "media",
      admin: {
        condition: (_, { type } = {}) => type === "storyHero",
      },
    },
  ],
  label: false,
};
