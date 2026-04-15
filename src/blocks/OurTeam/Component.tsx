"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Media } from "@/payload-types";
import { cn } from "@/utilities/ui";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mail, X } from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

interface Affiliation {
  label: string;
  organization?: string | null;
  organizationLink?: string | null;
  id?: string | null;
}

interface TeamMember {
  photo: string | Media;
  name: string;
  title: string;
  affiliations?: Affiliation[] | null;
  messageButtonLabel?: string | null;
  message?: string | null;
  id?: string | null;
}

interface OurTeamBlockProps {
  sectionTitle?: string | null;
  subtitle?: string | null;
  teamMembers?: TeamMember[] | null;
  backgroundColor?: "primary" | "white" | "light" | null;
  disableInnerContainer?: boolean;
}

// ─── Helper ──────────────────────────────────────────────────────────────────

const bgColorMap: Record<string, string> = {
  primary: "bg-[#0870b8]",
  white: "bg-white",
  light: "bg-[#f5f7fa]",
};

// ─── Message Dialog ──────────────────────────────────────────────────────────

interface MessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: TeamMember;
  photoUrl: string | null;
}

const MessageDialog: React.FC<MessageDialogProps> = ({ open, onOpenChange, member, photoUrl }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="p-0 gap-0 overflow-hidden border-0 shadow-2xl max-w-[640px] w-[95vw] rounded-xl"
        lockScroll
      >
        {/* ── Blue Header ───────────────────────────────────── */}
        <DialogHeader className="relative flex-row items-center gap-4 px-6 pt-5 pb-5 bg-[#1a3f6f] rounded-t-xl">
          {/* Photo */}
          {photoUrl ? (
            <div className="relative shrink-0 w-[90px] h-[100px] rounded-lg overflow-hidden border-2 border-white/20 shadow-md">
              <Image
                src={photoUrl}
                alt={member.name}
                fill
                className="object-cover object-top"
                sizes="90px"
              />
            </div>
          ) : (
            <div className="shrink-0 w-[90px] h-[100px] rounded-lg bg-white/10 flex items-center justify-center border-2 border-white/20">
              <span className="text-white/60 text-xs text-center px-2 leading-tight">
                {member.name}
              </span>
            </div>
          )}

          {/* Name */}
          <DialogTitle
            className="text-white text-[19px] font-semibold leading-snug flex-1 text-left"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            {member.name}
          </DialogTitle>

          {/* Custom close — white × on the blue header */}
          <DialogClose asChild>
            <button
              aria-label="Close dialog"
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </DialogClose>
        </DialogHeader>

        {/* ── Message Body ──────────────────────────────────── */}
        <ScrollArea className="max-h-[55vh]">
          <div className="px-7 py-6 bg-white">
            {member.message ? (
              <p
                className="text-[15px] text-gray-800 leading-relaxed whitespace-pre-line"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                {member.message}
              </p>
            ) : (
              <p className="text-[14px] text-gray-400 italic">No message provided.</p>
            )}
          </div>
        </ScrollArea>

        {/* ── Footer ───────────────────────────────────────── */}
        <DialogFooter className="px-7 py-4 bg-white border-t border-gray-100">
          <DialogClose asChild>
            <Button
              className="bg-[#1a3f6f] hover:bg-[#15335a] text-white text-[13px] font-semibold px-7 py-2 rounded cursor-pointer transition-colors duration-150"
              aria-label="Close message dialog"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// ─── Team Member Card ────────────────────────────────────────────────────────

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const photoUrl =
    typeof member.photo === "object" && member.photo !== null ? (member.photo as Media).url : null;

  const hasMessage = Boolean(member.message);

  return (
    <>
      <div
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col sm:flex-row gap-5 transition-shadow duration-200 hover:shadow-md"
        style={{ fontFamily: "'Open Sans', sans-serif" }}
      >
        {/* Photo */}
        <div className="shrink-0 hidden sm:block">
          {photoUrl ? (
            <div className="relative w-[180px] h-[215px] rounded-lg overflow-hidden">
              <Image
                src={photoUrl}
                alt={member.name}
                fill
                className="object-cover object-top"
                sizes="180px"
              />
            </div>
          ) : (
            <div className="w-[180px] h-[215px] rounded-lg bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 text-xs text-center px-2">{member.name}</span>
            </div>
          )}
        </div>
        
        {/* Mobile Photo (smaller) */}
        <div className="shrink-0 block sm:hidden mb-4">
          {photoUrl ? (
            <div className="relative w-[130px] h-[155px] rounded-lg overflow-hidden mx-auto">
              <Image
                src={photoUrl}
                alt={member.name}
                fill
                className="object-cover object-top"
                sizes="130px"
              />
            </div>
          ) : (
            <div className="w-[130px] h-[155px] rounded-lg bg-gray-100 flex items-center justify-center mx-auto">
              <span className="text-gray-400 text-xs text-center px-2">{member.name}</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            {/* Name */}
            <h3
              className="text-[17px] font-bold text-gray-900 leading-snug mb-0.5"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {member.name}
            </h3>

            {/* Title */}
            <p className="text-[13px] font-semibold text-gray-600 mb-3">({member.title})</p>

            {/* Affiliations */}
            {member.affiliations && member.affiliations.length > 0 && (
              <ul className="space-y-0.5">
                {member.affiliations.map((aff, index) => (
                  <li key={aff.id || index} className="text-[12px] text-gray-600 leading-snug">
                    <span className="font-semibold text-gray-800">{aff.label}</span>
                    {aff.organization && (
                      <>
                        {" : "}
                        {aff.organizationLink ? (
                          <Link
                            href={aff.organizationLink}
                            className="text-[#0870b8] hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {aff.organization}
                          </Link>
                        ) : (
                          <span>{aff.organization}</span>
                        )}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* View Message Button */}
          {hasMessage && (
            <div className="mt-4">
              <button
                onClick={() => setDialogOpen(true)}
                className="inline-flex items-center gap-1.5 border border-gray-300 text-gray-700 text-[12px] font-medium px-4 py-1.5 rounded hover:bg-gray-50 transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                aria-label={`View message from ${member.name}`}
              >
                <Mail className="w-3.5 h-3.5 text-gray-500" aria-hidden="true" />
                {member.messageButtonLabel || "View Message"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Dialog — mounted outside the card for correct stacking */}
      {hasMessage && (
        <MessageDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          member={member}
          photoUrl={photoUrl ?? null}
        />
      )}
    </>
  );
};

// ─── Block ───────────────────────────────────────────────────────────────────

export const OurTeamBlock: React.FC<OurTeamBlockProps> = ({
  sectionTitle,
  subtitle,
  teamMembers,
  backgroundColor = "primary",
}) => {
  if (!teamMembers || teamMembers.length === 0) return null;

  const bgClass = bgColorMap[backgroundColor ?? "primary"] ?? bgColorMap["primary"];

  const titleColor = backgroundColor === "primary" ? "text-white" : "text-gray-900";
  const subtitleColor = backgroundColor === "primary" ? "text-white/80" : "text-gray-600";

  return (
    <section className={cn("py-12 md:py-16", bgClass)}>
      <div className="container">
        {/* Section Header */}
        {(sectionTitle || subtitle) && (
          <div className="mb-8">
            {sectionTitle && (
              <h2
                className={cn("text-[26px] md:text-[30px] font-bold mb-2", titleColor)}
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {sectionTitle}
              </h2>
            )}
            {subtitle && (
              <p
                className={cn("text-[15px] max-w-2xl", subtitleColor)}
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Team Cards */}
        <div className="flex flex-col gap-5">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.id || index} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};
