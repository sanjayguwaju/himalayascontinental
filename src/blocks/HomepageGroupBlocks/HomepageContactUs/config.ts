import type { Block } from "payload";

export const HomepageContactUs: Block = {
  slug: "homepageContactUs",
  interfaceName: "HomepageContactUsBlock",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
      defaultValue: "Contact Us",
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
      name: "companyName",
      type: "text",
      label: "Company Name",
      defaultValue: "HIMALAYAS CONTINENTAL PVT. LTD.",
      required: true,
    },
    {
      name: "address",
      type: "text",
      label: "Address",
      defaultValue: "Pulchowk, Lalitpur, Nepal",
      required: true,
    },
    {
      name: "phone",
      type: "text",
      label: "Phone Numbers",
      defaultValue: "+977 5430110, 5423351",
      required: true,
    },
    {
      name: "email",
      type: "text",
      label: "Email",
      defaultValue: "himalayas2019@gmail.com",
      required: true,
    },
    {
      name: "socialLinks",
      type: "array",
      label: "Social Links",
      fields: [
        {
          name: "platform",
          type: "select",
          options: [
            { label: "Facebook", value: "facebook" },
            { label: "Twitter", value: "twitter" },
            { label: "LinkedIn", value: "linkedin" },
            { label: "Instagram", value: "instagram" },
          ],
          required: true,
        },
        {
          name: "url",
          type: "text",
          label: "URL",
          required: true,
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
      ],
    },
  ],
  labels: {
    plural: "Homepage Contact Us",
    singular: "Homepage Contact Us",
  },
};
