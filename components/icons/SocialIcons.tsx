/* eslint-disable react/react-in-jsx-scope */
"use client";

import React from "react";
import { siteConfig } from "@/config/site";

type SocialIcon = {
  name: string; // e.g. "twitter"
  url?: string; // optional link
};

type SocialIconsProps = {
  icons?: SocialIcon[]; // Which icons to render
  size?: string; // e.g. "text-xl", "text-2xl"
  color?: string; // e.g. "text-gray-600"
  hoverColor?: string; // e.g. "hover:text-yellow-300"
  gap?: string; // e.g. "gap-4"
};

const DEFAULT_ICONS: SocialIcon[] = [
  { name: "twitter", url: siteConfig.links.twitter },
  { name: "github", url: siteConfig.links.github },
];

function BrandIcon({ name }: { name: string }) {
  if (name === "github") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[1em] fill-current">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.87c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.88a9.6 9.6 0 0 1 2.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.71c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[1em] fill-current">
      <path d="M18.24 2H21l-6.03 6.9L22.06 22H16.5l-4.35-5.69L7.17 22H4.4l6.46-7.38L4.06 2h5.7l3.94 5.2L18.24 2Zm-.97 17.7h1.53L8.93 4.18H7.29L17.27 19.7Z" />
    </svg>
  );
}

export default function SocialIcons({
  icons = DEFAULT_ICONS,
  size = "text-xl",
  color = "text-current",
  hoverColor = "hover:text-[var(--brand)]",
  gap = "gap-4",
}: SocialIconsProps) {
  return (
    <div className={`flex ${gap} ${size} ${color}`}>
      {icons.map((icon) => (
        <a
          key={icon.name}
          href={icon.url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit Linkcon News on ${icon.name === "twitter" ? "X" : icon.name}`}
          className={`grid size-11 place-items-center rounded-lg transition ${hoverColor}`}
        >
          <BrandIcon name={icon.name} />
        </a>
      ))}
    </div>
  );
}
