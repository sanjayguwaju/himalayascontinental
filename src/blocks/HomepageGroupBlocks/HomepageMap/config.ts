import type { Block } from "payload";

export const HomepageMap: Block = {
  slug: "homepageMap",
  interfaceName: "HomepageMapBlock",
  fields: [
    {
      name: "mapEmbedUrl",
      type: "text",
      label: "Google Maps Embed URL (src attribute)",
      defaultValue: "https://maps.google.com/maps?q=Himalayas%20Continental%20Pvt.%20Ltd.,%20Pulchowk&t=&z=17&ie=UTF8&iwloc=&output=embed",
      required: true,
      admin: {
        description: "Paste the src URL from the Google Maps iframe embed code.",
      },
    },
    {
      name: "height",
      type: "number",
      label: "Map Height (in pixels)",
      defaultValue: 450,
      required: true,
    },
  ],
  labels: {
    plural: "Homepage Maps",
    singular: "Homepage Map",
  },
};
