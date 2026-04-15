import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { revalidatePath, revalidateTag } from "next/cache";

import type { Product } from "../../../payload-types";

export const revalidateProduct: CollectionAfterChangeHook<Product> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/products/${doc.slug}`;
    
    payload.logger.info(`Revalidating product at path: ${path}`);
    
    // Revalidate individual product route
    revalidatePath(path);
    // Revalidate generic products list
    revalidatePath('/products');
    revalidateTag("products");

    if (previousDoc && previousDoc.slug !== doc.slug) {
      const oldPath = `/products/${previousDoc.slug}`;
      payload.logger.info(`Revalidating old product at path: ${oldPath}`);
      revalidatePath(oldPath);
    }
  }
  return doc;
};

export const revalidateProductDelete: CollectionAfterDeleteHook<Product> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/products/${doc?.slug}`;
    revalidatePath(path);
    revalidatePath('/products');
    revalidateTag("products");
  }
  return doc;
};
