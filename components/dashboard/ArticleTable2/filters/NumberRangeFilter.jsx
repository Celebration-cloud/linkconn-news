"use client";
import React from "react";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";

/**
 * Number range filter (min - max).
 * Used for impressions, clicks, shares, comments.
 */
export default function NumberRangeFilter(options) {
  const [min, max] = options.value ?? [null, null];

  const clearFilter = () => {
    options.filterApplyCallback(null); // resets the filter
  };

  return (
    <div className="flex gap-2 items-center w-full">
      <InputNumber
        value={min}
        onValueChange={(e) => options.filterApplyCallback([e.value, max])}
        placeholder="Min"
        className="p-column-filter w-full"
        inputClassName="!w-full !bg-white dark:!bg-gray-800 
                        !text-gray-900 dark:!text-gray-100 
                        border border-gray-300 dark:border-gray-600 
                        rounded-md px-2 py-1 text-sm"
      />
      <InputNumber
        value={max}
        onValueChange={(e) => options.filterApplyCallback([min, e.value])}
        placeholder="Max"
        className="p-column-filter w-full"
        inputClassName="!w-full !bg-white dark:!bg-gray-800 
                        !text-gray-900 dark:!text-gray-100 
                        border border-gray-300 dark:border-gray-600 
                        rounded-md px-2 py-1 text-sm"
      />
      <Button
        type="button"
        icon="pi pi-times"
        className="p-button-text p-button-plain text-gray-600 dark:text-gray-400 hover:text-red-500"
        onClick={clearFilter}
      />
    </div>
  );
}
