// lib/buildMetadata.js

import { siteConfig } from "@/config/site";

export function buildMetadata(category, description) {
  const url = `${siteConfig.url}/${category}`;

  return {
    title: `${capitalize(category)}`,
    description,
    openGraph: {
      type: "website",
      url,
      title: `${capitalize(category)} - ${siteConfig.name}`,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.logo,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} ${capitalize(category)} OG Image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${capitalize(category)} - ${siteConfig.name}`,
      description,
      images: [siteConfig.logo],
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
