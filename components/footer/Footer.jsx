/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import SocialIcons from "../icons/SocialIcons";
import { showToast } from "@/utils/toast";

export const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast({ title: "Please enter a valid email", color: "warning" });
      return;
    }
    const subject = encodeURIComponent("Linkcon Dispatch subscription request");
    const body = encodeURIComponent(`Please add ${email} to the Linkcon Dispatch mailing list.`);
    window.location.href = `mailto:contact@linkconnews.com?subject=${subject}&body=${body}`;
    showToast({
      title: "Email app opened",
      description: "Send the prepared email to request your subscription.",
      color: "success",
    });
    setEmail("");
  };

  return (
    <footer className="border-t border-blue-900/70 bg-[#061329] pb-10 pt-12 text-white transition-colors min-[720px]:pb-12 min-[720px]:pt-16">
      <div className="site-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-800/80">
          {/* Brand & Mission Column (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <NextLink
              href="/"
              aria-label="Linkcon News home"
              className="inline-flex rounded-xl bg-white p-2"
            >
              <Image
                src={siteConfig.logo}
                alt="Linkcon News"
                width={601}
                height={199}
                className="h-auto w-48"
              />
            </NextLink>

            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              Independent digital journal delivering real-time world dispatches, investigative reporting, market intelligence, and technological analysis from correspondents across Geneva, London, New York, and Lagos.
            </p>

            <div className="pt-2">
              <SocialIcons size="text-lg" />
            </div>

            <div className="flex items-center gap-2 pt-2 text-xs font-medium text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live World Wire Active • 24/7 Global Synchronization</span>
            </div>
          </div>

          {/* Wire Sections (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              News Desks
            </h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              {siteConfig.navItems?.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <NextLink
                    href={item.href}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Legal (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              Journal
            </h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <NextLink href="/about" className="hover:text-white transition-colors">
                  About Us
                </NextLink>
              </li>
              <li>
                <NextLink href="/contact" className="hover:text-white transition-colors">
                  Contact
                </NextLink>
              </li>
              <li>
                <NextLink href="/policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </NextLink>
              </li>
              <li>
                <NextLink href="/terms" className="hover:text-white transition-colors">
                  Terms of Wire
                </NextLink>
              </li>
              <li>
                <NextLink href="/advertise" className="hover:text-white transition-colors">
                  Advertising
                </NextLink>
              </li>
            </ul>
          </div>

          {/* Newsletter Input (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              Daily Brief
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Curated essential world headlines before markets open.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="min-h-11 w-full rounded-lg border border-blue-800 bg-blue-950/60 px-3 text-base text-white outline-none transition-colors placeholder:text-blue-200/55 focus:border-blue-300"
              />
              <button
                type="submit"
                className="min-h-11 w-full rounded-lg bg-white py-2 text-sm font-bold text-[#071a3a] transition-all hover:bg-blue-50 active:scale-95"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Linkcon News. All rights reserved.</p>
          <p className="text-xs text-neutral-500">
            Powered by live open news feeds from BBC, Reuters, TechCrunch, CNBC, ESPN, and Al Jazeera.
          </p>
        </div>
      </div>
    </footer>
  );
};
