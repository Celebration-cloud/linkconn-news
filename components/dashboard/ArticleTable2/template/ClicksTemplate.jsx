"use client";
import React from "react";

/**
 * Clicks column template.
 */
export default function ClicksTemplate(row) {
  return (
    <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
      {row.status === "Draft" ? "-" : (row.clicks?.toLocaleString() ?? 0)}
    </span>
  );
}
