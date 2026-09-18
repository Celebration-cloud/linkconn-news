/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NextLink from "next/link";
import { Cookie } from "lucide-react";

export const CookieBanner = () => {
  const [mounted, setMounted] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem("cookie-consent");
    if (consent === "true") setAccepted(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");
    setAccepted(true);
  };

  if (!mounted || accepted) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 80, opacity: 0, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="fixed inset-x-3 bottom-3 z-50 rounded-2xl border border-[var(--line)] bg-[var(--surface)]/95 p-4 shadow-2xl backdrop-blur-xl min-[375px]:inset-x-4 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:max-w-md"
      >
        <div className="flex items-start gap-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--surface-raised)] text-[var(--brand)]">
            <Cookie className="size-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="mb-1 text-sm font-bold text-[var(--ink)]">
              Privacy & Cookies
            </h4>
            <p className="site-muted mb-3 text-xs leading-relaxed">
              We utilize essential telemetry to personalize world news dispatches and measure audience engagement. Learn more in our{" "}
              <NextLink href="/policy" className="underline hover:text-neutral-900 dark:hover:text-white">
                Privacy Policy
              </NextLink>.
            </p>
            <div className="flex flex-col gap-2 min-[375px]:flex-row min-[375px]:items-center">
              <button
                onClick={acceptCookies}
                className="min-h-11 rounded-lg bg-[var(--brand-fill)] px-4 text-xs font-semibold text-white transition-all hover:bg-[var(--brand-fill-hover)] active:scale-95"
              >
                Accept All
              </button>
              <button
                onClick={acceptCookies}
                className="min-h-11 rounded-lg px-3 text-xs font-medium text-[var(--ink-muted)] transition-colors hover:bg-[var(--surface-raised)] hover:text-[var(--ink)]"
              >
                Decline Non-Essential
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
