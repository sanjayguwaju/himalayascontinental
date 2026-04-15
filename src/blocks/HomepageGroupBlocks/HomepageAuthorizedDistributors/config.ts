import type { Block } from "payload";

export const HomepageAuthorizedDistributors: Block = {
  slug: "homepageAuthorizedDistributors",
  interfaceName: "HomepageAuthorizedDistributorsBlock",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Section Title",
      defaultValue: "Authorized Distributor For",
      localized: true,
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Section Subtitle",
      defaultValue: "We are proud to partner with leading global brands in medical technology to bring innovative solutions to our region.",
      localized: true,
    },
    {
      name: "distributors",
      type: "array",
      label: "Distributors",
      minRows: 1,
      maxRows: 20,
      defaultValue: [
        { name: "Guangdong Owgels Science and Technology Co. Ltd" },
        { name: "Biditech Med Inc. South Korea" },
        { name: "Shenzhen Comen Medical Instruments Co. Ltd." },
        { name: "Suzentech Inc South Korea" },
        { name: "ESP Medicals, New Zealand" },
        { name: "MEKICS Co. Ltd. South Korea" },
        { name: "GEMSS HEALTHCARE CO., LTD." },
        { name: "Tanco Lab India" }
      ],
      fields: [
        {
          name: "name",
          type: "text",
          label: "Company Name",
          required: true,
        },
        {
          name: "logo",
          type: "upload",
          relationTo: "media",
          label: "Company Logo",
        },
        {
          name: "link",
          type: "text",
          label: "Website Link",
        },
      ],
    },
    {
      name: "backgroundColor",
      type: "select",
      label: "Background Color",
      defaultValue: "lightGray",
      options: [
        { label: "White", value: "white" },
        { label: "Light Gray", value: "lightGray" },
        { label: "Primary Blue", value: "primary" },
      ],
    },
  ],
  labels: {
    plural: "Homepage Auth. Distributors",
    singular: "Homepage Auth. Distributor",
  },
};
