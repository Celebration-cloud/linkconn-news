/* eslint-disable react/prop-types */
"use client";
import React from "react";
import { InputText } from "primereact/inputtext";

/**
 * Table header with global search.
 */
export default function Header({ globalFilterValue, onGlobalFilterChange }) {
  return (
    <div className="w-full flex flex-wrap items-center justify-between gap-3 px-3 py-2 dark:border-gray-700">
      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 m-0">
        Manage Articles
      </h4>
      <span className="relative">
        <i className="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
        <InputText
          type="search"
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Search..."
          className="pl-10 pr-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </span>
    </div>
  );
}
