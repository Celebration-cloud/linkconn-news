"use client";
import React from "react";

/**
 * Impressions column template.
 */
export default function ImpressionsTemplate(row) {
  return (
    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
      {row.status === "Draft" ? "-" : (row.impressions?.toLocaleString() ?? 0)}
    </span>
  );
}
