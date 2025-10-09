/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client";

import Image from "next/image";
import { Chip, Button } from "@heroui/react";
import ShareBar from "./ShareBar";
// import Comments from "./Comments";
import CommentSection from "@/components/dashboard/comments/CommentsSection";
import { ArticleContent } from "./ArticleContent";
import { useArticleMeta } from "@/context/ArticleMetaProvider";
import { AdSlot } from "@/components/advertisement/AdSlot";
import Link from "next/link";
import { SubscribeModal } from "@/components/modals/SubscribeModal";

export default function Article({ related = [] }) {
  const { article, visits, readingTime, articleRef } =
    useArticleMeta();
   console.log("Articleref:", articleRef.current)
  if (!article) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    image: [article.cover],
    datePublished: article.createdAt,
    dateModified: article.updatedAt,
    author: [{ "@type": "Person", name: article.authorName }],
    publisher: {
      "@type": "Organization",
      name: "Linkcon News",
      logo: {
        "@type": "ImageObject",
        url: "https://www.linkconnews.com/logo.png",
      },
    },
    description: article.summary,
  };

  return (
    <article
      ref={articleRef}
      className="max-w-5xl mx-auto px-6 py-10 space-y-10 text-gray-800 dark:text-gray-200"
    >
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Cover Image */}
      <div className="rounded-2xl overflow-hidden shadow-lg">
        <Image
          src={article.cover}
          alt={article.title}
          width={1600}
          height={900}
          className="w-full h-[420px] object-cover"
          priority
        />
      </div>

      {/* 🔥 Ad Slot after Hero */}
      <AdSlot type="hero" />

      {/* Title + Meta */}
      <header className="space-y-4 text-center">
        <Chip color="primary" variant="flat" className="mx-auto">
          {article.newsSection}
        </Chip>
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 dark:text-blue-400">
          {article.title}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 flex items-center justify-center gap-4">
          <span>
            <i className="pi pi-user text-blue-500 dark:text-blue-400 mr-1" />{" "}
            {article.authorName}{" "}
            <span className="text-gray-400 dark:text-gray-500">
              ({article.authorRole})
            </span>
          </span>
          <span>
            <i className="pi pi-calendar text-blue-500 dark:text-blue-400 mr-1" />{" "}
            {new Date(article.$createdAt).toLocaleDateString()}
          </span>
          <span className="hidden md:inline">
            <i className="pi pi-eye text-blue-500 dark:text-blue-400 mr-1" />{" "}
            {article.impressions} views
          </span>
          <span className="hidden md:inline">
            <i className="pi pi-stopwatch text-blue-500 dark:text-blue-400 mr-1" />{" "}
            {readingTime}
            {readingTime > 1 ? " mins " : " min "} read
          </span>
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 justify-center">
          {article.tags?.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 text-xs font-medium"
            >
              #{t}
            </span>
          ))}
        </div>
      </header>

      {/* Share Bar */}
      <ShareBar title={article.title} slug={article.slug} />

      {/* 🔥 Inline Ad between sections */}
      <AdSlot type="inline" />

      <ArticleContent article={article} insertAds={[0, 2, 10]} />

      {/* 🔥 Wide Leaderboard Ad */}
      <AdSlot type="leaderboard" />

      {/* Engagement */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
          <span>
            <i className="pi pi-thumbs-up text-blue-600 dark:text-blue-400 mr-1" />{" "}
            {article.likes}
          </span>
          <span>
            <i className="pi pi-thumbs-down text-gray-500 dark:text-gray-500 mr-1" />{" "}
            {article.dislikes}
          </span>
          <span>
            <i className="pi pi-share-alt text-blue-600 dark:text-blue-400 mr-1" />{" "}
            {article.shares}
          </span>
          <span>
            <i className="pi pi-comments text-blue-600 dark:text-blue-400 mr-1" />{" "}
            {article.comments}
          </span>
        </div>
        <SubscribeModal
          className="rounded-full px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-all duration-200"
          color="primary"
          size="lg"
          title="Subscribe for Updates"
        />
      </div>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2">
            <i className="pi pi-compass text-blue-600 dark:text-blue-400" />{" "}
            Related Articles
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/article/${r.newsSection}/${r.slug}`}
                className="block rounded-xl overflow-hidden shadow hover:shadow-lg transition dark:bg-gray-900 dark:border dark:border-gray-700"
              >
                <div className="relative h-44">
                  <Image
                    width={100}
                    height={100}
                    src={r.cover}
                    alt={r.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <i className="pi pi-tag mr-1 text-blue-500 dark:text-blue-400" />
                    {r.newsSection}
                  </p>
                  <h3 className="font-semibold text-blue-700 dark:text-blue-400">
                    {r.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {r.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 🔥 Side Ad (optional if you want in-article) */}
      <AdSlot type="hero" />

      {/* Comments */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2">
          <i className="pi pi-comments text-blue-600 dark:text-blue-400" />{" "}
          Comments {`(${article.comments || 0})`}
        </h2>
        <CommentSection articleId={article.$id} />
        {/* <Comments articleId={article.id} /> */}
      </section>
    </article>
  );
}
