"use client";

import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { Tag } from "primereact/tag";
import Image from "next/image";

export default function CoverUpload({ onImageUpload, value }) {
  const toast = useRef(null);
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef(null);

  const onTemplateSelect = (e) => {
    let _totalSize = totalSize;
    let files = e.files;

    Object.keys(files).forEach((key) => {
      _totalSize += files[key].size || 0;
    });

    setTotalSize(_totalSize);
    const file = e.files[0];
    if (file && file.objectURL) {
      onImageUpload(file.objectURL);
    }
  };

  const onTemplateUpload = (e) => {
    let _totalSize = 0;
    e.files.forEach((file) => {
      _totalSize += file.size || 0;
    });

    setTotalSize(_totalSize);
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
    });
  };

  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size);
    callback();
    onImageUpload(null);
  };

  const onTemplateClear = () => {
    setTotalSize(0);
    onImageUpload(null);
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / 10000;
    const formatedValue =
      fileUploadRef && fileUploadRef.current
        ? fileUploadRef.current.formatSize(totalSize)
        : "0 B";

    return (
      <div
        className={`${className} flex items-center justify-between dark:bg-gray-900 p-2 rounded-md`}
      >
        <div className="flex gap-2 items-center">
          {chooseButton}
          {uploadButton}
          {cancelButton}
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
          <span>{formatedValue} / 1 MB</span>
          <ProgressBar
            value={value}
            showValue={false}
            style={{ width: "10rem", height: "12px" }}
          />
        </div>
      </div>
    );
  };

  const itemTemplate = (file, props) => {
    return (
      <div className="flex items-center flex-wrap bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-3 rounded-md w-full">
        <div className="flex items-center" style={{ width: "40%" }}>
          <Image
            alt={file.name}
            role="presentation"
            src={value || file.objectURL}
            width={100}
            height={100}
            className="rounded shadow"
          />
          <span className="flex flex-col text-left ml-3">
            <span className="font-medium">{file.name}</span>
            <small className="text-gray-500 dark:text-gray-400">
              {new Date().toLocaleDateString()}
            </small>
          </span>
        </div>

        <Tag
          value={props.formatSize}
          severity="warning"
          className="px-3 py-2 text-sm"
        />

        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-outlined p-button-rounded p-button-danger ml-auto dark:border-gray-600 dark:text-gray-200"
          onClick={() => onTemplateRemove(file, props.onRemove)}
        />
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="flex flex-col items-center justify-center w-full py-6 text-gray-600 dark:text-gray-400">
        <div className="rounded-full p-5 bg-gray-200 dark:bg-gray-700 mb-4">
          <i className="pi pi-image text-5xl" />
        </div>
        <span className="text-lg">Drag and Drop Image Here</span>
      </div>
    );
  };

  return (
    <div>
      <Toast ref={toast} />
      <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
      <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
      <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

      <FileUpload
        ref={fileUploadRef}
        name="demo[]"
        url="/api/upload"
        multiple={false}
        accept="image/*"
        maxFileSize={1000000}
        onUpload={onTemplateUpload}
        onSelect={onTemplateSelect}
        onError={onTemplateClear}
        onClear={onTemplateClear}
        headerTemplate={headerTemplate}
        itemTemplate={itemTemplate}
        emptyTemplate={emptyTemplate}
        chooseOptions={{
          icon: "pi pi-fw pi-images",
          iconOnly: true,
          className:
            "custom-choose-btn p-button-rounded p-button-outlined dark:border-gray-500 dark:text-white",
        }}
        uploadOptions={{
          icon: "pi pi-fw pi-cloud-upload",
          iconOnly: true,
          className:
            "custom-upload-btn p-button-success p-button-rounded p-button-outlined dark:border-gray-500 dark:text-white",
        }}
        cancelOptions={{
          icon: "pi pi-fw pi-times",
          iconOnly: true,
          className:
            "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined dark:border-gray-500 dark:text-white",
        }}
      />
    </div>
  );
}
