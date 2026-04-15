import "dotenv/config";
import payload from "payload";
import configPromise from "../payload.config";

async function seedOurServices(): Promise<void> {
  try {
    await payload.init({ config: configPromise });

    console.log("⏳ Starting Our Services seeder...");

    // Find the home page
    const existing = await payload.find({
      collection: "pages",
      where: {
        slug: {
          equals: "home",
        },
      },
      locale: "all", // get all localized data
      depth: 0,
    });

    if (existing.docs.length === 0) {
      console.log("❌ Home page not found. Please run the home page seeder first.");
      process.exit(1);
    }

    const homePage = existing.docs[0];

    // Prepare exactly the 31 services shown in the screenshot

    // ─── ENGLISH LOCALIZATION ───
    const englishServices = [
      {
        title: "Outpatient Department (OPD)",
        description: "Regular consultation and health checks.",
        icon: "stethoscope",
      },
      {
        title: "Emergency Services",
        description: "24/7 rapid response and emergency care.",
        icon: "ambulance",
      },
      {
        title: "Inpatient Services",
        description: "Admissions and dedicated ward care.",
        icon: "activity",
      },
      {
        title: "Laboratory Service",
        description: "Comprehensive blood and pathology tests.",
        icon: "microscope",
      },
      { title: "X-Ray", description: "Digital radiography and imaging.", icon: "bone" },
      { title: "Ultrasound", description: "Advanced sonography imaging.", icon: "scan" },
      { title: "PCR Lab", description: "Molecular diagnostic testing.", icon: "dna" },
      {
        title: "ECG Service",
        description: "Electrocardiogram and heart monitoring.",
        icon: "activity",
      },
      {
        title: "Safe Abortion Service",
        description: "Legally backed safe reproductive healthcare.",
        icon: "baby",
      },
      {
        title: "Maternity Service",
        description: "Delivery, labour ward and newborn care.",
        icon: "baby",
      },
      {
        title: "Postmortem Service",
        description: "Medicolegal and autopsy services.",
        icon: "scan",
      },
      {
        title: "Safe Motherhood Service",
        description: "Pre and post-natal maternity care.",
        icon: "baby",
      },
      {
        title: "Neonatal Care Service",
        description: "SNCU and dedicated infant care.",
        icon: "baby",
      },
      { title: "ART Service", description: "Antiretroviral therapy services.", icon: "activity" },
      {
        title: "Immunization Services",
        description: "Regular vaccination for children and adults.",
        icon: "syringe",
      },
      {
        title: "Dental Service",
        description: "Oral health, extraction and consultation.",
        icon: "tooth",
      },
      {
        title: "DOTs Tuberculosis Service",
        description: "Specialized TB treatment and medication.",
        icon: "lungs",
      },
      {
        title: "Leprosy Service",
        description: "Screening and medication for Leprosy.",
        icon: "skin",
      },
      {
        title: "Minilap/Vasectomy Service",
        description: "Permanent family planning surgical services.",
        icon: "baby",
      },
      {
        title: "Health Education",
        description: "Community awareness and counseling.",
        icon: "education",
      },
      {
        title: "OCMC Service",
        description: "One-stop Crisis Management Center.",
        icon: "disability",
      },
      {
        title: "Physiotherapy Service",
        description: "Rehabilitation and physical therapy.",
        icon: "activity",
      },
      {
        title: "Health Insurance",
        description: "Government health insurance processing.",
        icon: "insurance",
      },
      { title: "Pharmacy", description: "24/7 availability of essential medicines.", icon: "pill" },
      { title: "Surgery", description: "Major and minor surgical interventions.", icon: "surgery" },
      {
        title: "Nutrition",
        description: "Dietary consultation and malnutrition care.",
        icon: "nutrition",
      },
      { title: "ICU/HDU", description: "Intensive care and high dependency units.", icon: "icu" },
      {
        title: "Free Medicine",
        description: "Distribution of government-sanctioned free drugs.",
        icon: "pill",
      },
      {
        title: "Extended Health Service (EHS)",
        description: "Specialized consultation after regular hours.",
        icon: "activity",
      },
      {
        title: "Family Planning Service",
        description: "Contraceptives and reproductive counseling.",
        icon: "baby",
      },
      {
        title: "CT Scan Service",
        description: "Advanced computed tomography imaging.",
        icon: "scan",
      },
      {
        title: "Endoscopy Service",
        description: "Gastrointestinal diagnostic procedures.",
        icon: "activity",
      },
    ];

    // ─── NEPALI LOCALIZATION ───
    const nepaliServices = [
      {
        title: "बहिरंग सेवा (OPD)",
        description: "नियमित परामर्श र स्वास्थ्य जाँच।",
        icon: "stethoscope",
      },
      { title: "आकस्मिक सेवाहरु", description: "२४ सै घण्टा आकस्मिक उपचार।", icon: "ambulance" },
      { title: "अन्तरङ्ग सेवा", description: "भर्ना तथा वार्ड मार्फत उपचार।", icon: "activity" },
      { title: "प्रयोगशाला सेवा", description: "रक्त तथा रोग निदान परीक्षण।", icon: "microscope" },
      { title: "एक्स-रे", description: "डिजिटल एक्स-रे सेवा।", icon: "bone" },
      { title: "अल्ट्रासाउन्ड", description: "भिडियो एक्स-रे (USG) सेवा।", icon: "scan" },
      { title: "पी.सी.आर ल्याब", description: "मोलेक्युलर डायग्नोस्टिक परीक्षण।", icon: "dna" },
      { title: "ई.सी.जी. सेवा", description: "मुटुको चालको परीक्षण।", icon: "activity" },
      {
        title: "सुरक्षित गर्भपतन सेवा",
        description: "कानुनी मान्यता प्राप्त सुरक्षित सेवा।",
        icon: "baby",
      },
      { title: "प्रसूती सेवा", description: "सुत्केरी तथा प्रवर्द्धनात्मक सेवा।", icon: "baby" },
      { title: "पोस्टमार्टम सेवा", description: "मेडिको-लिगल शल्यपरीक्षण सेवा।", icon: "scan" },
      {
        title: "सुरक्षित मातृत्व सेवा",
        description: "आमा र शिशुको सुरक्षित स्वास्थ्य सेवा।",
        icon: "baby",
      },
      {
        title: "नवजात शिशु सुरक्षा सेवा",
        description: "एन.आई.सि.यू (NICU) र नवजात स्याहार।",
        icon: "baby",
      },
      {
        title: "ए.आर.टी. (ART) सेवा",
        description: "एच.आई.भी संक्रमितको लागि औषधि वितरण।",
        icon: "activity",
      },
      { title: "खोप सेवाहरु", description: "नियमित र अभियानगत खोप सेवा।", icon: "syringe" },
      { title: "दन्त सेवा", description: "दाँत र मुख सम्बन्धी सम्पूर्ण उपचार।", icon: "tooth" },
      {
        title: "DOTs/Dots+ क्षयरोग सम्बन्धी सेवा",
        description: "क्षयरोगको निःशुल्क परीक्षण र उपचार।",
        icon: "lungs",
      },
      { title: "कुष्ठरोग", description: "कुष्ठरोगको पहिचान र उपचार।", icon: "skin" },
      {
        title: "मिनिल्याप/भ्यासेक्टोमी सेवा",
        description: "स्थायी बन्ध्याकरण सेवा।",
        icon: "baby",
      },
      { title: "स्वास्थ्य शिक्षा", description: "समुदाय सचेतना र परामर्श।", icon: "education" },
      {
        title: "एकद्वार संकट व्यवस्थापन केन्द्र (OCMC)",
        description: "लैङ्गिक हिंसा प्रभावितलाई एकीकृत सेवा।",
        icon: "disability",
      },
      { title: "फिजियोथेरापी सेवा", description: "शारीरिक पुनस्र्थापना सेवा।", icon: "activity" },
      {
        title: "स्वास्थ्य बिमा",
        description: "स्वास्थ्य बिमा बोर्डको कार्यक्रम।",
        icon: "insurance",
      },
      { title: "फार्मेसी", description: "हस्पिटल फार्मेसी (२४ सै घण्टा)।", icon: "pill" },
      { title: "शल्यक्रिया", description: "सामान्य तथा जटिल शल्यक्रिया।", icon: "surgery" },
      { title: "पोषण", description: "कुपोषण व्यवस्थापन तथा आहार परामर्श।", icon: "nutrition" },
      { title: "आइ.सि.यू (ICU/HDU)", description: "सघन उपचार कक्ष सेवा।", icon: "icu" },
      {
        title: "निशुल्क औषधी",
        description: "नेपाल सरकारबाट प्रदान गरिने निःशुल्क औषधि।",
        icon: "pill",
      },
      {
        title: "विस्तारित स्वास्थ्य सेवा (EHS)",
        description: "कार्यालय समय बाहेकको विशेषज्ञ सेवा।",
        icon: "activity",
      },
      { title: "परिवार नियोजन सेवा", description: "अस्थायी साधन र परामर्श।", icon: "baby" },
      {
        title: "सिटी स्क्यान सेवा",
        description: "कम्प्युटेड टोमोग्राफी (CT Scan) सेवा।",
        icon: "scan",
      },
      {
        title: "इन्डोस्कोपी सेवा",
        description: "पेट तथा आन्द्राको अत्याधुनिक परीक्षण।",
        icon: "activity",
      },
    ];

    // Helper to get exactly English or Nepali layout
    const buildLayout = (locale: "en" | "ne") => {
      // Get the existing EN layout to preserve other blocks
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pageLayout = homePage.layout as any;
      const existingLayout = pageLayout?.en || pageLayout || [];
      const newLayout = existingLayout.filter(
        (block: Record<string, unknown>) => block.blockType !== "ourServices"
      );

      newLayout.push({
        blockType: "ourServices",
        isVisibleOnHomepage: true,
        title: locale === "en" ? "Our Services" : "हाम्रा सेवाहरु",
        subtitle:
          locale === "en"
            ? "Provincial Hospital Services Directory"
            : "प्रादेशिक अस्पताल सेवा निर्देशिका",
        services: locale === "en" ? englishServices : nepaliServices,
      });

      return newLayout;
    };

    console.log("🛠️  Updating English locale...");
    await payload.update({
      collection: "pages",
      id: homePage.id,
      data: {
        layout: buildLayout("en"),
      },
      locale: "en",
      context: { disableRevalidate: true },
    });

    console.log("🛠️  Updating Nepali locale...");
    await payload.update({
      collection: "pages",
      id: homePage.id,
      data: {
        layout: buildLayout("ne"),
      },
      locale: "ne",
      context: { disableRevalidate: true },
    });

    console.log(`✅ Successfully seeded localized Our Services on Home Page!`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeder failed:", error);
    process.exit(1);
  }
}

seedOurServices();
