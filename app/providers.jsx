/* eslint-disable react/prop-types */
"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { PrimeReactProvider } from "primereact/api";
import { Provider } from "react-redux";
import { store } from "@/store";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export const Providers = ({ children, themeProps }) => {
  const router = useRouter();
  const pathname = usePathname();
  const shouldShowToast = !pathname.startsWith("/article/section/");

  return (
    <HeroUIProvider navigate={router.push}>
      {shouldShowToast && <ToastProvider />}
      <NextThemesProvider {...themeProps}>
        <PrimeReactProvider>
          <Provider store={store}>{children}</Provider>
        </PrimeReactProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
};
