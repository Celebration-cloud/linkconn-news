/* eslint-disable react/prop-types */
"use client";
import React from "react";
import PreviewModal from "../../PreviewModal";

/**
 * Preview article content dialog.
 */
export default function PreviewDialog({
  open,
  onClose,
  title,
  summary,
  cover,
  content,
}) {
  return (
    <PreviewModal
      open={open}
      onClose={onClose}
      title={title}
      summary={summary}
      cover={cover}
      content={content}
    />
  );
}
