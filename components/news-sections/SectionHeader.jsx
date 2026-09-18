/* eslint-disable react/prop-types */
"use client";

import React from "react";
import NextLink from "next/link";
import { ArrowRight } from "lucide-react";
import { CategoryIcon, normalizeCategory } from "@/lib/category-themes";

export default function SectionHeader({
  title,
  category,
  link = null,
  ctaLabel = "Explore section",
  className = "",
  page = false,
}) {
  const categoryKey = normalizeCategory(category || title);

  return (
    <div data-category={categoryKey} className={`mb-6 flex items-end justify-between gap-3 border-b border-[var(--line)] pb-3 ${className}`}>
      <div className="flex items-center gap-3">
        <span className="category-fill inline-block h-7 w-1.5 rounded-full" />
        <h2 className="flex items-center gap-2.5 font-serif text-[clamp(1.25rem,4.5vw,1.625rem)] font-bold tracking-tight text-[var(--ink)]">
          <CategoryIcon category={categoryKey} className="category-accent size-5 shrink-0" />
          <span>{title}</span>
        </h2>
      </div>

      {!page && link && (
        <NextLink
          href={link}
          className="category-accent group inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-lg px-2 text-xs font-semibold transition hover:bg-[var(--category-tint)]"
        >
          <span>{ctaLabel}</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </NextLink>
      )}
    </div>
  );
}
