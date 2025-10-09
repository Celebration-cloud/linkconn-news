/* eslint-disable react/prop-types */
"use client";

/**
 * SectionHeader
 *
 * Props:
 * - title: string
 * - icon: string (PrimeIcon name without `pi ` prefix is fine, e.g. "pi-star" or "pi pi-star")
 * - link: string (optional) — href for the right-hand CTA
 * - color: string (optional) — preset key (blue, red, green, amber, purple, slate) OR any Tailwind text color class like "text-amber-600"
 * - ctaLabel: string (optional) — label for CTA, default "Read more"
 * - className: string (optional) — extra wrapper classes
 *
 * Notes:
 * - Uses PrimeIcons (pi pi-{icon}) for icons.
 * - If you pass a custom Tailwind text class as `color`, it will be used directly.
 */

import React from "react";
import NextLink from "next/link";

const COLOR_MAP = {
  blue: { primary: "text-blue-600", hover: "text-blue-500" },
  red: { primary: "text-red-600", hover: "text-red-500" },
  green: { primary: "text-green-600", hover: "text-green-500" },
  amber: { primary: "text-amber-600", hover: "text-amber-500" },
  purple: { primary: "text-purple-600", hover: "text-purple-500" },
  yellow: { primary: "text-yellow-400", hover: "text-yellow-400" },
  cyan: { primary: "text-cyan-600", hover: "text-cyan-500" },
  pink: { primary: "text-pink-600", hover: "text-pink-500" },
  indigo: { primary: "text-indigo-600", hover: "text-indigo-500" },
  orange: { primary: "text-orange-600", hover: "text-orange-500" },
};


export default function SectionHeader({
  title,
  icon = "pi-star",
  link = null,
  color = "blue",
  ctaLabel = "Read more",
  className = "",
  page = false,
}) {
  const preset = COLOR_MAP[color];
  const primary = preset ? preset.primary : color; // allow passing custom tailwind text class
  const hover = preset ? preset.hover : color;

  // normalize icon (allow values like "pi-star" or "pi pi-star")
  const iconClass = icon.startsWith("pi") ? icon : `pi ${icon}`;

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <h2 className={`text-3xl font-bold flex items-center gap-3 ${primary}`}>
        <i
          aria-hidden
          className={`${iconClass} ${primary} max-md:text-medium max-lg:text-lg`}
        />
        <span className="text-inherit max-md:text-medium max-lg:text-lg">
          {title}
        </span>
      </h2>

      {!page && link && (
        <NextLink href={link} className="flex items-center gap-2 group">
          <span
            className={`font-medium ${hover} group-hover:underline max-sm:text-sm max-md:text-medium max-lg:text-lg`}
          >
            {ctaLabel}
          </span>
          <i
            aria-hidden
            className={`pi pi-arrow-right text-2xl ${hover} max-md:text-medium max-lg:text-lg group-hover:translate-x-1 transition-transform duration-150`}
          />
        </NextLink>
      )}
    </div>
  );
}
