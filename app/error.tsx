"use client";

import { useEffect } from "react";
import { RotateCcw, TriangleAlert } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[60dvh] flex-col items-center justify-center px-4 text-center text-[var(--ink)]">
      <TriangleAlert className="mb-4 size-11 text-red-700 dark:text-red-300" />
      <h2 className="text-2xl font-bold">We couldn&apos;t load this page</h2>
      <p className="site-muted mt-2 max-w-md text-base">The newsroom connection was interrupted. Try loading the page again.</p>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--brand-fill)] px-5 text-sm font-semibold text-white hover:bg-[var(--brand-fill-hover)]"
      >
        <RotateCcw className="size-4" /> Try again
      </button>
    </section>
  );
}
