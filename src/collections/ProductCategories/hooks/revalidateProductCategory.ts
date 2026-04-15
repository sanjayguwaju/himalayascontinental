import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { revalidatePath, revalidateTag } from "next/cache";

import type { ProductCategory } from "../../../payload-types";

export const revalidateProductCategory: CollectionAfterChangeHook<ProductCategory> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/products/category/${doc.slug}`;
    
    payload.logger.info(`Revalidating product category at path: ${path}`);
    
    // Revalidate individual category route
    revalidatePath(path);
    // Revalidate generic products list
    revalidatePath('/products');
    revalidateTag("product-categories");
    revalidateTag("products");

    if (previousDoc && previousDoc.slug !== doc.slug) {
      const oldPath = `/products/category/${previousDoc.slug}`;
      payload.logger.info(`Revalidating old product category at path: ${oldPath}`);
      revalidatePath(oldPath);
    }
  }
  return doc;
};

export const revalidateProductCategoryDelete: CollectionAfterDeleteHook<ProductCategory> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/products/category/${doc?.slug}`;
    revalidatePath(path);
    revalidatePath('/products');
    revalidateTag("product-categories");
    revalidateTag("products");
  }
  return doc;
};
