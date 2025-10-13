/* eslint-disable react/react-in-jsx-scope */
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@heroui/react";

export const CookieBanner = () => {
  const [mounted, setMounted] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem("cookie-consent");
    if (consent === "true") setAccepted(true);
  }, []);

  const acceptCookies = async () => {
    localStorage.setItem("cookie-consent", "true");
    setAccepted(true);
    await fetch("/api/public/cookies/init", { method: "POST" });
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {!accepted && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] sm:w-[600px] bg-neutral-900 text-gray-100 rounded-xl shadow-xl p-5 z-50 border border-neutral-700"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="space-y-2 sm:w-3/4">
              <h3 className="font-semibold text-white text-base">
                Your privacy matters
              </h3>
              <p className="text-sm text-gray-300 leading-snug">
                We use cookies to personalize content, analyze site traffic, and
                deliver relevant stories on LinkOn News. By accepting, you agree
                to our use of cookies as described in our{" "}
                <a
                  href="/privacy"
                  className="text-blue-400 underline hover:text-blue-300"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:mt-1 sm:w-1/4 justify-end">
              <Button
                onClick={acceptCookies}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white w-full"
              >
                Accept
              </Button>
              <Button
                as="a"
                href="/policy"
                size="sm"
                variant="flat"
                className="text-gray-300 hover:text-white border border-gray-700 w-full"
              >
                Learn more
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
