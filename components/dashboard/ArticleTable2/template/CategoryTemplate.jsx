"use client";
import React from "react";

/**
 * Category column template.
 */
export default function CategoryTemplate(row) {
  return (
    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
      {row.category || "N/A"}
    </span>
  );
}
