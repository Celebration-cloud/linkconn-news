/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
// app/advertise/layout.jsx
import { siteConfig } from "@/config/site";

export const metadata = {
  title: `Advertise with ${siteConfig.name} | Grow Your Brand`,
  description:
    "Promote your business with Linkcon News. Reach millions across Nigeria and Africa through banner ads, sponsored stories, and digital campaigns.",
  openGraph: {
    title: `Advertise with ${siteConfig.name}`,
    description:
      "Connect your brand with millions of trusted Linkcon News readers. Explore premium ad placements and tailored campaigns for businesses of all sizes.",
    url: `${siteConfig.url}/advertise`,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.logo,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Advertising`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Advertise with ${siteConfig.name}`,
    description:
      "Reach millions through Linkcon News ad placements. Build visibility with impactful campaigns trusted by brands across Africa.",
    images: [siteConfig.logo],
  },
  alternates: {
    canonical: `${siteConfig.url}/advertise`,
  },
};

export default function AdvertiseLayout({ children }) {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {children}
    </main>
  );
}
