"use client";
import React from "react";
import { Tag } from "primereact/tag";

/**
 * Status column template.
 * Shows Draft, Published, Rejected with color-coded tags.
 */
export default function StatusTemplate(row) {
  const severity =
    row.status === "published"
      ? "success"
      : row.status === "Draft"
      ? "warning"
      : row.status === "Rejected"
      ? "danger"
      : "secondary";

  return <Tag value={row.status} severity={severity} className="capitalize" />;
}
