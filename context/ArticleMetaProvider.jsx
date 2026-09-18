/* eslint-disable react/prop-types */
"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

const ArticleMetaContext = createContext(null);

export function ArticleMetaProvider({ article, slug, content, children }) {
  const articleRef = useRef(null);
  const [visits, setVisits] = useState(article?.clicks || 0);
  const [readingTime, setReadingTime] = useState(null);

  useEffect(() => {
    if (!article?.slug) return;
    const key = `visited-${article.slug}`;
    if (!sessionStorage.getItem(key)) {
      setVisits((value) => value + 1);
      sessionStorage.setItem(key, "true");
    }
  }, [article?.slug]);

  useEffect(() => {
    if (!content) return;
    const words = content.trim().split(/\s+/).length;
    setReadingTime(Math.max(1, Math.ceil(words / 200)));
  }, [slug, content]);

  return (
    <ArticleMetaContext.Provider value={{ article, visits, readingTime, articleRef }}>
      {children}
    </ArticleMetaContext.Provider>
  );
}

export function useArticleMeta() {
  const context = useContext(ArticleMetaContext);
  if (!context) {
    throw new Error("useArticleMeta must be used inside ArticleMetaProvider");
  }
  return context;
}
