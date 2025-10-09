"use client";
import React from "react";
import { Dropdown } from "primereact/dropdown";

/**
 * Dropdown filter for category, newsSection, status.
 */
export default function DropdownFilter(options, placeholder) {
  return (
    <Dropdown
      value={options.value}
      options={options.options}
      onChange={(e) => options.filterApplyCallback(e.value)}
      placeholder={placeholder}
      showClear
      className="p-column-filter w-full !bg-white dark:!bg-gray-800 
                 !text-gray-900 dark:!text-gray-100 
                 border border-gray-300 dark:border-gray-600 rounded-md"
      panelClassName="!bg-white dark:!bg-gray-800 
                      !text-gray-900 dark:!text-gray-100"
    />
  );
}
