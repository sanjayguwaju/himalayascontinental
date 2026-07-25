import { Plugin } from "payload";
import { payloadSidebar } from "payload-sidebar-plugin";
import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import { searchPlugin } from "@payloadcms/plugin-search";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { redirectsPlugin } from "@payloadcms/plugin-redirects";
import { beforeSyncWithSearch } from "../search/beforeSync";
import { searchFields } from "../search/fieldOverrides";
import { getServerSideURL } from "../utilities/getURL";
import { s3StoragePlugin } from "./s3";
import { mcpPlugin } from "@payloadcms/plugin-mcp";


export const plugins: Plugin[] = [
  mcpPlugin({
    collections: {
      brochures: { enabled: true },
      categories: { enabled: true },
      "common-form-submissions": { enabled: true },
      media: { enabled: true },
      pages: { enabled: true },
      posts: { enabled: true },
      "product-categories": { enabled: true },
      "product-sub-categories": { enabled: true },
      products: { enabled: true },
      users: { enabled: { find: true } },
    },
    globals: {
      footer: { enabled: { find: true, update: true } },
      header: { enabled: { find: true, update: true } },
      navigation: { enabled: { find: true, update: true } },
      "top-bar": { enabled: { find: true, update: true } },
    },
  }),
  s3StoragePlugin,
  payloadSidebar({
    // Sort order for navigation groups (lower = higher priority)
    groupOrder: {
      Content: 1,
      Media: 2,
      Users: 3,
      Settings: 10,
      Tools: 15,
      Resources: 99,
    },

    // Custom icons for collections and globals
    icons: {
      users: "users-round",
      media: "images",
    },

    // Custom navigation links
    // customLinks: [
    //   {
    //     label: "Dashboard",
    //     href: "/admin/dashboard",
    //     group: "Tools",
    //     icon: "layout-dashboard",
    //     order: 1,
    //   },
    // ],

    // Custom navigation groups
    customGroups: [{ label: "Tools", order: 15, defaultOpen: true }],

    // Pinning configuration
    enablePinning: true,
    pinnedStorage: "preferences",

    // Badge color overrides
    cssVariables: {
      "--badge-red-bg": "#ef4444",
      "--badge-blue-bg": "#3b82f6",
      "--badge-green-bg": "#22c55e",
      "--badge-orange-bg": "#f97316",
      "--badge-yellow-bg": "#eab308",
      "--badge-gray-bg": "#6b7280",
    },
  }),
  formBuilderPlugin({}),
  searchPlugin({
    collections: ["posts", "pages"],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => [...defaultFields, ...searchFields],
    },
  }),
  seoPlugin({
    generateURL: ({ doc }) =>
      `${getServerSideURL()}/${typeof doc?.slug === "string" ? doc.slug : ""}`,
  }),
  redirectsPlugin({
    collections: ["pages", "posts"],
  }),
];
