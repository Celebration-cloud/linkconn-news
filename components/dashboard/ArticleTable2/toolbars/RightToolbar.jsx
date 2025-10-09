/* eslint-disable react/prop-types */
"use client";
import React from "react";
import { Button } from "primereact/button";

/**
 * Right toolbar with Export button.
 */
export default function RightToolbar({ exportCSV }) {
  return (
    <Button
      label="Export"
      icon="pi pi-upload"
      className="p-button-help !rounded-lg"
      onClick={exportCSV}
    />
  );
}
