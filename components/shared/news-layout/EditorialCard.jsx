/* eslint-disable react/prop-types */
"use client";

import React from "react";
import NextLink from "next/link";
import { ArrowRight } from "lucide-react";
import { normalizeCategory } from "@/lib/category-themes";

export default function EditorialCard({
  article,
  variant = "standard", // "featured", "compact", "horizontal", "standard"
  priority = false,
}) {
  if (!article) return null;

  const section = (article.newsSection || article.section || "world").toLowerCase();
  const categoryKey = normalizeCategory(section);
  const slug = article.slug || article.$id || article.id;
  const href = `/article/${section}/${slug}`;
  const cover = article.cover || article.image || "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?q=80&w=1200&auto=format&fit=crop";
  const dateStr = article.publishedAt
    ? formatRelativeTime(article.publishedAt)
    : article.date || "Today";

  if (variant === "horizontal") {
    return (
      <NextLink
        data-category={categoryKey}
        href={href}
        className="group flex gap-3 rounded-xl border border-transparent p-2.5 transition hover:border-[var(--line)] hover:bg-[var(--surface)] active:scale-[0.99] min-[375px]:gap-4 min-[375px]:p-3"
      >
        <div className="w-24 sm:w-32 aspect-square rounded-lg overflow-hidden flex-shrink-0 bg-neutral-100 dark:bg-neutral-800">
          <img
            src={cover}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col justify-between py-0.5 flex-1 min-w-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="category-accent text-xs font-bold uppercase tracking-wider">
                {article.section || "News"}
              </span>
              <span className="text-xs text-neutral-400">•</span>
              <span className="text-xs font-medium text-neutral-400">
                {article.readingTime || "3 min"}
              </span>
            </div>
            <h4 className="line-clamp-2 text-sm font-semibold leading-snug text-[var(--ink)] transition-colors group-hover:text-[var(--category-accent)]">
              {article.title}
            </h4>
          </div>
          <span className="mt-1 text-xs text-neutral-400">
            {dateStr}
          </span>
        </div>
      </NextLink>
    );
  }

  if (variant === "featured") {
    return (
      <NextLink
        data-category={categoryKey}
        href={href}
        className="editorial-card group block overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-sm transition-all hover:shadow-md"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <img
            src={cover}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className="category-fill rounded-lg px-2.5 py-1 text-xs font-bold uppercase tracking-wider shadow-sm">
              {article.section || "Feature"}
            </span>
          </div>
        </div>
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2 font-medium">
            <span>{article.authorName || "Wire Desk"}</span>
            <span>•</span>
            <span>{dateStr}</span>
            <span>•</span>
            <span>{article.readingTime || "4 min read"}</span>
          </div>
          <h3 className="mb-2 font-serif text-[clamp(1.125rem,4vw,1.375rem)] font-bold leading-snug text-[var(--ink)] transition-colors group-hover:text-[var(--category-accent)]">
            {article.title}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
            {article.summary}
          </p>
        </div>
      </NextLink>
    );
  }

  // Standard vertical card
  return (
    <NextLink
      data-category={categoryKey}
      href={href}
      className="editorial-card group flex flex-col overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)] shadow-sm transition-all hover:shadow-md"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        <img
          src={cover}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading={priority ? "eager" : "lazy"}
        />
        <div className="absolute top-2.5 left-2.5">
          <span className="category-fill rounded px-2 py-1 text-xs font-bold uppercase tracking-wider shadow-sm">
            {article.section || "Report"}
          </span>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-neutral-400">
            <span>{dateStr}</span>
            <span>•</span>
            <span>{article.readingTime || "3 min"}</span>
          </div>
          <h3 className="mb-1.5 line-clamp-2 text-base font-semibold leading-snug text-[var(--ink)] transition-colors group-hover:text-[var(--category-accent)]">
            {article.title}
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
            {article.summary}
          </p>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-2 text-xs text-neutral-400 dark:border-neutral-800/80">
          <span className="truncate">{article.authorName || article.source || "Linkcon Wire"}</span>
          <span className="category-accent inline-flex items-center gap-1 font-semibold transition-transform group-hover:translate-x-0.5">
            Read <ArrowRight className="size-3.5" />
          </span>
        </div>
      </div>
    </NextLink>
  );
}

function formatRelativeTime(dateStr) {
  try {
    const diffMs = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diffMs / (1000 * 60));
    if (mins < 60) return `${Math.max(1, mins)}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return "Recently";
  }
}
