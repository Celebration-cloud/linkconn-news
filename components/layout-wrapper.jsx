/* eslint-disable react/prop-types */
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "./footer/Footer";
import { AdSlot } from "./shared/advertisement/AdSlot";
import { AuthUIProvider } from "@/context/AuthUIContext";

// Routes where Navbar (and ads) should be hidden
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
    <AuthUIProvider>
      <div className="relative flex flex-col min-h-screen">
        {/* Navbar */}
        {!hideNavbar && <Navbar />}

        {/* Top Ad Banner */}
        {!hideNavbar && (
          <div className="border-b">
            <AdSlot type="hero" />
          </div>
        )}

        {/* Main Content with Side Ad */}
        <main className="container mx-auto max-w-7xl px-0 flex-grow">
          {/* Main Section */}
          <div className="flex-1">
            {children}

            {/* Inline Ad inside content */}
            {!hideNavbar && (
              <div className="my-10">
                <AdSlot type="inline" />
              </div>
            )}
          </div>
        </main>

        {/* Bottom Ad Banner */}
        {!hideNavbar && (
          <div className="border-t">
            <AdSlot type="hero" />
          </div>
        )}

        {/* Footer */}
        {!hideNavbar && <Footer />}
      </div>
    </AuthUIProvider>
  );
};
