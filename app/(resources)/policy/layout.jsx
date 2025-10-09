/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description:
    "Learn how Linkcon News collects, uses, and protects your personal data. Read our full privacy policy to understand your rights and how we keep your information secure.",
  keywords: [
    "privacy policy",
    "Linkcon News",
    "data protection",
    "user data",
    "online security",
    "cookies policy",
    "data usage",
    "Nigerian news media",
  ],
  openGraph: {
    title: `Privacy Policy | ${siteConfig.name}`,
    description:
      "Read how Linkcon News manages your personal information and protects your privacy while delivering quality journalism.",
    url: `${siteConfig.url}/privacy-policy`,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.logo,
        width: 1200,
        height: 630,
        alt: "Linkcon News Privacy Policy",
      },
    ],
    locale: "en_NG",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: `Privacy Policy | ${siteConfig.name}`,
    description:
      "Your privacy matters to us. Review Linkcon News’ privacy practices and how we handle your information responsibly.",
    images: [siteConfig.logo],
    creator: "@linkconnews",
  },
  alternates: {
    canonical: `${siteConfig.url}/privacy-policy`,
  },
};

export default function PrivacyPolicyLayout({ children }) {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100">
      {children}
    </main>
  );
}