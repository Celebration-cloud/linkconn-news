/* eslint-disable react/react-in-jsx-scope */
"use client";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";

import { deleteArticleThunk } from "@/store/articleSlice";
import { updatePublisherThunk } from "@/store/publisherSlice";
import { deleteCoverFromAppwrite } from "@/lib/uploadToAppwrite";
import { siteConfig } from "@/config/site";

import { statusOptions } from "./constants";

// Filters
import DateFilter from "./filters/DateFilter";
import NumberRangeFilter from "./filters/NumberRangeFilter";
import DropdownFilter from "./filters/DropdownFilter";

// Templates
import StatusTemplate from "./template/StatusTemplate";
import CoverTemplate from "./template/CoverTemplate";
import DateTemplate from "./template/DateTemplate";
import TitleTemplate from "./template/TitleTemplate";
import CommentsTemplate from "./template/CommentsTemplate";
import ActionTemplate from "./template/ActionTemplate";
import ImpressionsTemplate from "./template/ImpressionsTemplate";
import ClicksTemplate from "./template/ClicksTemplate";
import SharesTemplate from "./template/SharesTemplate";
import AuthorTemplate from "./template/AuthorTemplate";
import CategoryTemplate from "./template/CategoryTemplate";
import NewsSectionTemplate from "./template/NewsSectionTemplate";

// Toolbars
import Header from "./toolbars/Header";
import LeftToolbar from "./toolbars/LeftToolbar";
import RightToolbar from "./toolbars/RightToolbar";

// Dialogs
import DeleteArticleDialog from "./dialogs/DeleteArticleDialog";
import DeleteArticlesDialog from "./dialogs/DeleteArticlesDialog";
import PreviewDialog from "./dialogs/PreviewDialog";
import { pt } from "./constants";
import { useArticleContext } from "@/context/ArticleProvider";
import PlacementTemplate from "./template/PlacementTemplate";
// import { useArticles } from "@/context/ArticleProvider";

export default function ArticleTable2() {
  const {
    loading,
    totalRecords,
    lazyParams,
    loadArticlesLazy,
    publisher,
    role,
    searchValue,
    setSearchValue,
  } = useArticleContext();
  const { articles: articlesdb } = useSelector((state) => state.article);
  const dispatch = useDispatch();
  const router = useRouter();

  const emptyArticle = {
    $id: null,
    title: "",
    category: "",
    newsSection: "",
    cover: null,
    status: "draft",
    impressions: 0,
    clicks: 0,
    shares: 0,
    comments: 0,
    $createdAt: new Date().toISOString(),
    authorName: "",
    placement: "none", 
  };

  const [article, setArticle] = useState(emptyArticle);
  const [selectedArticles, setSelectedArticles] = useState(null);
  const [deleteArticleDialog, setDeleteArticleDialog] = useState(false);
  const [deleteArticlesDialog, setDeleteArticlesDialog] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const toast = useRef(null);
  const dt = useRef(null);

  // delete single
  const confirmDeleteArticle = (row) => {
    setArticle(row);
    setDeleteArticleDialog(true);
  };

  const deleteArticle = async () => {
    dispatch(deleteArticleThunk(article.$id));
    if (article.cover && article.cover.includes("https")) {
      await deleteCoverFromAppwrite(article.cover);
    }
    dispatch(
      updatePublisherThunk({
        published: publisher?.published - 1,
        liked: publisher?.liked,
        followers: publisher?.followers,
        following: publisher?.following,
      })
    );
    setDeleteArticleDialog(false);
    setArticle(emptyArticle);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Article Deleted",
      life: 3000,
    });
  };

  // delete multiple
  const confirmDeleteSelected = () => setDeleteArticlesDialog(true);

  const deleteSelectedArticles = () => {
    selectedArticles.forEach(async (row) => {
      dispatch(deleteArticleThunk(row.$id));
      if (row.cover && row.cover.includes("https")) {
        await deleteCoverFromAppwrite(row.cover);
      }
    });
    dispatch(
      updatePublisherThunk({
        published: publisher?.published - selectedArticles.length,
        liked: publisher?.liked,
        followers: publisher?.followers,
        following: publisher?.following,
      })
    );
    setDeleteArticlesDialog(false);
    setSelectedArticles(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Articles Deleted",
      life: 3000,
    });
  };

  const exportCSV = () => dt.current.exportCSV();

  return (
    <div>
      <Toast ref={toast} />

      <div className="card bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
        <Toolbar
          className="mb-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-t-xl"
          left={() => (
            <LeftToolbar
              router={router}
              selectedArticles={selectedArticles}
              confirmDeleteSelected={confirmDeleteSelected}
            />
          )}
          right={() => <RightToolbar exportCSV={exportCSV} />}
        />

        <DataTable
          ref={dt}
          value={articlesdb}
          dataKey="$id"
          selection={selectedArticles}
          onSelectionChange={(e) => setSelectedArticles(e.value)}
          filterDisplay="row"
          globalFilterFields={[
            "title",
            "category",
            "newsSection",
            "status",
            "placement",
          ]} // added placement
          paginator
          rowsPerPageOptions={[5, 10, 25]}
          paginatorClassName="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-700 text-inherit"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} articles"
          lazy
          scrollable
          scrollHeight="500px"
          totalRecords={totalRecords}
          first={lazyParams.first}
          rows={lazyParams.rows}
          sortField={lazyParams.sortField}
          sortOrder={lazyParams.sortOrder}
          filters={lazyParams.filters}
          sortMode="single"
          onPage={loadArticlesLazy}
          onSort={loadArticlesLazy}
          onFilter={loadArticlesLazy}
          header={
            <Header
              globalFilterValue={searchValue}
              onGlobalFilterChange={(e) => setSearchValue(e.target.value)}
            />
          }
          className="bg-current text-gray-900 dark:text-gray-100 z-40"
          rowClassName={() =>
            "bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
          }
          cellClassName={() => "px-3 py-2 text-sm"}
          emptyMessage={
            <div className="bg-transparent flex flex-col items-center py-10 text-gray-500 dark:text-gray-400">
              <i className="pi pi-inbox text-4xl mb-3"></i>
              <span>No articles found</span>
            </div>
          }
          loading={loading}
          loadingIcon="pi pi-spin pi-spinner"
          pt={{
            header: {
              className:
                "bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between",
            },
            tfoot: {
              className:
                "bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between",
            },
            table: {
              className:
                "bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 ",
            },
            emptyMessage: {
              className:
                "bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 ",
            },
          }}
        >
          <Column selectionMode="multiple" exportable={false} pt={pt} />
          <Column field="cover" header="Cover" body={CoverTemplate} pt={pt} />
          <Column
            field="title"
            header="Title"
            body={(row) => (
              <TitleTemplate
                row={row}
                setSelectedArticle={setSelectedArticle}
                setShowPreview={setShowPreview}
              />
            )}
            pt={pt}
            sortable
          />
          <Column
            field="category"
            header="Category"
            body={CategoryTemplate}
            filter
            pt={pt}
            sortable
            filterElement={(options) =>
              DropdownFilter(
                {
                  ...options,
                  options: siteConfig.categories.flatMap((c) => c.key),
                },
                "Select Category"
              )
            }
            style={{ minWidth: "8rem" }}
          />
          <Column
            field="newsSection"
            header="News Section"
            body={NewsSectionTemplate}
            sortable
            filter
            filterElement={(options) =>
              DropdownFilter(
                { ...options, options: siteConfig.newsSections },
                "Select Section"
              )
            }
            pt={pt}
            style={{ minWidth: "10rem" }}
          />

          <Column
            field="placement"
            header="Placement"
            body={PlacementTemplate}
            sortable
            filter
            filterElement={(options) =>
              DropdownFilter(
                {
                  ...options,
                  options: siteConfig.placements.flatMap((p) => p.key),
                },
                "Select Placement"
              )
            }
            pt={pt}
            style={{ minWidth: "10rem" }}
          />

          <Column
            field="status"
            header="Status"
            body={StatusTemplate}
            sortable
            filter
            filterElement={(options) =>
              DropdownFilter(
                { ...options, options: statusOptions },
                "Select Status"
              )
            }
            pt={pt}
          />
          <Column
            field="$createdAt"
            header="Date"
            body={DateTemplate}
            filter
            filterElement={DateFilter}
            filterField="$createdAt"
            pt={pt}
            sortable
          />
          <Column
            field="impressions"
            header="Impressions"
            body={ImpressionsTemplate}
            filter
            filterElement={NumberRangeFilter}
            pt={pt}
          />
          <Column
            field="clicks"
            header="Clicks"
            body={ClicksTemplate}
            filter
            filterElement={NumberRangeFilter}
            pt={pt}
          />
          <Column
            field="shares"
            header="Shares"
            body={SharesTemplate}
            filter
            filterElement={NumberRangeFilter}
            pt={pt}
          />
          <Column
            field="comments"
            header="Comments"
            body={CommentsTemplate}
            filter
            filterElement={NumberRangeFilter}
            pt={pt}
          />
          {role === "admin" && (
            <Column
              field="authorName"
              header="Author"
              body={AuthorTemplate}
              exportable={role === "admin" ? true : false}
              pt={pt}
              sortable
            />
          )}
          <Column
            body={(row) => (
              <ActionTemplate
                row={row}
                router={router}
                confirmDeleteArticle={confirmDeleteArticle}
                setSelectedArticle={setSelectedArticle}
                setShowPreview={setShowPreview}
              />
            )}
            exportable={false}
            pt={pt}
            style={{ minWidth: "10rem" }}
          />
        </DataTable>
      </div>

      <DeleteArticleDialog
        visible={deleteArticleDialog}
        article={article}
        hideDialog={() => setDeleteArticleDialog(false)}
        deleteArticle={deleteArticle}
      />

      <DeleteArticlesDialog
        visible={deleteArticlesDialog}
        hideDialog={() => setDeleteArticlesDialog(false)}
        deleteSelectedArticles={deleteSelectedArticles}
      />

      <PreviewDialog
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
