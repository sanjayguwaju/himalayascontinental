import type { Metadata } from "next";
import React from "react";
import { ContactUsClient } from "./ContactUsClient";

export const metadata: Metadata = {
  title: "Contact Us | Himalayas Continental Pvt. Ltd.",
  description:
    "Get in touch with Himalayas Continental Pvt. Ltd. for product enquiries, support, or general information.",
};

export default async function Page() {
  return (
    <div className="min-h-screen bg-[#0870b8] py-10">
      <div className="container">
        {/* Page heading */}
        <h1
          className="text-white text-[22px] font-semibold mb-5"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          Contact Us
        </h1>

        {/* White card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <ContactUsClient />
        </div>
      </div>
    </div>
  );
}
