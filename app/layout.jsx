import "@/styles/globals.css";
import clsx from "clsx";

import { hideNavbar, Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { CookieBanner } from "@/components/cookie-banner";
import Head from "next/head";
import { LayoutWrapper } from "@/components/layout-wrapper";
import React from "react";

// You can still export metadata and viewport in plain JS
export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="en">
      <Head>
        <title>{siteConfig.name}</title>
        <meta name="description" content={siteConfig.description} />
        <meta property="og:title" content={siteConfig.name} />
        <meta property="og:description" content={siteConfig.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://linkcon.news" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteConfig.name} />
        <meta name="twitter:description" content={siteConfig.description} />
        <meta name="twitter:image" content="/og-image.jpg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
        </Providers>
      </body>
    </html>
  );
}
