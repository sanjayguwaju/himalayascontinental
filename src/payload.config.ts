import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { resendAdapter } from "@payloadcms/email-resend";
import sharp from "sharp";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";

import { Media } from "./collections/Media";
import { Users } from "./collections/Users";
import { Pages } from "./collections/Pages";
import { Posts } from "./collections/Posts";
import { Categories } from "./collections/Categories";
import { List } from "./collections/List";
import { CommonFormSubmissions } from "./collections/CommonFormSubmissions";
import { plugins } from "./plugins";
import localization from "./i18n/localization";
import { TopBar } from "./globals/TopBar/config";
import { Header } from "./globals/Header/config";
import { Navigation } from "./globals/Navigation/config";
import { Footer } from "./globals/Footer/config";
import { defaultLexical } from "./fields/defaultLexical";
import { getServerSideURL } from "./utilities/getURL";
import { Staffs } from "./collections/Staffs";
import { SuchiDarta } from "./collections/SuchiDarta";
import { HospitalSections } from "./collections/HospitalSections";
import { Albums } from "./collections/Albums";
import { Files } from "./collections/Files";
import { ProductCategories } from "./collections/ProductCategories";
import { ProductSubCategories } from "./collections/ProductSubCategories";
import { Products } from "./collections/Products";
import { Brochures } from "./collections/Brochures";

import config from "./config";

const systemConfig = config();

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    meta: {
      titleSuffix: "- Himalayas Continental",
      description: "Himalayas Continental - Medical Equipment & Healthcare Solutions",
      icons: [
        {
          rel: "icon",
          type: "image/png",
          url: "/favicon.png",
        },
      ],
    },
    autoRefresh: true,
    components: {
      beforeLogin: ["@/components/BeforeLogin"],
      graphics: {
        Icon: "@/components/CustomLogo#CustomIcon",
        Logo: "@/components/CustomLogo#CustomLogo",
      },
      beforeDashboard: ["@/components/BeforeDashboard"],
      providers: ["@/components/AdminProviders"],
      views: {
        dashboard: {
          Component: "@/components/AdminDashboard#AdminDashboardLayout",
          path: "/dashboard",
        },
        reports: {
          Component: "@/components/Reports/ReportsViewLayout#ReportsViewLayout",
          path: "/reports",
        },
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: "Mobile",
          name: "mobile",
          width: 375,
          height: 667,
        },
        {
          label: "Tablet",
          name: "tablet",
          width: 768,
          height: 1024,
        },
        {
          label: "Desktop",
          name: "desktop",
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  editor: defaultLexical,
  db: mongooseAdapter({
    url: systemConfig.DATABASE_URL || "",
  }),
  collections: [
    Media,
    Users,
    Pages,
    Posts,
    Categories,
    List,
    Staffs,
    CommonFormSubmissions,
    SuchiDarta,
    HospitalSections,
    Albums,
    Files,
    ProductCategories,
    ProductSubCategories,
    Products,
    Brochures,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [TopBar, Header, Navigation, Footer],
  plugins,
  email: resendAdapter({
    defaultFromAddress: "onboarding@resend.dev",
    defaultFromName: "Himalayas Continental",
    apiKey: systemConfig.RESEND_API_KEY || "",
  }),
  localization,
  secret: systemConfig.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
