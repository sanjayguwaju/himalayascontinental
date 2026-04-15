import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { revalidatePath, revalidateTag } from "next/cache";

import type { Staff } from "../../../payload-types";

export const revalidateStaff: CollectionAfterChangeHook<Staff> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating staff: ${doc.slug}`);
    revalidateTag("staffs");
    revalidatePath("/staff");
    if (doc.showOnWebsite && doc.slug) {
      revalidatePath(`/staff/${doc.slug}`);
    }
  }
  return doc;
};

export const revalidateStaffDelete: CollectionAfterDeleteHook<Staff> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidateTag("staffs");
    revalidatePath("/staff");
    if (doc?.slug) {
      revalidatePath(`/staff/${doc.slug}`);
    }
  }
  return doc;
};
