/* eslint-disable react/prop-types */
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";

import "../styles/globals.css";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { CookieBanner } from "@/components/cookies/cookie-banner";
import { LayoutWrapper } from "@/components/layout-wrapper";
import React from "react";
import { Analytics } from "@vercel/analytics/next";
import { BackToTop } from "@/components/back-to-top";

// Metadata API for Next.js
export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: siteConfig.logo,
  },
  openGraph: {
    type: "website",
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.logo,
        width: 601,
        height: 199,
        alt: "Linkcon News logo",
      },
    ],
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f8fc" },
    { media: "(prefers-color-scheme: dark)", color: "#07111f" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body
        suppressHydrationWarning
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <LayoutWrapper>{children}</LayoutWrapper>
          <CookieBanner />
          <BackToTop />
        <Analytics />
        </Providers>
      </body>
    </html>
  );
}
