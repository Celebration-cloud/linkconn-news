/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Menu, Search, X } from "lucide-react";
import { SubscribeModal } from "./shared/modals/SubscribeModal";
import { CommandSearchModal } from "./shared/CommandSearchModal";
import { LiveTicker } from "./shared/LiveTicker";
import SocialIcons from "./icons/SocialIcons";

export function Navbar() {
  const pathname = usePathname() || "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isActive = (href) => {
    if (!href) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-colors duration-300">
      {/* Live Ticker Bar at the very top */}
      <LiveTicker />

      {/* Main Editorial Bar */}
      <div className="border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_94%,transparent)] backdrop-blur-md">
        <div className="site-container flex items-center justify-between gap-2 py-2.5 min-[375px]:gap-4 sm:py-3.5">
          {/* Left: Social and Date or Mobile menu toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="-ml-2 grid size-11 place-items-center rounded-xl text-[var(--ink-muted)] transition-colors hover:bg-[var(--surface-raised)] lg:hidden"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>

            <div className="hidden lg:flex items-center gap-3">
              <SocialIcons size="text-lg" />
              <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-800" />
              <span className="text-xs font-medium uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
                Global Edition
              </span>
            </div>
          </div>

          {/* Center: Prestige Editorial Logo & Title */}
          <div className="flex min-w-0 flex-col items-center">
            <NextLink href="/" className="group block" aria-label="Linkcon News home">
              <Image
                src={siteConfig.logo}
                alt="Linkcon News"
                width={601}
                height={199}
                priority
                className="h-auto w-[112px] transition-transform group-hover:scale-[1.01] min-[375px]:w-[132px] sm:w-[168px]"
              />
            </NextLink>
            <span className="mt-0.5 hidden text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 sm:inline">
              Verified International Journal
            </span>
          </div>

          {/* Right: Search shortcut button, Theme Switch, Subscribe */}
          <div className="flex items-center gap-2.5">
            {/* Quick Search Button (Command-K trigger) */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="grid size-11 place-items-center rounded-xl border border-[var(--line)] bg-[var(--surface-subtle)] text-[var(--ink-muted)] transition-all hover:bg-[var(--surface-raised)] active:scale-95 min-[720px]:flex min-[720px]:w-auto min-[720px]:gap-2 min-[720px]:px-3"
              aria-label="Search the news"
            >
              <Search className="size-4" />
              <span className="hidden min-[720px]:inline">Search wire...</span>
              <kbd className="hidden items-center rounded border border-neutral-200 bg-white px-1.5 py-0.5 text-xs font-bold text-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-500 sm:inline-flex">
                ⌘K
              </kbd>
            </button>

            <ThemeSwitch />

            <div className="hidden sm:block">
              <SubscribeModal
                title="Subscribe"
                className="bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm transition-all active:scale-95"
              />
            </div>
          </div>
        </div>

        {/* Secondary Category Navigation Row */}
        <nav className="hidden overflow-x-auto border-t border-[var(--line)] lg:block" aria-label="News categories">
          <div className="mx-auto flex min-w-max max-w-7xl items-center justify-center gap-1 px-4 py-1.5">
            {siteConfig.navItems?.map((item) => {
              const active = isActive(item.href);
              return (
                <NextLink
                  data-category={item.href.replace(/^\//, "")}
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all whitespace-nowrap ${
                    active
                      ? "category-fill shadow-sm"
                      : "text-[var(--ink-muted)] hover:bg-[var(--category-tint)] hover:text-[var(--category-accent)]"
                  }`}
                >
                  {item.label}
                </NextLink>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="animate-in slide-in-from-top-2 border-b border-[var(--line)] bg-[var(--surface)] p-3 shadow-xl duration-200 min-[375px]:p-4 lg:hidden">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              News Sections
            </p>
            <div className="grid grid-cols-2 gap-2">
              {siteConfig.navItems?.map((item) => {
                const active = isActive(item.href);
                return (
                  <NextLink
                    data-category={item.href.replace(/^\//, "")}
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex min-h-11 items-center rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                      active
                        ? "category-fill"
                        : "text-[var(--ink)] hover:bg-[var(--category-tint)] hover:text-[var(--category-accent)]"
                    }`}
                  >
                    {item.label}
                  </NextLink>
                );
              })}
            </div>

            <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <SubscribeModal
                title="Subscribe to Wire"
                className="min-h-11 w-full rounded-xl bg-[var(--brand-fill)] py-2 text-sm font-semibold text-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* Command-K Search Modal */}
      <CommandSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
