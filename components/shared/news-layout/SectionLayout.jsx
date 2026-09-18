/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SectionHeader from "@/components/news-sections/SectionHeader";
import EditorialCard from "./EditorialCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { normalizeCategory } from "@/lib/category-themes";

export default function SectionLayout({
  sectionTitle,
  category,
  sectionLink,
  ctaLabel,
  articleData = [],
  demoData = [],
  limit = 12,
  totalCount = 0,
  currentPage = 1,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const data = articleData.length > 0 ? articleData : demoData;
  const total = totalCount || data.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const categoryKey = normalizeCategory(category || sectionTitle);

  useEffect(() => {
    if (!searchParams.get("page") && currentPage > 1) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(currentPage));
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [router, searchParams, currentPage]);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`?${params.toString()}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const lead = data[0];
  const rest = data.slice(1);

  return (
    <div data-category={categoryKey} className="site-container space-y-8 py-6 sm:py-8">
      {/* Section Breadcrumb & Title */}
      <div>
        <div className="site-muted mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
          <span>Journal</span>
          <span>/</span>
          <span className="category-accent">{sectionTitle}</span>
        </div>
        <SectionHeader
          title={sectionTitle}
          link={sectionLink}
          ctaLabel={ctaLabel}
          page={true}
          category={categoryKey}
        />
      </div>

      {/* Featured Lead Dispatch */}
      {lead && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <EditorialCard article={lead} variant="featured" priority={true} />
          </div>
          {rest[0] && (
            <div className="lg:col-span-4 flex flex-col justify-between">
              <EditorialCard article={rest[0]} variant="standard" />
              {rest[1] && (
                <div className="mt-4">
                  <EditorialCard article={rest[1]} variant="horizontal" />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Remaining Grid */}
      {rest.length > 2 && (
        <div className="tablet-news-grid grid grid-cols-1 gap-5 pt-4 lg:grid-cols-3 lg:gap-6">
          {rest.slice(2).map((article) => (
            <EditorialCard
              key={article.id || article.$id || article.slug}
              article={article}
              variant="standard"
            />
          ))}
        </div>
      )}

      {/* Modern Editorial Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col items-stretch gap-3 border-t border-[var(--line)] pt-6 min-[425px]:flex-row min-[425px]:items-center min-[425px]:justify-between">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[var(--line)] px-4 text-xs font-semibold text-[var(--ink)] transition hover:bg-[var(--surface-raised)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft className="size-4" /> Previous
          </button>

          <span className="site-muted order-first text-center text-xs font-medium min-[425px]:order-none">
            Page {currentPage} of {totalPages} ({total} articles)
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[var(--line)] px-4 text-xs font-semibold text-[var(--ink)] transition hover:bg-[var(--surface-raised)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next <ArrowRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}
