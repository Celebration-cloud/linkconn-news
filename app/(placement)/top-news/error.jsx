/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useEffect } from "react";
import { RotateCcw, TriangleAlert } from "lucide-react";

export const Error = ({ error, reset }) => {
  useEffect(() => {
    console.error("App Error:", error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4 py-12">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="mx-auto inline-flex size-20 items-center justify-center rounded-full bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300">
          <TriangleAlert className="size-10" strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl font-semibold text-foreground">
          Something went wrong
        </h2>
        <p className="text-muted-foreground">
          We couldn&#39;t load this page right now. Please try again or contact
          support if the issue persists.
        </p>
        <button
          onClick={reset}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[var(--brand-fill)] px-5 text-sm font-medium text-white transition hover:bg-[var(--brand-fill-hover)]"
        >
          <RotateCcw className="size-4" /> Try Again
        </button>
      </div>
    </div>
  );
};

export default Error;
