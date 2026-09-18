/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import SectionHeader from "./SectionHeader";
import EditorialCard from "../shared/news-layout/EditorialCard";

export default function TechnologySection({ articles = [] }) {
  if (!articles.length) return null;

  const lead = articles[0];
  const rest = articles.slice(1, 5);

  return (
    <section className="space-y-6">
      <SectionHeader
        title="Technology & Frontier"
        link="/technology"
        ctaLabel="Explore technology"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {lead && (
          <div className="lg:col-span-6">
            <EditorialCard article={lead} variant="featured" priority={false} />
          </div>
        )}

        <div className="tablet-news-grid grid grid-cols-1 gap-4 lg:col-span-6">
          {rest.map((art) => (
            <EditorialCard key={art.$id || art.id || art.slug} article={art} variant="standard" />
          ))}
        </div>
      </div>
    </section>
  );
}
