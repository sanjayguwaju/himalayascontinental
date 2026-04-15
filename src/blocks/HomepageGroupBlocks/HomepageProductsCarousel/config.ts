import type { Block } from "payload";

export const HomepageProductsCarousel: Block = {
  slug: "homepageProductsCarousel",
  interfaceName: "HomepageProductsCarouselBlock",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Section Title",
      defaultValue: "Our Products",
      required: true,
      localized: true,
    },
    {
      name: "categoryText",
      type: "text",
      label: "Category Label",
      defaultValue: "MEDICAL EQUIPMENTS",
      localized: true,
    },
    {
      name: "products",
      type: "array",
      label: "Products",
      minRows: 1,
      maxRows: 20,
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: "Product Image",
          required: true,
        },
        {
          name: "linkUrl",
          type: "text",
          label: "Product Link URL (Optional)",
        },
      ],
    },
    {
      name: "viewAllLabel",
      type: "text",
      label: "View All Button Label",
      defaultValue: "View All",
    },
    {
      name: "viewAllLink",
      type: "text",
      label: "View All Button Link",
      defaultValue: "/products",
    },
  ],
  labels: {
    plural: "Homepage Products Carousels",
    singular: "Homepage Products Carousel",
  },
};
