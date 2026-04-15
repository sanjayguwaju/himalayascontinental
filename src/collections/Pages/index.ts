import type { CollectionConfig } from "payload";
import { authenticated } from "../../access/authenticated";
import { authenticatedOrPublished } from "../../access/authenticatedOrPublished";
import { Archive } from "../../blocks/ArchiveBlock/config";
import { CallToAction } from "../../blocks/CallToAction/config";
import { Content } from "../../blocks/Content/config";
import { FormBlock } from "../../blocks/Form/config";
import { MediaBlock } from "../../blocks/MediaBlock/config";
import { Gallery } from "../../blocks/Gallery/config";
import { hero } from "@/heros/config";
import { AboutUs } from "@/blocks/AboutUs/config";
import { Staffs } from "@/blocks/Staffs/config";
import { Feedback } from "@/blocks/Feedback/config";
import { OurServices } from "@/blocks/OurServices/config";
import { Highlights } from "../../blocks/Highlights/config";
import { CarouselBlock } from "@/blocks/Carousel/config";
import { NewsActivities } from "@/blocks/NewsActivities/config";
import { MissionVision } from "@/blocks/MissionVision/config";
import { Programs } from "@/blocks/Programs/config";
import { Testimonials } from "@/blocks/Testimonials/config";
import { Partners } from "@/blocks/Partners/config";
import { Impact } from "@/blocks/Impact/config";
import { VolunteerCTA } from "@/blocks/VolunteerCTA/config";
import { UpcomingEvents } from "@/blocks/UpcomingEvents/config";
import { Contact } from "@/blocks/Contact/config";
import { slugField } from "payload";
import { populatePublishedAt } from "../../hooks/populatePublishedAt";
import { generatePreviewPath } from "../../utilities/generatePreviewPath";
import { revalidateDelete, revalidatePage } from "./hooks/revalidatePage";

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields";
import { HighlightsAndNews } from "@/blocks/HighlightsAndNews/config";
import { WelcomeSection } from "@/blocks/WelcomeSection/config";
import { ServicePillars } from "@/blocks/ServicePillars/config";
import { ProductCarousel } from "@/blocks/ProductCarousel/config";
import { ProductGrid } from "@/blocks/ProductGrid/config";
import { OurCompanies } from "@/blocks/OurCompanies/config";
import { StatsCounter } from "@/blocks/StatsCounter/config";
import { Associates } from "@/blocks/Associates/config";
import { CompanyProfile } from "@/blocks/CompanyProfile/config";
import { Company } from "@/blocks/Company/config";
import { OurTeam } from "@/blocks/OurTeam/config";
import { HomepageWelcomeSection } from "@/blocks/HomepageGroupBlocks/HomepageWelcomeSection/config";
import { HomepageProductCategories } from "@/blocks/HomepageGroupBlocks/HomepageProductCategories/config";
import { HomepageOurProducts } from "@/blocks/HomepageGroupBlocks/HomepageOurProducts/config";
import { HomepageAuthorizedDistributors } from "@/blocks/HomepageGroupBlocks/HomepageAuthorizedDistributors/config";

export const Pages: CollectionConfig<"pages"> = {
  slug: "pages",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ["title", "slug", "updatedAt"],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: "pages",
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: "pages",
        req,
      }),
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      type: "tabs",
      tabs: [
        {
          fields: [hero],
          label: "Hero",
        },
        {
          fields: [
            {
              name: "layout",
              type: "blocks",
              blocks: [
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
                Gallery,
                AboutUs,
                Staffs,
                Feedback,
                OurServices,
                Highlights,
                CarouselBlock,
                NewsActivities,
                HighlightsAndNews,
                MissionVision,
                Programs,
                Testimonials,
                Partners,
                Impact,
                VolunteerCTA,
                UpcomingEvents,
                Contact,
                WelcomeSection,
                ServicePillars,
                ProductCarousel,
                ProductGrid,
                OurCompanies,
                StatsCounter,
                Associates,
                CompanyProfile,
                Company,
                OurTeam,
                HomepageWelcomeSection,
                HomepageProductCategories,
                HomepageOurProducts,
                HomepageAuthorizedDistributors,
              ],
              required: true,
              localized: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: "Content",
        },
        {
          name: "meta",
          label: "SEO",
          fields: [
            OverviewField({
              titlePath: "meta.title",
              descriptionPath: "meta.description",
              imagePath: "meta.image",
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: "media",
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: "meta.title",
              descriptionPath: "meta.description",
            }),
          ],
        },
      ],
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
};
