"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  Loader2,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// ─── Schema ───────────────────────────────────────────────────────────────────

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address.").optional().or(z.literal("")),
  subjectText: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// ─── Social Icon Button ───────────────────────────────────────────────────────

const SocialIconBtn: React.FC<{
  href: string;
  icon: React.ReactNode;
  label: string;
  bg: string;
}> = ({ href, icon, label, bg }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className={`w-8 h-8 rounded-full flex items-center justify-center text-white transition-opacity duration-150 hover:opacity-80 cursor-pointer ${bg}`}
  >
    {icon}
  </a>
);

// ─── Component ────────────────────────────────────────────────────────────────

export const ContactUsClient: React.FC = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subjectText: "",
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/common-form-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email || undefined,
          subjectText: values.subjectText || undefined,
          message: values.message || undefined,
          source: "website",
        }),
      });

      const parsedRes = await response.json();
      if (!response.ok) {
        throw new Error(parsedRes.errors?.[0]?.message || "Failed to submit enquiry.");
      }

      setSubmitted(true);
      toast.success("Message sent!");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error: unknown) {
      toast.error((error as Error).message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Success State ─────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div className="flex flex-col items-center py-14 px-6 space-y-5 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Message Sent!</h2>
        <p className="text-gray-500 text-[14px] max-w-sm">
          Thank you for contacting Himalayas Continental. Our team will get back to you shortly.
        </p>
        <Button
          onClick={() => router.push("/")}
          className="bg-[#0870b8] hover:bg-[#065fa0] text-white cursor-pointer mt-2"
        >
          Return to Homepage <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    );
  }

  // ─── Main Layout ──────────────────────────────────────────────────────────

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif" }}>
      {/* ── Company Header ───────────────────────────────────────────────── */}
      <div className="flex flex-col items-center py-8 px-6 border-b border-gray-100">
        {/* Logo */}
        <div className="mb-4">
          <Image
            src="/himalayas-logo.png"
            alt="Himalayas Continental Pvt. Ltd."
            width={90}
            height={90}
            className="rounded-full object-contain"
            onError={(e) => {
              // Fallback circle if logo not found
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        {/* Company Name */}
        <h2 className="text-[16px] font-extrabold text-gray-900 tracking-wide text-center mb-3 uppercase">
          Himalayas Continental Pvt. Ltd.
        </h2>

        {/* Contact Info Row */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-[12px] text-gray-600 mb-4">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#0870b8]" />
            Pulchowk, Lalitpur, Nepal
          </span>
          <span className="flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-[#0870b8]" />
            +977 5430110, 5423351
          </span>
          <span className="flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 text-[#0870b8]" />
            himalayas2019@gmail.com
          </span>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-2">
          <SocialIconBtn
            href="https://facebook.com"
            label="Facebook"
            bg="bg-[#1877F2]"
            icon={<Facebook className="w-4 h-4" />}
          />
          <SocialIconBtn
            href="https://twitter.com"
            label="Twitter"
            bg="bg-[#1DA1F2]"
            icon={<Twitter className="w-4 h-4" />}
          />
          <SocialIconBtn
            href="https://linkedin.com"
            label="LinkedIn"
            bg="bg-[#0A66C2]"
            icon={<Linkedin className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* ── Two-column: Form + Map ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Left — Enquiry Form */}
        <div className="p-7 border-b md:border-b-0 md:border-r border-gray-100">
          <h3 className="text-[16px] font-bold text-gray-900 mb-5">Enquiry / Message</h3>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[12px] text-gray-600">Your name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        {...field}
                        className="h-8 text-[13px] rounded border-gray-300 focus-visible:ring-[#0870b8]/40 focus-visible:border-[#0870b8]"
                      />
                    </FormControl>
                    <FormMessage className="text-[11px]" />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[12px] text-gray-600">Your email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder=""
                        {...field}
                        className="h-8 text-[13px] rounded border-gray-300 focus-visible:ring-[#0870b8]/40 focus-visible:border-[#0870b8]"
                      />
                    </FormControl>
                    <FormMessage className="text-[11px]" />
                  </FormItem>
                )}
              />

              {/* Subject */}
              <FormField
                control={form.control}
                name="subjectText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[12px] text-gray-600">Subject</FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        {...field}
                        className="h-8 text-[13px] rounded border-gray-300 focus-visible:ring-[#0870b8]/40 focus-visible:border-[#0870b8]"
                      />
                    </FormControl>
                    <FormMessage className="text-[11px]" />
                  </FormItem>
                )}
              />

              {/* Message */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[12px] text-gray-600">
                      Your message (optional)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder=""
                        className="min-h-[110px] text-[13px] rounded border-gray-300 resize-none focus-visible:ring-[#0870b8]/40 focus-visible:border-[#0870b8]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[11px]" />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <div className="pt-1">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#0870b8] hover:bg-[#065fa0] text-white text-[12px] font-semibold px-6 py-2 h-8 rounded cursor-pointer transition-colors duration-200 uppercase tracking-wide"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* Right — Google Map */}
        <div className="p-7">
          <h3 className="text-[16px] font-bold text-gray-900 mb-5">Location Map</h3>
          <div
            className="w-full rounded-lg overflow-hidden border border-gray-200"
            style={{ height: 300 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.0540734984604!2d85.31624631506238!3d27.68561188279814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a4f0000001%3A0x8d42a59b36b4c3c5!2sHimalayas%20Continental%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1618000000000!5m2!1sen!2snp"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Himalayas Continental Pvt. Ltd. Location"
            />
          </div>
        </div>
      </div>

      {/* Padding bottom */}
      <div className="pb-2" />
    </div>
  );
};
