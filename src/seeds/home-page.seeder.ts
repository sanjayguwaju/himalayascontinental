import "dotenv/config";
import payload from "payload";
import configPromise from "../payload.config";

const createLexicalText = (text: string, heading: string = "") => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const children: any[] = [];
  if (heading) {
    children.push({
      type: "heading",
      tag: "h2",
      format: "",
      indent: 0,
      version: 1,
      children: [
        {
          detail: 0,
          format: 0,
          mode: "normal",
          style: "",
          text: heading,
          type: "text",
          version: 1,
        },
      ],
    });
  }
  children.push({
    type: "paragraph",
    format: "",
    indent: 0,
    version: 1,
    children: [
      {
        detail: 0,
        format: 0,
        mode: "normal",
        style: "",
        text,
        type: "text",
        version: 1,
      },
    ],
  });

  return {
    root: {
      type: "root",
      direction: "ltr" as const,
      format: "",
      indent: 0,
      version: 1,
      children,
    },
  };
};

async function seedHomePage(): Promise<void> {
  try {
    await payload.init({ config: configPromise });

    // Give Payload some time to build indexes or sync schemas which locks the DB
    console.log("⏳ Waiting 3s for MongoDB index locks to clear...");
    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log("🌱 Starting home page seeder...");

    // Find if home page already exists
    const existing = await payload.find({
      collection: "pages",
      where: {
        slug: {
          equals: "home",
        },
      },
    });

    if (existing.docs.length > 0) {
      console.log(`🗑️  Deleting existing home page...`);
      for (const doc of existing.docs) {
        await payload.delete({
          collection: "pages",
          id: doc.id,
          context: { disableRevalidate: true },
        });
      }
    }

    // Try to get an image for hero and gallery
    const mediaRes = await payload.find({ collection: "media", limit: 3 });
    const imageId = mediaRes.docs.length > 0 ? mediaRes.docs[0].id : undefined;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const homePageData: any = {
      title: "Home",
      slug: "home",
      _status: "published",
      hero: {
        type: "heroCarousel",
        slides: [
          {
            image: imageId,
            title: "D र E ब्लक निर्माण हुँदा देखिने अस्पतालको नक्सा",
          },
          {
            image: imageId,
            title: "Welcome to Himalayas Continental - Serving Baglung since 2010",
          },
        ],
      },
      layout: [
        {
          blockType: "highlights",
          label: "Highlights",
          limit: 10,
          width: "full",
        },
        {
          blockType: "ourServices",
          title: "Our Medical Services",
          subtitle: "We offer a wide range of medical services to community.",
          services: [
            {
              title: "Cardiology",
              description: "Expert cardiology consultations and care.",
              icon: "heart",
            },
            {
              title: "24/7 Emergency",
              description: "We are always ready to help you.",
              icon: "ambulance",
            },
            {
              title: "Pediatrics",
              description: "Child and newborn care.",
              icon: "baby",
            },
          ],
        },
        {
          blockType: "staffsBlock",
          introContent: createLexicalText(
            "Meet our experts who make it happen.",
            "Our Dedicated Doctors"
          ),
          staffsSelection: "all",
        },
        {
          blockType: "aboutUs",
          title: "About Himalayas Continental",
          content: createLexicalText(
            "Himalayas Continental was founded with a mission to bring world-class healthcare to Baglung.",
            "Our History & Mission"
          ),
          historyTitle: "Our Milestones",
          historyTimeline: [
            {
              year: "2010",
              description: "Hospital Foundation laid",
            },
            {
              year: "2015",
              description: "Expanded to 50 beds",
            },
          ],
        },
        {
          blockType: "feedback",
          title: "What Patients Say",
          description: "Read testimonials from our valuable community members.",
          viewCount: 1200,
        },
        {
          blockType: "archive",
          introContent: createLexicalText("Check out our latest news and updates.", "Latest News"),
          populateBy: "collection",
          relationTo: "posts",
          limit: 3,
        },
      ],
    };

    if (imageId) {
      homePageData.layout.push({
        blockType: "gallery",
        heading: "Hospital Tour",
        caption: "See what our facility looks like",
        columns: "3",
        images: [
          {
            image: imageId,
            caption: "Modern Equipments",
          },
        ],
      });
    }

    const created = await payload.create({
      collection: "pages",
      data: homePageData,
      context: { disableRevalidate: true },
    });

    console.log(`✅ Successfully created home page (ID: ${created.id})!`);
  } catch (error) {
    console.error("❌ Seeder failed:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seedHomePage();
