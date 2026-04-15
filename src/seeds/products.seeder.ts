import "dotenv/config";
import payload, { type RequiredDataFromCollectionSlug } from "payload";
import config from "../payload.config";

// ── PRODUCT CATEGORIES (3) ─────────────────────────────────────────
const productCategoriesSeedData = [
  {
    name: "Medical Equipments",
    slug: "medical-equipments",
    hasSubCategories: true,
    description: "High-quality medical equipment for hospitals, clinics, and healthcare facilities including diagnostic, therapeutic, and monitoring devices.",
    order: 1,
  },
  {
    name: "International Business",
    slug: "international-business",
    hasSubCategories: false,
    description: "Global healthcare business solutions, import/export services, and international medical partnerships.",
    order: 2,
  },
  {
    name: "Medicines",
    slug: "medicines",
    hasSubCategories: false,
    description: "Pharmaceutical products, prescription medications, over-the-counter drugs, and healthcare supplements.",
    order: 3,
  },
];

// ── PRODUCT SUB-CATEGORIES (5 per category with sub-categories) ────
const productSubCategoriesSeedData = [
  // Medical Equipments sub-categories (5)
  {
    name: "Critical Care Equipment",
    slug: "critical-care-equipment",
    parentCategorySlug: "medical-equipments",
    description: "ICU ventilators, patient monitors, infusion pumps, and other critical care devices.",
    order: 1,
  },
  {
    name: "Diagnostic Equipment",
    slug: "diagnostic-equipment",
    parentCategorySlug: "medical-equipments",
    description: "X-ray machines, ultrasound scanners, ECG machines, and laboratory diagnostic instruments.",
    order: 2,
  },
  {
    name: "Surgical Instruments",
    slug: "surgical-instruments",
    parentCategorySlug: "medical-equipments",
    description: "Precision surgical tools, operating room equipment, and sterilization devices.",
    order: 3,
  },
  {
    name: "Patient Care Equipment",
    slug: "patient-care-equipment",
    parentCategorySlug: "medical-equipments",
    description: "Hospital beds, wheelchairs, stretchers, and patient mobility aids.",
    order: 4,
  },
  {
    name: "Oxygen & Respiratory",
    slug: "oxygen-respiratory",
    parentCategorySlug: "medical-equipments",
    description: "Oxygen concentrators, nebulizers, CPAP machines, and respiratory therapy equipment.",
    order: 5,
  },
];

// ── PRODUCTS (3) ────────────────────────────────────────────────────
const productsSeedData = [
  {
    name: "OWGELS Oxygen Concentrator 10L",
    slug: "owgels-oxygen-concentrator-10l",
    brand: "OWGELS",
    sku: "OW-OC-10L-001",
    categorySlug: "medical-equipments",
    subCategorySlug: "oxygen-respiratory",
    shortDescription: "High-flow oxygen concentrator delivering up to 10 liters per minute with 93%±3% purity. Ideal for home and clinical use.",
    description: {
      root: {
        type: "root",
        direction: "ltr" as const,
        format: "",
        indent: 0,
        version: 1,
        children: [
          {
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
                text: "The OWGELS Oxygen Concentrator 10L is a reliable medical-grade device designed for patients requiring oxygen therapy. With a high flow rate of up to 10 liters per minute and oxygen purity of 93%±3%, it ensures optimal therapeutic support for respiratory conditions.",
                type: "text",
                version: 1,
              },
            ],
          },
          {
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
                text: "Key features include low noise operation, energy efficiency, and a user-friendly LCD display. The built-in nebulizer function adds versatility for comprehensive respiratory care.",
                type: "text",
                version: 1,
              },
            ],
          },
        ],
      },
    },
    specifications: [
      { label: "Flow Rate", value: "1-10 L/min" },
      { label: "Oxygen Purity", value: "93% ± 3%" },
      { label: "Power Consumption", value: "550W" },
      { label: "Noise Level", value: "≤ 50 dB" },
      { label: "Weight", value: "25 kg" },
      { label: "Dimensions", value: "380 x 380 x 640 mm" },
    ],
    featured: true,
    inStock: true,
    isNew: true,
    hasBrochure: false,
    hasSpecificationsTable: false,
  },
  {
    name: "Philips ECG Machine 12-Channel",
    slug: "philips-ecg-machine-12-channel",
    brand: "Philips",
    sku: "PH-ECG-12CH-002",
    categorySlug: "medical-equipments",
    subCategorySlug: "diagnostic-equipment",
    shortDescription: "Advanced 12-channel ECG machine with automatic interpretation, high-resolution touchscreen, and seamless EMR integration.",
    description: {
      root: {
        type: "root",
        direction: "ltr" as const,
        format: "",
        indent: 0,
        version: 1,
        children: [
          {
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
                text: "The Philips 12-Channel ECG Machine delivers precise cardiac diagnostics with advanced signal processing technology. Its intuitive interface and comprehensive analysis capabilities make it ideal for hospitals, clinics, and diagnostic centers.",
                type: "text",
                version: 1,
              },
            ],
          },
          {
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
                text: "Features include real-time ECG monitoring, automated measurement and interpretation, and seamless connectivity with hospital information systems for efficient patient data management.",
                type: "text",
                version: 1,
              },
            ],
          },
        ],
      },
    },
    specifications: [
      { label: "Channels", value: "12 Lead" },
      { label: "Sampling Rate", value: "1000 Hz" },
      { label: "Display", value: "10.1 inch Touchscreen" },
      { label: "Battery Life", value: "4 hours" },
      { label: "Storage", value: "10,000 ECGs" },
      { label: "Connectivity", value: "WiFi, USB, LAN" },
    ],
    featured: true,
    inStock: true,
    isNew: false,
    hasBrochure: true,
    hasSpecificationsTable: true,
    specificationsTable: {
      tableTitle: "Technical Specifications",
      headers: [{ header: "Parameter" }, { header: "Specification" }],
      rows: [
        { cells: [{ value: "Input Impedance" }, { value: "≥ 50 MΩ" }] },
        { cells: [{ value: "Frequency Response" }, { value: "0.05-150 Hz" }] },
        { cells: [{ value: "Common Mode Rejection" }, { value: "> 120 dB" }] },
        { cells: [{ value: "Input Voltage Range" }, { value: "± 5 mV" }] },
      ],
    },
  },
  {
    name: "Premium Hospital Bed Electric 5-Function",
    slug: "premium-hospital-bed-electric-5-function",
    brand: "Himalaya Med",
    sku: "HM-HB-5F-003",
    categorySlug: "medical-equipments",
    subCategorySlug: "patient-care-equipment",
    shortDescription: "Electric hospital bed with 5 functions including height adjustment, backrest, knee break, Trendelenburg, and reverse Trendelenburg positions.",
    description: {
      root: {
        type: "root",
        direction: "ltr" as const,
        format: "",
        indent: 0,
        version: 1,
        children: [
          {
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
                text: "This premium electric hospital bed is designed for maximum patient comfort and caregiver convenience. The 5-function electric control system allows precise positioning for various medical procedures and patient comfort needs.",
                type: "text",
                version: 1,
              },
            ],
          },
          {
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
                text: "Constructed with high-grade medical steel and premium mattress support, this bed features side rails with integrated controls, central locking casters, and IV pole mounts. The ABS head and foot boards are easily removable for emergency access.",
                type: "text",
                version: 1,
              },
            ],
          },
        ],
      },
    },
    specifications: [
      { label: "Overall Dimensions", value: "2200 x 1060 x 500-750 mm" },
      { label: "Bed Surface", value: "1950 x 900 mm" },
      { label: "Weight Capacity", value: "250 kg" },
      { label: "Motor", value: "LINAK Denmark" },
      { label: "Power", value: "220V/50Hz" },
      { label: "Backup Battery", value: "1 hour" },
    ],
    featured: false,
    inStock: true,
    isNew: false,
    hasBrochure: false,
    hasSpecificationsTable: false,
  },
];

async function seedProducts(): Promise<void> {
  try {
    await payload.init({ config });

    console.log("🌱 Starting products seeder...");

    // ── GET EXISTING MEDIA ─────────────────────────────────────────
    const media = await payload.find({
      collection: "media",
      limit: 20,
    });

    const mediaIds = media.docs.map((m) => m.id);
    if (mediaIds.length === 0) {
      console.warn("⚠️ No media found. Products will be created without images.");
    } else {
      console.log(`📸 Found ${mediaIds.length} media items to use for products.`);
    }

    // ── CLEAR EXISTING DATA ───────────────────────────────────────
    console.log("🗑️  Clearing existing data...");

    const existingProducts = await payload.find({ collection: "products", limit: 100 });
    if (existingProducts.docs.length > 0) {
      console.log(`   Deleting ${existingProducts.docs.length} products...`);
      for (const doc of existingProducts.docs) {
        await payload.delete({ collection: "products", id: doc.id });
      }
    }

    const existingSubCategories = await payload.find({ collection: "product-sub-categories", limit: 100 });
    if (existingSubCategories.docs.length > 0) {
      console.log(`   Deleting ${existingSubCategories.docs.length} sub-categories...`);
      for (const doc of existingSubCategories.docs) {
        await payload.delete({ collection: "product-sub-categories", id: doc.id });
      }
    }

    const existingCategories = await payload.find({ collection: "product-categories", limit: 100 });
    if (existingCategories.docs.length > 0) {
      console.log(`   Deleting ${existingCategories.docs.length} categories...`);
      for (const doc of existingCategories.docs) {
        await payload.delete({ collection: "product-categories", id: doc.id });
      }
    }

    // ── CREATE CATEGORIES ────────────────────────────────────────────
    console.log("📁 Creating product categories...");
    const createdCategories: Record<string, string> = {};

    for (const catData of productCategoriesSeedData) {
      const category = await payload.create({
        collection: "product-categories",
        data: catData as unknown as RequiredDataFromCollectionSlug<"product-categories">,
      });
      createdCategories[catData.slug] = category.id;
      console.log(`   ✅ ${catData.name} (ID: ${category.id})`);
    }

    // ── CREATE SUB-CATEGORIES ──────────────────────────────────────
    console.log("📂 Creating product sub-categories...");
    const createdSubCategories: Record<string, string> = {};

    for (const subCatData of productSubCategoriesSeedData) {
      const parentId = createdCategories[subCatData.parentCategorySlug];
      if (!parentId) {
        console.warn(`   ⚠️ Parent category not found for ${subCatData.name}`);
        continue;
      }

      const subCategory = await payload.create({
        collection: "product-sub-categories",
        data: {
          name: subCatData.name,
          slug: subCatData.slug,
          parentCategory: parentId,
          description: subCatData.description,
          order: subCatData.order,
        } as unknown as RequiredDataFromCollectionSlug<"product-sub-categories">,
      });
      createdSubCategories[subCatData.slug] = subCategory.id;
      console.log(`   ✅ ${subCatData.name} (ID: ${subCategory.id})`);
    }

    // ── CREATE PRODUCTS ────────────────────────────────────────────
    console.log("📦 Creating products...");

    for (const [index, prodData] of productsSeedData.entries()) {
      const categoryId = createdCategories[prodData.categorySlug];
      const subCategoryId = createdSubCategories[prodData.subCategorySlug];

      if (!categoryId) {
        console.warn(`   ⚠️ Category not found for ${prodData.name}`);
        continue;
      }

      // Rotate through available media for thumbnail and gallery
      const thumbnailId = mediaIds.length > 0 ? mediaIds[index % mediaIds.length] : undefined;
      const galleryImages = [];
      if (mediaIds.length > 0) {
        for (let i = 0; i < 3; i++) {
          galleryImages.push({
            image: mediaIds[(index + i) % mediaIds.length],
            alt: `${prodData.name} - Image ${i + 1}`,
          });
        }
      }

      const product = await payload.create({
        collection: "products",
        data: {
          name: prodData.name,
          slug: prodData.slug,
          brand: prodData.brand,
          sku: prodData.sku,
          category: categoryId,
          subCategory: subCategoryId,
          thumbnail: thumbnailId,
          gallery: galleryImages,
          shortDescription: prodData.shortDescription,
          description: prodData.description,
          specifications: prodData.specifications,
          featured: prodData.featured,
          inStock: prodData.inStock,
          isNew: prodData.isNew,
          hasBrochure: prodData.hasBrochure,
          hasSpecificationsTable: prodData.hasSpecificationsTable,
          specificationsTable: prodData.specificationsTable,
        } as unknown as RequiredDataFromCollectionSlug<"products">,
      });
      console.log(`   ✅ ${prodData.name} (ID: ${product.id})`);
    }

    console.log("\n🎉 Seeding completed successfully!");
    console.log(`   📁 ${productCategoriesSeedData.length} Categories`);
    console.log(`   📂 ${productSubCategoriesSeedData.length} Sub-Categories`);
    console.log(`   📦 ${productsSeedData.length} Products`);
  } catch (error) {
    console.error("❌ Seeder failed:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seedProducts();
