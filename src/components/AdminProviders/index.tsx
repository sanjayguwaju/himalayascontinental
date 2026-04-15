"use client";

import React from "react";
import { SidebarIcons } from "@/components/SidebarIcons";
import { NavBadgeProvider } from "@/components/NavBadgeProvider";

export default function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <SidebarIcons>
      <NavBadgeProvider>{children}</NavBadgeProvider>
    </SidebarIcons>
  );
}
