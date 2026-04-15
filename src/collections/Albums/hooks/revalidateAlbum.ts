import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { revalidatePath, revalidateTag } from "next/cache";

import type { Album } from "../../../payload-types";

export const revalidateAlbum: CollectionAfterChangeHook<Album> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating album: ${doc.slug}`);
    revalidateTag("albums");
    revalidatePath("/gallery");
    if (doc.slug) {
      revalidatePath(`/gallery/${doc.slug}`);
    }
  }
  return doc;
};

export const revalidateAlbumDelete: CollectionAfterDeleteHook<Album> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidateTag("albums");
    revalidatePath("/gallery");
    if (doc?.slug) {
      revalidatePath(`/gallery/${doc.slug}`);
    }
  }
  return doc;
};
