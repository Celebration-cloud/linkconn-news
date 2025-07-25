"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Image,
} from "@heroui/react";
import { Kbd } from "@heroui/kbd";
import { Tag } from "primereact/tag";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
// import { ChevronDownIcon, SearchIcon, PlusIcon } from "@/components/icons";
import { deleteArticleThunk } from "@/store/articleSlice";
import { updatePublisherThunk } from "@/store/publisherSlice";
import { deleteCoverFromAppwrite } from "@/lib/uploadToAppwrite";
import PreviewModal from "../PreviewModal";
import { SearchIcon } from "@/components/icons";

const statusOptions = [
  { name: "published", uid: "published" },
  { name: "Draft", uid: "Draft" },
  { name: "pending", uid: "pending" },
  { name: "rejected", uid: "rejected" },
];

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const statusSeverityMap = {
  published: "success",
  Draft: "warning",
  rejected: "danger",
  pending: "secondary",
};

const columns = [
  { name: "Thumb", uid: "cover" },
  { name: "Title", uid: "title", sortable: true },
  { name: "Status", uid: "status", sortable: true },
  { name: "Date", uid: "$createdAt", sortable: true },
  { name: "Impressions", uid: "impressions" },
  { name: "Clicks", uid: "clicks" },
  { name: "Shares", uid: "shares" },
  { name: "Comments", uid: "comments" },
  { name: "Actions", uid: "actions" },
];

export default function ArticleTable() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { articles: articlesdb } = useSelector((state) => state.article);
  const publisher = useSelector((state) => state.publisher.data);

  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "",
    direction: "ascending",
  });
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [statusFilter, setStatusFilter] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(new Set(columns.map((c) => c.uid)));
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const pages = Math.ceil(articlesdb.length / rowsPerPage);
  const selectedKeys = "none"; // if needed, change for multi-select
const hasSearchFilter = Boolean(globalFilterValue?.trim());
const hasStatusFilter =
  Array.from(statusFilter).length > 0 &&
  Array.from(statusFilter).length !== statusOptions.length;

const filteredItems = useMemo(() => {
  let filtered = [...articlesdb];

  // Search filter
  if (hasSearchFilter) {
    const search = globalFilterValue.toLowerCase();
    filtered = filtered.filter((article) =>
      ["title", "status", "summary"].some((field) =>
        String(article[field] ?? "")
          .toLowerCase()
          .includes(search)
      )
    );
  }

  // Status filter
  if (hasStatusFilter) {
    filtered = filtered.filter((article) =>
      Array.from(statusFilter).includes(article.status)
    );
  }

  return filtered;
}, [articlesdb, globalFilterValue, statusFilter]);



  const sortedItems = useMemo(() => {
    const sorted = [...filteredItems];

    if (sortDescriptor.column) {
      sorted.sort((a, b) => {
        const first = a[sortDescriptor.column];
        const second = b[sortDescriptor.column];
        const cmp = first < second ? -1 : first > second ? 1 : 0;
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
    }

    return sorted;
  }, [filteredItems, sortDescriptor]);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sortedItems.slice(start, start + rowsPerPage);
  }, [page, rowsPerPage, sortedItems]);

  const handleDelete = async (item) => {
    dispatch(deleteArticleThunk(item.$id));
    if (item.cover && item.cover.includes("https")) {
      await deleteCoverFromAppwrite(item.cover);
    }
    if (item.status === "published") {
      dispatch(
        updatePublisherThunk({
          published: publisher?.published - 1,
          liked: publisher?.liked,
          followers: publisher?.followers,
          following: publisher?.following,
        })
      );
    }
  };

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

  const renderCell = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case "cover":
        return (
          <Image
            src={cellValue || "/default-thumb.jpg"}
            alt="cover"
            className="w-12 h-8 object-cover rounded"
          />
        );

      case "title":
        return (
          <button
            onClick={() => {
              setSelectedArticle(item);
              setShowPreview(true);
            }}
            className="hover:text-blue-600 text-left"
          >
            {cellValue}
          </button>
        );

      case "status":
        return (
          <Tag
            value={cellValue}
            severity={statusSeverityMap[cellValue]}
            className="capitalize"
          />
        );

      case "$createdAt":
        return formatDate(cellValue);

      case "impressions":
      case "clicks":
      case "shares":
        return item.status === "Draft" ? "-" : (cellValue ?? 0);

      case "comments":
        return (
          <button
            onClick={() => router.push(`/admin/content-library/comments?aid=${item.$id}`)}
            className="text-blue-600 hover:underline font-medium"
          >
            {cellValue ?? 0}
          </button>
        );

      case "actions":
        return (
          <div className="flex items-center gap-2">
            <Button isIconOnly onPress={() => console.log("Share clicked")}>
              <i className="pi pi-share-alt text-blue-500 text-lg" />
            </Button>
            {item.status === "Draft" && (
              <Button
                isIconOnly
                color="primary"
                onPress={() => router.push(`/admin/publish?aid=${item.$id}`)}
              >
                <i className="pi pi-pen-to-square text-lg" />
              </Button>
            )}
            <Button
              isIconOnly
              color="danger"
              onPress={() => handleDelete(item)}
            >
              <i className="pi pi-trash text-lg" />
            </Button>
          </div>
        );

      default:
        return cellValue;
    }
  }, [router, publisher]);

  const topContent = useMemo(() => (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by title..."
          startContent={<SearchIcon />}
          value={globalFilterValue}
          onClear={() => setGlobalFilterValue("")}
          onValueChange={setGlobalFilterValue}
        />
        <div className="flex gap-3">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button variant="flat">
                Status
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              closeOnSelect={false}
              selectedKeys={statusFilter}
              selectionMode="multiple"
              onSelectionChange={setStatusFilter}
            >
              {statusOptions.map((s) => (
                <DropdownItem key={s.uid} className="capitalize">
                  {capitalize(s.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button  variant="flat">
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              closeOnSelect={false}
              selectionMode="multiple"
              selectedKeys={visibleColumns}
              onSelectionChange={setVisibleColumns}
            >
              {columns.map((col) => (
                <DropdownItem key={col.uid} className="capitalize">
                  {capitalize(col.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          <Button color="primary" >
            Add New
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">Total {articlesdb.length} articles</span>
        <label className="flex items-center text-default-400 text-small gap-2">
          Rows per page:
          <select
            className="bg-transparent outline-none text-default-400 text-small"
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
          >
            {[5, 10, 15].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  ), [globalFilterValue, statusFilter, visibleColumns, articlesdb.length]);

  const bottomContent = useMemo(() => (
    <div className="py-2 px-2 flex justify-between items-center">
      <span className="w-[30%] text-small text-default-400">
        {selectedKeys === "all"
          ? "All items selected"
          : `${selectedKeys === "none" ? 0 : selectedKeys.size} of ${filteredItems.length} selected`}
      </span>
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={page}
        total={pages}
        onChange={setPage}
      />
      <div className="hidden sm:flex w-[30%] justify-end gap-2">
        <Button isDisabled={page <= 1} size="sm" variant="flat" onPress={() => setPage((p) => p - 1)}>
          Previous
        </Button>
        <Button isDisabled={page >= pages} size="sm" variant="flat" onPress={() => setPage((p) => p + 1)}>
          Next
        </Button>
      </div>
    </div>
  ), [selectedKeys, filteredItems.length, page, pages]);

  const visibleCols = columns.filter((col) => visibleColumns.has(col.uid));

  return (
    <div className="space-y-4">
      <Table
        aria-label="Articles Table"
        isStriped
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        selectionMode="none"
        topContent={topContent}
        bottomContent={bottomContent}
        fullWidth
      >
        <TableHeader columns={visibleCols}>
          {(column) => (
            <TableColumn
              key={column.uid}
              allowsSorting={column.sortable}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent="No articles found" items={paginatedItems}>
          {(item) => (
            <TableRow key={item.$id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>

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
