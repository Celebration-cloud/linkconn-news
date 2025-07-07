"use client";

import { usePathname, useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { useEffect } from "react";

// Define routes where Navbar should be hidden
const hiddenNavbarRoutes = [
  "/auth",
  "/login",
  "/onboarding",
  "/admin/dashboard",
  "/admin/login",
  "/admin",
  "/admin/publish",
  "/admin/content-library"
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
