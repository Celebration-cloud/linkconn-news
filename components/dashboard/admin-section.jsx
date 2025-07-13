"use client";

import DashboardNavbar from "./dashboard-navbar";
import { usePathname } from "next/navigation";

export default function AdminSection() {
  const pathname = usePathname();

  // Patterns or base paths to hide navbar
  const hiddenPaths = [
    "/auth",
    "/login",
    "/onboarding",
    "/admin/login",
    "/admin", // exact match
  ];

  const hiddenPrefixPaths = [
    "/admin/dashboard",
    "/admin/publish/edit", // handles /admin/publish/edit/anything
  ];

  const shouldHideNavbar =
    hiddenPaths.includes(pathname) ||
    hiddenPrefixPaths.some((prefix) => pathname.startsWith(prefix));

  return !shouldHideNavbar ? <DashboardNavbar /> : null;
}
