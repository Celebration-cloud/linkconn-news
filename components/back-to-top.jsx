"use client";

import React from "react";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 320);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-4 right-4 z-40 grid size-11 place-items-center rounded-full bg-[var(--brand-fill)] text-white shadow-[0_12px_30px_rgba(8,50,115,0.28)] transition hover:-translate-y-0.5 hover:bg-[var(--brand-fill-hover)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)] sm:bottom-6 sm:right-6"
      aria-label="Back to top"
    >
      <ArrowUp className="size-5" strokeWidth={2} />
    </button>
  );
}
