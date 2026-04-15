import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { revalidatePath, revalidateTag } from "next/cache";

import type { List } from "../../../payload-types";

export const revalidateList: CollectionAfterChangeHook<List> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    // Always revalidate the listing page (published or not — status may have changed)
    revalidateTag("list");
    revalidatePath("/notices");

    if (doc.status === "published") {
      payload.logger.info(`Revalidating notice: ${doc.slug}`);
      if (doc.slug) {
        revalidatePath(`/notices/${doc.slug}`);
      }
    }

    // If the doc was previously published and is now unpublished, revalidate old path
    if (previousDoc?.status === "published" && doc.status !== "published") {
      const oldSlug = previousDoc.slug;
      if (oldSlug) {
        payload.logger.info(`Revalidating unpublished notice: ${oldSlug}`);
        revalidatePath(`/notices/${oldSlug}`);
      }
    }
  }
  return doc;
};

export const revalidateListDelete: CollectionAfterDeleteHook<List> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidateTag("list");
    revalidatePath("/notices");
    if (doc?.slug) {
      revalidatePath(`/notices/${doc.slug}`);
    }
  }
  return doc;
};
