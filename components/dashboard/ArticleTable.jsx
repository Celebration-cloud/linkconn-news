"use client";

import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { FilterMatchMode } from "primereact/api";
import { Button } from "@heroui/button";
import { SearchIcon } from "../icons";
import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";
import { useRouter } from "next/navigation"; // for client-side navigation

const articles = [
  {
    id: 1,
    thumbnail: "/path/to/thumb.jpg",
    title: "Gas Explosion Destroys Acres of Makeshift Structures in Lekki",
    status: "Published",
    date: "02/12/2024 1:26 PM",
    impressions: 55,
    clicks: 0,
    shares: 0,
    comments: 0,
  },
  {
    id: 2,
    thumbnail: "/path/to/thumb.jpg",
    title: "Another Incident at Lagos Market",
    status: "Drafts",
    date: "03/01/2024 10:00 AM",
    impressions: 150,
    clicks: 4,
    shares: 2,
    comments: 5,
  },
];

const statusOptions = ["Published", "Drafts"];
const statusSeverityMap = {
  Published: "success",
  Drafts: "warning",
  Rejected: "danger",
  Pending: "secondary",
};

export function ArticleTable() {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  const [globalFilterValue, setGlobalFilterValue] = useState("");
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
      src={row.thumbnail}
      alt={row.title}
      className="w-12 h-8 object-cover rounded"
    />
  );

  const statusBodyTemplate = (rowData) => (
    <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
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

  // ✅ Show Edit button for Drafts and Share icon always
  const iconBody = (rowData) => (
    <div className="flex items-center justify-center gap-2">
      <Button
        isIconOnly
        className="p-button-rounded p-button-text"
        onPress={() => console.log("Share clicked")}
      >
        <i className="pi pi-share-alt text-blue-500 text-lg cursor-pointer" />
      </Button>
      {rowData.status === "Drafts" && (
        <Button
          size="sm"
          variant="flat"
          color="primary"
          onPress={() => router.push(`/admin/publish?aid=${rowData.id}`)}
        >
          Edit
        </Button>
      )}
    </div>
  );

  const dataTableContent = [
    {
      header: "Thumb",
      body: thumbnailBody,
      style: { minWidth: "8rem" },
    },
    {
      field: "title",
      header: "Title",
      filter: true,
      filterPlaceholder: "Search by title",
      style: { minWidth: "16rem" },
    },
    {
      field: "status",
      header: "Status",
      body: statusBodyTemplate,
      filter: true,
      filterElement: statusFilterTemplate,
      showFilterMenu: false,
      style: { minWidth: "12rem" },
    },
    {
      field: "date",
      header: "Date",
      style: { minWidth: "14rem" },
    },
    {
      field: "impressions",
      header: "Impressions",
      sortable: true,
    },
    {
      field: "clicks",
      header: "Clicks",
    },
    {
      field: "shares",
      header: "Shares",
    },
    {
      field: "comments",
      header: "Comments",
    },
  ];

  return (
    <div className="overflow-auto rounded-md border border-gray-200 dark:border-gray-700">
      <DataTable
        value={articles}
        paginator
        rows={10}
        dataKey="id"
        responsiveLayout="scroll"
        showGridlines
        stripedRows
        filters={filters}
        filterDisplay="row"
        globalFilterFields={["title", "status"]}
        header={renderHeader()}
        className="min-w-full text-gray-900 dark:text-gray-100 dark:bg-gray-900"
      >
        {dataTableContent.map((col, idx) => (
          <Column
            key={col.field || col.header || idx}
            {...col}
            className="bg-white dark:bg-gray-900 dark:text-white"
          />
        ))}

        <Column
          body={iconBody}
          className="bg-white dark:bg-gray-900 dark:text-white text-center"
          style={{ width: "8rem" }}
        />
      </DataTable>
    </div>
  );
}
