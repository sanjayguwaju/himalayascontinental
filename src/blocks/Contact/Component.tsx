"use client";

import React, { useState } from "react";
import type { Media } from "@/payload-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  CheckCircle,
} from "lucide-react";
import { Media as MediaComponent } from "@/components/Media";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = any;

const socialIcons = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
};

export const ContactBlock: React.FC<Props> = ({
  title,
  offices,
  formSettings,
  socialLinks,
}) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    organization: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formFields = formSettings?.fields || ["name", "email", "subject", "message"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="bg-primary py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          {title || "Contact Us"}
        </h2>

        {/* White Card Container */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header with Logo, Company Info, Contact Details */}
          <div className="p-8 md:p-10 text-center border-b border-gray-200">
            {/* Logo */}
            {offices?.[0]?.flag && typeof offices[0].flag === "object" && (
              <div className="flex justify-center mb-4">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 shadow-md">
                  <MediaComponent
                    resource={offices[0].flag as Media}
                    fill
                    imgClassName="object-cover"
                  />
                </div>
              </div>
            )}

            {/* Company Name */}
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
              {offices?.[0]?.country || "HIMALAYAS CONTINENTAL PVT. LTD."}
            </h3>

            {/* Contact Info Row */}
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-sm text-gray-600 mb-4">
              {offices?.[0]?.address && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{offices[0].address}</span>
                </div>
              )}
              {offices?.[0]?.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-primary" />
                  <span style={{ direction: "ltr" }}>{offices[0].phone}</span>
                </div>
              )}
              {offices?.[0]?.email && (
                <div className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-primary" />
                  <a href={`mailto:${offices[0].email}`} className="hover:text-primary transition-colors">
                    {offices[0].email}
                  </a>
                </div>
              )}
            </div>

            {/* Social Links */}
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex justify-center gap-3">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {socialLinks.map((link: any, index: number) => {
                  const Icon = socialIcons[link.platform as keyof typeof socialIcons];
                  if (!Icon || !link.url) return null;
                  return (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-[#3b5998] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Two Column Layout: Form + Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-gray-200">
              <h3 className="text-lg font-semibold text-foreground mb-6">
                Enquiry / Message
              </h3>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-gray-600">
                    {formSettings?.successMessage ||
                      "Thank you! Your message has been sent successfully."}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormState({
                        name: "",
                        email: "",
                        phone: "",
                        subject: "",
                        message: "",
                        organization: "",
                      });
                    }}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {formFields.includes("name") && (
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground font-medium">Your name</Label>
                      <Input
                        id="name"
                        value={formState.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Your name"
                        required
                        className="bg-white border-gray-300 text-foreground placeholder:text-gray-400"
                      />
                    </div>
                  )}

                  {formFields.includes("email") && (
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground font-medium">Your email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formState.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="bg-white border-gray-300 text-foreground placeholder:text-gray-400"
                      />
                    </div>
                  )}

                  {formFields.includes("subject") && (
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-foreground font-medium">Subject</Label>
                      <Input
                        id="subject"
                        value={formState.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="What is this regarding?"
                        required
                        className="bg-white border-gray-300 text-foreground placeholder:text-gray-400"
                      />
                    </div>
                  )}

                  {formFields.includes("message") && (
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-foreground font-medium">Your message (optional)</Label>
                      <Textarea
                        id="message"
                        value={formState.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Your message..."
                        rows={5}
                        required
                        className="bg-white border-gray-300 text-foreground placeholder:text-gray-400"
                      />
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-auto px-8 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-semibold uppercase text-sm tracking-wide"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : formSettings?.submitButtonText || "Submit"}
                  </Button>
                </form>
              )}
            </div>

            {/* Map Section */}
            {offices?.[0]?.mapUrl && (
              <div className="p-6 md:p-10">
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  Location Map
                </h3>
                <iframe
                  src={offices[0].mapUrl}
                  width="100%"
                  height="350"
                  style={{ border: 0, borderRadius: "8px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
