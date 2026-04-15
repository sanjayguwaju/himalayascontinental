import "dotenv/config";
import payload from "payload";
import config from "../payload.config";

const sectionSeedData = [
  {
    title: "Nutrition",
    slug: "nutrition",
    shortName: "NRC",
    excerpt:
      "10-bed nutritional rehabilitation center serving malnourished children under 5 years.",
    operatingHours: "24 hours",
    totalBeds: 10,
    totalStaffCount: 9,
    establishedYear: 2075,
    services: [
      { service: "Nutritional Rehabilitation" },
      { service: "HIV TV Testing" },
      { service: "Malnourished Child Care" },
      { service: "Mother & Parent Feeding Support" },
    ],
    isActive: true,
    displayOrder: 1,
  },
  {
    title: "Indoor",
    slug: "indoor",
    excerpt: "Indoor patient admission and general ward services.",
    operatingHours: "24 hours",
    services: [
      { service: "General Admission" },
      { service: "Indoor Patient Care" },
      { service: "Post-operative Care" },
    ],
    isActive: true,
    displayOrder: 2,
  },
  {
    title: "Physiotherapy",
    slug: "physiotherapy",
    excerpt: "Rehabilitation and physiotherapy services for patients.",
    operatingHours: "9AM - 5PM",
    services: [
      { service: "Physical Rehabilitation" },
      { service: "Post-surgery Recovery" },
      { service: "Musculoskeletal Therapy" },
    ],
    isActive: true,
    displayOrder: 3,
  },
  {
    title: "X-Ray",
    slug: "x-ray",
    excerpt: "Digital X-Ray diagnostic imaging services.",
    operatingHours: "9AM - 5PM",
    services: [
      { service: "Chest X-Ray" },
      { service: "Bone X-Ray" },
      { service: "Digital Imaging" },
    ],
    isActive: true,
    displayOrder: 4,
  },
  {
    title: "Paediatric Ward",
    slug: "paediatric-ward",
    excerpt: "Dedicated ward for child patients with specialist paediatric care.",
    operatingHours: "24 hours",
    services: [
      { service: "Child Inpatient Care" },
      { service: "Neonatal Care" },
      { service: "Paediatric Emergency" },
    ],
    isActive: true,
    displayOrder: 5,
  },
  {
    title: "(MPDSR) Programme",
    slug: "mpdsr-programme",
    shortName: "MPDSR",
    excerpt: "Maternal and Perinatal Death Surveillance and Response programme.",
    operatingHours: "9AM - 5PM",
    services: [
      { service: "Maternal Death Review" },
      { service: "Perinatal Death Surveillance" },
      { service: "Response & Reporting" },
    ],
    isActive: true,
    displayOrder: 6,
  },
  {
    title: "OCMC",
    slug: "ocmc",
    shortName: "OCMC",
    excerpt: "One Stop Crisis Management Centre for gender-based violence survivors.",
    operatingHours: "24 hours",
    services: [
      { service: "Crisis Counseling" },
      { service: "Medical Examination" },
      { service: "Legal Aid Referral" },
      { service: "Psychosocial Support" },
    ],
    isActive: true,
    displayOrder: 7,
  },
  {
    title: "PCR Lab",
    slug: "pcr-lab",
    shortName: "PCR",
    excerpt: "Polymerase Chain Reaction laboratory for diagnostic testing.",
    operatingHours: "9AM - 5PM",
    services: [
      { service: "PCR Testing" },
      { service: "Infectious Disease Diagnosis" },
      { service: "COVID-19 Testing" },
    ],
    isActive: true,
    displayOrder: 8,
  },
  {
    title: "ART",
    slug: "art",
    shortName: "ART",
    excerpt: "Antiretroviral Therapy centre for HIV/AIDS patient management.",
    operatingHours: "9AM - 5PM",
    services: [
      { service: "Antiretroviral Therapy" },
      { service: "HIV Counseling & Testing" },
      { service: "CD4 Count Monitoring" },
    ],
    isActive: true,
    displayOrder: 9,
  },
  {
    title: "Dialysis",
    slug: "dialysis",
    excerpt: "Kidney dialysis services for patients with renal conditions.",
    operatingHours: "9AM - 5PM",
    services: [
      { service: "Haemodialysis" },
      { service: "Renal Care" },
      { service: "Dialysis Monitoring" },
    ],
    isActive: true,
    displayOrder: 10,
  },
  {
    title: "Radiology",
    slug: "radiology",
    excerpt: "Advanced radiology and medical imaging services.",
    operatingHours: "9AM - 5PM",
    services: [
      { service: "Ultrasound" },
      { service: "CT Scan" },
      { service: "MRI" },
      { service: "Fluoroscopy" },
    ],
    isActive: true,
    displayOrder: 11,
  },
  {
    title: "Pharmacy",
    slug: "pharmacy",
    excerpt: "In-hospital pharmacy providing medicines and patient dispensing services.",
    operatingHours: "24 hours",
    services: [
      { service: "Medicine Dispensing" },
      { service: "Drug Counseling" },
      { service: "Emergency Medicines" },
    ],
    isActive: true,
    displayOrder: 12,
  },
];

async function seedHospitalSections(): Promise<void> {
  try {
    await payload.init({ config });

    console.log("🌱 Starting hospital sections seeder...");

    // Clear existing
    const existing = await payload.find({
      collection: "hospital-sections",
      limit: 100,
    });
    if (existing.docs.length > 0) {
      console.log(`🗑️  Deleting ${existing.docs.length} existing section records...`);
      await Promise.all(
        existing.docs.map((doc) => payload.delete({ collection: "hospital-sections", id: doc.id }))
      );
    }

    // Insert all sections
    console.log(`📋 Inserting ${sectionSeedData.length} sections...`);
    const results = await Promise.all(
      sectionSeedData.map((section) =>
        payload.create({ collection: "hospital-sections", data: section })
      )
    );

    console.log(`✅ Successfully seeded ${results.length} hospital sections:`);
    results.forEach((r) => console.log(`   • ${r.title} → /${r.slug}`));
  } catch (error) {
    console.error("❌ Seeder failed:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seedHospitalSections();
