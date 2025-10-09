"use client";
import React from "react";

/**
 * Date formatting template.
 * Formats $createdAt into dd-MMM-yyyy hh:mm.
 */
export default function DateTemplate(row) {
  const formatted = new Date(row.$createdAt).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
      {formatted}
    </span>
  );
}
