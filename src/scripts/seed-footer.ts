import "dotenv/config";
import payload from "payload";
import configPromise from "../payload.config";

async function seedFooter() {
  await payload.init({ config: configPromise });

  const footerData = {
    organization: {
      title: "Himalayas Continental",
      subtitle: "Medical Equipment & Healthcare Solutions, Nepal",
    },
    officeHours: {
      title: "Hospital Operation Hours",
      winterMonths: "जाडो (कार्तिक १६ देखि माघ १५)",
      winterSchedule1: "Sunday - Thursday            09:00 A.M. - 04:00 P.M.",
      winterSchedule2: "Friday            09:00 A.M. - 02:00 P.M.",
      summerMonths: "गर्मी (माघ १६ देखि कार्तिक १५)",
      summerSchedule1: "Sunday - Thursday            09:00 A.M. - 05:00 P.M.",
      summerSchedule2: "Friday            09:00 A.M. - 03:00 P.M.",
    },
    importantLinksSection: {
      title: "Important Links",
      links: [
        { label: "GIOMS", url: "#" },
        { label: "Sagarmatha Sambaad", url: "#" },
        { label: "About Us", url: "/about" },
        { label: "Official Email", url: "mailto:info@amipalhospital.gov.np" },
        { label: "Our Services", url: "/services" },
        { label: "Health News", url: "/news" },
      ],
    },
    contact: {
      facebookLink: "https://facebook.com/amipalhospital",
      twitterLink: "https://twitter.com/amipalhospital",
      locationText: "Baglung-01, Baglung, Gandaki Province, Nepal",
      email: "info@amipalhospital.gov.np",
      phone: "068-520123 / 522345",
    },
    appearance: {
      silhouetteImage: null, // Fallback used in component
    },
  };

  const locales = ["en", "ne"];

  for (const locale of locales) {
    await payload.updateGlobal({
      slug: "footer",
      data: footerData,
      locale: locale as "en" | "ne" | "all",
    });
  }

  console.log("✅ Footer seeded successfully for all locales!");
  process.exit(0);
}

seedFooter();
