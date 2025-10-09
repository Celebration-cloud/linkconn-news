/* eslint-disable react/prop-types */
"use client";
import React from "react";

/**
 * Title column template.
 * Click opens preview modal.
 */
export default function TitleTemplate({
  row,
  setSelectedArticle,
  setShowPreview,
}) {
  return (
    <button
      onClick={() => {
        setSelectedArticle(row);
        setShowPreview(true);
      }}
      className="text-left text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
    >
      {row.title.length > 20 ? row.title.slice(0, 20) + "..." : row.title}
    </button>
  );
}
