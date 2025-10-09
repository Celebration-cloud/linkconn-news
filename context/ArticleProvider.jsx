/* eslint-disable react/prop-types */
"use client";

import { fetchArticlesThunk } from "@/store/articleSlice";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ArticleContext = createContext();

export function ArticleProvider({ children }) {
  const dispatch = useDispatch();
  const { articles, totalRecords, loading, error } = useSelector(
    (state) => state.article
  );

const [lazyParams, setLazyParams] = useState({
  first: 0,
  rows: 10,
  sortField: null,
  sortOrder: null,
  filters: {
    global: { value: null, matchMode: "contains" },
    title: { value: null, matchMode: "contains" },
    category: { value: null, matchMode: "equals" },
    newsSection: { value: null, matchMode: "equals" },
    status: { value: null, matchMode: "equals" },
    placement: { value: null, matchMode: "equals" }, // ✅ added placement filter
    $createdAt: { value: [null, null], matchMode: "custom_$createdAt" },
    impressions: { value: [null, null], matchMode: "custom_impressions" },
    clicks: { value: [null, null], matchMode: "custom_clicks" },
    shares: { value: [null, null], matchMode: "custom_shares" },
  },
});


  const [searchValue, setSearchValue] = useState(""); // separate search state

  // debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setLazyParams((prev) => ({
        ...prev,
        first: 0, // reset pagination on search
        filters: {
          ...prev.filters,
          global: { ...prev.filters.global, value: searchValue || null },
        },
      }));
    }, 2000); // 500ms debounce

    return () => clearTimeout(handler);
  }, [searchValue]);

  const loadArticlesLazy = (event) => {
    setLazyParams((prev) => ({
      ...prev,
      first: event.first,
      rows: event.rows,
      sortField: event.sortField || prev.sortField,
      sortOrder: event.sortOrder || prev.sortOrder,
      filters: event.filters || prev.filters,
    }));
  };

  useEffect(() => {
    dispatch(fetchArticlesThunk(lazyParams));
  }, [lazyParams, dispatch]);

  return (
    <ArticleContext.Provider
      value={{
        articlesdb: articles,
        totalRecords,
        loading,
        error,
        lazyParams,
        loadArticlesLazy,
        setLazyParams,
        searchValue,
        setSearchValue, // expose for Header input
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
}

export function useArticleContext() {
  return useContext(ArticleContext);
}
