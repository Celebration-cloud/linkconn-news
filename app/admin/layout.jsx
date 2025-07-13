import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import { DashboardSidebar } from "@/components/dashboard/dashboard-side-bar";
import { SpinnerLoading } from "@/components/spinner-loading";
import { SidebarProvider } from "@/context/sidebar-context";
import { Suspense } from "react";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <main className="h-screen w-full min-w-[1024px] bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col overflow-hidden scrollbar-hide">
        {/* Top Navbar */}
        <DashboardNavbar />

        {/* Content Area: Sidebar + Page */}
        <div className="flex flex-1 gap-5 overflow-hidden">
          {/* Sidebar (fixed height) */}
          <DashboardSidebar />

          {/* Scrollable Page Content */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <Suspense fallback={<SpinnerLoading />}>{children}</Suspense>
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
