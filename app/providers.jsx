/* eslint-disable react/prop-types */
"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { PrimeReactProvider } from "primereact/api";

export const Providers = ({ children, themeProps }) => {
  const router = useRouter();
  const pathname = usePathname();
  const shouldShowToast = !pathname.startsWith("/article/section/");

  return (
    <HeroUIProvider navigate={router.push}>
      {shouldShowToast && <ToastProvider />}
      <NextThemesProvider enableSystem disableTransitionOnChange {...themeProps}>
        <PrimeReactProvider>
          {children}
        </PrimeReactProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
};
