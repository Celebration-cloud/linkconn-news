/* eslint-disable react/prop-types */
"use client";
import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

/**
 * Bulk delete confirmation dialog.
 */
export default function DeleteArticlesDialog({
  visible,
  hideDialog,
  deleteSelectedArticles,
}) {
  const footer = (
    <div className="flex justify-end gap-3 px-2 py-2">
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="!rounded-lg bg-gray-100 text-gray-700 dark:bg-gray-700 p-2 dark:text-gray-200 border-0 hover:bg-gray-200 dark:hover:bg-gray-600"
        onClick={hideDialog}
      />
      <Button
        label="Delete"
        icon="pi pi-trash"
        className="!rounded-lg bg-red-600 text-white border-0 p-2 shadow-sm hover:bg-red-700 transition-colors"
        onClick={deleteSelectedArticles}
      />
    </div>
  );

  return (
    <Dialog
      visible={visible}
      style={{ width: "30rem" }}
      header={
        <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
          <i className="pi pi-trash text-xl" />
          <span className="font-semibold">Bulk Delete Confirmation</span>
        </div>
      }
      headerClassName="dark:!bg-gray-800"
      draggable={false}
      modal
      footer={footer}
      hideDialog={hideDialog}
      className="!rounded-xl !shadow-2xl"
      contentClassName="dark:!bg-gray-800 dark:!text-gray-200 p-0"
      pt={{
        footer: {
          className:
            "!bg-gray-50 dark:!bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4",
        },
      }}
    >
      <div className="flex items-start gap-4 p-5">
        <i className="pi pi-exclamation-triangle text-red-500 text-3xl flex-shrink-0" />
        <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Are you sure you want to delete the selected articles?
          <br />
          <span className="text-sm text-red-500">
            This action cannot be undone.
          </span>
        </span>
      </div>
    </Dialog>
  );
}
