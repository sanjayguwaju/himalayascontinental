import type { Block } from "payload";

export const HomepageOurCompanies: Block = {
  slug: "homepageOurCompanies",
  interfaceName: "HomepageOurCompaniesBlock",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Section Title",
      defaultValue: "Our Companies",
      required: true,
      localized: true,
    },
    {
      name: "companies",
      type: "array",
      label: "Companies",
      minRows: 1,
      maxRows: 20,
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
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          label: "Description",
          required: true,
        },
        {
          name: "linkUrl",
          type: "text",
          label: "Link URL",
        },
        {
          name: "linkLabel",
          type: "text",
          label: "Link Label",
          defaultValue: "Read More",
        },
      ],
      defaultValue: [
        {
          name: "Himalayas Pashmina Pvt. Ltd.",
          description: "Himalayas pashmina is one of the Nepalese brands manufactures in Nepal with its own Nepalese touch and ..",
          linkLabel: "Read More",
        },
        {
          name: "Inter Nations Industries Pvt. Ltd.",
          description: "Inter-nation Pvt. Ltd. is another huge branch of HCPL which implicate the commercialization of printing and ..",
          linkLabel: "Read More",
        },
        {
          name: "Rora Chem Pvt. Ltd.",
          description: "Rora chem is the esteemed and former business trading house in Nepal. This company is working from more ..",
          linkLabel: "Read More",
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
    plural: "Homepage Our Companies",
    singular: "Homepage Our Company",
  },
};
