/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import SectionHeader from "./SectionHeader";
import EditorialCard from "../shared/news-layout/EditorialCard";

export default function EntertainmentSection({ articles = [] }) {
  if (!articles.length) return null;

  return (
    <section className="space-y-6">
      <SectionHeader
        title="Culture & Entertainment"
        link="/entertainment"
        ctaLabel="Explore entertainment"
      />

      <div className="tablet-news-grid grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
        {articles.slice(0, 6).map((art) => (
          <EditorialCard
            key={art.$id || art.id || art.slug}
            article={art}
            variant="standard"
          />
        ))}
      </div>
    </section>
  );
}
