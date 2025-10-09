/* eslint-disable react/prop-types */
"use client";
import React from "react";
import { Button } from "primereact/button";

/**
 * Left toolbar with New + Delete Selected buttons.
 */
export default function LeftToolbar({ router, confirmDeleteSelected, selectedArticles }) {
  return (
    <div className="flex flex-wrap gap-3">
         {/* New Article Button */}
         <Button
           label="New Article"
           icon="pi pi-plus"
           className="!rounded-lg !px-4 !py-2 font-medium bg-green-600 hover:bg-green-700 text-white text-sm border-0 shadow-sm transition-colors"
           onClick={() => router.push("/admin/publish")}
         />
   
         {/* Delete Button */}
         <Button
           label="Delete Selected"
           icon="pi pi-trash"
           className={`!rounded-lg !px-4 !py-2 font-medium text-sm border-0 shadow-sm transition-colors ${
             !selectedArticles || !selectedArticles.length
               ? "bg-gray-300 text-gray-500 cursor-not-allowed"
               : "bg-red-600 hover:bg-red-700 text-white"
           }`}
           onClick={confirmDeleteSelected}
           disabled={!selectedArticles || !selectedArticles.length}
         />
       </div>
  );
}
