import "dotenv/config";
import payload from "payload";
import configPromise from "../payload.config";

async function seedFooter() {
  await payload.init({ config: configPromise });

  const footerData = {
    aboutUs: {
      title: "Himalayas Continental",
      description: "Medical Equipment & Healthcare Solutions, Nepal",
    },
    quickContact: {
      title: "Quick Contact",
      links: [
        { label: "About Us", url: "/about", icon: "company" as const },
        { label: "Our Services", url: "/services", icon: "medical" as const },
        { label: "Health News", url: "/news", icon: "link" as const },
        {
          label: "Official Email",
          url: "mailto:info@himalayascontinental.com",
          icon: "link" as const,
        },
      ],
    },
    productsSection: {
      title: "Products",
      links: [
        { label: "GIOMS", url: "#" },
        { label: "Sagarmatha Sambaad", url: "#" },
        { label: "Medical Equipment", url: "/products" },
      ],
    },
    contactInfo: {
      title: "Contact Info",
      address: "Baglung-01, Baglung, Gandaki Province, Nepal",
      phoneNumbers: "068-520123 / 522345",
      email: "info@himalayascontinental.com",
      website: "https://himalayascontinental.com",
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
