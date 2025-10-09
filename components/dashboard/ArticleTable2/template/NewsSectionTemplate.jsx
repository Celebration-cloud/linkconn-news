"use client";
import React from "react";

/**
 * News section column template.
 */
export default function NewsSectionTemplate(row) {
  return (
    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
      {row.newsSection || "N/A"}
    </span>
  );
}
