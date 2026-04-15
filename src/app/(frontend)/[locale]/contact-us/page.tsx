import type { Metadata } from "next";

import React from "react";
import { ContactUsClient } from "./ContactUsClient";

export const metadata: Metadata = {
  title: "Contact Us | Himalayas Continental",
  description:
    "Get in touch with Himalayas Continental for general inquiries or medical equipment assistance.",
};

export default async function Page() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col pt-8 pb-16">
      <div className="container max-w-4xl mx-auto">
        <div className="mb-8 text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">Contact Us</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            We are here to assist you. Fill out the form below and our team will get back to you as
            soon as possible.
          </p>
        </div>
        <div className="bg-card w-full shadow-sm border rounded-xl p-6 md:p-8">
          <ContactUsClient />
        </div>
      </div>
    </div>
  );
}
