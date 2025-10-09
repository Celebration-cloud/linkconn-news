"use client";
import { Image } from "@heroui/react";
import React from "react";

/**
 * Cover image template.
 */
export default function CoverTemplate(row) {
  return (
    <Image
      src={row.cover || "/default-thumb.jpg"}
      alt={row.title}
      className="shadow-2 rounded-md z-0"
      style={{ width: "64px", height: "40px", objectFit: "cover" }}
    />
  );
}
