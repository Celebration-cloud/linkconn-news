/* eslint-disable react/react-in-jsx-scope */
"use client";

import { Button } from "@heroui/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-br from-white to-gray-100 dark:from-gray-950 dark:to-gray-900 text-center transition-colors duration-300">
      <h1 className="text-6xl font-extrabold text-blue-600 dark:text-blue-400 mb-4">
        404
      </h1>
      <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
        Page Not Found
      </p>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link href="/admin">
        <Button
          variant="flat"
          color="primary"
          className="flex items-center gap-2"
        >
          <i className="pi pi-arrow-left text-xl" />
          Go back home
        </Button>
      </Link>

      {/* Decorative divider at bottom */}
      <div className="mt-10 w-full max-w-xs mx-auto">
        <div className="flex items-center w-full h-1">
          <div className="w-1/6 bg-black dark:bg-gray-300 h-full" />
          <div className="w-1/6 bg-blue-500 h-full" />
          <div className="w-2/3 bg-black dark:bg-gray-300 h-full" />
        </div>
      </div>
    </section>
  );
}
