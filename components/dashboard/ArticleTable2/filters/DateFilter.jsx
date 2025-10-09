"use client"
import React from "react";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";

/**
 * Date range filter (from - to).
 * Used for filtering by $createdAt.
 */
export default function DateFilter(options) {
  const [from, to] = options.value ?? [null, null];

  return (
    <div className="flex gap-2 items-center w-full">
      <Calendar
        value={from}
        onChange={(e) => options.filterApplyCallback([e.value, to])}
        dateFormat="dd/mm/yy"
        placeholder="From"
        showIcon
        className="p-column-filter w-full"
        inputClassName="!w-full !bg-white dark:!bg-gray-800 
                        !text-gray-900 dark:!text-gray-100 
                        border border-gray-300 dark:border-gray-600 
                        rounded-md px-2 py-1 text-sm"
      />
      <Calendar
        value={to}
        onChange={(e) => options.filterApplyCallback([from, e.value])}
        dateFormat="dd/mm/yy"
        placeholder="To"
        showIcon
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
        onClick={() => options.filterClearCallback()}
      />
    </div>
  );
}
