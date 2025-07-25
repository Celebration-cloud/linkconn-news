"use client";

import { Spinner, Tab, Tabs } from "@heroui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { fetchArticlesThunk } from "@/store/articleSlice";

export default function ArticleTabsLayout({ children }) {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector((state) => state.article);

  const articlesDb = articles;

  useEffect(() => {
    dispatch(fetchArticlesThunk());
  }, [dispatch]);

  const childrenWithProps = React.Children.map(children, (child) =>
    React.isValidElement(child)
      ? React.cloneElement(child, { articlesDb })
      : child
  );

  return (
    <Tabs
      aria-label="Options"
      variant="underlined"
      size="lg"
      color="primary"
      className="border-b-1 w-full border-blue-500"
      classNames={{
        tabList: "border-none p-0",
        tab: "text-gray-600 dark:text-gray-300 data-[selected=true]:text-primary font-medium px-4 py-2 border-b-4 border-blue-500",
        cursor: "hidden",
        tabPanel: "pt-6",
      }}
    >
      <Tab key="article" title="Article">
        {loading && (
          <div className="flex flex-col gap-5 flex-1 h-screen justify-center items-center">
            <Spinner />
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Loading articles...
            </p>
          </div>
        )}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && childrenWithProps}
      </Tab>
    </Tabs>
  );
}
