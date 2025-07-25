"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { PrimeReactProvider } from "primereact/api";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { ToastProvider } from "@heroui/react";
import { Provider } from "react-redux";
import { store } from "@/store";
        
export const Providers = ({ children, themeProps }) => {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <ToastProvider />
      <NextThemesProvider {...themeProps}>
        <PrimeReactProvider>
          <Provider store={store}>{children}</Provider>
        </PrimeReactProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
};
