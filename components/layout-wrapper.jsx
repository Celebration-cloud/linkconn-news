/* eslint-disable react/prop-types */
"use client";

import React from "react"
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";

// Define routes where Navbar should be hidden
const hiddenNavbarRoutes = [
  "/auth",
  "/login",
  "/onboarding",
  "/admin/dashboard",
  "/admin/login",
  "/admin",
  "/admin/publish",
  "/admin/content-library",
  "/admin/settings",
  "/admin/accept-invite/sign-up",
  "/admin/accept-invite",
  "/admin/settings/control-panel",
  "/admin/settings/manage-device",
  "/admin/content-library/comments",
];

export const LayoutWrapper = ({ children }) => {
  const pathname = usePathname();
  const hideNavbar = hiddenNavbarRoutes.includes(pathname);
  
  return (
    <div className="relative flex flex-col min-h-screen">
      {!hideNavbar && <Navbar />}
      <main className="container mx-auto max-w-7xl flex-grow">{children}</main>
      {!hideNavbar && (
        <footer className="w-full flex items-center justify-center py-4 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Linkcon News. All rights reserved.
        </footer>
      )}
    </div>
  );
};
