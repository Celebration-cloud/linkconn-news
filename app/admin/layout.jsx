import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import { DashboardSidebar } from "@/components/dashboard/dashboard-side-bar";
import { SidebarProvider } from "@/context/sidebar-context";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <main className="h-screen w-full min-w-[1024px] bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col overflow-hidden scrollbar-hide">
        {/* Top Navbar */}
        <DashboardNavbar />

        {/* Content Area: Sidebar + Page */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar (fixed height) */}
          <DashboardSidebar />

          {/* Scrollable Page Content */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
            {children}
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
