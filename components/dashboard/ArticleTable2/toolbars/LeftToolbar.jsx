/* eslint-disable react/prop-types */
"use client";
import React from "react";
import { Button } from "@heroui/react";

export default function LeftToolbar({
  router,
  confirmDeleteSelected,
  selectedArticles,
}) {
  const isDisabled = !selectedArticles || selectedArticles.length === 0;

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* New Article Button */}
      <Button
        color="success"
        variant="solid"
        endContent={<i className="pi pi-plus" />}
        className="px-5 py-2 text-sm font-medium rounded-md"
        onPress={() => router.push("/admin/publish")}
      >
        New Article
      </Button>

      {/* Delete Selected Button */}
      <Button
        color="danger"
        variant={isDisabled ? "flat" : "solid"}
        endContent={<i className="pi pi-trash" />}
        className="px-5 py-2 text-sm font-medium rounded-md"
        isDisabled={isDisabled}
        onPress={confirmDeleteSelected}
      >
        Delete Selected
      </Button>
    </div>
  );
}
