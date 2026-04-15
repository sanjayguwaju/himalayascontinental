"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { ArrowRight,  Loader2, Upload, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/utilities/ui";
import { adToBS, bsStringToAD } from "@/lib/bs-date";
import { NepaliDateInput } from "@/components/ui/NepaliDateInput";

// Validates the individual HTML <input type="file" /> file list
const fileSchema = z
  .custom<FileList>()
  .refine((files) => files?.length === 1, "File is required.")
  .refine((files) => files?.[0]?.size <= 5 * 1024 * 1024, "Max file size is 5MB.")
  .refine(
    (files) =>
      ["image/jpeg", "image/jpg", "image/png", "application/pdf"].includes(files?.[0]?.type),
    "Only .jpg, .jpeg, .png and .pdf formats are supported."
  );

// The Zod Validation schema for the entire complex form
const formSchema = z.object({
  applicantName: z.string().min(2, "Name must be at least 2 characters."),
  permanentAddress: z.string().min(2, "Permanent Address is required."),
  correspondenceAddress: z.string().min(2, "Correspondence Address is required."),
  contactPersonName: z.string().min(2, "Contact Person Name is required."),
  telephone: z.string().min(6, "Valid Telephone No. is required."),
  mobile: z.string().min(10, "Valid Mobile No. is required."),
  email: z.string().email("Please enter a valid email address.").optional().or(z.literal("")),
  goodsSupply: z.string().min(2, "Goods Supply detail is required."),
  constructionWork: z.string().min(2, "Construction Work detail is required."),
  consultancyServices: z.string().min(2, "Consultancy Services detail is required."),
  otherServices: z.string().min(2, "Other Services detail is required."),
  submissionDateBS: z.string().min(4, "Submission Fiscal Year is required (e.g., २०८२-२०८३)."),
  applicantSignatureName: z.string().min(2, "Applicant Signature Name is required."),
  firmRegistrationCertificate: fileSchema,
  taxClearanceCertificate: fileSchema,
  taxPaymentCertificate: fileSchema,
  authorizationLetter: z
    .custom<FileList>()
    .optional()
    .refine(
      (files) => !files || files.length === 0 || files[0].size <= 5 * 1024 * 1024,
      "Max file size is 5MB."
    )
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        ["image/jpeg", "image/jpg", "image/png", "application/pdf"].includes(files[0].type),
      "Only .jpg, .jpeg, .png and .pdf formats are supported."
    ),
});

type FormValues = z.infer<typeof formSchema>;

export const SuchiDartaClient: React.FC = () => {
  const t = useTranslations("suchi-darta");

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successCode, setSuccessCode] = useState<string | null>(null);

  // ---------------------------------------------------------------------------
  // Proper Section Heading
  // ---------------------------------------------------------------------------
  const SectionHeading = ({ num, labelKey }: { num: number; labelKey: string }) => (
    <div className="border-b pb-3 mb-6">
      <h2 className="text-xl font-semibold flex items-center gap-3">
        <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full inline-flex items-center justify-center text-sm font-bold shadow-sm">
          {num}
        </span>
        <span className="tracking-tight text-foreground/90">
          {t(labelKey)}
        </span>
      </h2>
    </div>
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicantName: "",
      permanentAddress: "",
      correspondenceAddress: "",
      contactPersonName: "",
      telephone: "",
      mobile: "",
      email: "",
      goodsSupply: "",
      constructionWork: "",
      consultancyServices: "",
      otherServices: "",
      submissionDateBS: "",
      applicantSignatureName: "",
    },
  });

  // Helper to accurately upload File to Payload Media local API
  const uploadFile = async (fileList: FileList): Promise<string | null> => {
    if (!fileList || fileList.length === 0) return null;
    const file = fileList[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("File upload failed");

      const parsed = await res.json();
      return parsed.doc.id;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    let firmId, taxClearId, taxPayId, authId;

    try {
      // 1. Upload mandatory files
      toast.info("Uploading Firm Registration Certificate...");
      firmId = await uploadFile(values.firmRegistrationCertificate);

      toast.info("Uploading VAT/PAN Certificate...");
      taxClearId = await uploadFile(values.taxClearanceCertificate);

      toast.info("Uploading Tax Payment Certificate...");
      taxPayId = await uploadFile(values.taxPaymentCertificate);

      if (!firmId || !taxClearId || !taxPayId) {
        throw new Error("Failed to upload essential verification certificates.");
      }

      // Optional upload
      if (values.authorizationLetter && values.authorizationLetter.length > 0) {
        toast.info("Uploading Authorization Letter (Optional)...");
        authId = await uploadFile(values.authorizationLetter);
      }

      toast.info("Submitting registration details...");
      // 2. Submit the JSON payload
      const response = await fetch("/api/suchi-darta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applicantName: values.applicantName,
          permanentAddress: values.permanentAddress,
          correspondenceAddress: values.correspondenceAddress,
          contactPersonName: values.contactPersonName,
          telephone: values.telephone,
          mobile: values.mobile,
          email: values.email || undefined,
          goodsSupply: values.goodsSupply,
          constructionWork: values.constructionWork,
          consultancyServices: values.consultancyServices,
          otherServices: values.otherServices,
          submissionDateBS: values.submissionDateBS,
          applicantSignatureName: values.applicantSignatureName,
          firmRegistrationCertificate: firmId,
          taxClearanceCertificate: taxClearId,
          taxPaymentCertificate: taxPayId,
          ...(authId ? { authorizationLetter: authId } : {}),
        }),
      });

      const parsedRes = await response.json();
      if (!response.ok) {
        throw new Error(parsedRes.errors?.[0]?.message || "Failed to submit registration.");
      }

      setSuccessCode(parsedRes.doc.trackingCode);
      toast.success("Registration completed successfully!");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error: unknown) {
      toast.error((error as Error).message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successCode) {
    return (
      <div className="flex flex-col items-center py-10 space-y-6 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-500/15 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-2">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold">{t("success-title")}</h2>
        <p className="text-muted-foreground text-lg max-w-lg">{t("success-description")}</p>

        <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 w-full max-w-md my-4 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-wider text-primary mb-2">
            {t("tracking-code-label")}
          </p>
          <div className="text-3xl font-mono font-bold tracking-widest bg-muted/30 py-3 rounded border border-border">
            {successCode}
          </div>
          <p className="text-xs text-muted-foreground mt-3">{t("tracking-code-note")}</p>
        </div>

        <div className="flex gap-4 pt-4">
          <Button onClick={() => router.push("/")} variant="outline">
            {t("return-home")}
          </Button>
          <Button onClick={() => router.push("/suchi-darta/track")}>
            {t("track-status")} <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        {/* Section 1: Applicant Info */}
        <section>
          <SectionHeading num={1} labelKey="section-1-title" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <FormField
              control={form.control}
              name="applicantName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("name")} <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={t("name-placeholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="permanentAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("permanent-address")} <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={t("permanent-address-placeholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="correspondenceAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("correspondence-address")} <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={t("correspondence-address-placeholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactPersonName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("contact-person")} <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={t("contact-person-placeholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telephone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("telephone")} <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={t("telephone-placeholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("mobile")} <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={t("mobile-placeholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>{t("email")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("email-placeholder")} type="email" {...field} />
                  </FormControl>
                  <FormDescription>{t("email-description")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        {/* Section 2: Capabilities & Purchase Details */}
        <section>
          <SectionHeading num={2} labelKey="section-2-title" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 px-1">
            <FormField
              control={form.control}
              name="goodsSupply"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("goods-supply")} <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("goods-supply-placeholder")}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="constructionWork"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("construction-work")} <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("construction-work-placeholder")}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="consultancyServices"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("consultancy-services")} <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("consultancy-services-placeholder")}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="otherServices"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("other-services")} <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("other-services-placeholder")}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="submissionDateBS"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  {/* Label is handled by NepaliDateInput component internally or via FormLabel */}
                  <FormControl>
                    <NepaliDateInput
                      {...field}
                      label={t("submission-date")}
                      required
                      value={field.value && field.value.includes("-") ? bsStringToAD(field.value).toISOString() : ""}
                      onChange={(adIso, bsString) => field.onChange(bsString)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="applicantSignatureName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("signature-name")} <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={t("signature-name-placeholder")} {...field} />
                  </FormControl>
                  <FormDescription>{t("signature-name-description")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        {/* Section 3: Documents Upload */}
        <section>
          <SectionHeading num={3} labelKey="section-3-title" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 px-1">
            <FormField
              control={form.control}
              name="firmRegistrationCertificate"
              render={({ field: { value: _value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>
                    {t("firm-certificate")} <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative group/file">
                      <Input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => onChange(e.target.files)}
                        className="cursor-pointer file:cursor-pointer file:font-semibold"
                        {...fieldProps}
                      />
                      <Upload className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground/40 group-hover/file:text-primary transition-colors pointer-events-none" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="taxClearanceCertificate"
              render={({ field: { value: _value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>
                    {t("vat-pan-certificate")} <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative group/file">
                      <Input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => onChange(e.target.files)}
                        className="cursor-pointer file:cursor-pointer file:font-semibold"
                        {...fieldProps}
                      />
                      <Upload className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground/40 group-hover/file:text-primary transition-colors pointer-events-none" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="taxPaymentCertificate"
              render={({ field: { value: _value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>
                    {t("tax-payment-certificate")} <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative group/file">
                      <Input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => onChange(e.target.files)}
                        className="cursor-pointer file:cursor-pointer file:font-semibold"
                        {...fieldProps}
                      />
                      <Upload className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground/40 group-hover/file:text-primary transition-colors pointer-events-none" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="authorizationLetter"
              render={({ field: { value: _value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>{t("authorization-letter")}</FormLabel>
                  <FormControl>
                    <div className="relative group/file">
                      <Input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => onChange(e.target.files)}
                        className="cursor-pointer file:cursor-pointer file:font-semibold"
                        {...fieldProps}
                      />
                      <Upload className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground/40 group-hover/file:text-primary transition-colors pointer-events-none" />
                    </div>
                  </FormControl>
                  <FormDescription>{t("authorization-letter-description")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 pt-8 border-t">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
          >
            {t("cancel")}
          </Link>
          <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto px-8 py-5 h-auto text-lg shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-3 h-5 w-5 animate-spin" /> {t("submitting")}
              </>
            ) : (
              <>
                {t("submit")} <ArrowRight className="ml-3 h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
