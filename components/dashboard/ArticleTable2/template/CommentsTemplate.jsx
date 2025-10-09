"use client";
import React from "react";
import { useRouter } from "next/navigation";

/**
 * Comments column template.
 * Navigates to comments page if published.
 */
export default function CommentsTemplate(row) {
  const router = useRouter();
  console.log(row.status)
  return (
    <>
    {row.status === "Draft" ? (
      <button
      className="text-sm font-medium text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
    >
      {"-"}
    </button>
    ) : (
      <button
      onClick={() =>
        router.push(`/admin/content-library/comments?aid=${row.$id}`)
      }
      className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline-offset-2 hover:underline transition-colors"
    >
      { (row.comments?.toLocaleString() ?? 0)}
    </button>
    )}
    </>
    
  );
}
