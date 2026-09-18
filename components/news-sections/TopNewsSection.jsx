/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import SectionHeader from "./SectionHeader";
import EditorialCard from "../shared/news-layout/EditorialCard";

export default function TopNewsSection({ articles = [] }) {
  const items = articles.length > 0 ? articles : [];
  if (!items.length) return null;

  const lead = items[0];
  const sideItems = items.slice(1, 3);
  const remaining = items.slice(3, 7);

  return (
    <section className="space-y-6">
      <SectionHeader
        title="Top Stories"
        link="/top-news"
        ctaLabel="View all top stories"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Featured Card (7 cols) */}
        {lead && (
          <div className="lg:col-span-7">
            <EditorialCard article={lead} variant="featured" priority={true} />
          </div>
        )}

        {/* Supporting Cards (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-3">
          {sideItems.map((art) => (
            <EditorialCard key={art.$id || art.id || art.slug} article={art} variant="horizontal" />
          ))}
        </div>
      </div>

      {/* Grid for remaining articles */}
      {remaining.length > 0 && (
        <div className="tablet-news-grid grid grid-cols-1 gap-5 pt-4 lg:grid-cols-4">
          {remaining.map((art) => (
            <EditorialCard key={art.$id || art.id || art.slug} article={art} variant="standard" />
          ))}
        </div>
      )}
    </section>
  );
}
