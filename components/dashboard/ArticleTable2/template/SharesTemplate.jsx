"use client";
import React from "react";

/**
 * Shares column template.
 */
export default function SharesTemplate(row) {
  return (
    <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
      {row.status === "Draft" ? "-" : (row.shares?.toLocaleString() ?? 0)}
    </span>
  );
}
