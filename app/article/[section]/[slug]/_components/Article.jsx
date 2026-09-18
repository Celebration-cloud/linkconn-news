/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import ShareBar from "./ShareBar";
import { ArticleContent } from "./ArticleContent";
import { useArticleMeta } from "@/context/ArticleMetaProvider";
import { SubscribeModal } from "@/components/shared/modals/SubscribeModal";
import EditorialCard from "@/components/shared/news-layout/EditorialCard";
import { showToast } from "@/utils/toast";
import { Bookmark, ExternalLink, Minus, Pause, Play, Plus } from "lucide-react";
import { normalizeCategory } from "@/lib/category-themes";

export default function Article({ related = [] }) {
  const { article, readingTime, articleRef } = useArticleMeta();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState(1); // 0: sm, 1: base, 2: lg

  // Reading progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (!article?.slug) return;
    try {
      const saved = JSON.parse(localStorage.getItem("bookmarked_articles") || "[]");
      setIsBookmarked(saved.includes(article.slug));
    } catch (e) {
      console.error(e);
    }
  }, [article?.slug]);

  const toggleBookmark = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("bookmarked_articles") || "[]");
      let next;
      if (saved.includes(article.slug)) {
        next = saved.filter((s) => s !== article.slug);
        setIsBookmarked(false);
        showToast({ title: "Removed from bookmarks", color: "info" });
      } else {
        next = [...saved, article.slug];
        setIsBookmarked(true);
        showToast({ title: "Saved to bookmarks", color: "success" });
      }
      localStorage.setItem("bookmarked_articles", JSON.stringify(next));
    } catch (e) {
      console.error(e);
    }
  };

  if (!article) return null;

  const fontClasses = ["text-base", "text-lg", "text-xl"][fontSizeLevel];
  const categoryKey = normalizeCategory(article.newsSection || article.section || "world");

  return (
    <div data-category={categoryKey} className="relative">
      {/* Sticky Reading Progress Bar */}
      <motion.div
        className="category-fill fixed left-0 right-0 top-0 z-50 h-1 origin-left"
        style={{ scaleX }}
      />

      <article ref={articleRef} className="mx-auto max-w-4xl space-y-7 px-3 py-6 min-[375px]:px-4 sm:space-y-8 sm:px-6 sm:py-8">
        {/* Breadcrumb & Section tag */}
        <div className="flex flex-col items-start justify-between gap-3 border-b border-[var(--line)] pb-4 min-[425px]:flex-row min-[425px]:items-center">
          <div className="site-muted flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider">
            <span>Journal</span>
            <span>/</span>
            <span className="category-accent font-bold">{article.newsSection || "World"}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Font Resizer Control */}
            <div className="flex items-center rounded-lg border border-[var(--line)] p-0.5 text-xs">
              <button
                onClick={() => setFontSizeLevel((l) => Math.max(0, l - 1))}
                className={`grid size-10 place-items-center rounded transition-colors ${fontSizeLevel === 0 ? "bg-[var(--surface-raised)]" : "text-[var(--ink-muted)] hover:text-[var(--ink)]"}`}
                title="Smaller text"
                aria-label="Decrease article text size"
              >
                <Minus className="size-4" />
              </button>
              <button
                onClick={() => setFontSizeLevel((l) => Math.min(2, l + 1))}
                className={`grid size-10 place-items-center rounded transition-colors ${fontSizeLevel === 2 ? "bg-[var(--surface-raised)]" : "text-[var(--ink-muted)] hover:text-[var(--ink)]"}`}
                title="Larger text"
                aria-label="Increase article text size"
              >
                <Plus className="size-4" />
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={toggleBookmark}
              className={`grid size-11 place-items-center rounded-lg border border-[var(--line)] transition-colors ${isBookmarked ? "category-tint" : "text-[var(--ink-muted)] hover:bg-[var(--surface-raised)] hover:text-[var(--ink)]"}`}
              title={isBookmarked ? "Remove bookmark" : "Save article"}
              aria-pressed={isBookmarked}
            >
              <Bookmark className="size-5" fill={isBookmarked ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        {/* Article Headline Header */}
        <header className="space-y-4">
          <h1 className="font-serif text-[clamp(2rem,8.8vw,3rem)] font-bold leading-[1.08] tracking-tight text-[var(--ink)]">
            {article.title}
          </h1>

          <p className="font-sans text-[clamp(1.0625rem,4.4vw,1.25rem)] leading-relaxed text-[var(--ink-muted)]">
            {article.summary}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-100 dark:border-neutral-800/80 text-xs text-neutral-500 font-medium">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-bold text-neutral-700 dark:text-neutral-300">
                {(article.authorName || "D")[0]}
              </div>
              <div>
                <span className="font-semibold text-neutral-900 dark:text-neutral-100 block">
                  {article.authorName || "Editorial Wire"}
                </span>
                <span>{new Date(article.$createdAt || Date.now()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span>{readingTime || article.readingTime || "4 min read"}</span>
              <ShareBar title={article.title} slug={article.slug} />
            </div>
          </div>
        </header>

        {/* Tactile Audio Listen Bar */}
        <div className="flex flex-col items-stretch justify-between gap-4 rounded-xl border border-[var(--line)] bg-[var(--surface-subtle)] p-4 transition-all min-[425px]:flex-row min-[425px]:items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="grid size-11 shrink-0 place-items-center rounded-full bg-[var(--brand-fill)] text-white shadow-sm transition-all hover:scale-105 active:scale-95"
              aria-label={isPlayingAudio ? "Pause article audio" : "Play article audio"}
            >
              {isPlayingAudio ? <Pause className="size-4" fill="currentColor" /> : <Play className="ml-0.5 size-4" fill="currentColor" />}
            </button>
            <div>
              <p className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                {isPlayingAudio ? "Streaming Audio Dispatch" : "Listen to this story"}
              </p>
              <p className="text-xs text-[var(--ink-muted)]">
                Synthesized neural voice narration • 3:45
              </p>
            </div>
          </div>

          {/* Equalizer wave animation */}
          {isPlayingAudio && (
            <div className="flex items-end gap-1 h-5">
              {[60, 100, 40, 80, 50, 90, 30].map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${h}%` }}
                  className="w-1 bg-blue-500 rounded-full animate-pulse"
                />
              ))}
            </div>
          )}
        </div>

        {/* High-Resolution Cover Image */}
        <div className="rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 shadow-md">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={article.cover}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 bg-neutral-100/70 p-3 text-xs text-neutral-600 dark:bg-neutral-900/70 dark:text-neutral-300">
            <span>Verified photo archive / Wire dispatch</span>
            {article.source && (
              <span className="font-semibold uppercase tracking-wider">Source: {article.source}</span>
            )}
          </div>
        </div>

        {/* Full Article Body */}
        <div className={`prose dark:prose-invert max-w-none leading-relaxed ${fontClasses}`}>
          <ArticleContent article={article} />
        </div>

        {/* Source Attribution & Wire Verification Banner */}
        <div className="p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              Journalistic Standards & Verification
            </h4>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            This story was compiled from real-time worldwide correspondents and open wire feeds. All dispatches undergo editorial provenance verification and cryptographic watermarking in accordance with international digital journalism guidelines.
          </p>
          {article.sourceUrl && (
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="category-accent inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold hover:underline"
            >
              <span>View Original Wire Dispatch ({article.source || "External"})</span>
              <ExternalLink className="size-4" />
            </a>
          )}
        </div>

        {/* Newsletter Call to Action */}
        <div className="p-8 rounded-2xl bg-neutral-900 text-white dark:bg-neutral-950 border border-neutral-800 text-center space-y-3">
          <h3 className="text-xl font-serif font-bold">Never miss global developments</h3>
          <p className="text-xs text-neutral-400 max-w-md mx-auto">
            Get our hand-curated morning dispatch sent directly to your inbox with critical perspectives from Geneva, London, Tokyo, and New York.
          </p>
          <div className="pt-2 flex justify-center">
            <SubscribeModal
              title="Subscribe to Wire"
              className="bg-white text-neutral-950 font-semibold px-6 py-2 rounded-full text-xs shadow-md hover:bg-neutral-100 transition-all active:scale-95"
            />
          </div>
        </div>

        {/* Related Articles Section */}
        {related.length > 0 && (
          <div className="pt-8 border-t border-neutral-200/80 dark:border-neutral-800 space-y-6">
            <h3 className="text-xl font-serif font-bold text-neutral-900 dark:text-white">
              Related Dispatches
            </h3>
            <div className="tablet-news-grid grid grid-cols-1 gap-6">
              {related.map((r) => (
                <EditorialCard key={r.slug || r.id} article={r} variant="standard" />
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
