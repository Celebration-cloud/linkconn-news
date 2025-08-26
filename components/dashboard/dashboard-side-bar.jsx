"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react"
import clsx from "clsx";
import { useSidebar } from "@/context/sidebar-context";
import { siteConfig } from "@/config/site";

const hiddenSidebarRoutes = ["/auth", "/login", "/onboarding", "/admin/login"];

export const DashboardSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { isCollapsed } = useSidebar();

  const hideSidebar = hiddenSidebarRoutes.includes(pathname);

  const isActive = (path) => pathname === path;

  if (hideSidebar) return null;

  return (
    <aside
      className={clsx(
        "top-16 mt-1 left-0 h-screen bg-white dark:bg-gray-900 border-r dark:border-gray-800 shadow-sm -inset-8  transition-all duration-300",
        isCollapsed ? "min-w-[80px] " : "min-w-[224px] "
      )}
    >
      <nav className="py-16 text-sm">
        <ul className="flex flex-col gap-1">
          {siteConfig.dashboardSideBar.map((item, index) =>
            item.separator ? (
              <hr
                key={`separator-${index}`}
                className="my-4 border-gray-300 dark:border-gray-700"
              />
            ) : (
              <li key={item.label}>
                <button
                  onClick={() =>
                    item.external
                      ? window.open(item.path, "_self")
                      : router.push(item.path)
                  }
                  className={clsx(
                    "w-full flex items-center gap-3 px-4 py-5 transition-colors duration-150",
                    isActive(item.path)
                      ? "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-white font-semibold border-l-4 border-blue-500"
                      : "hover:bg-blue-100 dark:hover:bg-blue-800 text-gray-700 dark:text-gray-200"
                  )}
                >
                  <i className={clsx(item.icon, "text-lg pl-3")} />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              </li>
            )
          )}
        </ul>
      </nav>
    </aside>
  );
};
