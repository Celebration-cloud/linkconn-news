/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
// app/career/layout.jsx
import { siteConfig } from "@/config/site";

export const metadata = {
  title: `Careers at ${siteConfig.name} | Join Our Team`,
  description:
    "Work with the Linkcon News team. Explore open roles in journalism, media, and technology. Join a fast-growing digital newsroom driving Africa’s next media era.",
  openGraph: {
    title: `Careers at ${siteConfig.name}`,
    description:
      "Join Linkcon News and help shape the future of African journalism. Explore job openings for editors, reporters, and creative professionals.",
    url: `${siteConfig.url}/career`,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.logo,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Careers`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Careers at ${siteConfig.name}`,
    description:
      "Explore open positions at Linkcon News. Join our team of passionate storytellers and digital creators.",
    images: [siteConfig.logo],
  },
  alternates: {
    canonical: `${siteConfig.url}/career`,
  },
};

export default function CareerLayout({ children }) {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {children}
    </main>
  );
}
