/* eslint-disable react/react-in-jsx-scope */
// app/article/[slug]/_components/ArticleMeta.jsx
"use client";

import { useArticleMeta } from "@/context/ArticleMetaProvider";


export default function ArticleMeta() {
 const { visits, readingTime } = useArticleMeta();
  return (
    <div className="flex items-center gap-4 text-sm text-gray-500">
      {visits !== null && <span>👁️ {visits} views</span>}
      {readingTime !== null && <span>⏱️ {readingTime} min read</span>}
    </div>
  );
}
