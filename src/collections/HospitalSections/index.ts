import type { CollectionConfig } from "payload";

export const HospitalSections: CollectionConfig = {
  slug: "hospital-sections",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "isActive", "displayOrder"],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true;
      return {
        isActive: { equals: true },
      };
    },
  },
  fields: [
    // ─── SIDEBAR ─────────────────────────────────────────────
    {
      name: "isActive",
      type: "checkbox",
      label: "Active",
      defaultValue: true,
      admin: { position: "sidebar" },
    },
    {
      name: "displayOrder",
      type: "number",
      label: "Display Order",
      admin: {
        position: "sidebar",
        description: "Lower number appears first",
      },
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      required: true,
      admin: {
        position: "sidebar",
        description: "e.g. nutrition, paediatric-ward, pcr-lab",
      },
      hooks: {
        beforeValidate: [
          ({ value, siblingData }) => {
            // Auto-generate slug from title if not set
            if (!value && siblingData?.title) {
              return siblingData.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
            }
            return value;
          },
        ],
      },
    },

    // ─── MAIN TABS ───────────────────────────────────────────
    {
      type: "tabs",
      tabs: [
        // TAB 1 — Section Info
        {
          label: "Section Info",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "title",
                  type: "text",
                  required: true,
                  localized: true,
                  admin: { width: "70%" },
                },
                {
                  name: "shortName",
                  type: "text",
                  label: "Short Name / Abbreviation",
                  admin: {
                    width: "30%",
                    description: "e.g. MPDSR, OCMC, PCR",
                  },
                },
              ],
            },
            {
              name: "icon",
              type: "upload",
              relationTo: "media",
              label: "Section Icon",
              admin: {
                description: "Icon shown on the sections grid card",
              },
            },
            {
              name: "coverImage",
              type: "upload",
              relationTo: "media",
              label: "Cover / Banner Image",
            },
            {
              name: "description",
              type: "richText",
              label: "Section Description",
              localized: true,
              admin: {
                description:
                  "Full description shown on the section detail page (like the Nutrition paragraph)",
              },
            },
            {
              name: "excerpt",
              type: "textarea",
              label: "Short Excerpt",
              localized: true,
              admin: {
                description: "Short summary shown on cards or listings",
              },
            },
          ],
        },

        // TAB 2 — Details
        {
          label: "Details",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "establishedYear",
                  type: "number",
                  label: "Established Year (B.S.)",
                  admin: {
                    width: "50%",
                    description: "e.g. 2075",
                  },
                },
                {
                  name: "totalBeds",
                  type: "number",
                  label: "Total Beds",
                  admin: { width: "50%" },
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "totalStaffCount",
                  type: "number",
                  label: "Total Staff Count",
                  admin: { width: "50%" },
                },
                {
                  name: "operatingHours",
                  type: "text",
                  label: "Operating Hours",
                  admin: {
                    width: "50%",
                    description: "e.g. 24 hours / 9AM - 5PM",
                  },
                },
              ],
            },
            {
              name: "services",
              type: "array",
              label: "Services Offered",
              fields: [
                {
                  name: "service",
                  type: "text",
                  required: true,
                },
              ],
            },
            {
              name: "contactPhone",
              type: "text",
              label: "Section Contact Phone",
            },
            {
              name: "locationInHospital",
              type: "text",
              label: "Location in Hospital",
              admin: {
                description: "e.g. Ground Floor, Block B",
              },
            },
          ],
        },
      ],
    },
  ],
};
