import type { Block } from "payload";

export const HeroCarouselBlock: Block = {
  slug: "heroCarouselBlock",
  interfaceName: "HeroCarouselBlock",
  fields: [
    {
      name: "slides",
      type: "array",
      required: true,
      minRows: 1,
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
      ],
    },
  ],
  labels: {
    plural: "Hero Carousel Blocks",
    singular: "Hero Carousel Block",
  },
};
