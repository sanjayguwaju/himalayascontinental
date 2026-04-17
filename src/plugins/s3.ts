import { s3Storage } from "@payloadcms/storage-s3";
import config from "../config";

const systemConfig = config();

export const s3StoragePlugin = s3Storage({
  collections: {
    // ─── media → S3 storage ────────────────────────────────────────
    media: {
      prefix: "media",
      generateFileURL: ({ filename }) => {
        if (!filename) return "";
        return `/api/media/file/${filename}`;
      },
    },
  },

  bucket: systemConfig.S3_BUCKET,
  config: {
    endpoint: systemConfig.S3_ENDPOINT,
    forcePathStyle: true,
    credentials: {
      accessKeyId: systemConfig.S3_ACCESS_KEY_ID,
      secretAccessKey: systemConfig.S3_SECRET_ACCESS_KEY,
    },
    region: systemConfig.S3_REGION,
  },
});
