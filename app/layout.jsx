/* eslint-disable react/prop-types */
import "@/styles/globals.css";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { CookieBanner } from "@/components/cookie-banner";
import Head from "next/head";
import { LayoutWrapper } from "@/components/layout-wrapper";
import React from "react";
import { ScrollTop } from "primereact/scrolltop";

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
        width: 512,
        height: 512,
        alt: "Linkcon News logo",
      },
    ],
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
        <meta property="og:image" content="/public/favicon.ico" />
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
          <ScrollTop
            threshold={200}
            className="bg-blue-600 hover:bg-blue-700 shadow-lg rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300"
            icon="pi pi-arrow-up text-white text-xl"
          />
        </Providers>
      </body>
    </html>
  );
}
