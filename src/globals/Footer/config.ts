import type { GlobalConfig } from "payload";
import { revalidateGlobal } from "@/hooks/revalidateGlobal";

export const Footer: GlobalConfig = {
  slug: "footer",
  label: "Footer",
  hooks: {
    afterChange: [revalidateGlobal("footer")],
  },
  fields: [
    {
      type: "group",
      name: "aboutUs",
      label: "About Us Section",
      fields: [
        {
          name: "title",
          type: "text",
          localized: true,
          label: "Section Title",
          defaultValue: "About Us",
        },
        {
          name: "description",
          type: "textarea",
          localized: true,
          label: "Company Description",
        },
      ],
    },
    {
      type: "group",
      name: "quickContact",
      label: "Quick Contact Section",
      fields: [
        {
          name: "title",
          type: "text",
          localized: true,
          label: "Section Title",
          defaultValue: "Quick Contact",
        },
        {
          name: "links",
          type: "array",
          label: "Quick Contact Links",
          localized: true,
          fields: [
            {
              name: "label",
              type: "text",
              required: true,
            },
            {
              name: "url",
              type: "text",
              required: true,
            },
            {
              name: "icon",
              type: "select",
              label: "Icon Type",
              options: [
                { label: "Medical Equipment", value: "medical" },
                { label: "Company", value: "company" },
                { label: "Team", value: "team" },
                { label: "Link", value: "link" },
              ],
              defaultValue: "link",
            },
          ],
        },
      ],
    },
    {
      type: "group",
      name: "productsSection",
      label: "Products Section",
      fields: [
        {
          name: "title",
          type: "text",
          localized: true,
          label: "Section Title",
          defaultValue: "Products",
        },
        {
          name: "links",
          type: "array",
          label: "Product Links",
          localized: true,
          fields: [
            {
              name: "label",
              type: "text",
              required: true,
            },
            {
              name: "url",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
    {
      type: "group",
      name: "contactInfo",
      label: "Contact Info Section",
      fields: [
        {
          name: "title",
          type: "text",
          localized: true,
          label: "Section Title",
          defaultValue: "Contact Info",
        },
        {
          name: "address",
          type: "text",
          localized: true,
          label: "Address",
        },
        {
          name: "phoneNumbers",
          type: "text",
          localized: true,
          label: "Phone Numbers",
        },
        {
          name: "email",
          type: "text",
          label: "Email Address",
        },
        {
          name: "website",
          type: "text",
          label: "Website URL",
        },
      ],
    },
  ],
};
