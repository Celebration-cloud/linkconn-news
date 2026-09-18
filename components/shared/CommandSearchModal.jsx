/* eslint-disable react/prop-types */
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NextLink from "next/link";
import { Search, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { normalizeCategory } from "@/lib/category-themes";

export function CommandSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  const sections = useMemo(() => {
    const items = [...(siteConfig.navItems || []), ...(siteConfig.topLinks || [])];
    return Array.from(new Map(items.map((item) => [item.href, item])).values());
  }, []);

  const results = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return sections;
    return sections.filter((item) => item.label.toLowerCase().includes(value));
  }, [query, sections]);

  useEffect(() => {
    if (!isOpen) return;
    setQuery("");
    const timer = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center px-3 pt-12 min-[375px]:px-4 sm:pt-24">
          <motion.button
            type="button"
            aria-label="Close search"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Browse news sections"
          >
            <div className="flex items-center gap-3 border-b border-[var(--line)] px-4 py-3.5">
              <Search className="size-5 shrink-0 text-[var(--ink-muted)]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Find a news section..."
                className="min-h-11 w-full bg-transparent text-base text-[var(--ink)] outline-none placeholder:text-[var(--ink-muted)]"
              />
              <button
                type="button"
                onClick={onClose}
                className="grid size-11 shrink-0 place-items-center rounded-lg text-[var(--ink-muted)] hover:bg-[var(--surface-raised)] hover:text-[var(--ink)]"
                aria-label="Close search"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-3">
              <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)]">
                News sections
              </p>
              {results.length ? (
                <div className="grid grid-cols-1 gap-1 min-[425px]:grid-cols-2">
                  {results.map((item) => (
                    <NextLink
                      data-category={normalizeCategory(item.label)}
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className="category-tint flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold transition-transform hover:scale-[1.01]"
                    >
                      {item.label}
                    </NextLink>
                  ))}
                </div>
              ) : (
                <p className="px-3 py-10 text-center text-sm text-[var(--ink-muted)]">
                  No news section matched &ldquo;{query}&rdquo;.
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
