import type { CollectionConfig } from "payload";
import { nanoid } from "nanoid";
import en from "../../i18n/messages/en.json";
import ne from "../../i18n/messages/ne.json";

const m = {
  en: en["suchi-darta"],
  ne: ne["suchi-darta"],
};

export const SuchiDarta: CollectionConfig = {
  slug: "suchi-darta",
  admin: {
    useAsTitle: "trackingCode",
    defaultColumns: ["trackingCode", "applicantName", "submittedDate", "approvalStatus"],
    description: {
      en: m.en.admin["collection-description"],
      ne: m.ne.admin["collection-description"],
    },
  },
  labels: {
    singular: {
      en: m.en.admin["collection-name"].singular,
      ne: m.ne.admin["collection-name"].singular,
    },
    plural: {
      en: m.en.admin["collection-name"].plural,
      ne: m.ne.admin["collection-name"].plural,
    },
  },

  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },

  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === "create") {
          data.trackingCode = `SDC-${nanoid(8).toUpperCase()}`;
          data.submittedDate = new Date();
          data.approvalStatus = "pending";
        }
        return data;
      },
    ],
    // Auto-stamp reviewedDate when status changes
    afterChange: [
      async ({ doc, previousDoc, operation, req }) => {
        if (
          operation === "update" &&
          doc.approvalStatus !== previousDoc.approvalStatus &&
          doc.approvalStatus !== "pending"
        ) {
          await req.payload.update({
            collection: "suchi-darta",
            id: doc.id,
            data: {
              reviewedDate: new Date().toISOString(),
              reviewedBy: req.user?.id,
            },
          });
        }
      },
    ],
  },

  fields: [
    // ─── SIDEBAR ─────────────────────────────────────────────
    {
      name: "trackingCode",
      type: "text",
      unique: true,
      label: {
        en: m.en["tracking-code-label"],
        ne: m.ne["tracking-code-label"],
      },
      admin: {
        position: "sidebar",
        readOnly: true,
        description: {
          en: m.en.admin["tracking-code-description"],
          ne: m.ne.admin["tracking-code-description"],
        },
      },
    },
    {
      name: "approvalStatus",
      type: "select",
      label: {
        en: m.en.admin["approval-status"],
        ne: m.ne.admin["approval-status"],
      },
      defaultValue: "pending",
      options: [
        {
          label: { en: `⏳ ${m.en.track.status.pending}`, ne: `⏳ ${m.ne.track.status.pending}` },
          value: "pending",
        },
        {
          label: {
            en: `🔍 ${m.en.track.status.underReview}`,
            ne: `🔍 ${m.ne.track.status.underReview}`,
          },
          value: "under_review",
        },
        {
          label: {
            en: `✅ ${m.en.track.status.approved}`,
            ne: `✅ ${m.ne.track.status.approved}`,
          },
          value: "approved",
        },
        {
          label: {
            en: `❌ ${m.en.track.status.rejected}`,
            ne: `❌ ${m.ne.track.status.rejected}`,
          },
          value: "rejected",
        },
        {
          label: {
            en: `📋 ${m.en.track.status.moreInfoRequired}`,
            ne: `📋 ${m.ne.track.status.moreInfoRequired}`,
          },
          value: "more_info_required",
        },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "submittedDate",
      type: "date",
      label: {
        en: m.en.admin["submitted-date"],
        ne: m.ne.admin["submitted-date"],
      },
      admin: {
        position: "sidebar",
        readOnly: true,
        date: { pickerAppearance: "dayAndTime" },
      },
    },
    {
      name: "reviewedBy",
      type: "relationship",
      relationTo: "users",
      label: {
        en: m.en.admin["reviewed-by"],
        ne: m.ne.admin["reviewed-by"],
      },
      admin: {
        position: "sidebar",
        description: {
          en: m.en.admin["reviewed-by-description"],
          ne: m.ne.admin["reviewed-by-description"],
        },
      },
    },
    {
      name: "reviewedDate",
      type: "date",
      label: {
        en: m.en.admin["reviewed-date"],
        ne: m.ne.admin["reviewed-date"],
      },
      admin: {
        position: "sidebar",
        readOnly: true,
        date: { pickerAppearance: "dayAndTime" },
      },
    },

    // ─── TABS ────────────────────────────────────────────────
    {
      type: "tabs",
      tabs: [
        // ── TAB 1: Applicant Info ─────────────────────────────
        {
          label: {
            en: m.en.admin["applicant-info-tab"],
            ne: m.ne.admin["applicant-info-tab"],
          },
          fields: [
            {
              type: "row",
              fields: [
                {
                  // Applicant name — NOT localized (proper noun, same in all languages)
                  name: "applicantName",
                  type: "text",
                  required: true,
                  label: {
                    en: m.en.name,
                    ne: m.ne.name,
                  },
                  admin: {
                    width: "50%",
                    placeholder: {
                      en: m.en["name-placeholder"],
                      ne: m.ne["name-placeholder"],
                    },
                  },
                },
                {
                  // Address — NOT localized (physical address stays the same)
                  name: "permanentAddress",
                  type: "text",
                  required: true,
                  label: {
                    en: m.en["permanent-address"],
                    ne: m.ne["permanent-address"],
                  },
                  admin: {
                    width: "50%",
                    placeholder: {
                      en: m.en["permanent-address-placeholder"],
                      ne: m.ne["permanent-address-placeholder"],
                    },
                  },
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "correspondenceAddress",
                  type: "text",
                  required: true,
                  label: {
                    en: m.en["correspondence-address"],
                    ne: m.ne["correspondence-address"],
                  },
                  admin: {
                    width: "50%",
                    placeholder: {
                      en: m.en["correspondence-address-placeholder"],
                      ne: m.ne["correspondence-address-placeholder"],
                    },
                  },
                },
                {
                  name: "contactPersonName",
                  type: "text",
                  required: true,
                  label: {
                    en: m.en["contact-person"],
                    ne: m.ne["contact-person"],
                  },
                  admin: {
                    width: "50%",
                    placeholder: {
                      en: m.en["contact-person-placeholder"],
                      ne: m.ne["contact-person-placeholder"],
                    },
                  },
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "telephone",
                  type: "text",
                  required: true,
                  label: {
                    en: m.en.telephone,
                    ne: m.ne.telephone,
                  },
                  admin: {
                    width: "50%",
                    placeholder: {
                      en: m.en["telephone-placeholder"],
                      ne: m.ne["telephone-placeholder"],
                    },
                  },
                },
                {
                  name: "mobile",
                  type: "text",
                  required: true,
                  label: {
                    en: m.en.mobile,
                    ne: m.ne.mobile,
                  },
                  admin: {
                    width: "50%",
                    placeholder: {
                      en: m.en["mobile-placeholder"],
                      ne: m.ne["mobile-placeholder"],
                    },
                  },
                },
              ],
            },
            {
              name: "email",
              type: "email",
              label: {
                en: m.en.email,
                ne: m.ne.email,
              },
              admin: {
                placeholder: {
                  en: m.en["email-placeholder"],
                  ne: m.ne["email-placeholder"],
                },
                description: {
                  en: m.en["email-description"],
                  ne: m.ne["email-description"],
                },
              },
            },
          ],
        },

        // ── TAB 2: Documents ──────────────────────────────────
        {
          label: {
            en: m.en.admin["documents-tab"],
            ne: m.ne.admin["documents-tab"],
          },
          fields: [
            {
              // Documents are NOT localized — same files regardless of language
              name: "firmRegistrationCertificate",
              type: "upload",
              relationTo: "media",
              required: true,
              label: {
                en: m.en["firm-certificate"],
                ne: m.ne["firm-certificate"],
              },
              admin: {
                description: {
                  en: m.en["section-3-title"],
                  ne: m.ne["section-3-title"],
                },
              },
            },
            {
              name: "taxClearanceCertificate",
              type: "upload",
              relationTo: "media",
              required: true,
              label: {
                en: m.en["vat-pan-certificate"],
                ne: m.ne["vat-pan-certificate"],
              },
              admin: {
                description: {
                  en: m.en["section-3-title"],
                  ne: m.ne["section-3-title"],
                },
              },
            },
            {
              name: "taxPaymentCertificate",
              type: "upload",
              relationTo: "media",
              required: true,
              label: {
                en: m.en["tax-payment-certificate"],
                ne: m.ne["tax-payment-certificate"],
              },
              admin: {
                description: {
                  en: m.en["section-3-title"],
                  ne: m.ne["section-3-title"],
                },
              },
            },
            {
              name: "authorizationLetter",
              type: "upload",
              relationTo: "media",
              label: {
                en: m.en["authorization-letter"],
                ne: m.ne["authorization-letter"],
              },
              admin: {
                description: {
                  en: m.en["authorization-letter-description"],
                  ne: m.ne["authorization-letter-description"],
                },
              },
            },
          ],
        },

        // ── TAB 3: Purchase Details ───────────────────────────
        {
          label: {
            en: m.en.admin["purchase-details-tab"],
            ne: m.ne.admin["purchase-details-tab"],
          },
          fields: [
            {
              // Localized — applicant fills in their language
              name: "goodsSupply",
              type: "textarea",
              required: true,
              localized: true,
              label: {
                en: m.en["goods-supply"],
                ne: m.ne["goods-supply"],
              },
              admin: {
                placeholder: {
                  en: m.en["goods-supply-placeholder"],
                  ne: m.ne["goods-supply-placeholder"],
                },
                rows: 4,
              },
            },
            {
              name: "constructionWork",
              type: "textarea",
              required: true,
              localized: true,
              label: {
                en: m.en["construction-work"],
                ne: m.ne["construction-work"],
              },
              admin: {
                placeholder: {
                  en: m.en["construction-work-placeholder"],
                  ne: m.ne["construction-work-placeholder"],
                },
                rows: 4,
              },
            },
            {
              name: "consultancyServices",
              type: "textarea",
              required: true,
              localized: true,
              label: {
                en: m.en["consultancy-services"],
                ne: m.ne["consultancy-services"],
              },
              admin: {
                placeholder: {
                  en: m.en["consultancy-services-placeholder"],
                  ne: m.ne["consultancy-services-placeholder"],
                },
                rows: 4,
              },
            },
            {
              name: "otherServices",
              type: "textarea",
              required: true,
              localized: true,
              label: {
                en: m.en["other-services"],
                ne: m.ne["other-services"],
              },
              admin: {
                placeholder: {
                  en: m.en["other-services-placeholder"],
                  ne: m.ne["other-services-placeholder"],
                },
                rows: 4,
              },
            },
            {
              type: "row",
              fields: [
                {
                  // Fiscal year — NOT localized (same value in all languages)
                  name: "submissionDateBS",
                  type: "text",
                  required: true,
                  label: {
                    en: m.en["submission-date"],
                    ne: m.ne["submission-date"],
                  },
                  admin: {
                    width: "50%",
                    placeholder: {
                      en: m.en["pick-a-date"],
                      ne: m.ne["pick-a-date"],
                    },
                    description: "Fiscal year in Bikram Sambat",
                  },
                },
                {
                  // Applicant signature name — NOT localized (proper noun)
                  name: "applicantSignatureName",
                  type: "text",
                  required: true,
                  label: {
                    en: m.en["signature-name"],
                    ne: m.ne["signature-name"],
                  },
                  admin: {
                    width: "50%",
                    placeholder: {
                      en: m.en["signature-name-placeholder"],
                      ne: m.ne["signature-name-placeholder"],
                    },
                  },
                },
              ],
            },
          ],
        },

        // ── TAB 4: Admin Review ───────────────────────────────
        {
          label: {
            en: m.en.admin["admin-review-tab"],
            ne: m.ne.admin["admin-review-tab"],
          },
          fields: [
            {
              // Internal notes — NOT localized (admin writes in their own language)
              name: "internalNotes",
              type: "textarea",
              label: {
                en: m.en.admin["internal-notes"],
                ne: m.ne.admin["internal-notes"],
              },
              admin: {
                description: {
                  en: m.en.admin["internal-notes-description"],
                  ne: m.ne.admin["internal-notes-description"],
                },
                rows: 3,
              },
            },
            {
              // Remarks IS localized — shown to applicant in their language
              name: "remarks",
              type: "richText",
              localized: true,
              label: {
                en: m.en.admin["remarks-label"],
                ne: m.ne.admin["remarks-label"],
              },
              admin: {
                description: {
                  en: m.en.admin["remarks-description"],
                  ne: m.ne.admin["remarks-description"],
                },
              },
            },
            {
              // Rejection reason — NOT localized (enum value)
              name: "rejectionReason",
              type: "select",
              label: {
                en: m.en.admin["rejection-reason-label"],
                ne: m.ne.admin["rejection-reason-label"],
              },
              options: [
                {
                  label: {
                    en: m.en.admin["rejection-reasons"].incomplete_documents,
                    ne: m.ne.admin["rejection-reasons"].incomplete_documents,
                  },
                  value: "incomplete_documents",
                },
                {
                  label: {
                    en: m.en.admin["rejection-reasons"].invalid_certificate,
                    ne: m.ne.admin["rejection-reasons"].invalid_certificate,
                  },
                  value: "invalid_certificate",
                },
                {
                  label: {
                    en: m.en.admin["rejection-reasons"].expired_tax,
                    ne: m.ne.admin["rejection-reasons"].expired_tax,
                  },
                  value: "expired_tax",
                },
                {
                  label: {
                    en: m.en.admin["rejection-reasons"].duplicate,
                    ne: m.ne.admin["rejection-reasons"].duplicate,
                  },
                  value: "duplicate",
                },
                {
                  label: {
                    en: m.en.admin["rejection-reasons"].criteria_not_met,
                    ne: m.ne.admin["rejection-reasons"].criteria_not_met,
                  },
                  value: "criteria_not_met",
                },
                {
                  label: {
                    en: m.en.admin["rejection-reasons"].other,
                    ne: m.ne.admin["rejection-reasons"].other,
                  },
                  value: "other",
                },
              ],
              admin: {
                condition: (_, siblingData) => siblingData?.approvalStatus === "rejected",
                description: {
                  en: m.en.admin["rejection-reason-description"],
                  ne: m.ne.admin["rejection-reason-description"],
                },
              },
            },
            {
              // Additional info request IS localized — shown to applicant
              name: "additionalInfoRequested",
              type: "richText",
              localized: true,
              label: {
                en: m.en.admin["additional-info-label"],
                ne: m.ne.admin["additional-info-label"],
              },
              admin: {
                condition: (_, siblingData) => siblingData?.approvalStatus === "more_info_required",
                description: {
                  en: m.en.admin["additional-info-description"],
                  ne: m.ne.admin["additional-info-description"],
                },
              },
            },
            {
              name: "approvalCertificateNumber",
              type: "text",
              label: {
                en: m.en.admin["certificate-number-label"],
                ne: m.ne.admin["certificate-number-label"],
              },
              admin: {
                condition: (_, siblingData) => siblingData?.approvalStatus === "approved",
                description: {
                  en: m.en.admin["certificate-number-description"],
                  ne: m.ne.admin["certificate-number-description"],
                },
              },
            },
            {
              name: "approvalValidUntil",
              type: "date",
              label: {
                en: m.en.admin["valid-until-label"],
                ne: m.ne.admin["valid-until-label"],
              },
              admin: {
                condition: (_, siblingData) => siblingData?.approvalStatus === "approved",
                date: { pickerAppearance: "dayOnly" },
              },
            },
          ],
        },
      ],
    },
  ],
};
