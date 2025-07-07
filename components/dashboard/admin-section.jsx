'use client';

import Link from "next/link";
import DashboardNavbar from "./dashboard-navbar";
import { usePathname } from "next/navigation";

// Define routes where Navbar should be hidden
const hiddenNavbarRoutes = [
    "/auth",
    "/login",
    "/onboarding",
    "/admin/dashboard",
    "/admin/login",
    "/admin",
  ];

export default function AdminSection() {
            
    const pathname = usePathname();
    const hideNavbar = hiddenNavbarRoutes.includes(pathname);
 
 return (!hideNavbar && (
     <DashboardNavbar />)
 );
}