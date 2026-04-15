import type { GlobalConfig } from "payload";
import { revalidateGlobal } from "@/hooks/revalidateGlobal";

export const Header: GlobalConfig = {
  slug: "header",
  label: "Site Header",
  hooks: {
    afterChange: [revalidateGlobal("header")],
  },
  fields: [
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      label: "Logo",
      required: true,
    },
    {
      name: "logoHeight",
      type: "number",
      label: "Logo Height (px)",
      defaultValue: 64,
      min: 32,
      max: 200,
      admin: {
        description: "Height of the logo in pixels (32-200px). Width adjusts automatically.",
      },
    },
  ],
};
