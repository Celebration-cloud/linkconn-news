/* eslint-disable react/prop-types */
"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { PrimeReactProvider } from "primereact/api";
import { ToastProvider } from "@heroui/react";
import { Provider } from "react-redux";
import { store } from "@/store";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export const Providers = ({ children, themeProps }) => {
  const router = useRouter();
  const pathname = usePathname();

  // ❌ Disable toast for dynamic article routes
  const shouldShowToast = !pathname.startsWith("/article/section/");

  return (
    <HeroUIProvider navigate={router.push}>
      {shouldShowToast && <ToastProvider />}{" "}
      {/* ✅ Only renders when allowed */}
      <NextThemesProvider {...themeProps}>
        <PrimeReactProvider>
          <Provider store={store}>{children}</Provider>
        </PrimeReactProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
};
