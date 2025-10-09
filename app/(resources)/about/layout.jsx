/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

import { siteConfig } from "@/config/site";

export const metadata = {
  title: `About Us | ${siteConfig.name}`,
  description:
    "Learn about Linkcon News — our mission, vision, and team behind Africa’s trusted digital-first news platform delivering timely and reliable stories.",
  keywords: [
    "Linkcon News",
    "About Linkcon News",
    "Nigeria news",
    "African journalism",
    "digital media",
    "trusted news source",
    "news platform",
  ],
  openGraph: {
    title: `About Linkcon News | ${siteConfig.name}`,
    description:
      "Discover our mission to deliver fast, reliable, and unbiased news across Africa and the world.",
    url: `${siteConfig.url}/about`,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.logo,
        width: 1200,
        height: 630,
        alt: "Linkcon News Logo",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `About Us | ${siteConfig.name}`,
    description:
      "Linkcon News is Africa’s digital-first newsroom focused on fast, accurate, and insightful reporting.",
    images: [siteConfig.logo],
    creator: "@linkconnews",
  },
};

export default function AboutLayout({ children }) {
  return (
    <main className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {children}
    </main>
  );
}
