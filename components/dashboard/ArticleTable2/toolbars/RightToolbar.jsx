/* eslint-disable react/prop-types */
"use client";
import React from "react";
import { Button } from "@heroui/react";

/**
 * Right toolbar with Export button.
 */
export default function RightToolbar({ exportCSV }) {
  return (
    <Button
      color="info"
      variant="solid"
      startContent={<i className="pi pi-upload text-lg" />}
      className="px-5 py-2 text-sm font-medium rounded-md"
      onPress={exportCSV}
    >
      Export
    </Button>
  );
}
