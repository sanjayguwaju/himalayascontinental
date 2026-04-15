"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Media, HomepageContactUsBlock as HomepageContactUsBlockType } from "@/payload-types";
import { cn } from "@/utilities/ui";
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export const HomepageContactUsBlock: React.FC<HomepageContactUsBlockType> = ({
  title,
  logo,
  companyName,
  address,
  phone,
  email,
  socialLinks,
  backgroundColor = "lightGray",
}) => {
  const getBgClass = () => {
    switch (backgroundColor) {
      case "white":
        return "bg-white";
      case "lightGray":
      default:
        return "bg-[#e5e7eb] font-sans text-gray-800";
    }
  };

  const logoUrl = typeof logo === "object" && logo !== null ? (logo as Media).url : null;
  const logoAlt = typeof logo === "object" && logo !== null ? (logo as Media).alt || companyName : companyName;

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "facebook": return <Facebook size={18} fill="currentColor" strokeWidth={0} className="text-white" />;
      case "twitter": return <Twitter size={18} fill="currentColor" strokeWidth={0} className="text-white" />;
      case "linkedin": return <Linkedin size={18} fill="currentColor" strokeWidth={0} className="text-white" />;
      case "instagram": return <Instagram size={18} className="text-white" />;
      default: return <Facebook size={18} className="text-white" />;
    }
  };

  return (
    <section className={cn("py-16 md:py-20", getBgClass())} style={{ backgroundColor: backgroundColor === "lightGray" ? "#eaeaea" : "#ffffff" }}>
      <div className="container px-4 mx-auto max-w-4xl">
        {/* Title Section */}
        {title && (
          <div className="flex flex-col items-center mb-10">
            <h2 className="text-[32px] md:text-[40px] text-gray-900 mb-6 font-normal tracking-wide text-center" style={{ fontFamily: "Arial, sans-serif" }}>
              {title}
            </h2>
            <div className="flex items-center justify-center w-full max-w-[300px]">
              <div className="h-[1px] bg-gray-400 flex-1" />
              <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mx-3" />
              <div className="h-[1px] bg-gray-400 flex-1" />
            </div>
          </div>
        )}

        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          {logoUrl && (
            <div className="relative w-32 h-32 md:w-36 md:h-36 mb-6">
              <Image 
                src={logoUrl} 
                alt={logoAlt || "Company Logo"} 
                fill 
                className="object-contain" 
                sizes="(max-width: 768px) 128px, 144px"
              />
            </div>
          )}

          {/* Company Name */}
          <h3 className="text-xl md:text-2xl font-bold text-[#1e3a5f] uppercase mb-8 tracking-wider" style={{ fontFamily: "Arial, sans-serif" }}>
            {companyName}
          </h3>

          {/* Contact Details */}
          <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-y-4 gap-x-6 md:gap-x-8 lg:gap-x-12 mb-8 text-[14px] md:text-[15px] text-[#4b5563]">
            {address && (
              <div className="flex items-center gap-2">
                <MapPin className="text-[#1e3a5f]" size={18} />
                <span>{address}</span>
              </div>
            )}
            
            {phone && (
              <div className="flex items-center gap-2">
                <Phone className="text-[#1e3a5f]" size={18} />
                <span>{phone}</span>
              </div>
            )}
            
            {email && (
              <div className="flex items-center gap-2">
                <Mail className="text-[#1e3a5f]" size={18} />
                <a href={`mailto:${email}`} className="hover:text-[#1e3a5f] transition-colors">{email}</a>
              </div>
            )}
          </div>

          {/* Social Links */}
          {socialLinks && socialLinks.length > 0 && (
            <div className="flex items-center justify-center gap-3">
              {socialLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex items-center justify-center w-[38px] h-[38px] rounded-full transition-transform hover:scale-110 shadow-md",
                    link.platform === "facebook" && "bg-[#3b5998]",
                    link.platform === "twitter" && "bg-[#1da1f2]",
                    link.platform === "linkedin" && "bg-[#0077b5]",
                    link.platform === "instagram" && "bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888]"
                  )}
                  aria-label={link.platform}
                >
                  {getSocialIcon(link.platform)}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
