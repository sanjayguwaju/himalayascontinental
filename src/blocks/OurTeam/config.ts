import type { Block } from "payload";

export const OurTeam: Block = {
  slug: "ourTeam",
  interfaceName: "OurTeamBlock",
  labels: {
    plural: "Our Team Blocks",
    singular: "Our Team Block",
  },
  fields: [
    {
      name: "sectionTitle",
      type: "text",
      label: "Section Title",
      defaultValue: "Our Team",
      localized: true,
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Subtitle / Description",
      localized: true,
    },
    {
      name: "teamMembers",
      type: "array",
      label: "Team Members",
      minRows: 1,
      admin: {
        description: "Add and reorder team members to be displayed.",
      },
      fields: [
        {
          name: "photo",
          type: "upload",
          label: "Photo",
          relationTo: "media",
          required: true,
        },
        {
          name: "name",
          type: "text",
          label: "Full Name",
          required: true,
          localized: true,
        },
        {
          name: "title",
          type: "text",
          label: "Title / Position",
          required: true,
          localized: true,
        },
        {
          name: "affiliations",
          type: "array",
          label: "Affiliations / Roles",
          admin: {
            description:
              "List of roles, positions, or affiliations (e.g. Chairperson: Rora Chem Pvt. Ltd.).",
          },
          fields: [
            {
              name: "label",
              type: "text",
              label: "Role Label",
              required: true,
              localized: true,
              admin: {
                placeholder: "e.g. Chairperson",
              },
            },
            {
              name: "organization",
              type: "text",
              label: "Organization / Detail",
              localized: true,
              admin: {
                placeholder: "e.g. Rora Chem Pvt. Ltd.",
              },
            },
            {
              name: "organizationLink",
              type: "text",
              label: "Organization Link URL (optional)",
              admin: {
                placeholder: "https://...",
              },
            },
          ],
        },
        {
          name: "messageButtonLabel",
          type: "text",
          label: "Message Button Label",
          defaultValue: "View Message",
          localized: true,
        },
        {
          name: "message",
          type: "textarea",
          label: "Message",
          localized: true,
          admin: {
            description:
              "The team member's message that will appear in a dialog when the button is clicked.",
            placeholder: "Write the team member's message here...",
            rows: 6,
          },
        },
      ],
    },
    {
      name: "backgroundColor",
      type: "select",
      label: "Background Color",
      defaultValue: "primary",
      options: [
        { label: "Primary Blue", value: "primary" },
        { label: "White", value: "white" },
        { label: "Light Grey", value: "light" },
      ],
    },
  ],
};
