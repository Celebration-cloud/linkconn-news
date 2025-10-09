/* eslint-disable react/prop-types */
// app/contact/layout.jsx
import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Contact Us | Linkcon News",
  description:
    "Get in touch with Linkcon News. Reach out for inquiries, collaborations, or feedback through our contact form or via email, phone, or office address.",
  openGraph: {
    title: "Contact Us | Linkcon News",
    description:
      "Reach out to Linkcon News for support, partnership opportunities, or general inquiries. We’re here to assist you.",
    url: "https://linkconnews.com/contact",
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
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Linkcon News",
    description:
      "Contact Linkcon News directly for questions, feedback, or media inquiries.",
    images: [siteConfig.logo],
  },
  alternates: {
    canonical: "https://linkconnews.com/contact",
  },
};

export default function ContactLayout({ children }) {
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
