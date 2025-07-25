"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteArticleThunk } from "@/store/articleSlice";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { FilterMatchMode } from "primereact/api";
import { Button } from "@heroui/button";
import { SearchIcon } from "../icons";
import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";
import { updatePublisherThunk } from "@/store/publisherSlice";
import { Tooltip } from "@heroui/react";
import { deleteCoverFromAppwrite } from "@/lib/uploadToAppwrite";
import PreviewModal from "./PreviewModal";

const statusOptions = ["published", "draft"]; // lowercase to match DB
const statusSeverityMap = {
  published: "success",
  draft: "warning",
  rejected: "danger",
  pending: "secondary",
};

export function ArticleTable() {
  const {
    articles: articlesdb,
    loading,
    error,
  } = useSelector((state) => state.article);
  const publisher = useSelector((state) => state.publisher.data);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);


 const [filters, setFilters] = useState({
   global: { value: null, matchMode: FilterMatchMode.CONTAINS },
   title: { value: null, matchMode: FilterMatchMode.CONTAINS },
   status: { value: null, matchMode: FilterMatchMode.EQUALS },
 });

  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    const _filters = { ...filters };
    _filters["global"].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const getSeverity = (status) => statusSeverityMap[status] || "info";

  const renderHeader = () => (
    <div className="flex w-1/4 justify-end mb-4">
      <Input
        aria-label="Search"
        value={globalFilterValue}
        onChange={onGlobalFilterChange}
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm",
        }}
        endContent={
          <Kbd className="hidden lg:inline-block" keys={["command"]}>
            K
          </Kbd>
        }
        labelPlacement="outside"
        placeholder="Search articles"
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        type="search"
      />
    </div>
  );

  const thumbnailBody = (row) => (
    <img
      src={row.cover || "/default-thumb.jpg"}
      alt={row.title}
      className="w-12 h-8 object-cover rounded"
    />
  );

  const statusBodyTemplate = (rowData) => (
    <Tag
      value={rowData.status}
      severity={getSeverity(rowData.status)}
      className="capitalize"
    />
  );

  const statusFilterTemplate = (options) => (
    <Dropdown
      value={options.value}
      options={statusOptions}
      onChange={(e) => options.filterApplyCallback(e.value)}
      placeholder="Select status"
      showClear
      className="p-column-filter"
      style={{ minWidth: "12rem" }}
    />
  );

  const commentsBodyTemplate = (rowData) => (
    <button
      onClick={() =>
        router.push(`/admin/content-library/comments?aid=${rowData.$id}`)
      }
      className="text-blue-600 hover:underline font-medium"
    >
      {rowData.comments ?? 0}
    </button>
  );


const iconBody = (rowData) => (
  <div className="flex items-center justify-center gap-2">
    <Tooltip content="Share">
      <Button
        isIconOnly
        className="p-button-rounded p-button-text"
        onPress={() => console.log("Share clicked")}
      >
        <i className="pi pi-share-alt text-blue-500 text-lg cursor-pointer" />
      </Button>
    </Tooltip>

    <Tooltip content="Edit">
      {rowData.status === "Draft" && (
        <Button
          isIconOnly
          color="primary"
          onPress={() => router.push(`/admin/publish?aid=${rowData.$id}`)}
        >
          <i className="pi pi-pen-to-square  text-lg cursor-pointer" />
        </Button>
      )}
    </Tooltip>

    <Tooltip content="Delete">
      <Button
        isIconOnly
        className="p-button-rounded p-button-text"
        color="danger"
        onPress={async () => {
          dispatch(deleteArticleThunk(rowData.$id));
          if (rowData.cover && rowData.cover.includes("https")) {
            await deleteCoverFromAppwrite(rowData.cover);
          }
          dispatch(
            updatePublisherThunk({
              published: publisher?.published - 1,
              liked: publisher?.liked,
              followers: publisher?.followers,
              following: publisher?.following,
            })
          );
        }}
      >
        <i className="pi pi-trash text-lg cursor-pointer" />
      </Button>
    </Tooltip>
  </div>
);


  const formatDate = (isoDate) => {
    const d = new Date(isoDate);
    return d.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="overflow-auto rounded-md border border-gray-200 dark:border-gray-700">
      <DataTable
        value={articlesdb}
        paginator
        rows={10}
        dataKey="$id"
        responsiveLayout="scroll"
        showGridlines
        stripedRows
        filters={filters}
        filterDisplay="row"
        globalFilterFields={["title", "status", "summary"]}
        header={renderHeader()}
        className="min-w-full text-gray-900 dark:text-gray-100 dark:bg-gray-900"
      >
        <Column
          header="Thumb"
          body={thumbnailBody}
          style={{ minWidth: "8rem" }}
          className="bg-white dark:bg-gray-900 dark:text-white"
        />
        <Column
          field="title"
          header="Title"
          filter
          // filterPlaceholder="Search by title"
          style={{ minWidth: "16rem" }}
          className="bg-white dark:bg-gray-900 dark:text-white"
          body={(rowData) => (
            <button
              onClick={() => {
                setSelectedArticle(rowData);
                setShowPreview(true);
              }}
              className="hover:text-blue-600 text-left"
            >
              {rowData.title}
            </button>
          )}
        />

        <Column
          field="status"
          header="Status"
          body={statusBodyTemplate}
          filter
          filterElement={statusFilterTemplate}
          showFilterMenu={false}
          style={{ minWidth: "12rem" }}
          className="bg-white dark:bg-gray-900 dark:text-white"
        />
        <Column
          field="$createdAt"
          header="Date"
          body={(rowData) => formatDate(rowData.$createdAt)}
          style={{ minWidth: "14rem" }}
          className="bg-white dark:bg-gray-900 dark:text-white"
        />
        <Column
          field="impressions"
          header="Impressions"
          sortable
          body={(rowData) =>
            rowData.status === "draft" ? "-" : (rowData.impressions ?? 0)
          }
          className="bg-white dark:bg-gray-900 dark:text-white"
        />
        <Column
          field="clicks"
          header="Clicks"
          body={(rowData) =>
            rowData.status === "draft" ? "-" : (rowData.clicks ?? 0)
          }
          className="bg-white dark:bg-gray-900 dark:text-white"
        />
        <Column
          field="shares"
          header="Shares"
          body={(rowData) =>
            rowData.status === "draft" ? "-" : (rowData.shares ?? 0)
          }
          className="bg-white dark:bg-gray-900 dark:text-white"
        />
        <Column
          header="Comments"
          body={commentsBodyTemplate}
          style={{ minWidth: "8rem" }}
          className="bg-white dark:bg-gray-900 dark:text-white"
        />
        <Column
          body={iconBody}
          style={{ width: "8rem" }}
          className="bg-white dark:bg-gray-900 dark:text-white text-center"
        />
      </DataTable>
      <PreviewModal
        open={showPreview}
        onClose={() => setShowPreview(false)}
        title={selectedArticle?.title || ""}
        summary={selectedArticle?.summary || ""}
        cover={selectedArticle?.cover || ""}
        content={selectedArticle?.content || ""}
      />
    </div>
  );
}
