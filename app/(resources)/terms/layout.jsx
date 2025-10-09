/* eslint-disable react/prop-types */
// app/terms-of-service/layout.jsx
import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Terms of Service | Linkcon News",
  description:
    "Read the Terms of Service for Linkcon News. Understand your rights, obligations, and the conditions that govern your use of our platform and services.",
  openGraph: {
    title: "Terms of Service | Linkcon News",
    description:
      "Read the Terms of Service for Linkcon News. Understand your rights, obligations, and the conditions that govern your use of our platform and services.",
    url: "https://linkconnews.com/terms-of-service",
    siteName: "Linkcon News",
    images: [
      {
        url: siteConfig.logo,
        width: 1200,
        height: 630,
        alt: "Linkcon News Logo",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Linkcon News",
    description:
      "Read the Terms of Service for Linkcon News and learn how we operate, protect your rights, and manage content use.",
    images: [siteConfig.logo],
  },
  alternates: {
    canonical: "https://linkconnews.com/terms-of-service",
  },
};

export default function TermsLayout({ children }) {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <div className="flex flex-col items-center py-10 space-y-6 px-4 sm:px-6 lg:px-8">
        <Image
          src={siteConfig.logo}
          alt="Linkcon News Logo"
          width={200}
          height={200}
          className="rounded-md border border-gray-200 dark:border-gray-700 shadow-sm"
        />
        {children}
      </div>
    </main>
  );
}
