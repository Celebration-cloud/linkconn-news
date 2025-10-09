/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useEffect } from "react";

export const Error = ({ error, reset }) => {
  useEffect(() => {
    console.error("App Error:", error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4 py-12">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400 mx-auto">
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.658-1.14 1.105-2.05L13.105 4.95c-.527-.91-1.683-.91-2.21 0L4.977 17.95c-.553.91.051 2.05 1.105 2.05z"
            />
          </svg>
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
          className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-lg bg-primary text-white hover:bg-primary/90 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Error;
