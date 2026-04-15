import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { revalidatePath, revalidateTag } from "next/cache";

import type { HospitalSection } from "../../../payload-types";

export const revalidateHospitalSection: CollectionAfterChangeHook<HospitalSection> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating hospital section: ${doc.slug}`);
    revalidateTag("hospital-sections");
    revalidatePath("/sections");
    if (doc.slug) {
      revalidatePath(`/sections/${doc.slug}`);
    }
  }
  return doc;
};

export const revalidateHospitalSectionDelete: CollectionAfterDeleteHook<HospitalSection> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidateTag("hospital-sections");
    revalidatePath("/sections");
    if (doc?.slug) {
      revalidatePath(`/sections/${doc.slug}`);
    }
  }
  return doc;
};
