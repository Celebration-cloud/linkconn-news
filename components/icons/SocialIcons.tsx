/* eslint-disable react/react-in-jsx-scope */
"use client";

import React from "react";

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
  { name: "twitter", url: "#" },
  { name: "facebook", url: "#" },
  { name: "instagram", url: "#" },
  { name: "youtube", url: "#" },
  { name: "linkedin", url: "#" },
];

export default function SocialIcons({
  icons = DEFAULT_ICONS,
  size = "text-xl",
  color = "text-white",
  hoverColor = "hover:text-yellow-300",
  gap = "gap-4",
}: SocialIconsProps) {
  return (
    <div className={`flex ${gap} ${size}`}>
      {icons.map((icon) => (
        <a
          key={icon.name}
          href={icon.url || "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i
            className={`pi pi-${icon.name} cursor-pointer ${color} ${hoverColor}`}
          ></i>
        </a>
      ))}
    </div>
  );
}
