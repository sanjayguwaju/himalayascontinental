import type { Block } from "payload";

export const HomepageWelcomeSection: Block = {
  slug: "homepageWelcomeSection",
  interfaceName: "HomepageWelcomeSectionBlock",
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
      defaultValue:
        "Exclusive Importer, Authorized Distributor, Wholesaler, and Supplier of Medical Accessories & Equipment",
      localized: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      localized: true,
    },
    {
      name: "backgroundImage",
      type: "upload",
      relationTo: "media",
      label: "Background Image",
    },
    {
      name: "showDivider",
      type: "checkbox",
      label: "Show Divider",
      defaultValue: true,
    },
    {
      name: "alignment",
      type: "select",
      label: "Content Alignment",
      defaultValue: "center",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    {
      name: "ctaButton",
      type: "group",
      label: "CTA Button",
      fields: [
        {
          name: "show",
          type: "checkbox",
          label: "Show CTA Button",
          defaultValue: false,
        },
        {
          name: "label",
          type: "text",
          label: "Button Label",
          defaultValue: "Learn More",
          localized: true,
        },
        {
          name: "link",
          type: "text",
          label: "Button Link",
          defaultValue: "/about",
        },
      ],
    },
  ],
  labels: {
    plural: "Homepage Welcome Sections",
    singular: "Homepage Welcome Section",
  },
};
