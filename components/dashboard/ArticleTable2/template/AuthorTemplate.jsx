"use client";
import React from "react";

/**
 * Author column template.
 */
export default function AuthorTemplate(row) {
  return (
    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
      {row.authorName || "Unknown"}
    </span>
  );
}
