import type { Block } from "payload";

export const WelcomeSection: Block = {
  slug: "welcomeSection",
  interfaceName: "WelcomeSectionBlock",
  fields: [
    {
      name: "preHeading",
      type: "text",
      label: "Pre-heading",
      defaultValue: "Welcome to",
      localized: true,
    },
    {
      name: "heading",
      type: "text",
      label: "Main Heading",
      defaultValue: "Himalayas Continental Pvt. Ltd.",
      required: true,
      localized: true,
    },
    {
      name: "tagline",
      type: "text",
      label: "Tagline",
      defaultValue: "Exclusive Importer, Authorized Distributor, Wholesaler & Retailer",
      localized: true,
    },
    {
      name: "content",
      type: "richText",
      label: "Content",
      localized: true,
    },
    {
      name: "alignment",
      type: "select",
      label: "Text Alignment",
      defaultValue: "center",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
  ],
  labels: {
    plural: "Welcome Sections",
    singular: "Welcome Section",
  },
};
