import React, { Fragment } from "react";

import type { Page } from "@/payload-types";
import { ScrollReveal } from "@/components/ScrollReveal";

import { ArchiveBlock } from "@/blocks/ArchiveBlock/Component";
import { CallToActionBlock } from "@/blocks/CallToAction/Component";
import { ContentBlock } from "@/blocks/Content/Component";
import { FormBlock } from "@/blocks/Form/Component";
import { MediaBlock } from "@/blocks/MediaBlock/Component";
import { GalleryBlock } from "@/blocks/Gallery/Component";
import { AboutUsBlock } from "@/blocks/AboutUs/Component";
import { StaffsBlock } from "@/blocks/Staffs/Component";
import { FeedbackBlock } from "@/blocks/Feedback/Component";
import { OurServicesBlock } from "@/blocks/OurServices/Component";
import { HighlightsBlock } from "@/blocks/Highlights/Component";
import { CarouselBlockComponent } from "@/blocks/Carousel/Component";
import { NewsActivitiesBlock } from "./NewsActivities/Component";
import { HighlightsAndNewsBlock } from "./HighlightsAndNews/Component";
import { MissionVisionBlock } from "./MissionVision/Component";
import { ProgramsBlock } from "./Programs/Component";
import { TestimonialsBlock } from "./Testimonials/Component";
import { PartnersBlock } from "./Partners/Component";
import { ImpactBlock } from "./Impact/Component";
import { VolunteerCtaBlock } from "./VolunteerCTA/Component";
import { UpcomingEventsBlock } from "./UpcomingEvents/Component";
import { ContactBlock } from "./Contact/Component";
import { WelcomeSectionBlock } from "./WelcomeSection/Component";
import { ServicePillarsBlock } from "./ServicePillars/Component";
import { ProductCarouselBlock } from "./ProductCarousel/Component";
import { ProductGridBlock } from "./ProductGrid/Component";
import { OurCompaniesBlock } from "./OurCompanies/Component";
import { StatsCounterBlock } from "./StatsCounter/Component";
import { AssociatesBlock } from "./Associates/Component";
import { CompanyProfileBlock } from "./CompanyProfile/Component";
import { CompanyBlock } from "./Company/Component";

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  gallery: GalleryBlock,
  aboutUs: AboutUsBlock,
  staffsBlock: StaffsBlock,
  feedback: FeedbackBlock,
  ourServices: OurServicesBlock,
  highlights: HighlightsBlock,
  carouselBlock: CarouselBlockComponent,
  newsActivities: NewsActivitiesBlock,
  highlightsAndNews: HighlightsAndNewsBlock,
  missionVision: MissionVisionBlock,
  programs: ProgramsBlock,
  testimonials: TestimonialsBlock,
  partners: PartnersBlock,
  impact: ImpactBlock,
  volunteerCta: VolunteerCtaBlock,
  upcomingEvents: UpcomingEventsBlock,
  contact: ContactBlock,
  welcomeSection: WelcomeSectionBlock,
  servicePillars: ServicePillarsBlock,
  productCarousel: ProductCarouselBlock,
  productGrid: ProductGridBlock,
  ourCompanies: OurCompaniesBlock,
  statsCounter: StatsCounterBlock,
  associates: AssociatesBlock,
  companyProfile: CompanyProfileBlock,
  company: CompanyBlock,
};

export const RenderBlocks: React.FC<{
  blocks: Page["layout"][0][];
}> = ({ blocks }) => {
  const hasBlocks = Array.isArray(blocks) && blocks.length > 0;

  if (!hasBlocks) return null;

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const { blockType } = block;

        if (blockType && blockType in blockComponents) {
          const Block = blockComponents[blockType];

          return (
            <div key={index}>
              <ScrollReveal>
                <Block {...block} disableInnerContainer />
              </ScrollReveal>
            </div>
          );
        }

        return null;
      })}
    </Fragment>
  );
};
