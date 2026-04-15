import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { revalidatePath, revalidateTag } from "next/cache";

import type { ProductSubCategory } from "../../../payload-types";

export const revalidateProductSubCategory: CollectionAfterChangeHook<ProductSubCategory> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating product sub-category: ${doc.slug}`);
    
    revalidatePath('/products');
    revalidateTag("product-sub-categories");
    revalidateTag("product-categories");
    revalidateTag("products");
  }
  return doc;
};

export const revalidateProductSubCategoryDelete: CollectionAfterDeleteHook<ProductSubCategory> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidatePath('/products');
    revalidateTag("product-sub-categories");
    revalidateTag("product-categories");
    revalidateTag("products");
  }
  return doc;
};
