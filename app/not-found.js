"use client";

import Link from "next/link";
import React from "react";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[70dvh] flex-col items-center justify-center bg-[var(--canvas)] px-4 text-center text-[var(--ink)] transition-colors">
      <FileQuestion className="mb-5 size-12 text-[var(--brand)]" strokeWidth={1.5} />
      <h1 className="mb-4 font-mono text-6xl font-extrabold text-[var(--brand)]">
        404
      </h1>
      <p className="mb-2 text-2xl font-semibold text-[var(--ink)]">
        Page Not Found
      </p>
      <p className="site-muted mb-6 max-w-md text-base">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link href="/" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--brand-fill)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--brand-fill-hover)]">
          <ArrowLeft className="size-4" />
          Go back home
      </Link>

      {/* Decorative divider at bottom */}
      <div className="mt-10 w-full max-w-xs mx-auto">
        <div className="flex items-center w-full h-1">
          <div className="h-full w-1/6 bg-[var(--ink)]" />
          <div className="h-full w-1/6 bg-[var(--brand-fill)]" />
          <div className="h-full w-2/3 bg-[var(--ink)]" />
        </div>
      </div>
    </section>
  );
}
