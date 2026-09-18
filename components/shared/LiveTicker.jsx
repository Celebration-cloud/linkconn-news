"use client";

import React, { useState, useEffect } from "react";
import NextLink from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function LiveTicker() {
  const headlines = [
    { title: "Global Leaders Convene in Geneva for Historic AI & Cyber Governance Summit", section: "World", slug: "global-leaders-convene-geneva-historic-ai-cyber-governance-summit" },
    { title: "Next-Generation Quantum Processors Achieve Error-Corrected Breakthrough", section: "Technology", slug: "next-generation-quantum-processors-achieve-error-corrected-breakthrough" },
    { title: "Central Banks Signal Coordinated Shifts as Green Transition Investments Surge", section: "Business", slug: "central-banks-signal-coordinated-shifts-green-transition-investments" },
    { title: "Continental Championship: Dramatic Extra-Time Thriller Stuns Spectators", section: "Sports", slug: "continental-championship-dramatic-extra-time-thriller-stuns-spectators" },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (headlines.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % headlines.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [headlines.length]);

  const current = headlines[currentIndex] || headlines[0];

  return (
    <div className="w-full border-b border-blue-900/80 bg-[#061329] px-3 py-2 text-xs text-white min-[375px]:px-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2">
        {/* Left: Live status badge + cycling headline */}
        <div className="flex items-center gap-3 w-full sm:w-auto overflow-hidden">
          <div className="flex shrink-0 items-center gap-1.5 rounded-lg border border-red-400/30 bg-red-500/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-red-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
            </span>
            <span>LIVE FEED</span>
          </div>

          <div className="relative h-5 overflow-hidden flex-1 sm:w-[480px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="truncate"
              >
                <NextLink
                  href={`/article/${current.newsSection || current.section || "world"}/${current.slug}`}
                  className="hover:text-rose-300 transition-colors font-medium truncate inline-block"
                >
                  <span className="text-neutral-400 font-normal mr-2">[{current.section || "Wire"}]</span>
                  {current.title}
                </NextLink>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Real-time global market ticker */}
        <div className="hidden items-center gap-4 text-xs text-neutral-400 lg:flex">
          <span className="flex items-center gap-1">
            <span className="font-semibold text-neutral-200">S&P 500</span>
            <span className="text-emerald-400 font-mono">+0.42%</span>
          </span>
          <span className="text-neutral-700">|</span>
          <span className="flex items-center gap-1">
            <span className="font-semibold text-neutral-200">NASDAQ</span>
            <span className="text-emerald-400 font-mono">+0.68%</span>
          </span>
          <span className="text-neutral-700">|</span>
          <span className="flex items-center gap-1">
            <span className="font-semibold text-neutral-200">BRENT</span>
            <span className="text-rose-400 font-mono">$78.42 -0.3%</span>
          </span>
          <span className="text-neutral-700">|</span>
          <span className="font-mono text-xs text-neutral-400">
            {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
          </span>
        </div>
      </div>
    </div>
  );
}
