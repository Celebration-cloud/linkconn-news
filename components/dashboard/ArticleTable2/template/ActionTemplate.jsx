/* eslint-disable react/prop-types */
"use client";
import React from "react";
import { Button } from "primereact/button";

/**
 * Action column template.
 * Provides Preview, Edit (if Draft), and Delete buttons.
 */
export default function ActionTemplate({
  row,
  router,
  confirmDeleteArticle,
  setSelectedArticle,
  setShowPreview,
}) {
  return (
    <div className="flex items-center gap-2">
      {/* Preview button */}
      <Button
        icon="pi pi-eye"
        rounded
        outlined
        className="!border-gray-300 !text-gray-700 hover:!bg-gray-100 dark:!border-gray-600 dark:!text-gray-200 dark:hover:!bg-gray-700"
        onClick={() => {
          setSelectedArticle(row);
          setShowPreview(true);
        }}
        tooltip="Preview"
        tooltipOptions={{ position: "top" }}
      />

      {/* Edit button (only for Drafts) */}
      {row.status === "Draft" && (
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="!border-blue-400 !text-blue-500 hover:!bg-blue-50 dark:!border-blue-500 dark:!text-blue-400 dark:hover:!bg-blue-900/40"
          onClick={() => router.push(`/admin/publish?aid=${row.$id}`)}
          tooltip="Edit"
          tooltipOptions={{ position: "top" }}
        />
      )}

      {/* Delete button */}
      <Button
        icon="pi pi-trash"
        rounded
        outlined
        className="!border-red-400 !text-red-500 hover:!bg-red-50 dark:!border-red-500 dark:!text-red-400 dark:hover:!bg-red-900/40"
        onClick={() => confirmDeleteArticle(row)}
        tooltip="Delete"
        tooltipOptions={{ position: "top" }}
      />
    </div>
  );
}
